import { Get, Post, Body, Controller, Render, Query, Res, Param, Redirect, ParseIntPipe } from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'
import { validate, ValidationError } from 'class-validator'
import { UserSearchDto, UserSearchCheckDto } from './dto/request/userSearch.dto'
import { UserCreateDto, UserCreateCheckDto } from './dto/request/UserCreateDto.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // https://github.com/typestack/class-validator
  // https://qiita.com/t-kubodera/items/2839ec4e4fe667b43f18

  /*
 【一覧検索】
 ■正常系
  http://localhost:3000/users
  http://localhost:3000/users?id=
  http://localhost:3000/users?id=1
  http://localhost:3000/users?id=2
  http://localhost:3000/users?startDate=
  http://localhost:3000/users?startDate=2010-10-01
  http://localhost:3000/users?startDate=2010-12-01
  http://localhost:3000/users?endDate=
  http://localhost:3000/users?endDate=2010-11-01
  http://localhost:3000/users?endDate=2010-11-02
  http://localhost:3000/users?startDate=2010-10-02&endDate=2010-11-30
  http://localhost:3000/users?pageNumber=
  http://localhost:3000/users?pageNumber=1
  http://localhost:3000/users?pageNumber=2
  ■異常系
  http://localhost:3000/users?id=あ
  http://localhost:3000/users?startDate=あ
  http://localhost:3000/users?startDate=2010-10-1a
  http://localhost:3000/users?pageNumber=あ
  */

  /**
   * GET ユーザー一覧画面
   */
  @Get('/')
  @Render('users/index')
  async index(@Query() query: UserSearchDto) {
    let errors: ValidationError[] = await validate(new UserSearchCheckDto(query))
    let users = []
    let pagination = 0
    if (!errors.length) {
      const resultUsers = await this.usersService.findUsers(query.id, query.startDate, query.endDate, query.pageNumber)
      errors = []
      users = resultUsers.users
      pagination = resultUsers.pagination
    }
    return {
      errors: JSON.stringify(errors),
      users: JSON.stringify(users),
      pagination: pagination
    }
  }
  /**
   * POST ユーザー削除処理
   */
  @Post('/')
  @Redirect('/users')
  async postIndex(@Body('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id)
  }

  /**
   * GET ユーザー登録画面（新規登録・コピー新規登録）
   */
  @Get('/create')
  @Render('users/create')
  async getCreate(@Query() query: any) {
    let froms = {}
    if (query.id) {
      const user = await this.usersService.findUserById(Number(query.id))
      froms = {
        userName: user.userName,
        password: user.password,
        address: user.address,
        age: user.age,
        departmentId: user.departmentId,
        point: null,
        createdAt: new Date(),
        updateAt: new Date()
      }
    }
    return {
      forms: JSON.stringify(froms),
      errors: JSON.stringify([])
    }
  }
  /**
   * POST ユーザー登録処理
   */
  @Post('/create')
  async postCreate(@Body() body: UserCreateDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UserCreateCheckDto(body))
    if (errors.length) {
      return res.render('users/create', {
        forms: JSON.stringify(body),
        errors: JSON.stringify(errors)
      })
    }
    await this.usersService.createUser(body)
    return res.redirect(`/users`)
  }

  /**
   * GET ユーザー詳細画面
   */
  @Get('detail/:id')
  @Render('users/create')
  async getDetail(@Param('id') id: number) {
    const froms = await this.usersService.findUserById(id)
    return {
      forms: JSON.stringify(froms),
      errors: JSON.stringify([])
    }
  }
  /**
   * POST ユーザー更新処理
   */
  @Post('detail/:id')
  async postDetail(@Param('id') id: number, @Body() body: UserCreateDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UserCreateCheckDto(body))
    if (errors.length) {
      return res.render(`users/create`, {
        forms: JSON.stringify(body),
        errors: JSON.stringify(errors)
      })
    }
    await this.usersService.updateUser(body)
    return res.redirect(`/users`)
  }
}

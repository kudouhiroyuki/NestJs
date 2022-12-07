import { Get, Post, Body, Controller, Render, Query, Res } from '@nestjs/common'
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
  @Get('')
  @Render('users/index')
  async getIndex(@Query() query: UserSearchDto) {
    const errors: ValidationError[] = await validate(new UserSearchCheckDto(query))
    let users = []
    let pagination = 0
    if (!errors.length) {
      const resultUsers = await this.usersService.findUsers(query.id, query.startDate, query.endDate, query.pageNumber)
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
   * GET ユーザー登録画面（新規登録・コピー新規登録）
   */
  @Get('/create')
  @Render('users/create')
  async getCreate() {
    return {
      errors: JSON.stringify([])
    }
  }
  /**
   * POST ユーザー登録処理
   */
  @Post('/create')
  @Render('users/create')
  async postCreate(@Body() body: UserCreateDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UserCreateCheckDto(body))
    await this.usersService.createUser(body)
    if (errors.length) {
      return {
        errors: JSON.stringify(errors)
      }
    }
    return res.redirect(`/users`)
  }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() user: Users): Promise<Users> {
  //   return this.usersService.updateUser({
  //     where: { id: Number(id) },
  //     data: user
  //   })
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<Users> {
  //   return await this.usersService.deleteUser({ id: Number(id) })
  // }
}

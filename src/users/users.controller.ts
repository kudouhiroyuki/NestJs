import { Get, Post, Body, Controller, Render, Query, Res, Param, Redirect, ParseIntPipe } from '@nestjs/common'
import { Response } from 'express'
import { validate, ValidationError } from 'class-validator'

import { UsersService } from './users.service'
import { UsersGetRequestDto, UsersGetRequestCheckDto } from './dto/request/usersRequest.dto'
import {
  UsersCreateGetRequestDto,
  UsersCreatePostRequestDto,
  UsersCreatePostRequestCheckDto
} from './dto/request/usersCreateRequest.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * GET ユーザー一覧画面
   */
  @Get('/')
  @Render('users/index')
  async index(@Query() query: UsersGetRequestDto) {
    let errors: ValidationError[] = await validate(new UsersGetRequestCheckDto(query))
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
  async getCreate(@Query() query: UsersCreateGetRequestDto) {
    const departments = await this.usersService.findDepartmentsAll()
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
      departments: JSON.stringify(departments),
      forms: JSON.stringify(froms),
      errors: JSON.stringify([])
    }
  }
  /**
   * POST ユーザー登録処理
   */
  @Post('/create')
  async postCreate(@Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
    const departments = await this.usersService.findDepartmentsAll()
    const errors: ValidationError[] = await validate(new UsersCreatePostRequestCheckDto(body))
    if (errors.length) {
      return res.render('users/create', {
        departments: JSON.stringify(departments),
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
    const departments = await this.usersService.findDepartmentsAll()
    const froms = await this.usersService.findUserById(id)
    return {
      departments: JSON.stringify(departments),
      forms: JSON.stringify(froms),
      errors: JSON.stringify([])
    }
  }
  /**
   * POST ユーザー更新処理
   */
  @Post('detail/:id')
  async postDetail(@Param('id') id: number, @Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
    const departments = await this.usersService.findDepartmentsAll()
    const errors: ValidationError[] = await validate(new UsersCreatePostRequestCheckDto(body))
    if (errors.length) {
      return res.render(`users/create`, {
        departments: JSON.stringify(departments),
        forms: JSON.stringify(body),
        errors: JSON.stringify(errors)
      })
    }
    await this.usersService.updateUser(body)
    return res.redirect(`/users`)
  }
}

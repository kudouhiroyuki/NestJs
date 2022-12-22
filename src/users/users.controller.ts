import { Get, Post, Body, Controller, Render, Query, Res, Param, Redirect, ParseIntPipe } from '@nestjs/common'
import { HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'
import { Response } from 'express'
import { validate, ValidationError } from 'class-validator'

import { UsersService } from './users.service'
import { UsersGetResponseDto } from './dto/response/usersResponse.dto'
import { UsersGetRequestDto, UsersGetRequestCheckDto } from './dto/request/usersRequest.dto'
import {
  UsersCreateGetRequestDto,
  UsersCreatePostRequestDto,
  UsersCreatePostRequestCheckDto
} from './dto/request/usersCreateRequest.dto'

@ApiTags('ユーザー管理')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * GET ユーザー照会画面
   */
  @Get('/')
  @Render('users/index')
  @HttpCode(200)
  @ApiOperation({
    summary: 'ユーザー照会画面',
    operationId: 'getIndex'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersGetResponseDto,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  async getIndex(@Query() query: UsersGetRequestDto) {
    let errors: ValidationError[] = await validate(new UsersGetRequestCheckDto(query))
    let users = []
    let pagination = 0
    if (!errors.length) {
      const resultData = await this.usersService.findUsers(query.id, query.startDate, query.endDate, query.pageNumber)
      errors = []
      users = resultData.users
      pagination = resultData.pagination
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
  @HttpCode(204)
  @ApiOperation({
    summary: 'ユーザー削除処理',
    operationId: 'postIndex'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  async postIndex(@Body('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id)
  }

  /**
   * GET ユーザー登録画面（新規登録・コピー新規登録）
   */
  @Get('/create')
  @Render('users/create')
  @HttpCode(200)
  @ApiOperation({
    summary: 'ユーザー登録画面（新規登録・コピー新規登録）',
    operationId: 'getCreate'
  })
  async getCreate(@Query() query: UsersCreateGetRequestDto) {
    const departments = await this.usersService.findDepartmentsAll()
    let froms = {}
    if (query.id) {
      const user = await this.usersService.findUserById(Number(query.id))
      if (user) {
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
  @HttpCode(201)
  @ApiOperation({
    summary: 'ユーザー登録処理',
    operationId: 'postCreate'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  @ApiBody({ type: UsersCreatePostRequestCheckDto })
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
  @HttpCode(200)
  @ApiOperation({
    summary: 'ユーザー詳細画面',
    operationId: 'getDetail'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  async getDetail(@Param('id') id: number, @Res() res: Response) {
    const departments = await this.usersService.findDepartmentsAll()
    const froms = await this.usersService.findUserById(id)
    if (froms) {
      return res.render(`users/create`, {
        departments: JSON.stringify(departments),
        forms: JSON.stringify(froms),
        errors: JSON.stringify([])
      })
    }
    return res.redirect(`/users`)
  }
  /**
   * POST ユーザー更新処理
   */
  @Post('detail/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'ユーザー更新処理',
    operationId: 'postDetail'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
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

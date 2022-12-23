import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Controller,
  Render,
  Query,
  Res,
  Param,
  Redirect,
  ParseIntPipe,
  Session,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'
import e, { Response } from 'express'
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
      errorMessage: 1,
      departments: JSON.stringify(departments),
      forms: JSON.stringify(froms),
      errors: JSON.stringify([])
    }
  }

  /**
   * GET ユーザー詳細画面
   */
  @Get('detail/:id')
  @Render('users/create')
  @HttpCode(200)
  @ApiOperation({
    summary: 'ユーザー詳細画面',
    operationId: 'getEdit'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  async edit(@Param('id') id: number) {
    const errors = Session['userErrors'] ? Session['userErrors'] : []
    const departments = await this.usersService.findDepartmentsAll()
    let forms = await this.usersService.findUserById(id)
    if (Session['userErrors']) forms = Session['userForms']
    Session['userErrors'] = null
    Session['userForms'] = null
    return {
      errors: JSON.stringify(errors),
      departments: JSON.stringify(departments),
      forms: JSON.stringify(forms)
    }
  }

  /**
   * POST ユーザー登録処理
   */
  @Post('/create')
  @HttpCode(201)
  @ApiOperation({
    summary: 'ユーザー登録処理',
    operationId: 'store'
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
  async store(@Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
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
   * PUT ユーザー更新処理
   */
  @Put('update/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'ユーザー更新処理',
    operationId: 'update'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  async update(@Param('id') id: number, @Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UsersCreatePostRequestCheckDto(body))
    if (errors.length) {
      Session['userErrors'] = JSON.parse(JSON.stringify(errors))
      Session['userForms'] = JSON.parse(JSON.stringify(body))
      return res.redirect(`/users/detail/${id}`)
    }
    await this.usersService.updateUser(body)
    return res.redirect(`/users`)
  }

  /**
   * DELETE ユーザー削除処理
   */
  @Delete('/')
  @Redirect('/users')
  @HttpCode(204)
  @ApiOperation({
    summary: 'ユーザー削除処理',
    operationId: 'destroy'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '正常処理'
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: '認証エラー（リダイレクト）'
  })
  async destroy(@Body('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id)
  }
}

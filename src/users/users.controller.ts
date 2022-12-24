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
  Session,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
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

  @Get('/')
  @Render('users/index')
  @HttpCode(200)
  @ApiOperation({
    summary: '一覧画面',
    operationId: 'index'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersGetResponseDto,
    description: 'success'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized'
  })
  async index(@Query() query: UsersGetRequestDto) {
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

  @Get('/create')
  @Render('users/create')
  @HttpCode(200)
  @ApiOperation({
    summary: '登録画面（新規登録・コピー新規登録）',
    operationId: 'create'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized'
  })
  async create(@Query() query: UsersCreateGetRequestDto) {
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
      errors: JSON.stringify([]),
      departments: JSON.stringify(departments),
      forms: JSON.stringify(froms)
    }
  }

  @Get('/:id')
  @Render('users/create')
  @HttpCode(200)
  @ApiOperation({
    summary: '詳細画面',
    operationId: 'show'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized'
  })
  async show(@Param('id') id: number) {
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

  @Post('/')
  @HttpCode(201)
  @ApiOperation({
    summary: '登録処理',
    operationId: 'store'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized'
  })
  @ApiBody({ type: UsersCreatePostRequestCheckDto })
  async store(@Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UsersCreatePostRequestCheckDto(body))
    const departments = await this.usersService.findDepartmentsAll()
    if (errors.length) {
      // リダイレクト処理の修正
      // return res.render('users/create', {
      //   errors: JSON.stringify(errors),
      //   departments: JSON.stringify(departments),
      //   forms: JSON.stringify(body)
      // })
    }
    await this.usersService.createUser(body)
    return res.redirect(`/users`)
  }

  @Put('/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: '更新処理',
    operationId: 'update'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'success'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized'
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

  @Delete('/:id')
  @Redirect('/users')
  @HttpCode(204)
  @ApiOperation({
    summary: '削除処理',
    operationId: 'destroy'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'success'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized'
  })
  async destroy(@Param('id') id: number) {
    await this.usersService.deleteUser(id)
  }
}

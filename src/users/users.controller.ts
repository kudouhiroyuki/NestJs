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
  ParseIntPipe,
  Session,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'
import { Response } from 'express'
import { validate, ValidationError } from 'class-validator'

import { UsersService } from './users.service'
import { ErrorMessegeConstants } from '../constants/errorMessege'
import { UsersIndexGetResponse } from './dto/response/usersIndexResponse.dto'
import { UsersCreateGetResponse } from './dto/response/usersCreateResponse.dto'
import { UsersShowGetResponse } from './dto/response/usersShowResponse.dto'
import { UsersIndexGetRequestDto, UsersIndexGetRequestCheckDto } from './dto/request/usersIndexRequest.dto'
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
    type: UsersIndexGetResponse,
    description: 'success'
  })
  async index(@Query() query: UsersIndexGetRequestDto) {
    let errors = await validate(new UsersIndexGetRequestCheckDto(query))
    let users = []
    let pagination = 0
    if (Session['userErrors']) {
      errors = [...errors, ...Session['userErrors']]
    }
    if (!errors.length) {
      const resultData = await this.usersService.findUsers(query.id, query.startDate, query.endDate, query.pageNumber)
      users = resultData.users
      pagination = resultData.pagination
    }
    Session['userErrors'] = null
    Session['userForms'] = null
    return {
      errors: JSON.stringify(errors),
      users: JSON.stringify(users),
      pagination: pagination
    }
  }

  @Get('/create')
  @HttpCode(200)
  @ApiOperation({
    summary: '登録画面（新規登録・コピー新規登録）',
    operationId: 'create'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersCreateGetResponse,
    description: 'success'
  })
  async create(@Query() query: UsersCreateGetRequestDto, @Res() res: Response) {
    let errors: ValidationError[] = []
    const departments = await this.usersService.findDepartmentsAll()
    let user = null
    if (query.copyId) {
      user = await this.usersService.findUserByCopyId(query.copyId)
      if (!user) {
        Session['userErrors'] = ErrorMessegeConstants.Empty
        return res.redirect('/users')
      }
    }
    if (Session['userErrors']) {
      errors = Session['userErrors']
      user = Session['userForms']
    }
    Session['userErrors'] = null
    Session['userForms'] = null
    return res.render('users/create', {
      errors: JSON.stringify(errors),
      departments: JSON.stringify(departments),
      forms: JSON.stringify(user)
    })
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({
    summary: '詳細画面',
    operationId: 'show'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersShowGetResponse,
    description: 'success'
  })
  async show(@Param('id') id: number, @Res() res: Response) {
    let errors: ValidationError[] = []
    const departments = await this.usersService.findDepartmentsAll()
    let user = await this.usersService.findUserById(id)
    if (!user) {
      Session['userErrors'] = ErrorMessegeConstants.Empty
      return res.redirect('/users')
    }
    if (Session['userErrors']) {
      errors = Session['userErrors']
      user = Session['userForms']
    }
    Session['userErrors'] = null
    Session['userForms'] = null
    return res.render('users/create', {
      errors: JSON.stringify(errors),
      departments: JSON.stringify(departments),
      forms: JSON.stringify(user)
    })
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
  @ApiBody({ type: UsersCreatePostRequestCheckDto })
  async store(@Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UsersCreatePostRequestCheckDto(body))
    if (errors.length) {
      Session['userErrors'] = JSON.parse(JSON.stringify(errors))
      Session['userForms'] = JSON.parse(JSON.stringify(body))
      return res.redirect(`/users/create`)
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
  @ApiBody({ type: UsersCreatePostRequestCheckDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UsersCreatePostRequestDto, @Res() res: Response) {
    const errors: ValidationError[] = await validate(new UsersCreatePostRequestCheckDto(body))
    if (errors.length) {
      Session['userErrors'] = JSON.parse(JSON.stringify(errors))
      Session['userForms'] = JSON.parse(JSON.stringify({ ...{ id }, ...body }))
      return res.redirect(`/users/${id}`)
    }
    await this.usersService.updateUser(id, body)
    return res.redirect(`/users`)
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: '削除処理',
    operationId: 'destroy'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'success'
  })
  async destroy(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.usersService.deleteUser(id)
    return res.redirect(`/users`)
  }
}

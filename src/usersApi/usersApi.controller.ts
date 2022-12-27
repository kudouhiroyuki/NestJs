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

import { UsersApiService } from './usersApi.service'

@ApiTags('ユーザー管理（API）')
@Controller('usersApi')
export class UsersApiController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @Get('/')
  async testApi() {
    return 'testApi'
  }
}

import { Body, Controller, Get, HttpCode, Param, Post, Query, NotFoundException, HttpStatus } from '@nestjs/common'
import { UsersApiService } from './usersApi.service'

@Controller('usersApi')
export class UsersApiController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @Get()
  getUsers(): object {
    return { 111: 2222 }
  }
}

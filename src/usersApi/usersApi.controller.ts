import { Controller, Get, Post, HttpCode } from '@nestjs/common'
import { UsersApiService } from './usersApi.service'

@Controller('usersApi')
export class UsersApiController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @Get()
  @HttpCode(200)
  findUsersAll(): string {
    return 'findUsersAll'
  }

  @Post()
  createUser(): string {
    return 'createUser'
  }
}

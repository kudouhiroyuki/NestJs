import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UsersApiService } from './usersApi.service'
import { ErrorResponseDto } from '../error/errorResponse.dto'

@Controller('usersApi')
export class UsersApiController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @Get('/')
  @HttpCode(200)
  @ApiOperation({
    summary: 'ユーザー一覧取得',
    operationId: 'findUsersAll'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
    description: 'Bad Request.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponseDto,
    description: 'Unauthorized.'
  })
  findUsersAll(): string {
    return 'findUsersAll'
  }

  @Post()
  createUser(): string {
    return 'createUser'
  }
}

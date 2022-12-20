import { Controller, Get, Post, Param, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersApiService } from './usersApi.service'
import { ErrorResponseDto } from '../error/errorResponse.dto'

@ApiTags('usersApi')
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

  @Post('/')
  @HttpCode(201)
  createUser(): string {
    return 'createUser'
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'ユーザー詳細取得',
    operationId: 'findUserById'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ErrorResponseDto,
    description: 'success.'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
    description: 'Bad Request.'
  })
  async findUserById(@Param('id') id: number): Promise<string> {
    return 'ユーザー詳細取得'
  }
}

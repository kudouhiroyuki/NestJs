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
  HttpStatus,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../jwtAuth/jwtAuth.guard'
import { ErrorResponseDto } from '../error/errorResponse.dto'
import { UsersApiService } from './usersApi.service'
import { UsersGetRequestDto } from './dto/request/usersRequest.dto'

@ApiTags('API ユーザー管理')
@Controller('api/users')
export class UsersApiController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/')
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponseDto,
    description: 'Unauthorized'
  })
  async getUsers(@Query() query: UsersGetRequestDto) {
    return 'getUsers'
  }
}

/*
■トークン発行
curl -X POST http://localhost:3000/api/jwtAuth -d "id=1&password=password"
curl -X POST http://localhost:3000/api/jwtAuth -d "id=2&password=password"
■認証API
curl -X GET http://localhost:3000/api/users -H "Authorization: Bearer アクセストークン"

http://localhost:3000/usersApi
http://localhost:3000/usersApi?id=1&pageNumber=1
http://localhost:3000/usersApi?id=あ&pageNumber=あ

axios.get('http://localhost:3000/usersApi?id=あ&pageNumber=あ').then(res => {
  console.log(res.data)
}).catch(error => {
  console.log(error)
})

■400 Bad Request（不正なリクエスト）
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  type: ErrorResponseDto,
  description: 'Bad Request'
})
throw new BadRequestException('email auth code not found')

■401 Unauthorized（未認証）
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  type: ErrorResponseDto,
  description: 'Unauthorized'
})
throw new UnauthorizedException('can not authorize')

■404 Not Found（見つからない）
throw new NotFoundException('CouponId does not exist')
throw new NotFoundException('ordering not found')

■409 Conflict（競合）
throw new ConflictException('mail address is exists')
throw new ConflictException('target product is exists multiple')
throw new ConflictException('this coupon is already used')

■412 Precondition Failed（前提条件で失敗）
@ApiResponse({
  status: HttpStatus.PRECONDITION_FAILED,
  type: ErrorResponseDto,
  description: 'Precondition Failed'
})
throw new PreconditionFailedException('token is invalid')
throw new PreconditionFailedException('invalid user')

■500 Internal Server Error
throw new InternalServerErrorException('many users')
*/

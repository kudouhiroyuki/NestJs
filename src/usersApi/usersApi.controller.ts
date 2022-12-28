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
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { ErrorResponseDto } from '../error/errorResponse.dto'
import { UsersApiService } from './usersApi.service'
import { UsersGetRequestDto } from './dto/request/usersRequest.dto'

@ApiTags('ユーザー管理（API）')
@Controller('usersApi')
export class UsersApiController {
  constructor(private readonly usersApiService: UsersApiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto,
    description: 'Bad Request'
  })
  async getUsers(@Query() query: UsersGetRequestDto) {
    return 'getUsers'
  }
}

/*
curl -X POST http://localhost:3000/jwtAuth -d "userName=name&password=password"
curl GET 'http://localhost:3000/usersApi' -H 'Authorization: Bearer secretKey'

curl http://localhost:3000/usersApi -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzIxOTc1ODR9.JXto7uPmyeuY5s0E22EgIcnAN0-nYyC74-BIVMHKBtw"


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
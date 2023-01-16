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
import { ApiOperation, ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

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
  @HttpCode(200)
  @ApiOperation({
    summary: '一覧',
    operationId: 'getUsers'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: 'Success'
  })
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
axios.get('URL').then(res => {
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

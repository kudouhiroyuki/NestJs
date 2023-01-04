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
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'

import { JwtAuthService } from './jwtAuth.service'
import { ErrorResponseDto } from '../error/errorResponse.dto'
import { JwtAuthPostRequestDto } from './dto/request/jwtAuthRequest.dto'

@ApiTags('API JWT認証（トークン生成）')
@Controller('api/jwtAuth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('/')
  @HttpCode(201)
  @ApiOperation({
    summary: 'トークン生成',
    operationId: 'postJwtAuth'
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
  @ApiBody({ type: JwtAuthPostRequestDto })
  async postJwtAuth(@Body() body: JwtAuthPostRequestDto) {
    const accounts = await this.jwtAuthService.findJwtAuthUser(body.id, body.password)
    if (!accounts) {
      throw new UnauthorizedException('can not authorize')
    }
    return this.jwtAuthService.jwtEncode(body)
  }
}

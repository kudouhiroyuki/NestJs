import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthService } from './jwtAuth.service'

@ApiTags('API JWT認証')
@Controller('api/jwtAuth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('/')
  postJwtEncode(@Body() body: any) {
    return this.jwtAuthService.jwtEncode(body)
  }
}

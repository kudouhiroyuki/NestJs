import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthService } from './jwtAuth.service'

@ApiTags('API JWT認証')
@Controller('api/jwtAuth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('/')
  async postJwtEncode(@Body() body: any) {
    const accounts = await this.jwtAuthService.findJwtAuthUser(body.id, body.password)
    if (!accounts) {
      throw new UnauthorizedException('can not authorize')
    }
    return this.jwtAuthService.jwtEncode(body)
  }
}

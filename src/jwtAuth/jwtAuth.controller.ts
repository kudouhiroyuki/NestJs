import { Controller, UseGuards, Post, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthService } from './jwtAuth.service'

@Controller('jwtAuth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('/')
  login() {
    return this.jwtAuthService.sign()
  }
}

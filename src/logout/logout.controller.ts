import { Controller, Get, Req, Res, HttpCode } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { AuthService } from '../auth/auth.service'

@Controller('logout')
@ApiTags('ログアウト')
export class LogoutController {
  constructor(private readonly authService: AuthService) {}
  /**
   * GET ログアウト処理
   */
  @Get('/')
  async logout(@Req() request: Request, @Res() res: Response) {
    await this.authService.signout(request)
    res.redirect('/login')
  }
}

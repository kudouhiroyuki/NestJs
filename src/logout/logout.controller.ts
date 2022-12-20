import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthService } from '../auth/auth.service'

@Controller('logout')
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

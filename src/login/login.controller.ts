import { Get, Post, Controller, Render, Req, Body, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from '../auth/auth.service'
import { Public } from '../auth/auth.reflecotr'
import { SessionUtils } from '../utils/session.utils'

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  /**
   * GET ログイン画面
   */
  @Public()
  @Get('/')
  @Render('login/index')
  async getLogin() {
    return { id: '', password: '', message: '' }
  }
  /**
   * POST ログイン処理
   */
  @Public()
  @Post('/')
  async postLogin(@Req() request: Request, @Body() body: any, @Res() res: Response) {
    SessionUtils.setSession(request, {}, 'account')

    if (true) {
      return res.redirect(`http://localhost:3000/users`)
    }
  }
}

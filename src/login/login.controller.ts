import { Get, Post, Controller, Render, Req, Body, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from '../auth/auth.service'
import { Public } from '../auth/auth.reflecotr'

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
    const accounts = { test: 'hoge' }
    const signinResult = await this.authService.signin(request, accounts)
    if (!signinResult.err) {
      return res.redirect('users')
    }
  }
}

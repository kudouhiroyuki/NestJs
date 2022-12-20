import { Get, Post, Controller, Render, Req, Body, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthService } from '../auth/auth.service'
import { Public } from '../auth/auth.reflecotr'
import { LoginService } from './login.service'
import { LoginPostRequestDto } from './dto/request/loginRequest.dto'

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService, private readonly loginService: LoginService) {}
  /**
   * GET ログイン画面
   */
  @Public()
  @Get('/')
  @Render('login/index')
  async getLogin() {
    return {
      errorMessage: '',
      id: '1',
      password: 'password'
    }
  }
  /**
   * POST ログイン処理
   */
  @Public()
  @Post('/')
  async postLogin(@Req() request: Request, @Body() body: LoginPostRequestDto, @Res() res: Response) {
    const accounts = await this.loginService.findLoginUser(body.id, body.password)
    if (!accounts) {
      return res.render('login', {
        errorMessage: 'IDまたはパスワードが正しくありません。',
        id: body.id,
        password: body.password
      })
    }
    const signinResult = await this.authService.signin(request, accounts)
    if (!signinResult.err) {
      return res.redirect('users')
    }
  }
}

import { Get, Post, Controller, Render, Req, Body, Res, HttpCode } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { AuthService } from '../auth/auth.service'
import { Public } from '../auth/auth.reflecotr'
import { LoginService } from './login.service'
import { LoginPostRequestDto } from './dto/request/loginRequest.dto'

@ApiTags('ログイン')
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService, private readonly loginService: LoginService) {}
  /**
   * GET ログイン画面
   */
  @Public()
  @Get('/')
  @HttpCode(200)
  @ApiOperation({
    summary: 'ログイン画面',
    operationId: 'getLogin'
  })
  @Render('login/index')
  async getLogin() {
    return {
      errorMessage: '',
      id: '',
      password: ''
    }
  }

  /**
   * POST ログイン処理
   */
  @Public()
  @Post('/')
  @HttpCode(201)
  @ApiOperation({
    summary: 'ログイン処理',
    operationId: 'postLogin'
  })
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

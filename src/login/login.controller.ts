import { Get, Post, Controller, Render } from '@nestjs/common'
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
  @Post('/')
  @Render('login/index')
  async postLogin() {
    return { id: '', password: '', message: '' }
  }
}

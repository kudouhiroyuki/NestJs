import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('passwordReset')
export class PasswordResetController {
  /**
   * GET パスワード変更画面
   */
  @Get('/')
  @Render('password-reset')
  async getPasswordReset() {
    return {}
  }
  /**
   * POST パスワード変更処理
   */
  @Post('/')
  @Redirect('http://localhost:3000/top')
  async postPasswordReset(@Body() body: any) {
    console.log('パスワード変更処理')
    console.log(body)
  }
}

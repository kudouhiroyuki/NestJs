import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('login')
export class LoginController {
  /**
   * GET ログイン画面
   */
  @Get('/')
  @Render('login')
  async getIndex() {
    return {
      forms: JSON.stringify({})
    }
  }
  /**
   * POST ログイン処理
   */
  @Post('/')
  @Redirect('http://localhost:3000/top')
  async postIndex(@Body() body: any) {
    console.log('ログイン処理')
    console.log(body)
  }
}

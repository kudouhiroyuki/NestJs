import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('maintenance')
export class MaintenanceController {
  /**
   * GET 料金区分（一覧画面）
   */
  @Get('/')
  @Render('maintenance/index')
  async getIndex(@Query() query: any) {
  }
  /**
   * POST 料金区分（登録処理）
   */
  @Post('/:productId/regist')
  @Redirect()
  async postRegist(@Param('productId') productId: string, @Body() body: any) {
    console.log('料金区分（登録処理）')
    console.log(body)
    return { url: `http://localhost:3000/divisions/${productId}/reference` }
  }
}

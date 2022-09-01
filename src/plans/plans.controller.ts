import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common'

@Controller('plans')
export class PlansController {
  /**
   * GET 商品一覧画面
   */
  @Get('/reference')
  @Render('plans/reference')
  async getReference(@Query() query: any) {
    return {}
  }
}

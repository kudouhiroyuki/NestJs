import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common'

@Controller('plans')
export class PlansController {
  /**
   * GET 料金プラン一覧画面
   */
  @Get('/reference')
  @Render('plans/reference')
  async getReference(@Query() query: any) {
    console.log('料金プラン一覧画面:query')
    console.log(query)
    // 検索結果データ（料金プラン一覧）
    const plans = [
      {
        planId: '1',
        name: '料金プラン名'
      },
      {
        planId: '2',
        name: '料金プラン名'
      }
    ]
    return {
      plans: JSON.stringify(plans),
      totalPageCount: 3
    }
  }
}

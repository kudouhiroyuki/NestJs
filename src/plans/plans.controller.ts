import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common'

@Controller('plans')
export class PlansController {
  /**
   * GET 料金プラン一覧画面
   */
  @Get('/:productId/reference')
  @Render('plans/reference')
  async getReference(@Param('productId') productId: string, @Query() query: any) {
    console.log('料金プラン一覧画面:query')
    console.log(query)
    console.log('商品ID:' + productId)
    // 検索結果データ（料金プラン一覧）
    const plans = [
      {
        planId: '1',
        planName: '料金プラン名'
      },
      {
        planId: '2',
        planName: '料金プラン名'
      }
    ]
    return {
      productId: JSON.stringify(productId),
      plans: JSON.stringify(plans),
      totalPageCount: 3
    }
  }

  /**
   * GET 料金プラン登録画面
   */
  @Get('/:productId/regist')
  @Render('plans/regist')
  async getRegist(@Param('productId') productId: string) {
    return {
      productId: JSON.stringify(productId)
    }
  }
}

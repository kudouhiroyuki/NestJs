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
    // カレンダーデータ
    const calendars = {
      events: [
        {
          id: '1',
          type: '0',
          title: '料金区分A',
          start: '2022-09-01',
          end: ''
        },
        {
          id: '2',
          type: '1',
          title: '料金区分B',
          start: '2022-09-05',
          end: '2022-09-10'
        },
        {
          id: '3',
          type: '2',
          title: '売り止め',
          start: '2022-09-19',
          end: '2022-09-23'
        }
      ]
    }
    return {
      productId: JSON.stringify(productId),
      calendars: JSON.stringify(calendars)
    }
  }
}

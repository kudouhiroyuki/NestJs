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
    // 料金プランデータ
    const ratePlans = [
      // {
      //   id: '1',
      //   start: '2022-09-05',
      //   end: '2022-09-05',
      //   priority: '1',
      //   feeId: '1'
      // },
      // {
      //   id: '2',
      //   start: '2022-09-05',
      //   end: '2022-09-05',
      //   priority: '1',
      //   feeId: '2'
      // }
      // {
      //   id: '3',
      //   feeId: '2',
      //   priority: '1',
      //   title: '料金区分B',
      //   start: '2022-09-05',
      //   end: '2022-09-10'
      // },
      // {
      //   id: '4',
      //   feeId: '3',
      //   title: '売り止め',
      //   start: '2022-10-23',
      //   end: '2022-10-26'
      // }
    ]
    // マスターデータ（料金区分）
    const feeCategorys = [
      { feeId: '1', feeName: '料金区分A' },
      { feeId: '2', feeName: '料金区分B' },
      { feeId: '3', feeName: '売り止め' }
    ]
    return {
      productId: JSON.stringify(productId),
      ratePlans: JSON.stringify(ratePlans),
      feeCategorys: JSON.stringify(feeCategorys)
    }
  }
}

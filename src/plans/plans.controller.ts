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
        planName: '料金プラン名'
      },
      {
        planId: '2',
        planName: '料金プラン名'
      }
    ]
    return {
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
    // マスターデータ（料金区分）
    const feeCategorys = [
      { feeId: '1', feeName: '料金区分A' },
      { feeId: '2', feeName: '料金区分B' },
      { feeId: '3', feeName: '売り止め' }
    ]
    return {
      productId: JSON.stringify(productId),
      feeCategorys: JSON.stringify(feeCategorys)
    }
  }

  /**
   * GET 料金プラン詳細画面
   */
  @Get('/:productId/detail/:id')
  @Render('plans/detail')
  async getDetail(@Param('productId') productId: string) {
    // マスターデータ（料金区分）
    const feeCategorys = [
      { feeId: '1', feeName: '料金区分A' },
      { feeId: '2', feeName: '料金区分B' },
      { feeId: '3', feeName: '売り止め' }
    ]
    // 料金プランデータ
    const ratePlans = [
      {
        id: '1',
        start: '2022-09-05',
        end: '2022-09-05',
        priority: '1',
        feeId: '1'
      },
      {
        id: '2',
        start: '2022-09-05',
        end: '2022-09-05',
        priority: '1',
        feeId: '2'
      },
      {
        id: '3',
        start: '2022-09-05',
        end: '2022-09-10',
        priority: '1',
        feeId: '2'
      },
      {
        id: '4',
        start: '2022-10-23',
        end: '2022-10-26',
        priority: '1',
        feeId: '3'
      }
    ]
    return {
      productId: JSON.stringify(productId),
      ratePlans: JSON.stringify(ratePlans),
      feeCategorys: JSON.stringify(feeCategorys)
    }
  }
}

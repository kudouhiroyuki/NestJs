import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common'

@Controller('divisions')
export class DivisionsController {
  /**
   * GET 料金区分一覧画面
   */
  @Get('/:productId/reference')
  @Render('divisions/reference')
  async getReference(@Param('productId') productId: string, @Query() query: any) {
    console.log('料金区分一覧画面:query')
    console.log(query)
    console.log('商品ID:' + productId)
    // 検索結果データ（料金区分一覧）
    const divisions = [
      {
        divisionId: '1',
        divisionName: '料金区分A'
      },
      {
        divisionId: '2',
        divisionName: '料金区分B'
      }
    ]
    return {
      productId: JSON.stringify(productId),
      divisions: JSON.stringify(divisions),
      totalPageCount: 3
    }
  }

  /**
   * GET 料金プラン登録画面
   */
  @Get('/:productId/regist')
  @Render('divisions/regist')
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
}

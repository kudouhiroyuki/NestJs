import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('divisions')
export class DivisionsController {
  /**
   * GET 料金区分（一覧画面）
   */
  @Get('/:productId/reference')
  @Render('divisions/reference')
  async getReference(@Param('productId') productId: string, @Query() query: any) {
    console.log('料金区分（一覧画面）')
    console.log(query)
    console.log('商品ID:' + productId)
    // 一覧データ
    const divisions = [
      {
        divisionId: '1',
        divisionName: '料金区分A',
        adult: '1000',
        matchmaker: '1000',
        child: '1000',
        infant: '1000',
        senior: '1000'
      },
      {
        divisionId: '2',
        divisionName: '料金区分B',
        adult: '1000',
        matchmaker: '1000',
        child: '1000',
        infant: '1000',
        senior: '1000'
      }
    ]
    // マスターデータ（年齢区分）
    const ages = [{ name: '大人' }, { name: '中人' }, { name: '小人' }, { name: '幼児' }, { name: 'シニア' }]
    return {
      productId: JSON.stringify(productId),
      divisions: JSON.stringify(divisions),
      ages: JSON.stringify(ages),
      totalPageCount: 3
    }
  }

  /**
   * GET 料金区分（登録画面）
   */
  @Get('/:productId/regist')
  @Render('divisions/regist')
  async getRegist(@Param('productId') productId: string) {
    // 料金区分データ（新規）
    const divisions = [
      {
        age_id: '1',
        ageName: '大人',
        price: '',
        originalPrice: '',
        discountRate: ''
      },
      {
        age_id: '2',
        ageName: '中人',
        price: '',
        originalPrice: ''
      },
      {
        age_id: '3',
        ageName: '小人',
        price: '',
        originalPrice: ''
      },
      {
        age_id: '4',
        ageName: '幼児',
        price: '',
        originalPrice: ''
      },
      {
        age_id: '5',
        ageName: 'シニア',
        price: '',
        originalPrice: ''
      }
    ]
    return {
      productId: JSON.stringify(productId),
      divisionId: null,
      divisions: JSON.stringify(divisions)
    }
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

  /**
   * GET 料金区分（詳細画面）
   */
  @Get('/:productId/detail/:divisionId')
  @Render('divisions/regist')
  async getDetail(@Param('productId') productId: string, @Param('divisionId') divisionId: string) {
    // 料金区分データ（詳細）
    const divisions = [
      {
        age_id: '1',
        ageName: '大人',
        price: '1350',
        originalPrice: '1500',
        discountRate: '10%OFF'
      },
      {
        age_id: '2',
        ageName: '中人',
        price: '',
        originalPrice: '',
        discountRate: ''
      },
      {
        age_id: '3',
        ageName: '小人',
        price: '',
        originalPrice: '',
        discountRate: ''
      },
      {
        age_id: '4',
        ageName: '幼児',
        price: '',
        originalPrice: '',
        discountRate: ''
      },
      {
        age_id: '5',
        ageName: 'シニア',
        price: '',
        originalPrice: '',
        discountRate: ''
      }
    ]
    return {
      productId: JSON.stringify(productId),
      divisionId: JSON.stringify(divisionId),
      divisions: JSON.stringify(divisions)
    }
  }
  /**
   * POST 料金区分（更新処理）
   */
  @Post('/:productId/detail/:divisionId')
  @Redirect()
  async postDetail(@Param('productId') productId: string, @Body() body: any) {
    console.log('料金区分（更新処理）')
    console.log(body)
    return { url: `http://localhost:3000/divisions/${productId}/reference` }
  }
}

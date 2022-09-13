import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('inventorys')
export class InventorysController {
  /**
   * GET 在庫（一覧画面）
   */
  @Get('/reference')
  @Render('inventorys/reference')
  async getReference(@Query() query: any) {
    console.log('在庫（一覧画面）')
    console.log(query)
    // 一覧データ
    const inventorys = [
      {
        productId: '1001',
        inventoryId: '1',
        inventoryName: '在庫A',
        inventoryKind: '在庫管理種別'
      },
      {
        productId: '1002',
        inventoryId: '2',
        inventoryName: '在庫B',
        inventoryKind: '在庫管理種別'
      }
    ]
    return {
      inventorys: JSON.stringify(inventorys),
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

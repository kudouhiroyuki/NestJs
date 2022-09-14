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
   * GET 在庫（登録画面）
   */
  @Get('/:productId/regist')
  @Render('inventorys/regist')
  async getRegist(@Param('productId') productId: string) {
    // 在庫データ
    const inventorys = [
      {
        id: '1',
        start: '2022-09-05',
        end: '2022-09-05',
        priority: '1',
        feeId: '1',
        sum: '20'
      },
      {
        id: '2',
        start: '2022-09-08',
        end: '2022-09-08',
        priority: '1',
        feeId: '1',
        sum: '50'
      },
      {
        id: '3',
        start: '2022-10-23',
        end: '2022-10-23',
        priority: '1',
        feeId: '3',
        sum: '30'
      }
    ]
    return {
      productId: JSON.stringify(productId),
      inventoryId: null,
      inventorys: JSON.stringify(inventorys)
    }
  }
  /**
   * POST 在庫（登録処理）
   */
  @Post('/:productId/regist')
  @Redirect()
  async postRegist(@Param('productId') productId: string, @Body() body: any) {
    console.log('在庫（登録処理）')
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

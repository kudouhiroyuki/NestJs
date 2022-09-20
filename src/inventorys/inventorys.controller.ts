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
    // マスターデータ（時間間隔）
    const timeIntervals = [
      { intervalId: '1', intervalName: '15分' },
      { intervalId: '2', intervalName: '30分' },
      { intervalId: '3', intervalName: '60分' }
    ]
    // マスターデータ（時間帯）
    const timeZones = [
      { intervalId: '1', zoneId: '1', zoneName: '0:00 - 0:15' },
      { intervalId: '1', zoneId: '2', zoneName: '0:15 - 0:30' },
      { intervalId: '1', zoneId: '3', zoneName: '0:30 - 0:45' },
      { intervalId: '1', zoneId: '4', zoneName: '0:45 - 1:00' },
      { intervalId: '3', zoneId: '1', zoneName: '0:00 - 1:00' },
      { intervalId: '3', zoneId: '2', zoneName: '1:00 - 2:00' },
      { intervalId: '3', zoneId: '3', zoneName: '2:00 - 3:00' },
      { intervalId: '3', zoneId: '4', zoneName: '3:00 - 4:00' }
    ]
    return {
      productId: JSON.stringify(productId),
      inventoryId: null,
      timeIntervals: JSON.stringify(timeIntervals),
      timeZones: JSON.stringify(timeZones),
      inventorys: []
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
   * GET 在庫（詳細画面）
   */
  @Get('/:productId/detail/:divisionId')
  @Render('inventorys/regist')
  async getDetail(@Param('productId') productId: string, @Param('divisionId') divisionId: string) {
    // マスターデータ（時間間隔）
    const timeIntervals = [
      { intervalId: '1', intervalName: '15分' },
      { intervalId: '2', intervalName: '30分' },
      { intervalId: '3', intervalName: '60分' }
    ]
    // マスターデータ（時間帯）
    const timeZones = [
      { intervalId: '1', zoneId: '1', zoneName: '0:00 - 0:15' },
      { intervalId: '1', zoneId: '2', zoneName: '0:15 - 0:30' },
      { intervalId: '1', zoneId: '3', zoneName: '0:30 - 0:45' },
      { intervalId: '1', zoneId: '4', zoneName: '0:45 - 1:00' },
      { intervalId: '3', zoneId: '1', zoneName: '0:00 - 1:00' },
      { intervalId: '3', zoneId: '2', zoneName: '1:00 - 2:00' },
      { intervalId: '3', zoneId: '3', zoneName: '2:00 - 3:00' },
      { intervalId: '3', zoneId: '4', zoneName: '3:00 - 4:00' }
    ]
    // 在庫データ
    const inventorys = [
      {
        id: '1',
        date: '2022-09-05',
        intervalId: '1',
        timeInventory: [
          { zoneId: '1', inventory: '1' },
          { zoneId: '2', inventory: '2' },
          { zoneId: '3', inventory: '3' },
          { zoneId: '4', inventory: '4' }
        ]
      },
      {
        id: '2',
        date: '2022-09-08',
        intervalId: '3',
        timeInventory: [
          { zoneId: '1', inventory: '5' },
          { zoneId: '2', inventory: '6' },
          { zoneId: '3', inventory: '7' },
          { zoneId: '4', inventory: '8' }
        ]
      }
    ]
    return {
      productId: JSON.stringify(productId),
      inventoryId: null,
      timeIntervals: JSON.stringify(timeIntervals),
      timeZones: JSON.stringify(timeZones),
      inventorys: JSON.stringify(inventorys)
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

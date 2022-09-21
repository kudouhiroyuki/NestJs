import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('maintenance')
export class MaintenanceController {
  /**
   * GET メンテナンス設定（TOP画面）
   */
  @Get('/')
  @Render('maintenance/index')
  async getIndex() {
    const tenants = [
      { tenantId: '1', tenantName: 'ふじやま温泉1' },
      { tenantId: '2', tenantName: 'ふじやま温泉2' },
      { tenantId: '3', tenantName: 'ふじやま温泉3' }
    ]
    const vigors = [
      { id: '1', name: '決済サービス1' },
      { id: '2', name: '決済サービス2' },
      { id: '3', name: '決済サービス3' }
    ]
    const maintenances = [
      {
        id: '1',
        subject: 'システムメンテナンス',
        tenantId: '',
        tenantName: '',
        vigorId: '',
        vigorName: '',
        startDate: '2022/00/00  00:00',
        endDate: '2022/00/00  00:00'
      },
      {
        id: '2',
        subject: 'テナントメンテナンス',
        tenantId: '1',
        tenantName: 'ふじやま温泉1',
        vigorId: '',
        vigorName: '',
        startDate: '2022/00/00  00:00',
        endDate: '2022/00/00  00:00'
      },
      {
        id: '3',
        subject: '機能メンテナンス',
        tenantId: '',
        tenantName: '',
        vigorId: '3',
        vigorName: '決済サービス3',
        startDate: '2022/00/00  00:00',
        endDate: '2022/00/00  00:00'
      }
    ]
    return {
      tenants: JSON.stringify(tenants),
      vigors: JSON.stringify(vigors),
      maintenances: JSON.stringify(maintenances)
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
}

import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('maintenances')
export class MaintenancesController {
  /**
   * GET メンテナンス設定画面
   */
  @Get('/')
  @Render('maintenances/index')
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
        startDate: '2022/03/01  00:00',
        endDate: '2022/04/01  00:00'
      },
      {
        id: '2',
        subject: 'テナントメンテナンス',
        tenantId: '1',
        tenantName: 'ふじやま温泉1',
        vigorId: '',
        vigorName: '',
        startDate: '2022/03/01  00:00',
        endDate: '2022/04/01  00:00'
      },
      {
        id: '3',
        subject: '機能メンテナンス',
        tenantId: '',
        tenantName: '',
        vigorId: '3',
        vigorName: '決済サービス3',
        startDate: '2023/10/01  00:00',
        endDate: '2023/11/01  00:00'
      },
      {
        id: '4',
        subject: '機能メンテナンス',
        tenantId: '',
        tenantName: '',
        vigorId: '4',
        vigorName: '決済サービス3',
        startDate: '2023/10/01  00:00',
        endDate: '2023/11/01  00:00'
      },
      {
        id: '5',
        subject: '機能メンテナンス',
        tenantId: '',
        tenantName: '',
        vigorId: '5',
        vigorName: '決済サービス3',
        startDate: '2023/10/01  00:00',
        endDate: '2023/11/01  00:00'
      }
    ]
    return {
      tenants: JSON.stringify(tenants),
      vigors: JSON.stringify(vigors),
      maintenances: JSON.stringify(maintenances),
      totalPageCount: 3
    }
  }
  /**
   * POST メンテナンス設定（登録処理）
   */
  @Post('/regist')
  @Redirect()
  async postRegist(@Body() body: any) {
    console.log('メンテナンス設定（登録処理）')
    console.log(body)
    return { url: `http://localhost:3000/maintenances` }
  }
  /**
   * POST メンテナンス設定（削除処理）
   */
  @Post('/delete/:id')
  @Redirect()
  async postDelete(@Param('id') id: string) {
    console.log('メンテナンス設定（削除処理）')
    console.log(id)
    return { url: `http://localhost:3000/maintenances` }
  }
}

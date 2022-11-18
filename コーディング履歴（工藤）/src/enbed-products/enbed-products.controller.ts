import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common';

@Controller('enbedProducts')
export class EnbedProductsController {
  /**
   * GET 組込商品設定 登録画面
   */
  @Get('/regist')
  @Render('enbed-products/regist')
  async getRegist() {
    const products = [
      {
        productId: '1001',
        product_name: 'A商品',
        planId: '1001',
        plan_name: 'プラン(1001)',
        stock_setting_handover: true,
        stock_setting_management: 'dmp',
        stockId: '1001',
        stock_name: '在庫(1001)',
        peggingSettings: [{ name: '紐付設定A(1001)' }, { name: '紐付設定B(1001)' }],
        tenant_name: 'テナント名'
      },
      {
        productId: '1002',
        product_name: 'B商品',
        planId: '1002',
        plan_name: 'プラン(1002)',
        stock_setting_handover: true,
        stock_setting_management: 'dmp',
        stockId: '1002',
        stock_name: '在庫(1002)',
        peggingSettings: [{ name: '紐付設定A(1002)' }, { name: '紐付設定B(1002)' }],
        tenant_name: 'テナント名'
      },
      {
        productId: '1003',
        product_name: 'C商品',
        planId: '1003',
        plan_name: 'プラン(1003)',
        stock_setting_handover: true,
        stock_setting_management: 'dmp',
        stockId: '1003',
        stock_name: '在庫(1003)',
        peggingSettings: [{ name: '紐付設定A(1003)' }, { name: '紐付設定B(1003)' }],
        tenant_name: 'テナント名'
      }
    ]
    const ages = [{ name: '大人' }, { name: '中人' }, { name: '小人' }, { name: '幼児' }, { name: 'シニア' }]
    return {
      products: JSON.stringify(products),
      ages: JSON.stringify(ages)
    }
  }
  /**
   * POST 保存して次へ処理（リダイレクト 商品料金設定）
   */
  @Post('/productFeePlans')
  async redirectProductFeePlans(@Res() res: any, @Body() body: any) {
    console.log('保存して次へ処理')
    console.log(body)
    const productCode = '1003'
    return res.redirect(`/productFeePlans/regist?productCode=${productCode}`)
  }

  /**
   * GET 組込商品設定 詳細画面
   */
  @Get('/detail/:id')
  @Render('enbed-products/regist')
  async getDetail() {
    return {}
  }
}

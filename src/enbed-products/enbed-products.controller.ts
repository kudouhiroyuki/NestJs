import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common';

@Controller('enbedProducts')
export class EnbedProductsController {
  /**
   * GET 組込商品設定 登録画面
   */
  @Get('/regist')
  @Render('enbed-products/regist')
  async getRegist() {
    return {}
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

import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('enbedProducts')
export class EnbedProductsController {
  /**
   * GET 組込商品設定
   */
  @Get('/regist')
  @Render('enbed-products/index')
  async getRegist() {
    return {}
  }

  /**
   * GET 組込商品設定 詳細画面
   */
  @Get('/detail/:id')
  @Render('enbed-products/index')
  async getDetail() {
    return {}
  }
}

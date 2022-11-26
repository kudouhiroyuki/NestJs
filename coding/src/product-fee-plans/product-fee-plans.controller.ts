import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('productFeePlans')
export class ProductFeePlansController {
  /**
   * GET 料金プラン 照会画面
   */
  @Get('/')
  @Render('product-fee-plans/index')
  async getIndex() {
    return {}
  }

  /**
   * GET 料金プラン 登録画面
   */
  @Get('/regist')
  @Render('product-fee-plans/regist')
  async getRegist() {
    return {}
  }

  /**
   * GET 料金プラン 詳細画面
   */
  @Get('/detail/:id')
  @Render('product-fee-plans/regist')
  async getDetail() {
    return {}
  }
}

import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /**
  * GET	商品一覧画面
  */
  @Get('/reference')
  @Render('products/reference')
  async index() {
  }
}
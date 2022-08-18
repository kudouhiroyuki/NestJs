import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /**
  * GET	商品一覧画面
  */
  @Get('/reference')
  @Render('products/reference')
  async index(@Query() query: any) {
    console.log("商品一覧画面:query")
    console.log(query)
    const products = [
      { path: "/images/icon/products_item.svg", id: "1111", name: "商品A", date: "2022/08/01 - 2023/02/15" },
      { path: "/images/icon/products_item.svg", id: "2222", name: "商品B", date: "2022/08/01 - 2023/02/15" },
    ]
    return {
      products: JSON.stringify(products),
      total_page_count: 3
    };
  }
}
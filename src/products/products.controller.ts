import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /**
   * GET	商品一覧画面
   */
  @Get('/reference')
  @Render('products/reference')
  async getReference(@Query() query: any) {
    console.log('商品一覧画面:query')
    console.log(query)
    const products = [
      {
        path: '/images/icon/products_item.svg',
        id: 1111,
        name: '商品A',
        date: '2022/08/01 - 2023/02/15'
      },
      {
        path: '/images/icon/products_item.svg',
        id: '2222',
        name: '商品B',
        date: '2022/08/01 - 2023/02/15'
      }
    ]
    return {
      products: JSON.stringify(products),
      total_page_count: 3
    }
  }

  /**
   * GET	商品登録画面（単体）
   */
  @Get('/regist')
  @Render('products/regist')
  async getRegist() {
    const stock_dmps = [
      { id: '1', name: '1******01: ○○チケット' },
      { id: '2', name: '1******02: ○○チケット' },
      { id: '3', name: '1******03: ○○チケット' }
    ]
    const ages = [{ name: '大人' }, { name: '中人' }, { name: '小人' }, { name: '幼児' }, { name: 'シニア' }]
    const tenants = [
      { id: '1001', name: '施設１' },
      { id: '1002', name: '施設２' },
      { id: '1003', name: '施設３' }
    ]
    const tags = [{ text: 'チケット' }, { text: '宿泊' }, { text: '室内' }]
    return {
      stock_dmps: JSON.stringify(stock_dmps),
      ages: JSON.stringify(ages),
      tenants: JSON.stringify(tenants),
      tags: JSON.stringify(tags)
    }
  }
  /**
   * POST 商品登録処理（単体）
   */
  @Post('regist')
  @Redirect('http://localhost:3000/products/reference')
  async postRegist(@Body() body: any) {
    console.log('商品登録処理（単体）')
    console.log(body)
  }

  /**
   * GET	商品登録画面（セット）
   */
  @Get('/regist-set')
  @Render('products/registSet')
  async getRegistSet() {
    const stock_dmps = [
      { id: '1', name: '1******01: ○○チケット' },
      { id: '2', name: '1******02: ○○チケット' },
      { id: '3', name: '1******03: ○○チケット' }
    ]
    const ages = [{ name: '大人' }, { name: '中人' }, { name: '小人' }, { name: '幼児' }, { name: 'シニア' }]
    const age_relations = [{ name: '大人' }, { name: '高校生' }, { name: '中学生以下' }]
    const products = [
      {
        product_id: '1001',
        product_name: 'A商品',
        plan_id: '1111',
        plan_name: 'プランA',
        stock_setting_handover: true,
        stock_setting_management: 'dmp',
        stock_id: '1111',
        stock_name: '在庫A',
        age_category: '中人',
        tenant_name: 'テナント名'
      },
      {
        product_id: '1001',
        product_name: 'B商品',
        plan_id: '2222',
        plan_name: 'プランB-1',
        stock_setting_handover: true,
        stock_setting_management: 'dmp',
        stock_id: '2222',
        stock_name: '在庫B-1',
        age_category: '大人',
        tenant_name: 'テナント名'
      },
      {
        product_id: '1001',
        product_name: 'B商品',
        plan_id: '2222',
        plan_name: 'プランB-2',
        stock_setting_handover: true,
        stock_setting_management: 'dmp',
        stock_id: '2222',
        stock_name: '在庫B-2',
        age_category: '小人',
        tenant_name: 'テナント名'
      }
    ]
    const tenants = [
      { id: '1001', name: '施設１' },
      { id: '1002', name: '施設２' },
      { id: '1003', name: '施設３' }
    ]
    const tags = [{ text: 'チケット' }, { text: '宿泊' }, { text: '室内' }]
    return {
      stock_dmps: JSON.stringify(stock_dmps),
      ages: JSON.stringify(ages),
      age_relations: JSON.stringify(age_relations),
      products: JSON.stringify(products),
      tenants: JSON.stringify(tenants),
      tags: JSON.stringify(tags)
    }
  }
  /**
   * POST 商品登録処理（セット）
   */
  @Post('regist-set')
  @Redirect('http://localhost:3000/products/reference')
  async postRegistSet(@Body() body: any) {
    console.log('商品登録処理（単体）')
    console.log(body)
  }
}

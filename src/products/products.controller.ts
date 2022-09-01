import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /**
   * GET 商品一覧画面
   */
  @Get('/reference')
  @Render('products/reference')
  async getReference(@Query() query: any) {
    console.log('商品一覧画面:query')
    console.log(query)
    const products = [
      {
        status: '1',
        type: 'product',
        path: '/images/icon/products_item.svg',
        id: '1001',
        name: '単体商品',
        date: '2022/08/01 - 2023/02/15'
      },
      {
        status: '1',
        type: 'setProduct',
        path: '/images/icon/products_item.svg',
        id: '1002',
        name: 'セット商品',
        date: '2022/08/01 - 2023/02/15',
      }
    ]
    return {
      products: JSON.stringify(products),
      total_page_count: 3
    }
  }

  /**
   * GET 商品登録画面（単体）
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
   * GET 商品詳細画面（単体）
   */
  @Get('/detail')
  @Render('products/detail')
  async getDetail() {
    // マスターデータ（基本情報 在庫管理 DMP在庫管理）
    const stock_dmps = [
      { id: '1', name: '1******01: ○○チケット' },
      { id: '2', name: '1******02: ○○チケット' },
      { id: '3', name: '1******03: ○○チケット' }
    ]
    // マスターデータ（年齢区分）
    const ages = [{ name: '大人' }, { name: '中人' }, { name: '小人' }, { name: '幼児' }, { name: 'シニア' }]
    // マスターデータ（利用方法 利用施設）
    const tenants = [
      { id: '1001', name: '施設１' },
      { id: '1002', name: '施設２' },
      { id: '1003', name: '施設３' }
    ]
    // マスターデータ（商品タグ）
    const tags = [{ text: 'チケット' }, { text: '宿泊' }, { text: '室内' }]
    // 商品詳細データ
    const forms = {
      status: '1',
      type: 'product',
      productName: '商品名',
      productExplanation: '商品説明',
      salesKindType: '4',
      salesKindFrom: '2022/08/31',
      salesKindTo: '2022/09/01',
      salesKindInterval: '15',
      stockManagementType: '3',
      stockManagementItem: { id: '2', name: '1******02: ○○チケット' },
      displayPeriodFrom: '2022/08/31',
      displayPeriodTo: '2022/09/01',
      displayPeriodStop: true,
      displaySalesFrom: '2022/08/31',
      displaySalesTo: '2022/09/01',
      displaySalesStop: true,
      ageCategory: [{ name: '大人' }, { name: '中人' }],
      usageMethodType: '5',
      usageMethodItem: ['QR読込1', 'QR読込2'],
      usagePeriodType: '1',
      usagePeriodFrom: '2022/08/31',
      usagePeriodTo: '2022/09/01',
      tenantsUsed: [{ id: '1003', name: '施設３' }],
      productTag: [{ text: 'チケット' }, { text: '宿泊' }],
      images: [
        {
          path: 'data:image/png;base64,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'
        }
      ]
    }
    return {
      stock_dmps: JSON.stringify(stock_dmps),
      ages: JSON.stringify(ages),
      tenants: JSON.stringify(tenants),
      tags: JSON.stringify(tags),
      forms: JSON.stringify(forms)
    }
  }

  /**
   * GET 商品登録画面（セット）
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
    const tenants = [
      { id: '1001', name: '施設１' },
      { id: '1002', name: '施設２' },
      { id: '1003', name: '施設３' }
    ]
    const tags = [{ text: 'チケット' }, { text: '宿泊' }, { text: '室内' }]
    return {
      stock_dmps: JSON.stringify(stock_dmps),
      ages: JSON.stringify(ages),
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

  /**
   * GET 商品詳細画面（セット）
   */
  @Get('/detail-set')
  @Render('products/detailSet')
  async getDetailSet() {
    return {}
  }
}

import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /**
   * GET 商品照会画面
   */
  @Get('/')
  @Render('products/index')
  async getIndex(@Query() query: any) {
    console.log('商品一覧画面:query')
    console.log(query)
    const products = [
      {
        status: '1',
        type: 'product',
        path: '/images/icon/products_item.svg',
        productCode: '1001',
        productName: '単体商品',
        isSoldStatus: '販売ステータス',
        saleFromDatetime: '2022/08/01',
        saleToDatetime: '2023/02/15'
      },
      {
        status: '1',
        type: 'setProduct',
        path: '/images/icon/products_item.svg',
        productCode: '1002',
        productName: 'セット商品',
        isSoldStatus: '販売ステータス',
        saleFromDatetime: '2022/08/01',
        saleToDatetime: '2023/02/15'
      }
    ]
    return {
      products: JSON.stringify(products),
      totalPageCount: 3
    }
  }

  /**
   * GET 商品登録画面（単体）
   */
  @Get('/regist')
  @Render('products/regist')
  async getRegist(@Query() query: any) {
    return this.createdRegistTemplate(query)
  }
  /**
   * GET 商品登録画面（セット）
   */
  @Get('/registSet')
  @Render('products/regist')
  async getRegistSet(@Query() query: any) {
    return this.createdRegistTemplate(query)
  }
  /**
   * POST 商品登録処理（単体・セット）
   */
  @Post('/regist')
  @Redirect('http://localhost:3000/products')
  async postRegist(@Body() body: any) {
    console.log('商品登録処理')
    console.log(body)
  }
  /**
   * 共通テンプレート（商品登録）
   */
  createdRegistTemplate(query: any) {
    // DMP管理者
    const isAdmin = true
    // 商品タグ
    const productTags = [
      { id: '1', tagString: 'チケット' },
      { id: '2', tagString: '宿泊' },
      { id: '3', tagString: '室内' }
    ]
    // おすすめ商品（カート画面）
    const cartRecommendTags = [
      { id: '1', tagString: 'カートAクーポン' },
      { id: '2', tagString: 'カートBクーポン' },
      { id: '3', tagString: 'カートCクーポン' }
    ]
    // おすすめ商品（注文完了画面）
    const orderRecommendTags = [
      { id: '1', tagString: '注文Aクーポン' },
      { id: '2', tagString: '注文Bクーポン' },
      { id: '3', tagString: '注文Cクーポン' }
    ]
    // コピー商品
    let forms = {}
    if (query.productCode) {
      forms = {
        // 基本情報
        productCode: '',
        productName: '単体商品',
        explain: '商品説明',
        notes: '注意事項',
        displayFromDatetime: '2022/11/30 00:00',
        displayToDatetime: '2022/12/01 00:00',
        isDisplayedStatus: true,
        saleFromDatetime: '2022/11/30 00:00',
        saleToDatetime: '2022/12/01 00:00',
        isSoldStatus: true,
        liquidateDate: '10',
        liquidateTime: '00:00',
        serviceCommissionPercentage: '100',
        productTag: [{ id: '1', tagString: 'チケット' }],
        productImage: [
          {
            id: '1',
            path: 'data:image/png;base64,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'
          }
        ],
        cartRecommendTag: [{ id: '1', tagString: 'カートAクーポン' }],
        orderRecommendTag: [{ id: '1', tagString: '注文Aクーポン' }],
        usageType: '日付指定',
        usageOpenQuantity: '',
        canChangeUseDate: true,
        useDateChangeFeeType: '固定',
        useDateChangeFee: '1000',
        usePeriodElement: '日付指定',
        useFromDatetime: '2022/11/30',
        useToDatetime: '2022/11/30',
        useLimitHours: '',
        useWayElement: '顔認証',
        usePathElement: 'フリーパス区分',
        howToUse: '利用説明',
        isUsedPaypay: false,
        isUsedStore: true,
        storePaymentCommission: '1000',
        storePaymentLimitHours: '1',
        canOrderCancel: true,
        cancelFeeType: '旅行キャンセル',
        cancelFeeFix: '',
        cancelFee1: '1',
        cancelFee2: '2',
        cancelFee3: '3',
        cancelFee4: '4',
        cancelFee5: '5',
        cancelPolicy: 'キャンセルポリシー',
        productAgetype: [
          {
            ageElementDisplayName: '年齢区分1',
            integrationParameter: 'パラメータ1'
          },
          {
            ageElementDisplayName: '年齢区分2',
            integrationParameter: 'パラメータ2'
          }
        ]
      }
    }
    return {
      isAdmin: JSON.stringify(isAdmin),
      productTags: JSON.stringify(productTags),
      cartRecommendTags: JSON.stringify(cartRecommendTags),
      orderRecommendTags: JSON.stringify(orderRecommendTags),
      forms: JSON.stringify(forms)
    }
  }

  /**
   * GET 商品詳細画面（単体）
   */
  @Get('/detail/:id')
  @Render('products/regist')
  async getDetail() {
    return this.createdDetailTemplate()
  }
  /**
   * GET 商品詳細画面（セット）
   */
  @Get('/detailSet/:id')
  @Render('products/regist')
  async getDetailSet() {
    return this.createdDetailTemplate()
  }
  /**
   * 共通テンプレート（商品詳細）
   */
  createdDetailTemplate() {
    // DMP管理者
    const isAdmin = true
    // 商品タグ
    const productTags = [
      { id: '1', tagString: 'チケット' },
      { id: '2', tagString: '宿泊' },
      { id: '3', tagString: '室内' }
    ]
    // おすすめ商品（カート画面）
    const cartRecommendTags = [
      { id: '1', tagString: 'カートAクーポン' },
      { id: '2', tagString: 'カートBクーポン' },
      { id: '3', tagString: 'カートCクーポン' }
    ]
    // おすすめ商品（注文完了画面）
    const orderRecommendTags = [
      { id: '1', tagString: '注文Aクーポン' },
      { id: '2', tagString: '注文Bクーポン' },
      { id: '3', tagString: '注文Cクーポン' }
    ]
    return {
      isAdmin: JSON.stringify(isAdmin),
      productTags: JSON.stringify(productTags),
      cartRecommendTags: JSON.stringify(cartRecommendTags),
      orderRecommendTags: JSON.stringify(orderRecommendTags),
      forms: JSON.stringify({
        // 基本情報
        productCode: '1001',
        productName: '単体商品',
        explain: '商品説明',
        notes: '注意事項',
        displayFromDatetime: '2022/11/30 00:00',
        displayToDatetime: '2022/12/01 00:00',
        isDisplayedStatus: true,
        saleFromDatetime: '2022/11/30 00:00',
        saleToDatetime: '2022/12/01 00:00',
        isSoldStatus: true,
        liquidateDate: '10',
        liquidateTime: '00:00',
        serviceCommissionPercentage: '100',
        productTag: [{ id: '1', tagString: 'チケット' }],
        productImage: [
          {
            id: '1',
            path: 'data:image/png;base64,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'
          }
        ],
        cartRecommendTag: [{ id: '1', tagString: 'カートAクーポン' }],
        orderRecommendTag: [{ id: '1', tagString: '注文Aクーポン' }],
        usageType: '日付指定',
        usageOpenQuantity: '',
        canChangeUseDate: true,
        useDateChangeFeeType: '固定',
        useDateChangeFee: '1000',
        usePeriodElement: '日付指定',
        useFromDatetime: '2022/11/30',
        useToDatetime: '2022/11/30',
        useLimitHours: '',
        useWayElement: '顔認証',
        usePathElement: 'フリーパス区分',
        howToUse: '利用説明',
        isUsedPaypay: false,
        isUsedStore: true,
        storePaymentCommission: '1000',
        storePaymentLimitHours: '1',
        canOrderCancel: true,
        cancelFeeType: '旅行キャンセル',
        cancelFeeFix: '',
        cancelFee1: '1',
        cancelFee2: '2',
        cancelFee3: '3',
        cancelFee4: '4',
        cancelFee5: '5',
        cancelPolicy: 'キャンセルポリシー',
        productAgetype: [
          {
            ageElementDisplayName: '年齢区分1',
            integrationParameter: 'パラメータ1'
          },
          {
            ageElementDisplayName: '年齢区分2',
            integrationParameter: 'パラメータ2'
          }
        ]
      })
    }
  }
}

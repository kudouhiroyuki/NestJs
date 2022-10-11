import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  /**
   * GET 注文照会画面
   */
  @Get('/')
  @Render('orders/index')
  async getIndex(@Query() query: any) {
    console.log(query)
    const orders = [
      {
        id: '0001',
        fullName: 'アカウントグループA'
      },
      {
        id: '0002',
        fullName: 'アカウントグループA'
      }
    ]
    return {
      orders: JSON.stringify(orders),
      totalPageCount: 3
    }
  }

  /**
   * GET 注文詳細画面
   */
  @Get('detail/:id')
  @Render('orders/regist')
  async getDetail() {
    // 注文詳細
    const forms = {
      transactionId: '101',
      transactionStatus: '購入完了',
      transactionDatetime: '2022/06/01 20:00:00',
      purchaseTenant: '富士五湖汽船',
      paymentWayType: 'クレジットカード',
      totalFee: '6900',
      tenantCouponApplyFee: '500',
      dmpCouponApplyFee: '640',
      storePaymentCommission: '1000',
      orderInformations: [
        {
          id: '1234',
          useDate: '2022/09/01',
          productName: 'Vクーポン（商品ID:111 / 商品コード:1111）',
          ageElement: '大人',
          purchaseQty: '1',
          saleUnitPrice: '4500',
          orderStatus: '0',
          orderStatusUpdateDatetime: '0'
        },
        {
          id: '1235',
          useDate: '2022/09/01',
          productName: 'さがみ湖プレジャーフォレスト フリーパス（商品ID:222 / 商品コード:2222）',
          ageElement: '大人',
          purchaseQty: '1',
          saleUnitPrice: '4500',
          orderStatus: '0',
          orderStatusUpdateDatetime: '0'
        }
      ]
    }
    return {
      forms: JSON.stringify(forms)
    }
  }

  /**
   * GET 部分キャンセル商品選択画面
   */
  @Get('partialCancell/:id')
  @Render('orders/partialCancell')
  async getPartialCancell() {
    // 注文詳細
    const forms = {
      transactionId: '101',
      transactionStatus: '購入完了',
      transactionDatetime: '2022/06/01 20:00:00',
      purchaseTenant: '富士五湖汽船',
      paymentWayType: 'クレジットカード',
      totalFee: '6900',
      tenantCouponApplyFee: '500',
      dmpCouponApplyFee: '640',
      storePaymentCommission: '1000',
      orderInformations: [
        {
          id: '1234',
          useDate: '2022/09/01',
          productName: 'Vクーポン（商品ID:111 / 商品コード:1111）',
          ageElement: '大人',
          purchaseQty: '1',
          saleUnitPrice: '4500',
          orderStatus: '0',
          orderStatusUpdateDatetime: '0'
        },
        {
          id: '1235',
          useDate: '2022/09/01',
          productName: 'さがみ湖プレジャーフォレスト フリーパス（商品ID:222 / 商品コード:2222）',
          ageElement: '大人',
          purchaseQty: '1',
          saleUnitPrice: '4500',
          orderStatus: '0',
          orderStatusUpdateDatetime: '0'
        }
      ]
    }
    return {
      forms: JSON.stringify(forms)
    }
  }
}

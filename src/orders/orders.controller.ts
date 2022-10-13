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
    // マスターデータ（ステータス）
    const statuss = [
      { id: '0', name: 'カートイン（在庫確保）' },
      { id: '1', name: '注文内容確定（支払直前）' },
      { id: '2', name: '支払確認待（コンビニのみ）' },
      { id: '3', name: '支払確認中（カード、PayPay）' },
      { id: '4', name: '購入完了' },
      { id: '5', name: 'キャンセル' },
      { id: '6', name: '取引中断' },
    ]
    const orders = [
      {
        transactionId: '101',
        transactionStatus: '購入完了',
        transactionDatetime: '2022/00/00',
        familyName: '山田',
        firstName: '太郎',
        telephone: '111-2222-3333',
        email: 'yamada@abc.jp',
        useDate: '2022/09/01',
        enableLimitDatetime: '2022/00/00'
      },
      {
        transactionId: '102',
        transactionStatus: '購入完了',
        transactionDatetime: '2022/00/00',
        familyName: '山田',
        firstName: '太郎',
        telephone: '111-2222-3333',
        email: 'yamada@abc.jp',
        useDate: '2022/09/01',
        enableLimitDatetime: '2022/00/00'
      },
      {
        transactionId: '103',
        transactionStatus: '購入完了',
        transactionDatetime: '2022/00/00',
        familyName: '山田',
        firstName: '太郎',
        telephone: '111-2222-3333',
        email: 'yamada@abc.jp',
        useDate: '2022/09/01',
        enableLimitDatetime: '2022/00/00'
      },
      {
        transactionId: '104',
        transactionStatus: '購入完了',
        transactionDatetime: '2022/00/00',
        familyName: '山田',
        firstName: '太郎',
        telephone: '111-2222-3333',
        email: 'yamada@abc.jp',
        useDate: '2022/09/01',
        enableLimitDatetime: '2022/00/00'
      },
      {
        transactionId: '105',
        transactionStatus: '購入完了',
        transactionDatetime: '2022/00/00',
        familyName: '山田',
        firstName: '太郎',
        telephone: '111-2222-3333',
        email: 'yamada@abc.jp',
        useDate: '2022/09/01',
        enableLimitDatetime: '2022/00/00'
      }
    ]
    return {
      statuss: JSON.stringify(statuss),
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
      id: '101',
      transactionId: '101',
      transactionStatus: '購入完了',
      transactionDatetime: '2022/06/01 20:00:00',
      purchaseTenant: '富士五湖汽船',
      paymentWayType: 'クレジットカード',
      totalFee: '6900',
      tenantCouponApplyFee: '500',
      dmpCouponApplyFee: '640',
      storePaymentCommission: '1000',
      // 注文情報
      orderInformations: [
        {
          isProductedSet: false,
          orderId: '1234',
          useDate: '2022/09/01',
          productName: '単体商品',
          purchaseDetail: [
            {
              ageElement: '大人',
              purchaseQty: '1',
              saleUnitPrice: '4500'
            }
          ],
          orderStatus: '注文完了',
          orderStatusUpdateDatetime: '2022/08/01 20:00:00'
        },
        {
          isProductedSet: true,
          orderId: '1235',
          useDate: '2022/09/01',
          productName: 'セット商品',
          purchaseDetail: [
            {
              ageElement: '小人',
              purchaseQty: '1',
              saleUnitPrice: '1600'
            },
            {
              ageElement: '大人',
              purchaseQty: '1',
              saleUnitPrice: '800'
            }
          ],
          orderStatus: 'BOキャンセル依頼中',
          orderStatusUpdateDatetime: '2022/08/01 20:00:00'
        },
        {
          isProductedSet: true,
          orderId: '1236',
          productName: 'ホテル',
          hotel: 'ハイランドリゾート ホテル＆スパ',
          plan: '富士急ハイランドプラン',
          roomTypeCode: '遊園地ビュー・ダブル',
          checkInDate: '2022/09/01',
          checkInTime: '18:00:00',
          checkOutDate: '2022/09/01',
          roomCount: '1',
          purchaseDetail: [
            {
              ageElement: '大人',
              purchaseQty: '2',
              saleUnitPrice: '23500'
            }
          ],
          orderStatus: '注文完了',
          orderStatusUpdateDatetime: '2022/08/01 20:00:00'
        },
        {
          isProductedSet: true,
          orderId: '1237',
          productName: 'バス',
          routeOutbound: '新宿～富士五湖線',
          stoolNumberOutbound: '1401便',
          carNumberOutbound: '1号車',
          rideOutboundDate: '2022/08/23',
          rideBusStopOutbound: 'バスタ新宿（南口）',
          rideOutboundTime: '06:45',
          alightingBusStopOutbound: '富士急ハイランド',
          alightingOutboundTime: '08:25',
          seatOutbound: '1号車 05C,05D',
          routeReturn: '新宿～富士五湖線',
          stoolNumberReturn: '1406便',
          carNumberReturn: '',
          rideReturnDate: '2022/08/23',
          rideBusStopReturn: '富士急ハイランド',
          rideReturnTime: '12:58',
          alightingBusStopReturn: 'バスタ新宿（南口）',
          alightingReturnTime: '14:35',
          seatReturn: '1号車 05C,05D',
          purchaseDetail: [
            {
              ageElement: '大人',
              purchaseQty: '2',
              saleUnitPrice: '6000'
            }
          ],
          orderStatus: '注文完了',
          orderStatusUpdateDatetime: '2022/08/01 20:00:00'
        }
      ],
      // テナントクーポン情報
      tenantCoupon: [
        {
          couponName: '500円引きクーポン',
          couponId: 'C001',
          applyFee: '500',
          tenantBurdenFee: '500'
        }
      ],
      // DMPクーポン情報
      dmpCoupon: [
        {
          couponName: '10%引きクーポン',
          couponId: 'C111',
          applyFee: '640',
          dmpBurdenFee: '640'
        }
      ],
      // 購入者情報
      dmpMemberId: 'aaaaaaa',
      familyName: '山田',
      firstName: '太郎',
      familyNameKana: 'ヤマダ',
      firstNameKana: 'タロウ',
      telephone: '111-2222-3333',
      email: 'yamada@abc.jp',
      gender: '男性',
      birthDate: '1980/08/01',
      zipCode: '111-2222',
      prefecture: '千葉県',
      address: '船橋市本町7丁目'
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
      ],
      dmpMemberId: 'aaaaaaa'
    }
    return {
      forms: JSON.stringify(forms)
    }
  }
}

import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('members')
export class MembersController {
  /**
   * GET 会員照会画面
   */
  @Get('/')
  @Render('members/index')
  async getIndex(@Query() query: any) {
    let members = []
    let totalPageCount = 0
    if (Object.keys(query).length) {
      members = [
        {
          id: '1',
          memberId: 'I001',
          joinDate: '2020/04/01',
          seiKanji: '富士急',
          meiKanji: '太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        },
        {
          id: '2',
          memberId: 'I002',
          joinDate: '2020/04/01',
          seiKanji: '富士急',
          meiKanji: '太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        },
        {
          id: '3',
          memberId: 'I003',
          joinDate: '2020/04/01',
          seiKanji: '富士急',
          meiKanji: '太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        },
        {
          id: '4',
          memberId: 'I004',
          joinDate: '2020/04/01',
          seiKanji: '富士急',
          meiKanji: '太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        },
        {
          id: '5',
          memberId: 'I005',
          joinDate: '2020/04/01',
          seiKanji: '富士急',
          meiKanji: '太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        }
      ]
      totalPageCount = 3
    }
    return {
      members: JSON.stringify(members),
      totalPageCount: totalPageCount
    }
  }

  /**
   * GET 会員詳細画面
   */
  @Get('detail/:memberId')
  @Render('members/detail')
  async getDetail() {
    // 会員詳細データ
    const forms = {
      authority: true,
      membersId: 'I001',
      password: '000000',
      joinDate: '2020/04/01',
      seiKanji: '富士急',
      meiKanji: '太郎',
      seiKana: 'フジキュウ',
      meiKana: 'タロウ',
      mail: 'taro@fujiq.jp',
      tell: '01234567890',
      sex: '男性',
      dateBirth: '2000/08/01',
      postCode: '0000000',
      prefectures: '東京都',
      address: '○○区○○1-1-1',
      purchaseHistory: [
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        },
        {
          transactionDate: '2022/08/01 12:01:23',
          transactionId: '1111',
          purchaseTenant: '222:ふじやま温泉',
          productNumber: '2',
          paymentMethod: 'クレジットカード決済',
          totalAmount: '10000'
        }
      ]
    }
    return {
      forms: JSON.stringify(forms)
    }
  }

  /**
   * POST 会員詳細（登録処理）
   */
  @Post('detail/:memberId')
  @Redirect()
  async postDetail(@Body() body: any) {
    console.log('会員詳細（登録処理）')
    console.log(body)
    return { url: `http://localhost:3000/members` }
  }
}

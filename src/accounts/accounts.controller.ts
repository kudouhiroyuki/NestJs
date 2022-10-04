import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  /**
   * GET アカウントグループ照会画面
   */
  @Get('/')
  @Render('accounts/index')
  async getIndex(@Query() query: any) {
    console.log(query)
    const accounts = [
      {
        accountId: 'K001',
        seiKanji: '富士急',
        meiKanji: '太郎',
        mail: 'taro@fujiq.jp',
        privilegeRole: 'admin'
      },
      {
        accountId: 'K002',
        seiKanji: '富士急',
        meiKanji: '太郎',
        mail: 'taro@fujiq.jp',
        privilegeRole: 'user'
      },
      {
        accountId: 'K003',
        seiKanji: '富士急',
        meiKanji: '太郎',
        mail: 'taro@fujiq.jp',
        privilegeRole: 'user'
      },
      {
        accountId: 'K004',
        seiKanji: '富士急',
        meiKanji: '太郎',
        mail: 'taro@fujiq.jp',
        privilegeRole: 'user'
      },
      {
        accountId: 'K005',
        seiKanji: '富士急',
        meiKanji: '太郎',
        mail: 'taro@fujiq.jp',
        privilegeRole: 'user'
      }
    ]
    return {
      accounts: JSON.stringify(accounts),
      totalPageCount: 3
    }
  }

  /**
   * GET お知らせ登録画面（通常登録・コピー登録）
   */
  @Get('regist')
  @Render('accounts/regist')
  async getRegist(@Query() query: any) {
    let forms = {}
    if (Object.keys(query).length) {
      forms = {
        openRange: 'consumer',
        noticeTitle: '2022年4月1日以降の料金体制について',
        noticeBody: '本文本文本文本文本文本文本文',
        public: '1',
        dateType: '2',
        dateTime: '2022/08/09 03:36'
      }
    }
    return {
      forms: JSON.stringify(forms)
    }
  }
  /**
   * POST お知らせ登録処理
   */
  @Post('regist')
  @Redirect('http://localhost:3000/accounts')
  async postRegist(@Body() body: any) {
    console.log('お知らせ登録処理')
    console.log(body)
  }

  /**
   * GET	お知らせ詳細画面
   */
  @Get('detail/:id')
  @Render('accounts/regist')
  async getDetail() {
    // お知らせ詳細データ
    const forms = {
      noticeId: '1001',
      openRange: 'consumer',
      noticeTitle: '2022年4月1日以降の料金体制について',
      noticeBody: '本文本文本文本文本文本文本文',
      public: '1',
      dateType: '2',
      dateTime: '2022/08/09 03:36'
    }
    return {
      forms: JSON.stringify(forms)
    }
  }
}

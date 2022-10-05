import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  /**
   * GET アカウント照会画面
   */
  @Get('/')
  @Render('accounts/index')
  async getIndex(@Query() query: any) {
    let accounts = []
    let totalPageCount = 0
    if (Object.keys(query).length) {
      accounts = [
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
      totalPageCount = 3
    }
    return {
      accounts: JSON.stringify(accounts),
      totalPageCount: totalPageCount
    }
  }

  /**
   * GET アカウント登録画面
   */
  @Get('regist')
  @Render('accounts/regist')
  async getRegist() {
    // マスターデータ（アカウントグループ）
    const accountGroups = [
      {
        id: '1',
        accountGroupName: 'アカウントグループA'
      },
      {
        id: '2',
        accountGroupName: 'アカウントグループB'
      },
      {
        id: '3',
        accountGroupName: 'アカウントグループC'
      }
    ]
    // バックオフィスアカウントデータ（dmp・tenant）
    const backOfficeAccount = {
      accountStatus: 'dmp'
    }
    return {
      accountGroups: JSON.stringify(accountGroups),
      backOfficeAccount: JSON.stringify(backOfficeAccount),
      forms: JSON.stringify({})
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
   * GET	アカウント詳細画面
   */
  @Get('detail/:id')
  @Render('accounts/regist')
  async getDetail() {
    // マスターデータ（アカウントグループ）
    const accountGroups = [
      {
        id: '1',
        accountGroupName: 'アカウントグループA'
      },
      {
        id: '2',
        accountGroupName: 'アカウントグループB'
      },
      {
        id: '3',
        accountGroupName: 'アカウントグループC'
      }
    ]
    // バックオフィスアカウントデータ
    const backOfficeAccount = {
      accountStatus: 'dmp'
    }
    // アカウント詳細データ
    const forms = {
      accountId: 'K001',
      familyName: '富士急',
      firstName: '太郎',
      email: 'taro@fujiq.jp',
      affiliationCompany: '所属会社',
      department: '部署',
      isSystemAdmin: true,
      accountStatus: ''
    }
    return {
      accountGroups: JSON.stringify(accountGroups),
      backOfficeAccount: JSON.stringify(backOfficeAccount),
      forms: JSON.stringify(forms)
    }
  }
}

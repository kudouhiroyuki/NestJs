import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('accountGroups')
export class AccountGroupsController {
  /**
   * GET アカウントグループ照会画面
   */
  @Get('/')
  @Render('accountGroups/index')
  async getIndex(@Query() query: any) {
    console.log(query)
    const accountGroups = [
      {
        id: 'AG001',
        accountGroupName: 'アカウントグループA'
      },
      {
        id: 'AG002',
        accountGroupName: 'アカウントグループB'
      },
      {
        id: 'AG003',
        accountGroupName: 'アカウントグループC'
      },
      {
        id: 'AG004',
        accountGroupName: 'アカウントグループD'
      },
      {
        id: 'AG005',
        accountGroupName: 'アカウントグループE'
      }
    ]
    return {
      accountGroups: JSON.stringify(accountGroups)
    }
  }

  /**
   * GET アカウントグループ登録画面
   */
  @Get('regist')
  @Render('accountGroups/regist')
  async getRegist() {
    // マスターデータ（テナント）
    const tenants = [
      {
        id: 'TE001',
        tenantName: 'テナントA'
      },
      {
        id: 'TE002',
        tenantName: 'テナントB'
      }
    ]
    return {
      tenants: JSON.stringify(tenants),
      forms: JSON.stringify({})
    }
  }
  /**
   * POST アカウントグループ登録処理
   */
  @Post('regist')
  @Redirect('http://localhost:3000/accountGroups')
  async postRegist(@Body() body: any) {
    console.log('アカウントグループ登録処理')
    console.log(body)
  }

  /**
   * GET アカウントグループ詳細画面
   */
  @Get('detail/:id')
  @Render('accountGroups/regist')
  async getDetail() {
    // マスターデータ（テナント）
    const tenants = [
      {
        id: 'TE001',
        tenantName: 'テナントA'
      },
      {
        id: 'TE002',
        tenantName: 'テナントB'
      }
    ]
    // アカウントグループ詳細
    const forms = {
      id: 'AG001',
      accountGroupName: 'アカウントグループA',
      useTenants: [
        {
          id: 'TE001'
        }
      ]
    }
    return {
      tenants: JSON.stringify(tenants),
      forms: JSON.stringify(forms)
    }
  }
}

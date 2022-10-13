import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('tenants')
export class TenantsController {
  /**
   * GET テナント照会画面
   */
  @Get('/')
  @Render('tenants/index')
  async getIndex(@Query() query: any) {
    console.log(query)
    const tenants = [
      {
        id: 'TE001',
        tenantName: 'さがみ湖プレジャーフォレスト',
        operatingCompany: '相模湖リゾート株式会社',
        location: '252-0175 神奈川県相模原市緑区若柳1634番地'
      },
      {
        id: 'TE002',
        tenantName: 'さがみ湖プレジャーフォレスト',
        operatingCompany: '相模湖リゾート株式会社',
        location: '252-0175 神奈川県相模原市緑区若柳1634番地'
      },
      {
        id: 'TE003',
        tenantName: 'さがみ湖プレジャーフォレスト',
        operatingCompany: '相模湖リゾート株式会社',
        location: '252-0175 神奈川県相模原市緑区若柳1634番地'
      },
      {
        id: 'TE004',
        tenantName: 'さがみ湖プレジャーフォレスト',
        operatingCompany: '相模湖リゾート株式会社',
        location: '252-0175 神奈川県相模原市緑区若柳1634番地'
      },
      {
        id: 'TE005',
        tenantName: 'さがみ湖プレジャーフォレスト',
        operatingCompany: '相模湖リゾート株式会社',
        location: '252-0175 神奈川県相模原市緑区若柳1634番地'
      }
    ]
    return {
      tenants: JSON.stringify(tenants)
    }
  }

  /**
   * GET テナント登録画面
   */
  @Get('regist')
  @Render('tenants/regist')
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
   * POST テナント登録処理
   */
  @Post('regist')
  @Redirect('http://localhost:3000/tenants')
  async postRegist(@Body() body: any) {
    console.log('テナント登録処理')
    console.log(body)
  }
}

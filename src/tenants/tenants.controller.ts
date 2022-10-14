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
    return {
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

  /**
   * GET テナント詳細画面
   */
  @Get('detail/:id')
  @Render('tenants/regist')
  async getDetail() {
    // テナント詳細
    const forms = {
      tenantName: 'さがみ湖プレジャーフォレスト',
      facilityName: '施設名',
      location: '施設住所',
      telephone: '電話番号',
      businessHour: '営業時間',
      closedDate: '定休日',
      trafficAccess: '交通アクセス',
      url: 'URL',
      explain: '紹介文',
      webNoticeText: 'お知らせ',
      tenantLogo: 'http://localhost:3000/images/photo/user.png',
      carousel1: 'http://localhost:3000/images/photo/user.png',
      carousel2: 'http://localhost:3000/images/photo/user.png',
      carousel3: 'http://localhost:3000/images/photo/user.png',
      carousel4: 'http://localhost:3000/images/photo/user.png',
      carousel5: 'http://localhost:3000/images/photo/user.png',
      carousel6: 'http://localhost:3000/images/photo/user.png'
    }
    return {
      forms: JSON.stringify(forms)
    }
  }
}

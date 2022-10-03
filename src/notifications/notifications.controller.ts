import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  /**
   * GET お知らせ照会画面
   */
  @Get('/')
  @Render('notifications/index')
  async getIndex(@Query() query: any) {
    const notifications = [
      {
        noticeId: '1001',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '1'
      },
      {
        noticeId: '1002',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      },
      {
        noticeId: '1003',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      },
      {
        noticeId: '1004',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      },
      {
        noticeId: '1005',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      }
    ]
    return {
      notifications: JSON.stringify(notifications),
      totalPageCount: 3
    }
  }

  /**
   * GET お知らせ登録画面（通常登録・コピー登録）
   */
  @Get('regist')
  @Render('notifications/regist')
  async getRegist(@Query() query: any) {
    let forms = {}
    if (Object.keys(query).length) {
      forms = {
        noticeId: '1001',
        openRange: 'consumer',
        noticeTitle: '2022年4月1日以降の料金体制について',
        noticeBody: '本文本文本文本文本文本文本文',
        public: '1',
        dateType: '1',
        dateValue: '2022/08/09 03:36'
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
  @Redirect('http://localhost:3000/notifications')
  async postRegist(@Body() body: any) {
    console.log('お知らせ登録処理')
    console.log(body)
  }

  /**
   * GET	お知らせ詳細画面
   */
  @Get('detail/:id')
  @Render('notifications/regist')
  async getDetail() {
    // お知らせ詳細データ
    const forms = {
      noticeId: '1001',
      openRange: 'consumer',
      noticeTitle: '2022年4月1日以降の料金体制について',
      noticeBody: '本文本文本文本文本文本文本文',
      public: '0',
      dateType: '1',
      dateValue: '2022/08/09 03:36'
    }
    return {
      forms: JSON.stringify(forms)
    }
  }
}

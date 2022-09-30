import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  /**
   * GET	お知らせ照会画面
   */
  @Get('/')
  @Render('notification/index')
  async getIndex(@Query() query: any) {
    const notifications = [
      {
        noticeId: '1001',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '1'
      },
      {
        noticeId: '1001',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      },
      {
        noticeId: '1001',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      },
      {
        noticeId: '1001',
        noticeTitle: '2022年4月1日以降の料金体制について',
        dateTime: '2022/7/1 10:00',
        public: '0'
      },
      {
        noticeId: '1001',
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
   * GET	お知らせ登録画面
   */
  @Get('regist')
  @Render('notification/regist')
  async create() {
    return {};
  }

  /**
  * POST お知らせ登録処理
  */
  @Post('regist')
  @Redirect('http://localhost:3000/notification/reference')
  async store(@Body() body: any) {
    console.log("お知らせ登録処理")
    console.log(body)
  }

  /**
  * GET	お知らせ詳細画面
  */
  @Get('details/:id')
  @Render('notification/details')
  async show() {
    return {
      response: JSON.stringify({
        notice_id: "1001",
        open_range: "consumer",
        notice_title: "お知らせタイトル",
        notice_body: "お知らせ本文",
        tag: "アトラクション",
        date_time: "2022/08/09 03:36"
      })
    };
  }

  /**
  * Post お知らせ更新処理
  */
  @Post(':id/edit')
  @Redirect('http://localhost:3000/notification/reference')
  async edit(@Param('id') id: string, @Body() body: any) {
    console.log("お知らせ更新処理")
    console.log(id)
    console.log(body)
  }

  /**
  * Post お知らせ削除処理
  */
  @Post(':id/delete')
  @Redirect('http://localhost:3000/notification/reference')
  async delete(@Param('id') id: string) {
    console.log("お知らせ削除処理")
    console.log(id)
  }
}
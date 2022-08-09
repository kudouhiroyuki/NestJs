import { Get, Post, Body, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('institution/notice')
export class NoticeController {
  /**
  * GET	お知らせ一覧画面（検索処理）
  */
  @Get('/')
  @Render('institution/notice/index')
  async index(@Query() query: any) {
    console.log(query)
    return {};
  }

  /**
  * GET	お知らせ登録画面
  */
  @Get('/create')
  @Render('institution/notice/create')
  async create() {
    return {};
  }

  /**
  * POST お知らせ登録処理
  */
  @Post('/create')
  @Redirect('http://localhost:3000/institution/notice')
  store(@Body() body: any) {
    console.log(body)
  }

  /**
  * GET	お知らせ詳細画面
  */
  @Get(':id')
  @Render('institution/notice/show')
  async show() {
    return {
      response: JSON.stringify({
        open_range: "consumer",
        notice_title: "お知らせタイトル",
        notice_body: "お知らせ本文",
        tag: "アトラクション",
        date_time: "2022/08/09 03:36"
      })
    };
  }
}
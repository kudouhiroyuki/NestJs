import { Get, Post, Body, Controller, Render, Res, Redirect } from '@nestjs/common';

@Controller('institution/notice')
export class NoticeController {
  /**
  * GET	お知らせ一覧画面
  */
  @Get('/')
  @Render('institution/notice/index')
  async index() {
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
  * GET	お知らせ登録処理
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
    return {};
  }
}
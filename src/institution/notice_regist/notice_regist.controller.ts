import { Get, Post, Body, Controller, Render } from '@nestjs/common';

@Controller('institution/notice_regist')
export class NoticeRegistController {
  
  @Get()
  @Render('institution/notice_regist')
  root() {
    return {
      tagLists: JSON.stringify([
        { name: "アトラクション" },
        { name: "フード&レストラン" }
      ])
    };
  }

  @Post('/')
  @Render('institution/notice_regist')
  send(@Body() form:any) {
  	return {
      tagLists: JSON.stringify([
        { name: "アトラクション" },
        { name: "フード&レストラン" }
      ])
    };
  }
  
}
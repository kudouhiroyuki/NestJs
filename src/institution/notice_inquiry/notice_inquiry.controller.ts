import { Get, Post, Body, Controller, Render } from '@nestjs/common';

@Controller('institution/notice_inquiry')
export class NoticeInquiryController {
  
  @Get()
  @Render('institution/notice_inquiry')
  root() {
    return {
      tagLists: JSON.stringify([
        { name: "アトラクション" },
        { name: "フード&レストラン" }
      ])
    };
  }  
}
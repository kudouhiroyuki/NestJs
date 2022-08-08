import { Get, Post, Body, Controller, Render } from '@nestjs/common';

@Controller('institution/notice_inquiry')
export class NoticeInquiryController {
  
  @Get()
  @Render('institution/notice_inquiry')
  root() {
    return {
    };
  }

  @Post('/')
  @Render('institution/notice_inquiry')
  send(@Body() body:any) {
    console.log(body);
  	return {
    };
  }
}
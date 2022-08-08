import { Get, Post, Body, Controller, Render } from '@nestjs/common';

@Controller('institution/notice_regist')
export class NoticeRegistController {
  
  @Get()
  @Render('institution/notice_regist')
  root() {
    return {
    };
  }

  @Post('/')
  @Render('institution/notice_regist')
  send(@Body() body:any) {
    console.log(body);
  	return {
    };
  }
  
}
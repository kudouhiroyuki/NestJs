import { Get, Post, Body, Controller, Render } from '@nestjs/common';

@Controller('institution/notice')
export class NoticeController {
  
  @Get('/')
  @Render('institution/notice/index')
  async index() {
    return {
    };
  }

  @Get('/create')
  @Render('institution/notice/create')
  async create() {
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
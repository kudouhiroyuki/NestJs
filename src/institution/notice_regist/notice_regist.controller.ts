import { Response } from 'express';
import { Get, Controller, Render, Res } from '@nestjs/common';

@Controller('institution/notice_regist')
export class NoticeRegistController {
  @Get()
  @Render('institution/notice_regist')
  root(@Res() res: Response) {
    return {
      response: 111
    };
  }
}
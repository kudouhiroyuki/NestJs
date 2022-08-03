import {Response} from 'express';
import { Get, Controller, Render, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root(@Res() res: Response) {
    // return res.send({
    //   result: JSON.stringify([{"id": 1, "name": "kudou" }])
    // });
    return {
      response: JSON.stringify([{ name: "kudou" }])
    };
  }
}

import { Get, Post, Body, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return {
      response: JSON.stringify([{ name: "kudou" }])
    };
  }

  @Post()
  send(@Body() form:any) {
    console.log(Body)
  	return {
    };
  }
}

import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('tenant')
export class TenantController {
  /**
  * GET	施設情報管理画面
  */
  @Get('/details')
  @Render('tenant/details')
  async show() {
  }

  /**
  * Post 施設情報更新処理
  */
  @Post('/details/edit')
  @Redirect('http://localhost:3000/tenant/details')
  async edit(@Body() body: any) {
    console.log("施設情報更新処理")
    console.log(body)
  }
}
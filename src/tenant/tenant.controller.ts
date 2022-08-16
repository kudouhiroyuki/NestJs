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
}
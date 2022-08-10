import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect } from '@nestjs/common';

@Controller('facility_management/facility')
export class FacilityController {
  /**
  * GET	施設情報管理画面（検索処理）
  */
  @Get('/')
  @Render('facility_management/facility/index')
  async index() {
  }
}
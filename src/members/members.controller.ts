import { Get, Post, Put, Body, Param, Controller, Render, Query, Redirect, Res } from '@nestjs/common'

@Controller('members')
export class MembersController {
  /**
   * GET 会員照会画面
   */
  @Get('/')
  @Render('members/index')
  async getIndex(@Query() query: any) {
    let members = []
    let totalPageCount = 0
    if (Object.keys(query).length) {
      members = [
        {
          id: '1',
          memberId: 'I001',
          joinDate: '2020/04/01',
          fullName: '富士急　太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        },
        {
          id: '2',
          smemberId: 'I002',
          joinDate: '2020/04/01',
          fullName: '富士急　太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        },
        {
          id: '3',
          memberId: 'I003',
          joinDate: '2020/04/01',
          fullName: '富士急　太郎',
          mail: 'taro@fujiq.jp',
          tell: '01234567890',
          sex: '男性'
        }
      ]
      totalPageCount = 3
    }
    return {
      members: JSON.stringify(members),
      totalPageCount: totalPageCount
    }
  }
}

import { Module } from '@nestjs/common'
import { AccountGroupsController } from './accountGroups.controller'
import { AccountGroupsService } from './accountGroups.service'

@Module({
  controllers: [AccountGroupsController],
  providers: [AccountGroupsService]
})
export class AccountGroupsModule {}

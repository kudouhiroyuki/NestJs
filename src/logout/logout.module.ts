import { Module } from '@nestjs/common'

import { LogoutController } from './logout.controller'
import { AuthService } from '../auth/auth.service'

@Module({
  controllers: [LogoutController],
  providers: [AuthService]
})
export class LogoutModule {}

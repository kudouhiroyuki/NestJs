import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UsersModule } from './users/users.module'
import { UsersApiModule } from './usersApi/usersApi.module'

@Module({
  imports: [UsersModule, UsersApiModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

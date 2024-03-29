import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { LoginModule } from './login/login.module'
import { LogoutModule } from './logout/logout.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthModule } from './jwtAuth/jwtAuth.module'
import { UsersModule } from './users/users.module'
import { UsersApiModule } from './usersApi/usersApi.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    LoginModule,
    LogoutModule,
    AuthModule,
    JwtAuthModule,
    UsersModule,
    UsersApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

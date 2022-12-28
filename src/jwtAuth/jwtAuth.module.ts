import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtAuthService } from './jwtAuth.service'
import { JwtAuthController } from './jwtAuth.controller'
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './constants'

@Module({
  imports: [PassportModule, JwtModule.register({ secret: jwtConstants.secret })],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],
  controllers: [JwtAuthController]
})
export class JwtAuthModule {}

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtAuthService } from './jwtAuth.service'
import { JwtAuthController } from './jwtAuth.controller'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [PassportModule, JwtModule.register({ secret: 'secret' })],
  providers: [JwtAuthService, LocalStrategy, JwtStrategy],
  controllers: [JwtAuthController]
})
export class JwtAuthModule {}

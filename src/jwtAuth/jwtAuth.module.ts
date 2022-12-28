import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtAuthService } from './jwtAuth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [PassportModule, JwtModule.register({ secret: 'secretKey' })],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService, JwtStrategy]
})
export class JwtAuthModule {}

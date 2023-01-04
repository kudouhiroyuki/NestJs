import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma.service'

import { JwtAuthService } from './jwtAuth.service'
import { JwtAuthController } from './jwtAuth.controller'
import { JwtAuthRepository } from './repository/jwtAuth.repository'
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './constants'

@Module({
  imports: [PassportModule, JwtModule.register({ secret: jwtConstants.secret })],
  providers: [PrismaService, JwtAuthService, JwtAuthRepository, JwtStrategy],
  exports: [JwtAuthService],
  controllers: [JwtAuthController]
})
export class JwtAuthModule {}

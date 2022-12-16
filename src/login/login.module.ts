import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { LoginRepository } from './repository/login.repository'
import { AuthService } from '../auth/auth.service'

@Module({
  controllers: [LoginController],
  providers: [PrismaService, AuthService, LoginService, LoginRepository]
})
export class LoginModule {}

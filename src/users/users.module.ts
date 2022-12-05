import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service'
import { UserRepository } from './repository/user.repository'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UserRepository]
})
export class UsersModule {}

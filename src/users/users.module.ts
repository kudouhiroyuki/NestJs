import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UserRepository } from './repository/user.repository'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UserRepository]
})
export class UsersModule {}

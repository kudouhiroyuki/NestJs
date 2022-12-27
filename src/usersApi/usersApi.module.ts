import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UsersApiController } from './usersApi.controller'
import { UsersApiService } from './usersApi.service'
import { UserApiRepository } from './repository/userApi.repository'

@Module({
  controllers: [UsersApiController],
  providers: [PrismaClient, PrismaService, UsersApiService, UserApiRepository]
})
export class UsersApiModule {}

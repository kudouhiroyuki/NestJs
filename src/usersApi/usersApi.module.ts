import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UsersApiController } from './usersApi.controller'
import { UsersApiService } from './usersApi.service'
import { UserApiRepository } from './repository/userApi.repository'

@Module({
  controllers: [UsersApiController],
  providers: [PrismaService, UsersApiService, UserApiRepository]
})
export class UsersApiModule {}

import { Injectable } from '@nestjs/common'
import { UserApiRepository } from './repository/userApi.repository'

@Injectable()
export class UsersApiService {
  constructor(private readonly userApiRepository: UserApiRepository) {}
}

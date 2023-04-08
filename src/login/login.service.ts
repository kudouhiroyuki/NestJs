import { Injectable } from '@nestjs/common'
import { LoginRepository } from './repository/login.repository'
import { user as User } from '@prisma/client'

@Injectable()
export class LoginService {
  constructor(private readonly loginRepository: LoginRepository) {}

  async findLoginUser(id: string, password: string): Promise<User> {
    return this.loginRepository.findLoginUser(id, password)
  }
}

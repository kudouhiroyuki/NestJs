import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user as User } from '@prisma/client'
import { JwtAuthRepository } from './repository/jwtAuth.repository'

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService, private jwtAuthRepository: JwtAuthRepository) {}

  async findJwtAuthUser(id: string, password: string): Promise<User> {
    return await this.jwtAuthRepository.findJwtAuthUser(id, password)
  }

  jwtEncode(jwt: any) {
    const payload = { id: jwt.id, password: jwt.password }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

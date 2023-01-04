import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { users as Users } from '@prisma/client'
import { JwtAuthRepository } from './repository/jwtAuth.repository'

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService, private jwtAuthRepository: JwtAuthRepository) {}

  async findJwtAuthUser(id: string, password: string): Promise<Users> {
    return await this.jwtAuthRepository.findJwtAuthUser(id, password)
  }

  jwtEncode(jwt: any) {
    const payload = { id: jwt.id, password: jwt.password }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  // jwtDecode(token: string, logCaption = 'authorization'): { [key: string]: any } {
  //   if (!token.startsWith(JwtAuthService.tokenPrefix)) {
  //     throw new UnauthorizedException(`${logCaption} is illegal format`)
  //   }
  //   const t = token.substring(JwtAuthService.tokenPrefix.length)

  //   let jwt: { [key: string]: any }
  //   try {
  //     this.jwtService.verify(t)
  //     jwt = this.jwtService.decode(t) as { [key: string]: any }
  //   } catch (exp) {
  //     throw new UnauthorizedException(exp)
  //   }

  //   if (!jwt) throw new UnauthorizedException(`${logCaption} failed`)
  //   return jwt
  // }
}

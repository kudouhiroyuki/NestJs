import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  sign() {
    const payload: any = { userName: '名前', password: 'password' }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  // static readonly tokenPrefix = 'Bearer '

  // jwtEncode(jwt: { userId?: number; cartId?: number }, hasExpiration = true): string {
  //   const payload = { sub: jwt.userId, cartId: jwt.cartId }
  //   return `${JwtAuthService.tokenPrefix}${this.jwtService.sign(
  //     payload,
  //     hasExpiration ? { expiresIn: 60 } : undefined
  //   )}`
  // }

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

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { users as Users } from '@prisma/client'

interface JWTPayload {
  id: Users['id']
  userName: Users['userName']
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey'
    })
  }

  async validate(payload: JWTPayload): Promise<any> {
    console.log(payload)
    // return { id: payload.id, userName: payload.userName }
  }
}

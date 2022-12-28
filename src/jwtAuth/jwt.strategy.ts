import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { users as Users } from '@prisma/client'
import { jwtConstants } from './constants'

interface JWTPayload {
  userName: Users['userName']
  password: Users['password']
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: JWTPayload): Promise<any> {
    return { userName: payload.userName, password: payload.password }
  }
}

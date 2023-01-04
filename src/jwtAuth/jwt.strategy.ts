import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { users as Users } from '@prisma/client'
import { jwtConstants } from './constants'

interface JwtPayload {
  id: Users['id']
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

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return { id: payload.id, password: payload.password }
  }
}

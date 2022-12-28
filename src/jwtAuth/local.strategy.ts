import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super()
  }

  validate(username: string, password: string): boolean {
    console.log(username)
    console.log(password)
    return true
    // if (username === 'admin' && password == 'password') {
    //   return true
    // } else {
    //   throw new UnauthorizedException()
    // }
  }
}

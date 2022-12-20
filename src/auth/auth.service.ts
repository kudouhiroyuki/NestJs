import { Injectable } from '@nestjs/common'
import { Request } from 'express'

import { SessionUtils } from '../utils/session.utils'
import { AuthSigninResponseDto } from './dto/response/authResponse.dto'

@Injectable()
export class AuthService {
  async signin(request: Request, account: any) {
    const result: AuthSigninResponseDto = {}
    try {
      SessionUtils.setSession(request, account, 'account')
    } catch (e) {
      result.err = e
    }
    return result
  }
  async signout(request: Request) {
    SessionUtils.deleteSession(request, 'account')
  }
}

import { Injectable } from '@nestjs/common'
import { Request } from 'express'

import { SessionUtils } from '../utils/session.utils'
import { SigninResponseDto } from './dto/response/authsResponse.dto'

@Injectable()
export class AuthService {
  async signin(request: Request, account: any) {
    const result: SigninResponseDto = {}
    try {
      SessionUtils.setSession(request, account, 'account')
    } catch (e) {
      result.err = e
    }
    return result
  }
}

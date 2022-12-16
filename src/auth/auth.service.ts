import { Injectable } from '@nestjs/common'

import { Request } from 'express'

@Injectable()
export class AuthService {
  async signin(request: Request) {
    console.log(request)
  }
}

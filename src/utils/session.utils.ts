import { Request } from 'express'

export class SessionUtils {
  static setSession(request: Request, data: any, key: string): void {
    request.session[key] = JSON.stringify({ test: 111 }, null)
  }
}

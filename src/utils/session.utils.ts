import { Request } from 'express'

export class SessionUtils {
  static setSession(request: Request, data: any, key: string): void {
    request.session[key] = data
  }
  static getSettion(request: Request, key: string): any {
    return request.session[key]
  }
}

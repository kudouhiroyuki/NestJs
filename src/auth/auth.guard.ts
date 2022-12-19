import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from './auth.reflecotr'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflecotr: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // カスタムアノテーション取得
    const isPublic = this.reflecotr.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    const request = context.switchToHttp().getRequest<Request>()

    console.log(request.session)

    const sessionData = false
    if (isPublic || sessionData) {
      return true
    } else {
      throw new UnauthorizedException('Access Error')
    }
  }
}

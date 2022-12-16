import { ArgumentsHost, Catch, ExceptionFilter, Injectable, UnauthorizedException } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    response.redirect('/login')
  }
}

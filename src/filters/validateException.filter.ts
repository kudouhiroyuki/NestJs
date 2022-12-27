import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException } from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class ValidateExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    response.status(status).json({
      statusCode: status,
      message: exception.getResponse()['message'],
      error: 'Bad Request'
    })
  }
}

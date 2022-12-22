import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as Session from 'express-session'
import { join } from 'path'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { AuthGuard } from './auth/auth.guard'
import { UnauthorizedExceptionFilter } from './filters/unauthorizedExeption.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '../../views/public'))
  app.setBaseViewsDir(join(__dirname, '../../views/pages'))
  app.setViewEngine('ejs')

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Swagger設定
  const options = new DocumentBuilder().setTitle('Api').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // Session設定
  app.use(
    Session({
      secret: 'secretkey',
      resave: false,
      saveUninitialized: false
    })
  )

  // 認証設定
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new AuthGuard(reflector))

  // フィルター設定
  app.useGlobalFilters(new UnauthorizedExceptionFilter())

  await app.listen(3000)
}
bootstrap()

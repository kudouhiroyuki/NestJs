import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as Session from 'express-session'
import { join } from 'path'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { AuthGuard } from './auth/auth.guard'
import { UnauthorizedExceptionFilter } from './filters/unauthorizedExeption.filter'
import * as methodOverride from 'method-override'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '../../views/public'))
  app.setBaseViewsDir(join(__dirname, '../../views/pages'))
  app.setViewEngine('ejs')

  // CORS有効化
  app.enableCors()

  // フォームメソッド（PUT DELETE）
  app.use(methodOverride('_method'))

  // Swagger
  const options = new DocumentBuilder().setTitle('Api').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // Session
  app.use(
    Session({
      secret: 'secretkey',
      resave: false,
      saveUninitialized: false
    })
  )

  // オートバリデーション（グローバルスコープ）
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // 認証ガード（グローバルスコープ）
  // const reflector = app.get(Reflector)
  // app.useGlobalGuards(new AuthGuard(reflector))

  // 認証フィルター（グローバルスコープ）
  // app.useGlobalFilters(new UnauthorizedExceptionFilter())

  await app.listen(3000)
}
bootstrap()

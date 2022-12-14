import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '../../views/public'))
  app.setBaseViewsDir(join(__dirname, '../../views/pages'))
  app.setViewEngine('ejs')

  const options = new DocumentBuilder().setTitle('Api').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3000)
}
bootstrap()

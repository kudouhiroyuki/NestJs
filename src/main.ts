import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '../../views/public'))
  app.setBaseViewsDir(join(__dirname, '../../views/pages'))
  app.setViewEngine('ejs')

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3000)
}
bootstrap()

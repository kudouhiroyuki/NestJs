import { Module } from '@nestjs/common'
import { EnbedProductsController } from './enbed-products.controller'
import { EnbedProductsService } from './enbed-products.service'

@Module({
  controllers: [EnbedProductsController],
  providers: [EnbedProductsService]
})
export class EnbedProductsModule {}

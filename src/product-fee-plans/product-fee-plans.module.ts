import { Module } from '@nestjs/common'
import { ProductFeePlansController } from './product-fee-plans.controller'
import { ProductFeePlansService } from './product-fee-plans.service'

@Module({
  controllers: [ProductFeePlansController],
  providers: [ProductFeePlansService]
})
export class ProductFeePlansModule {}

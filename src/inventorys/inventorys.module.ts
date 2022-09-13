import { Module } from '@nestjs/common'
import { InventorysController } from './inventorys.controller'
import { InventorysService } from './inventorys.service'

@Module({
  controllers: [InventorysController],
  providers: [InventorysService]
})
export class InventorysModule {}

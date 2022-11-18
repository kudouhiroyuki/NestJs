/**
 * ORM（typeORMの場合）
 */
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Users } from './entities/users.entity';
// import { UsersModule } from './users/users.module';
// // 施設管理
// import { NoticeModule } from './facility_management/notice/notice.module';
// import { FacilityModule } from './facility_management/facility/facility.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: '',
//       database: 'nest',
//       entities: [Users],
//       synchronize: true,
//     }),
//     UsersModule,
//     NoticeModule,
//     FacilityModule,
//   ],
//   controllers: [ AppController ],
//   providers: [ AppService ],
// })
// export class AppModule {}

/**
 * ORM（Prismaの場合）
 */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { PlansModule } from './plans/plans.module'
import { DivisionsModule } from './divisions/divisions.module'
import { InventorysModule } from './inventorys/inventorys.module'

import { LoginModule } from './login/login.module'
import { PasswordResetModule } from './password-reset/password-reset.module'
import { TenantsModule } from './tenants/tenants.module'
import { ProductsModule } from './products/products.module'
import { EnbedProductsModule } from './enbed-products/enbed-products.module'
import { ProductFeePlansModule } from './product-fee-plans/product-fee-plans.module'
import { OrdersModule } from './orders/orders.module'
import { AccountsModule } from './accounts/accounts.module'
import { AccountGroupsModule } from './accountGroups/accountGroups.module'
import { NotificationsModule } from './notifications/notifications.module'
import { MembersModule } from './members/members.module'
import { MaintenancesModule } from './maintenances/maintenances.module'

import { UsersModule } from './users/users.module'

@Module({
  imports: [
    PlansModule,
    DivisionsModule,
    InventorysModule,

    LoginModule,
    PasswordResetModule,
    TenantsModule,
    ProductsModule,
    EnbedProductsModule,
    ProductFeePlansModule,
    OrdersModule,
    AccountsModule,
    AccountGroupsModule,
    NotificationsModule,
    MembersModule,
    MaintenancesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

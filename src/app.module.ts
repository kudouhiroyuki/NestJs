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

import { ProductsModule } from './products/products.module'
import { PlansModule } from './plans/plans.module'
import { DivisionsModule } from './divisions/divisions.module'

import { UsersModule } from './users/users.module'
import { TenantModule } from './tenant/tenant.module'
import { NotificationModule } from './notification/notification.module'

@Module({
  imports: [ProductsModule, PlansModule, DivisionsModule, UsersModule, TenantModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

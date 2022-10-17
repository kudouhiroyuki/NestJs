"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const plans_module_1 = require("./plans/plans.module");
const divisions_module_1 = require("./divisions/divisions.module");
const inventorys_module_1 = require("./inventorys/inventorys.module");
const login_module_1 = require("./login/login.module");
const tenants_module_1 = require("./tenants/tenants.module");
const orders_module_1 = require("./orders/orders.module");
const accounts_module_1 = require("./accounts/accounts.module");
const accountGroups_module_1 = require("./accountGroups/accountGroups.module");
const notifications_module_1 = require("./notifications/notifications.module");
const members_module_1 = require("./members/members.module");
const maintenances_module_1 = require("./maintenances/maintenances.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            products_module_1.ProductsModule,
            plans_module_1.PlansModule,
            divisions_module_1.DivisionsModule,
            inventorys_module_1.InventorysModule,
            login_module_1.LoginModule,
            tenants_module_1.TenantsModule,
            orders_module_1.OrdersModule,
            accounts_module_1.AccountsModule,
            accountGroups_module_1.AccountGroupsModule,
            notifications_module_1.NotificationsModule,
            members_module_1.MembersModule,
            maintenances_module_1.MaintenancesModule,
            users_module_1.UsersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
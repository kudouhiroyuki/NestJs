"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(query) {
        const whereConditions = {};
        const orderConditions = {};
        if (query.id)
            whereConditions['id'] = Number(query.id);
        if (query.user_name)
            whereConditions['user_name'] = { contains: query.user_name };
        if (query.sort)
            orderConditions['id'] = query.sort;
        return await this.prisma.users.findMany({
            select: {
                id: true,
                user_name: true,
                password: true
            },
            where: whereConditions,
            orderBy: orderConditions,
            skip: 0
        });
    }
    async createUser(data) {
        return await this.prisma.users.create({ data });
    }
    async updateUser(params) {
        const { where, data } = params;
        return this.prisma.users.update({
            where,
            data
        });
    }
    async deleteUser(where) {
        return await this.prisma.users.delete({ where });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
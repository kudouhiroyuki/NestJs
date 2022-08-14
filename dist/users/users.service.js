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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const users_entity_1 = require("../entities/users.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(query) {
        let limit = 5;
        let offset = 1;
        const conditions = {};
        if (query.limit)
            limit = query.limit;
        if (query.page_number)
            offset = query.page_number;
        if (query.id)
            conditions["id"] = query.id;
        if (query.user_name)
            conditions["user_name"] = (0, typeorm_2.Like)(`%${query.user_name}`);
        const [users, total_record_count] = await this.usersRepository.findAndCount({
            select: ['id', 'user_name', 'password'],
            where: conditions,
            order: {
                id: query.sort
            },
            take: limit,
            skip: (offset - 1) * limit
        });
        return {
            users,
            total_record_count,
            total_page_count: Math.ceil(total_record_count / limit),
        };
    }
    async getUser(userId) {
        return await this.usersRepository.findOne(userId);
    }
    async createUser(user) {
        return await this.usersRepository.insert(user);
    }
    async updateUser(id, user) {
        return await this.usersRepository.update(id, user);
    }
    async deleteUser(id) {
        return await this.usersRepository.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
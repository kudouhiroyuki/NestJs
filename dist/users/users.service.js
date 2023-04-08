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
const client_1 = require("@prisma/client");
const user_repository_1 = require("./repository/user.repository");
let UsersService = class UsersService {
    constructor(userRepository, prismaClient) {
        this.userRepository = userRepository;
        this.prismaClient = prismaClient;
    }
    async findDepartmentsAll() {
        return await this.userRepository.findDepartmentsAll();
    }
    async findUsersAll() {
        const users = await this.userRepository.findUsersAll();
        const usersCount = await this.userRepository.getUsersCount();
        const pagination = Math.ceil(usersCount / 5);
        return { users, pagination };
    }
    async findUsers(id, startDate, endDate, pageNumber) {
        const users = await this.userRepository.findUsers(id, startDate, endDate, pageNumber, 5);
        const usersCount = await this.userRepository.getUsersCount(id, startDate, endDate);
        const pagination = Math.ceil(usersCount / 5);
        return { users, pagination };
    }
    async findUserById(id) {
        return await this.userRepository.findUserById(id);
    }
    async findUserByCopyId(copyId) {
        const users = await this.userRepository.findUserById(copyId);
        if (users) {
            delete users.id;
            delete users.point;
            delete users.created_at;
            delete users.update_at;
        }
        return users;
    }
    async createUser(user) {
        return await this.prismaClient.$transaction(async (prismaTransaction) => {
            const item = {
                user_name: user.user_name,
                password: user.password,
                address: user.address,
                age: user.age,
                department_id: user.department_id,
                point: 0,
                created_at: new Date(),
                update_at: new Date()
            };
            await this.userRepository.createUser(prismaTransaction, item);
        });
    }
    async updateUser(id, user) {
        const item = {
            user_name: user.user_name,
            password: user.password,
            address: user.address,
            age: user.age,
            department_id: user.department_id,
            point: user.point,
            created_at: user.created_at,
            update_at: new Date()
        };
        const updateArgs = {
            data: item,
            where: { id }
        };
        await this.userRepository.updateUser(updateArgs);
    }
    async deleteUser(id) {
        await this.userRepository.deleteUser(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, client_1.PrismaClient])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
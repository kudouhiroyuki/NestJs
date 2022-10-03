import { UsersService } from './users.service';
import { users as Users } from '@prisma/client';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getUsers(query: {
        id: number;
        userName: string;
        sort: 'asc' | 'desc';
    }): Promise<Users[]>;
    createUser(user: {
        userName: string;
        password: string;
        address: string;
        age: string;
        departmentId: string;
        point: number;
        createdAt: string;
        updateAt: string;
    }): Promise<Users>;
    updateUser(id: string, user: Users): Promise<Users>;
    deleteUser(id: string): Promise<Users>;
}

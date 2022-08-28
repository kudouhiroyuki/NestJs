import { UsersService } from './users.service';
import { users as Users } from '@prisma/client';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getUsers(query: {
        id: number;
        user_name: string;
        sort: 'asc' | 'desc';
    }): Promise<Users[]>;
    createUser(user: {
        user_name: string;
        password: string;
        department_id: string;
    }): Promise<Users>;
    updateUser(id: string, user: Users): Promise<Users>;
    deleteUser(id: string): Promise<Users>;
}

import { UsersService } from './users.service';
import { users as Users } from '@prisma/client';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getUsers(): Promise<Users[]>;
    createUser(user: {
        user_name: string;
        password: string;
    }): Promise<Users>;
    deleteUser(id: string): Promise<Users>;
}

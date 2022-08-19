import { UsersService } from './users.service';
import { users as Users } from '@prisma/client';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    createUser(user: {
        user_name: string;
        password: string;
    }): Promise<Users>;
    updateUser(id: string, user: Users): Promise<Users>;
    deleteUser(id: string): Promise<Users>;
}

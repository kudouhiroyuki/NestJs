import { UsersService } from './users.service';
import { users } from '@prisma/client';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getUsers(): Promise<users[]>;
    createUser(user: {
        user_name: string;
        password: string;
    }): Promise<users>;
}

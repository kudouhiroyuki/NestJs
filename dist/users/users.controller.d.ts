import { UsersService } from './users.service';
import { users } from '@prisma/client';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    prismaTest(): Promise<users[]>;
}

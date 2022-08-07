import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    getUsers(): Promise<Users[]>;
    getUser(id: string): Promise<Users>;
    createUser(user: Users): Promise<InsertResult>;
    updateUser(id: string, user: Users): Promise<UpdateResult>;
    deleteUser(id: string): Promise<DeleteResult>;
}

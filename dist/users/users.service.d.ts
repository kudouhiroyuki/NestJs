import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../entities/users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    getUsers(): Promise<Users[]>;
    getUser(userId: number): Promise<Users>;
    createUser(user: Users): Promise<InsertResult>;
    updateUser(id: number, user: Users): Promise<UpdateResult>;
    deleteUser(id: number): Promise<DeleteResult>;
}

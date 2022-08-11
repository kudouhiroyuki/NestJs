import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../entities/users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    getUsers(query: {
        id: number;
        user_name: string;
        sort: "ASC" | 1 | "DESC" | -1;
        limit: number;
        page_number: number;
    }): Promise<{
        users: Users[];
        total_record_count: number;
        total_page_count: number;
    }>;
    getUser(userId: number): Promise<Users>;
    createUser(user: Users): Promise<InsertResult>;
    updateUser(id: number, user: Users): Promise<UpdateResult>;
    deleteUser(id: number): Promise<DeleteResult>;
}

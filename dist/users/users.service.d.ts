import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    findAll(): Promise<Users[]>;
}

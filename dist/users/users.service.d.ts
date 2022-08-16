import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<users[]>;
    createUser(data: {
        user_name: string;
        password: string;
    }): Promise<users>;
}

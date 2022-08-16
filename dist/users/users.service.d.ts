import { users as Users, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<Users[]>;
    createUser(data: {
        user_name: string;
        password: string;
    }): Promise<Users>;
    deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users>;
}

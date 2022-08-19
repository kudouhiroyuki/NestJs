import { users as Users, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: {
        user_name: string;
        password: string;
    }): Promise<Users>;
    updateUser(params: {
        where: Prisma.usersWhereUniqueInput;
        data: Prisma.usersUpdateInput;
    }): Promise<Users>;
    deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users>;
}

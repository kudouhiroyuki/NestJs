import { users as Users, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(query: {
        id: number;
        user_name: string;
        sort: 'asc' | 'desc';
    }): Promise<Users[]>;
    createUser(data: {
        user_name: string;
        password: string;
        address: string;
        age: string;
        department_id: string;
        point: number;
    }): Promise<Users>;
    updateUser(params: {
        where: Prisma.usersWhereUniqueInput;
        data: Prisma.usersUpdateInput;
    }): Promise<Users>;
    deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users>;
}

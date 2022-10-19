import { users as Users, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(query: {
        id: number;
        userName: string;
        sort: 'asc' | 'desc';
    }): Promise<any>;
    createUser(data: {
        userName: string;
        password: string;
        address: string;
        age: string;
        departmentId: string;
        point: number;
        createdAt: string;
        updateAt: string;
    }): Promise<Users>;
    updateUser(params: {
        where: Prisma.usersWhereUniqueInput;
        data: Prisma.usersUpdateInput;
    }): Promise<Users>;
    deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users>;
}

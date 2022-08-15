import { Users } from '../entities/users.entity';
import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    prismaTest(): Promise<Users[]>;
}

/**
 * ORM（typeORMの場合）
 */
// import { Users } from '../entities/users.entity';
// import { Injectable, Query, } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//     Repository,
//     InsertResult,
//     UpdateResult,
//     DeleteResult,
//     Like,
//     getConnection,
//     getManager,
//     getRepository
// } from 'typeorm';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(Users)
//     private readonly usersRepository: Repository<Users>,
//   ) {}

//   async getUsers(query: {id: number, user_name: string, sort: "ASC" | 1 | "DESC" | -1, limit: number, page_number: number}): Promise<{users: Users[], total_record_count: number, total_page_count: number}> {
//     let limit = 5;
//     let offset = 1;
//     const conditions = {};

//     if(query.limit) limit = query.limit;
//     if(query.page_number) offset = query.page_number;
//     if(query.id) conditions["id"] = query.id;
//     if(query.user_name) conditions["user_name"] = Like(`%${query.user_name}`);

//     const [users, total_record_count] = await this.usersRepository.findAndCount({
//       select: ['id', 'user_name', 'password'],
//       where: conditions,
//       order: {
//         id: query.sort
//       },
//       take: limit,
//       skip: (offset - 1) * limit
//     })
//     return {
//       users,
//       total_record_count,
//       total_page_count: Math.ceil(total_record_count / limit),
//     }
//   }

//   async getUser(userId: number): Promise<Users> {
//     // Repositoryメソッド：TypeORM
//     return await this.usersRepository.findOne(userId);

//     // QueryBuilder(Connection)：TypeORM
//     // return await getConnection()
//     //   .createQueryBuilder()
//     //   .select("users")
//     //   .from(Users, "users")
//     //   .where("users.id = :id", { id: userId })
//     //   .getOne();

//     // QueryBuilder(Entity Manager)：TypeORM
//     // return await getManager()
//     //   .createQueryBuilder(Users, "users")
//     //   .where("users.id = :id", { id: userId })
//     //   .getOne();

//     // QueryBuilder(Repository)：TypeORM
//     // return await getRepository(Users)
//     //   .createQueryBuilder("users")
//     //   .where("users.id = :id", { id: userId })
//     //   .getRawOne();
//   }

//   async createUser(user: Users): Promise<InsertResult> {
//     return await this.usersRepository.insert(user);

//     // return await getConnection()
//     //   .createQueryBuilder()
//     //   .insert()
//     //   .into(Users)
//     //   .values([user])
//     //   .execute();
//   }

//   async updateUser(id: number, user: Users): Promise<UpdateResult> {
//     return await this.usersRepository.update(id, user);

//     // return await getConnection()
//     //   .createQueryBuilder()
//     //   .update(Users)
//     //   .set(user)
//     //   .where("id = :id", { id: id })
//     //   .execute();
//   }

//   async deleteUser(id: number): Promise<DeleteResult> {
//     return await this.usersRepository.delete(id);

//     // return await getConnection()
//     //   .createQueryBuilder()
//     //   .delete()
//     //   .from(Users)
//     //   .where("id = :id", { id: id })
//     //   .execute();
//   }
// }

/**
 * ORM（Prismaの場合）
 */
import { users as Users, Prisma } from '@prisma/client'
import { Injectable, Query } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

// findFirst  条件に一致する最初のレコードを取得
// findMany   条件に一致する全てのレコードを取得
// delete     条件に一致するレコードを削除する
// deleteMany 条件に一致する全てのレコードを削除する

// SQL直書き
// return await this.prisma.$queryRaw`SELECT * FROM nest.users`
// return await this.prisma.$queryRaw(Prisma.sql`SELECT * FROM nest.users`);
// return await this.prisma.$queryRaw(Prisma.sql`
//   SELECT * FROM nest.users
//   WHERE user_name LIKE ${'kudou'}
//   LIMIT ${'1'};
// `)

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(query: { id: number; user_name: string; sort: 'asc' | 'desc' }): Promise<Users[]> {
    const whereConditions = {}
    const orderConditions = {}
    if (query.id) whereConditions['id'] = Number(query.id)
    if (query.user_name) whereConditions['user_name'] = { contains: query.user_name }
    if (query.sort) orderConditions['id'] = query.sort
    return await this.prisma.users.findMany({
      select: {
        id: true,
        user_name: true,
        password: true,
        address: true,
        age: true,
        department_id: true,
        point: true
      },
      where: whereConditions,
      orderBy: orderConditions,
      skip: 0
    })
  }

  async createUser(data: {
    user_name: string
    password: string
    address: string
    age: string
    department_id: string
    point: number
  }): Promise<Users> {
    return await this.prisma.users.create({ data })
  }

  async updateUser(params: { where: Prisma.usersWhereUniqueInput; data: Prisma.usersUpdateInput }): Promise<Users> {
    const { where, data } = params
    return this.prisma.users.update({
      where,
      data
    })
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users> {
    return await this.prisma.users.delete({ where })
  }
}

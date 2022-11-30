import { Injectable } from '@nestjs/common'
import { UsersRepository } from './repository/users.repository'
import { UserListDto } from './dto/response/userList.dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers(id: string): Promise<{ users: UserListDto[] }> {
    const whereConditions = {}
    if (id) whereConditions['id'] = Number(id)
    const users = await this.usersRepository.findUsers(whereConditions)
    return { users: users }
  }

  // // query: { id: number; userName: string; sort: 'asc' | 'desc' }
  // async findUsersAll(): Promise<any> {
  //   // const whereConditions = {}
  //   // const orderConditions = {}
  //   // if (query.id) whereConditions['id'] = Number(query.id)
  //   // if (query.userName) whereConditions['userName'] = { contains: query.userName }
  //   // if (query.sort) orderConditions['id'] = query.sort
  //   return await this.prisma.users.findMany({
  //     select: {
  //       id: true,
  //       userName: true,
  //       password: true,
  //       address: true,
  //       age: true,
  //       departmentId: true,
  //       point: true,
  //       createdAt: true,
  //       updateAt: true
  //     }
  //     // where: whereConditions,
  //     // orderBy: orderConditions,
  //     // skip: 0
  //   })
  // }

  // async createUser(data: {
  //   userName: string
  //   password: string
  //   address: string
  //   age: string
  //   departmentId: string
  //   point: number
  //   createdAt: string
  //   updateAt: string
  // }): Promise<Users> {
  //   return await this.prisma.users.create({ data })
  // }

  // async updateUser(params: { where: Prisma.usersWhereUniqueInput; data: Prisma.usersUpdateInput }): Promise<Users> {
  //   const { where, data } = params
  //   return this.prisma.users.update({
  //     where,
  //     data
  //   })
  // }

  // async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<Users> {
  //   return await this.prisma.users.delete({ where })
  // }
}

// async findTenantsAll(): Promise<TenantResponseDto[]> {
//   const resultTenants = await this.tenantsRepository.findTenantsAll(); //リポジトリ呼び出す
//   const tenants = new Array<TenantResponseDto>(); //インスタンス生成
//   for (const resultTenant of resultTenants) {
//     const tenant = new TenantResponseDto(resultTenant); //resultTenantが1つはいる、一テナント情報を取得
//     tenants.push(tenant); //tenantsに一テナント情報を入れていく
//   }
//   return tenants;
// }

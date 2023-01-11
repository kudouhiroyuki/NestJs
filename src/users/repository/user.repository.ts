import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { UserRelationDto } from '../dto/response/userRelation.dto'
import { Prisma, users as Users, departments as Departments } from '@prisma/client'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findDepartmentsAll(): Promise<Departments[] | null> {
    return await this.prisma.departments.findMany({})
    // return await this.prisma.$queryRaw`
    //   SELECT * FROM departments
    // `
  }

  async findUsersAll(): Promise<UserRelationDto[] | null> {
    return await this.prisma.users.findMany({ include: { department: true } })
  }

  async findUsers(
    id: number,
    startDate: string,
    endDate: string,
    pageNumber: number,
    take: number
  ): Promise<UserRelationDto[] | null> {
    return await this.prisma.users.findMany({
      where: this.createUsersWhere(id, startDate, endDate),
      take: take,
      skip: this.createUsersSkip(pageNumber, take),
      include: {
        department: true
      }
    })
    // return await this.prisma.$queryRaw<UserRelationDto[]>`
    //   SELECT * FROM users AS u
    //   INNER JOIN departments AS d
    //   ON u.departmentId = d.departmentId
    //   WHERE
    //   IF(${id ?? ''} = '', true, u.id = ${id})
    //   AND IF(${startDate ?? ''} = '', true, u.createdAt >= ${startDate + 'T00:00:00.000'})
    //   AND IF(${endDate ?? ''} = '', true, u.createdAt <= ${endDate + 'T23:59:59.999'})
    //   LIMIT ${this.createUsersSkip(pageNumber, take)}, ${take}
    // `
  }

  async findUserById(id: number): Promise<Users | null> {
    return await this.prisma.users.findUnique({ where: { id } })
  }

  async getUsersCount(id?: number, startDate?: string, endDate?: string): Promise<number> {
    return await this.prisma.users.count({
      where: this.createUsersWhere(id, startDate, endDate)
    })
    // const result = await this.prisma.$queryRaw`
    //   SELECT COUNT(*) as cnt FROM users AS u
    //   INNER JOIN departments AS d
    //   ON u.departmentId = d.departmentId
    //   WHERE
    //   IF(${id ?? ''} = '', true, u.id = ${id})
    //   AND IF(${startDate ?? ''} = '', true, u.createdAt >= ${startDate + 'T00:00:00.000'})
    //   AND IF(${endDate ?? ''} = '', true, u.createdAt <= ${endDate + 'T23:59:59.999'})
    // `
    // return Number(String(result[0]['cnt']))
  }

  async createUser(
    prismaTransaction: Prisma.TransactionClient,
    user: Prisma.usersUncheckedCreateInput
  ): Promise<Users> {
    return await prismaTransaction.users.create({
      data: user
    })
  }

  async updateUser(user: Prisma.usersUpdateArgs): Promise<Users> {
    return await this.prisma.users.update(user)
  }

  async deleteUser(id: number): Promise<Users> {
    return await this.prisma.users.delete({ where: { id } })
  }

  createUsersSkip(pageNumber: number, take: number): number {
    let skip = 0
    if (pageNumber) skip = (pageNumber - 1) * take
    return skip
  }

  createUsersWhere(id: number, startDate: string, endDate: string): object {
    const whereConditions = {}
    const createdAt = {}
    if (id) whereConditions['id'] = id
    if (startDate) createdAt['gte'] = new Date(startDate + 'T00:00:00.000')
    if (endDate) createdAt['lte'] = new Date(endDate + 'T23:59:59.999')
    whereConditions['createdAt'] = createdAt
    return whereConditions
  }
}

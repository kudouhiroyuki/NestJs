import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { Prisma, users as Users, departments as Departments } from '@prisma/client'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findDepartmentsAll(): Promise<Departments[]> {
    return await this.prisma.departments.findMany({})
    // return await this.prisma.$queryRaw`
    //   SELECT * FROM departments
    // `
  }

  async findUsersAll(): Promise<Users[]> {
    return await this.prisma.users.findMany({})
  }

  async findUsers(id: string, startDate: string, endDate: string, pageNumber: string, take: number): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: this.createUsersWhere(id, startDate, endDate),
      take: take,
      skip: this.createUsersSkip(pageNumber, take),
      include: {
        department: true
      }
    })
    // return await this.prisma.$queryRaw`
    //   SELECT * FROM users AS u
    //   INNER JOIN departments AS d
    //   ON u.departmentId = d.departmentId
    //   WHERE
    //   IF(${id ?? ''} = '', true, u.id = ${id})
    //   AND IF(${startDate ?? ''} = '', true, u.createdAt >= ${startDate})
    //   AND IF(${endDate ?? ''} = '', true, u.createdAt <= ${endDate})
    //   LIMIT ${this.createUsersSkip(pageNumber, take)}, ${take}
    // `
  }

  async findUserById(id: number): Promise<Users> {
    return await this.prisma.users.findFirst({ where: { id: id } })
  }

  async getUsersCount(id?: string, startDate?: string, endDate?: string): Promise<number> {
    return await this.prisma.users.count({
      where: this.createUsersWhere(id, startDate, endDate)
    })
  }

  async createUser(user: Prisma.usersUncheckedCreateInput) {
    return await this.prisma.users.create({
      data: user
    })
  }

  async updateUser(user: Prisma.usersUpdateArgs) {
    return await this.prisma.users.update(user)
  }

  async deleteUser(id: number) {
    return await this.prisma.users.delete({ where: { id: id } })
  }

  createUsersSkip(pageNumber: string, take: number): number {
    let skip = 0
    if (pageNumber && pageNumber !== '0') skip = (Number(pageNumber) - 1) * take
    return skip
  }

  createUsersWhere(id: string, startDate: string, endDate: string): object {
    const whereConditions = {}
    const createdAt = {}
    if (id) whereConditions['id'] = Number(id)
    if (startDate) createdAt['gte'] = new Date(startDate)
    if (endDate) createdAt['lte'] = new Date(endDate)
    whereConditions['createdAt'] = createdAt
    return whereConditions
  }
}

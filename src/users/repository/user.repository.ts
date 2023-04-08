import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

import { DepartmentEntity } from '../dto/entity/department.entity'
import { UserEntity, UserRelationEntity } from '../dto/entity/user.entity'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findDepartmentsAll(): Promise<DepartmentEntity[] | null> {
    return await this.prisma.department.findMany({})
    // return await this.prisma.$queryRaw`
    //   SELECT * FROM departments
    // `
  }

  async findUsersAll(): Promise<UserRelationEntity[] | null> {
    return await this.prisma.user.findMany({ include: { department: true } })
  }

  async findUsers(
    id: number,
    startDate: string,
    endDate: string,
    pageNumber: number,
    take: number
  ): Promise<UserRelationEntity[] | null> {
    return await this.prisma.user.findMany({
      where: this.createUsersWhere(id, startDate, endDate),
      take: take,
      skip: this.createUsersSkip(pageNumber, take),
      include: {
        department: true
      }
    })
    // return await this.prisma.$queryRaw<UserRelationEntity[]>`
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

  async findUserById(id: number): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async getUsersCount(id?: number, startDate?: string, endDate?: string): Promise<number> {
    return await this.prisma.user.count({
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
    user: Prisma.userUncheckedCreateInput
  ): Promise<UserEntity> {
    return await prismaTransaction.user.create({
      data: user
    })
  }

  async updateUser(user: Prisma.userUpdateArgs): Promise<UserEntity> {
    return await this.prisma.user.update(user)
  }

  async deleteUser(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({ where: { id } })
  }

  createUsersSkip(pageNumber: number, take: number): number {
    let skip = 0
    if (pageNumber) skip = (pageNumber - 1) * take
    return skip
  }

  createUsersWhere(id: number, startDate: string, endDate: string): object {
    const whereConditions = {}
    const created_at = {}
    if (id) whereConditions['id'] = id
    if (startDate) created_at['gte'] = new Date(startDate + 'T00:00:00.000')
    if (endDate) created_at['lte'] = new Date(endDate + 'T23:59:59.999')
    whereConditions['created_at'] = created_at
    return whereConditions
  }
}

/*
<---------------------------------------------------------------------------------------------------------->
■クーポン（coupon）
id unsigned int          // クーポンID
coupon_name varchar(50)  // クーポン名
discount_value int       // 値引値
enable_element enum      // 有効期間区分
<--- 有効期間区分 --->
1：期間指定(PERIOD)
2：期限指定(TERM)

■発券クーポン（ticketing_coupon）
id unsigned int                    // クーポンユニークID
coupon_id unsigned int             // クーポンID
coupon_code varchar(16)            // クーポンコード
member_id unsigned int             // 会員ID（クーポンが発行された会員ID）
coupon_status enum                 // クーポンステータス
enable_from_limit_datetime bigint  // 有効期限（from）
enable_to_limit_datetime bigint    // 有効期限（to）
enable_limit_date bigint           // 有効期限日（発券されたクーポンに設定された有効期限）
<--- クーポンステータス --->
1：未利用(UNUSED)
2：利用済み(USED)
3：もぎり済み(TABLATURED)
3：キャンセル済み(CANCELED)
4：有効期限切れ(EXPIRED)

INSERT INTO nest.coupon(id, coupon_name, discount_value, enable_element) VALUES
(1001, 'クーポンA', 200, '1'),
(1002, 'クーポンB', 200, '1');

INSERT INTO nest.ticketing_coupon (coupon_id, coupon_code, member_id, coupon_status, enable_from_limit_datetime, enable_to_limit_datetime, enable_limit_date) VALUES
(1001, '1111111111111111', 1, '1', 1673847616667, 1676593705853, 1673847616667),
(1002, '1111111111111111', 1, '1', 1673847616667, 1676593705853, 1673847616667);

■Repository
const memberId = 1
const couponCode = '1111111111111111'
const result = await this.prisma.$queryRaw`
  SELECT     c.coupon_name AS couponName,
             c.discount_value AS discountValue,
             tc.coupon_status AS couponStatus,
             tc.enable_from_limit_datetime AS enableFromLimitDatetime,
             tc.enable_to_limit_datetime AS enableToLimitDatetime,
             tc.enable_limit_date AS enableLimitDate,
             c.enable_element AS enableElement
  FROM       ticketing_coupon tc
  INNER JOIN coupon c
  ON         c.id = tc.coupon_id
  WHERE      tc.member_id = ${memberId}
  AND        tc.coupon_code = ${couponCode}
  ORDER BY   IF(c.enable_element = 'PERIOD', tc.enable_to_limit_datetime, tc.enable_limit_date) DESC
`

■Service
const coupons = [
  {
    couponName: 'クーポンB',
    discountValue: 200,
    couponStatus: 'UNUSED',
    enableFromLimitDatetime: 1673847616667,
    enableToLimitDatetime: 1676593705853,
    enableLimitDate: 1673847616667,
    enableElement: 'PERIOD'
  },
  {
    couponName: 'クーポンA',
    discountValue: 200,
    couponStatus: 'UNUSED',
    enableFromLimitDatetime: 1673845643271,
    enableToLimitDatetime: 1676593705853,
    enableLimitDate: 1673845643271,
    enableElement: 'PERIOD'
  }
]
const enableCoupons = coupons.filter((coupon) => {
  return (
    coupon.couponStatus === 'UNUSED' &&
    ((coupon.enableElement === 'PERIOD' &&
      coupon.enableFromLimitDatetime <= Date.now() &&
      Date.now() <= coupon.enableToLimitDatetime) ||
      (coupon.enableElement === 'TERM' && Date.now() <= coupon.enableLimitDate))
  )
})
return enableCoupons
<---------------------------------------------------------------------------------------------------------->

<---------------------------------------------------------------------------------------------------------->
*/

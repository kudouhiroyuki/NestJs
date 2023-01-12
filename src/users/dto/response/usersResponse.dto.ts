import { ApiProperty } from '@nestjs/swagger'
import { DepartmentEntity } from '../entity/department.entity'

export class UsersGetResponseDto {
  @ApiProperty({
    description: 'ユーザーID',
    example: '1'
  })
  id: number

  @ApiProperty({
    description: 'ユーザー名',
    example: '名前'
  })
  userName: string

  @ApiProperty({
    description: 'パスワード',
    example: 'password'
  })
  password: string

  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@gmail.com'
  })
  address: string

  @ApiProperty({
    description: '年齢',
    example: '30'
  })
  age: string

  @ApiProperty({
    description: '部署ID',
    example: 'A0001'
  })
  departmentId: string

  @ApiProperty({
    description: 'ポイント',
    example: 100
  })
  point: number

  @ApiProperty({
    description: '作成日時',
    example: '2023-01-12T05:38:09.000Z'
  })
  createdAt: Date

  @ApiProperty({
    description: '更新日時',
    example: '2023-01-12T05:38:09.000Z'
  })
  updateAt: Date
}

export class UsersRelationGetResponseDto {
  @ApiProperty({
    description: 'ユーザーID',
    example: '1'
  })
  id: number

  @ApiProperty({
    description: 'ユーザー名',
    example: '名前'
  })
  userName: string

  @ApiProperty({
    description: 'パスワード',
    example: 'password'
  })
  password: string

  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@gmail.com'
  })
  address: string

  @ApiProperty({
    description: '年齢',
    example: '30'
  })
  age: string

  @ApiProperty({
    description: '部署',
    type: DepartmentEntity
  })
  department: DepartmentEntity

  @ApiProperty({
    description: 'ポイント',
    example: 100
  })
  point: number

  @ApiProperty({
    description: '作成日時',
    example: '2023-01-12T05:38:09.000Z'
  })
  createdAt: Date

  @ApiProperty({
    description: '更新日時',
    example: '2023-01-12T05:38:09.000Z'
  })
  updateAt: Date
}

export class UsersCopyGetResponseDto {
  @ApiProperty({
    description: 'ユーザー名',
    example: '名前'
  })
  userName: string

  @ApiProperty({
    description: 'パスワード',
    example: 'password'
  })
  password: string

  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@gmail.com'
  })
  address: string

  @ApiProperty({
    description: '年齢',
    example: '30'
  })
  age: string

  @ApiProperty({
    description: '部署ID',
    example: 'A0001'
  })
  departmentId: string
}

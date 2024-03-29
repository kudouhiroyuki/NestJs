import { ApiProperty } from '@nestjs/swagger'
import { DepartmentEntity } from './department.entity'

export class UserEntity {
  @ApiProperty({
    description: 'ユーザーID',
    example: 1
  })
  id: number

  @ApiProperty({
    description: 'ユーザー名',
    example: '名前'
  })
  user_name: string

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
    example: '1001'
  })
  department_id: string

  @ApiProperty({
    description: 'ポイント',
    example: 100
  })
  point: number

  created_at: Date
  update_at: Date
}

export class UserRelationEntity {
  @ApiProperty({
    description: 'ユーザーID',
    example: 1
  })
  id: number

  @ApiProperty({
    description: 'ユーザー名',
    example: '名前'
  })
  user_name: string

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

  created_at: Date
  update_at: Date
}

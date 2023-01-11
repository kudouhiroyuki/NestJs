import { ApiProperty } from '@nestjs/swagger'
import { users as Users } from '@prisma/client'
import { DepartmentDto } from './department.dto'
import { ValidationErrorResponseDto } from '../../../error/errorResponse.dto'

export class UserDto {
  constructor(params: Users) {
    this.userName = params.userName
    this.password = params.password
    this.address = params.address
    this.age = params.age
    this.departmentId = params.departmentId
  }
  @ApiProperty({
    description: 'ユーザーID',
    example: 1
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

  createdAt: Date
  updateAt: Date
}

export class UsersShowGetResponse {
  @ApiProperty({
    description: 'バリデーションエラー',
    type: [ValidationErrorResponseDto]
  })
  errors: []

  @ApiProperty({
    description: 'ユーザー詳細',
    type: UserDto
  })
  forms: UserDto

  @ApiProperty({
    description: '部署リスト',
    type: DepartmentDto
  })
  department: DepartmentDto
}

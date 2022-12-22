import { ApiProperty } from '@nestjs/swagger'
import { departments as Departments } from '@prisma/client'
import { ValidationErrorResponseDto } from '../../../error/errorResponse.dto'

export class DepartmentDto {
  constructor(department: Departments) {
    this.departmentId = department.departmentId
    this.departmentName = department.departmentName
  }
  @ApiProperty({
    description: '部署ID',
    example: 'A0001'
  })
  departmentId: string

  @ApiProperty({
    description: '部署名',
    example: 'アプリケーション'
  })
  departmentName: string
}

export class UserDto {
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
    description: '部署',
    type: DepartmentDto
  })
  department: DepartmentDto

  @ApiProperty({
    description: 'ポイント',
    example: 100
  })
  point: number

  createdAt: Date
  updateAt: Date
}

export class UsersGetResponseDto {
  constructor(users: UserDto[], pagination: number) {
    this.users = users
    this.pagination = pagination
  }
  @ApiProperty({
    description: 'バリデーションエラー',
    type: [ValidationErrorResponseDto]
  })
  errors: []

  @ApiProperty({
    description: 'ユーザーリスト',
    type: [UserDto]
  })
  users: UserDto[]

  @ApiProperty({
    description: 'ページネーション',
    example: 1
  })
  pagination: number
}

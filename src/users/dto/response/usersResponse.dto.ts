import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({
    description: 'ユーザーID',
    example: 1
  })
  id: number

  userName: string
  password: string
  address: string
  age: string
  departmentId: string
  point: number | null
  createdAt: Date
  updateAt: Date
}

export class UsersGetResponseDto {
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

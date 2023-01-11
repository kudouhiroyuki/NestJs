import { ApiProperty } from '@nestjs/swagger'
import { DepartmentDto } from './department.dto'

export class UserRelationDto {
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
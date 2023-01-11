import { ApiProperty } from '@nestjs/swagger'
import { UserRelationDto } from './userRelation.dto'
import { ValidationErrorResponseDto } from '../../../error/errorResponse.dto'

export class UsersIndexGetResponse {
  constructor(users: UserRelationDto[], pagination: number) {
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
    type: [UserRelationDto]
  })
  users: UserRelationDto[]

  @ApiProperty({
    description: 'ページネーション',
    example: 1
  })
  pagination: number
}

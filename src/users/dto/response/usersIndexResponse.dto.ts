import { ApiProperty } from '@nestjs/swagger'
import { UsersRelationGetResponseDto } from './usersResponse.dto'
import { ValidationErrorResponseDto } from '../../../error/errorResponse.dto'

export class UsersIndexGetResponse {
  @ApiProperty({
    description: 'バリデーションエラー',
    type: [ValidationErrorResponseDto]
  })
  errors: []

  @ApiProperty({
    description: 'ユーザーリスト',
    type: [UsersRelationGetResponseDto]
  })
  users: UsersRelationGetResponseDto[]

  @ApiProperty({
    description: 'ページネーション',
    example: 1
  })
  pagination: number
}

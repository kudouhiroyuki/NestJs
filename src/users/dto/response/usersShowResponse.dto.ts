import { ApiProperty } from '@nestjs/swagger'
import { UsersGetResponseDto } from './usersResponse.dto'
import { DepartsmentsGetResponseDto } from '../response/departmentsResponse.dto'
import { ValidationErrorResponseDto } from '../../../error/errorResponse.dto'

export class UsersShowGetResponse {
  @ApiProperty({
    description: 'バリデーションエラー',
    type: [ValidationErrorResponseDto]
  })
  errors: []

  @ApiProperty({
    description: 'ユーザー詳細',
    type: UsersGetResponseDto
  })
  forms: UsersGetResponseDto

  @ApiProperty({
    description: '部署リスト',
    type: [DepartsmentsGetResponseDto]
  })
  department: DepartsmentsGetResponseDto[]
}

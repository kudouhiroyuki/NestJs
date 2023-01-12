import { ApiProperty } from '@nestjs/swagger'
import { UsersCopyGetResponseDto } from './usersResponse.dto'
import { DepartsmentsGetResponseDto } from '../response/departmentsResponse.dto'
import { ValidationErrorResponseDto } from '../../../error/errorResponse.dto'

export class UsersCreateGetResponse {
  @ApiProperty({
    description: 'バリデーションエラー',
    type: [ValidationErrorResponseDto]
  })
  errors: []

  @ApiProperty({
    description: 'ユーザーリスト',
    type: [UsersCopyGetResponseDto]
  })
  users: UsersCopyGetResponseDto[]

  @ApiProperty({
    description: '部署リスト',
    type: [DepartsmentsGetResponseDto]
  })
  department: DepartsmentsGetResponseDto[]
}

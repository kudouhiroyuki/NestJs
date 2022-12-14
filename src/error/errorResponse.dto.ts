import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponseDto {
  @ApiProperty({
    description: 'httpステータスコードと同じ値を設定',
    type: 'integer',
    example: 'http status code'
  })
  statusCode: number

  @ApiProperty({
    description: 'メッセージリスト',
    example: 'messages',
    type: [String]
  })
  message: [string]

  @ApiProperty({
    description: 'エラーメッセージ',
    example: 'error',
    required: false
  })
  error: string
}

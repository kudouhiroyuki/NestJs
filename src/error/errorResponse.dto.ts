import { ApiProperty } from '@nestjs/swagger'

export class ValidationErrorResponseDto {
  @ApiProperty({
    description: 'プロパティ',
    example: 'id'
  })
  property: string

  @ApiProperty({
    description: 'メッセージ',
    example: { isInt: 'idは数値で入力してください' }
  })
  constraints: object
}

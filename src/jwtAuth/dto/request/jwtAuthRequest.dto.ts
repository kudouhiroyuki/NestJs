import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumberString } from 'class-validator'

export class JwtAuthPostRequestDto {
  @ApiProperty({
    description: 'ID',
    example: '1'
  })
  @IsNumberString()
  @IsNotEmpty()
  id: string

  @ApiProperty({
    description: 'パスワード',
    example: 'password'
  })
  @IsString()
  @IsNotEmpty()
  password: string
}

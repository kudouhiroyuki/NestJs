import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsNumberString } from 'class-validator'

export class UsersGetRequestDto {
  @IsOptional()
  @IsNumberString()
  id: number

  @IsOptional()
  @IsNumberString()
  pageNumber: number
}

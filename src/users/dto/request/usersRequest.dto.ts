import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsDateString, IsInt, Min, ValidateIf, IsNumberString, IsNotEmpty } from 'class-validator'

export class UsersGetRequestDto {
  @Type(() => Number)
  id: number

  startDate: string
  endDate: string

  @Type(() => Number)
  pageNumber: number
}

export class UsersGetRequestCheckDto {
  constructor(params: UsersGetRequestDto) {
    this.id = params.id
    this.startDate = params.startDate
    this.endDate = params.endDate
    this.pageNumber = params.pageNumber
  }
  @IsOptional()
  @IsInt({ message: 'idは数値で入力してください' })
  id: number

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsDateString({}, { message: 'startDateを正しく入力してください' })
  startDate: string

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsDateString({}, { message: 'endDateを正しく入力してください' })
  endDate: string

  @IsOptional()
  @IsInt({ message: 'pageNumberは数値で入力してください' })
  @Min(1, { message: 'pageNumberは1以上で入力してください' })
  pageNumber: number
}

export class UsersDeleteRequestDto {
  @ApiProperty({
    description: 'ID',
    example: '1'
  })
  id: string
}

export class UsersDeleteCheckDto {
  constructor(params: UsersDeleteRequestDto) {
    this.id = params.id
  }
  @IsNumberString({}, { message: 'IDを正しく入力してください' })
  @IsNotEmpty({ message: 'IDを入力してください' })
  id: string
}

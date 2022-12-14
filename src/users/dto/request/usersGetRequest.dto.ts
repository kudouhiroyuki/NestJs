import { IsOptional, IsNumberString, IsDateString, ValidateIf } from 'class-validator'

export class UsersGetRequestDto {
  id: string
  startDate: string
  endDate: string
  pageNumber: string
}

export class UsersGetRequestCheckDto {
  constructor(params: UsersGetRequestDto) {
    this.id = params.id
    this.startDate = params.startDate
    this.endDate = params.endDate
    this.pageNumber = params.pageNumber
  }

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsNumberString({}, { message: 'idは数値で入力してください' })
  id: string

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsDateString({}, { message: 'startDateを正しく入力してください' })
  startDate: string

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsDateString({}, { message: 'endDateを正しく入力してください' })
  endDate: string

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsNumberString({}, { message: 'pageNumberは数値で入力してください' })
  pageNumber: string
}

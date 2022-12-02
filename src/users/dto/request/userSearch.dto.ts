import { IsOptional, IsNumberString, IsString, IsDateString, ValidateIf } from 'class-validator'

export class UserSearchDto {
  id: string
  userName: string
  createdAt: string
  pageNumber: string
}

export class UserSearchCheckDto {
  constructor(params: UserSearchDto) {
    this.id = params.id
    this.userName = params.userName
    this.createdAt = params.createdAt
    this.pageNumber = params.pageNumber
  }

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsNumberString({}, { message: 'idは数値で入力してください' })
  id: string

  @IsOptional()
  @IsString()
  userName: string

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsDateString({}, { message: 'createdAtを正しく入力してください' })
  createdAt: string

  @IsOptional()
  @ValidateIf((o, v) => v != null && v.length)
  @IsNumberString({}, { message: 'pageNumberは数値で入力してください' })
  pageNumber: string
}

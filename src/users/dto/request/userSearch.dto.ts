import { IsOptional, IsNumberString, IsString, IsDateString } from 'class-validator'

export class UserSearchDto {
  id: string
  userName: string
  createdAt: string
}

export class UserSearchCheckDto {
  constructor(params: UserSearchDto) {
    this.id = params.id
    this.userName = params.userName
    this.createdAt = params.createdAt
  }

  @IsOptional()
  @IsNumberString({}, { message: 'idは数値で入力してください' })
  id: string

  @IsOptional()
  @IsString()
  userName: string

  @IsOptional()
  @IsDateString({}, { message: 'createdAtを正しく入力してください' })
  createdAt: string
}

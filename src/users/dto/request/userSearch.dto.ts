import { IsNumberString, IsString } from 'class-validator'

export class UserSearchCheckDto {
  constructor(params: UserSearchDto) {
    this.id = params.id
    this.userName = params.userName
  }

  @IsNumberString({}, { message: 'idは数値で入力してください' })
  id: string

  @IsString()
  userName: string
}

export class UserSearchDto {
  id: string
  userName: string
}

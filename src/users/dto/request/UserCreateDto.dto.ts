import { IsString, IsNotEmpty, Length } from 'class-validator'

export class UserCreateDto {
  userName: string
}

export class UserCreateCheckDto {
  constructor(params: UserCreateDto) {
    this.userName = params.userName
  }

  @IsString()
  @IsNotEmpty({ message: 'userNameが入力されていません。' })
  @Length(1, 10, { message: 'userNameは10文字以内で入力してください' })
  userName: string
}

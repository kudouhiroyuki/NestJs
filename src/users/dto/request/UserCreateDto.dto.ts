import { IsString, IsEmail, IsNotEmpty, Length, IsIn, IsNumberString } from 'class-validator'
import { IsJpName } from '../../../utils/validation.utils'

export class UserCreateDto {
  id: string
  userName: string
  password: string
  address: string
  age: string
  departmentId: string
  createdAt: string
  updateAt: string
}

export class UserCreateCheckDto {
  constructor(params: UserCreateDto) {
    this.userName = params.userName
    this.address = params.address
    this.age = params.age
    this.departmentId = params.departmentId
  }

  @IsString({ message: '名前を正しく入力してください' })
  @IsNotEmpty({ message: '名前を入力してください' })
  @Length(1, 30, { message: '名前は30文字以内で入力してください' })
  @IsJpName({ message: '名前は漢字・カタカナ・ひらがなで入力してください' })
  userName: string

  @IsEmail({}, { message: 'メールアドレスを正しく入力してください' })
  @IsNotEmpty({ message: 'メールアドレスを入力してください' })
  @Length(5, 50, { message: 'メールアドレスは50文字以内で入力してください' })
  address: string

  @IsNumberString({}, { message: '年齢を正しく入力してください' })
  @IsNotEmpty({ message: '年齢を入力してください' })
  age: string

  @IsString({ message: '部署IDを正しく入力してください' })
  @IsNotEmpty({ message: '部署IDを入力してください' })
  @IsIn(['A0001', 'B0001'], { message: '部署IDを正しく入力してください' })
  departmentId: string
}

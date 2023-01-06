import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsEmail, IsNotEmpty, Length, IsIn, IsNumberString } from 'class-validator'
import { IsJpName, IsUserPassword } from '../../../utils/validation.utils'

export class UsersCreateGetRequestDto {
  id: string
}

export class UsersCreatePostRequestDto {
  @ApiProperty({ description: 'ID' })
  id: string
  @ApiProperty({ description: '名前' })
  userName: string
  @ApiProperty({ description: 'パスワード' })
  password: string
  @ApiProperty({ description: 'メールアドレス' })
  address: string
  @ApiProperty({ description: '年齢' })
  age: string
  @ApiProperty({ description: '部署ID' })
  departmentId: string
  createdAt: string
  updateAt: string
}

export class UsersCreatePostRequestCheckDto {
  constructor(params: UsersCreatePostRequestDto) {
    this.id = params.id
    this.userName = params.userName
    this.password = params.password
    this.address = params.address
    this.age = params.age
    this.departmentId = params.departmentId
  }
  @IsNumberString({}, { message: 'idを正しく入力してください' })
  @ApiProperty({
    description: 'ID（ユーザー更新）',
    required: false,
    example: ''
  })
  id?: string

  @IsString({ message: '名前を正しく入力してください' })
  @IsNotEmpty({ message: '名前を入力してください' })
  @Length(1, 30, { message: '名前は30文字以内で入力してください' })
  @IsJpName({ message: '名前は漢字・カタカナ・ひらがなで入力してください' })
  @ApiProperty({
    description: '名前（漢字・カタカナ・ひらがな）',
    minLength: 1,
    maxLength: 30,
    example: '田中'
  })
  userName: string

  @IsString({ message: 'パスワードを正しく入力してください' })
  @IsNotEmpty({ message: 'パスワードを入力してください' })
  @Length(8, 20, { message: 'パスワードは8〜20文字以内で入力してください' })
  @IsUserPassword({ message: 'パスワードは数字・英字・記号で入力してください' })
  @ApiProperty({
    description: 'パスワード',
    minLength: 8,
    maxLength: 20,
    example: '12345678'
  })
  password: string

  @IsEmail({}, { message: 'メールアドレスを正しく入力してください' })
  @IsNotEmpty({ message: 'メールアドレスを入力してください' })
  @Length(5, 50, { message: 'メールアドレスは50文字以内で入力してください' })
  @ApiProperty({
    description: 'メールアドレス',
    minLength: 5,
    maxLength: 50,
    example: 'mailaddress@mail.jp'
  })
  address: string

  @IsNumberString({}, { message: '年齢を正しく入力してください' })
  @IsNotEmpty({ message: '年齢を入力してください' })
  @ApiProperty({
    description: '年齢',
    example: '30'
  })
  age: string

  @IsString({ message: '部署IDを正しく入力してください' })
  @IsNotEmpty({ message: '部署IDを入力してください' })
  @IsIn(['A0001', 'B0001'], { message: '部署IDを正しく入力してください' })
  @ApiProperty({
    description: '部署ID',
    enum: ['A0001', 'B0001'],
    example: 'A0001'
  })
  departmentId: string
}

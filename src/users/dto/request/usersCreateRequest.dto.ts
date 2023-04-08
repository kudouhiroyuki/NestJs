import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsEmail, IsNotEmpty, Length, IsIn, IsNumberString } from 'class-validator'
import { IsJpName, IsUserPassword } from '../../../utils/validation.utils'

export class UsersCreateGetRequestDto {
  @Type(() => Number)
  copyId: number
}

export class UsersCreatePostRequestDto {
  @ApiProperty({ description: '名前' })
  user_name: string
  @ApiProperty({ description: 'パスワード' })
  password: string
  @ApiProperty({ description: 'メールアドレス' })
  address: string
  @ApiProperty({ description: '年齢' })
  age: string
  @ApiProperty({ description: '部署ID' })
  department_id: string
  point: number
  created_at: string
  update_at: string
}

export class UsersCreatePostRequestCheckDto {
  constructor(params: UsersCreatePostRequestDto) {
    this.user_name = params.user_name
    this.password = params.password
    this.address = params.address
    this.age = params.age
    this.department_id = params.department_id
  }

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
  user_name: string

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
  department_id: string
}

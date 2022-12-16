import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
/**
 * ### 公開パス
 *
 * 画面やAPIに設定すると認証なしでアクセスできます。
 *
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const IS_PASSWORD_RESET_KEY = 'isPasswordReset'
/**
 * ### パスワード変更パス
 *
 * パスワード変更用の画面やAPIに設定するとID認証のみでアクセスできます。
 *
 */
export const PasswordReset = () => SetMetadata(IS_PASSWORD_RESET_KEY, true)

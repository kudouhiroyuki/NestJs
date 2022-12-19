import { SetMetadata } from '@nestjs/common'

/**
 * ■公開パス
 * 画面やAPIに設定すると認証なしでアクセスできます。
 */
export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

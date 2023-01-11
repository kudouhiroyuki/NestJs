export class DatetimeUtils {
  /**
   * 現在日時を取得
   * @returns 現在日時（Unixtime）
   */
  static getNowUnix(): number {
    return Date.now()
  }

  /**
   * 日時をJST時刻文字列に変換
   * @param datetime 日時（Unixtime）
   * @returns JST日時文字列
   */
  static convertJstString(datetime: number): string {
    const japan = new Intl.Locale('ja-JP')
    const jstTime = new Date(datetime).toLocaleString(japan)
    return jstTime
  }

  /**
   * 日付文字列にスラッシュを付与
   * @param yyyymmdd 日付文字列（yyyyMMdd形式）
   * @returns 日付文字列（yyyy/MM/dd形式）
   */
  static addSlash(yyyymmdd: string): string {
    if (yyyymmdd == null || yyyymmdd.length != 8) {
      return yyyymmdd
    }
    return `${yyyymmdd.substring(0, 4)}/${yyyymmdd.substring(4, 6)}/${yyyymmdd.substring(6, 8)}`
  }

  /**
   * 日付文字列にハイフンを付与
   * @param yyyymmdd 日付文字列（yyyyMMdd形式）
   * @returns 日付文字列（yyyy-MM-dd形式）
   */
  static addHyphen(yyyymmdd: string): string {
    if (yyyymmdd == null || yyyymmdd.length != 8) {
      return yyyymmdd
    }
    return `${yyyymmdd.substring(0, 4)}-${yyyymmdd.substring(4, 6)}-${yyyymmdd.substring(6, 8)}`
  }

  /**
   * 時刻文字列にコロンを付与
   * @param hhmm 時刻文字列（HHmm形式）
   * @returns 時刻文字列（HH:mm形式）
   */
  static addColon(hhmm: string): string {
    if (hhmm == null || hhmm.length != 4) {
      return hhmm
    }
    return `${hhmm.substring(0, 2)}:${hhmm.substring(2, 4)}`
  }
}

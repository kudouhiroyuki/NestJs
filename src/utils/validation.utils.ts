import { ValidationOptions, ValidateBy } from 'class-validator'

export function IsKatakana(validationOptions?: ValidationOptions): PropertyDecorator {
  const message = validationOptions?.message ?? `カタカナで入力してください`
  return ValidateBy(
    {
      name: 'IsKatakana',
      validator: {
        validate(value): boolean {
          return RegExp(/^[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]+$/mu).test(value)
        }
      }
    },
    { ...validationOptions, message }
  )
}

export function IsJpName(validationOptions?: ValidationOptions): PropertyDecorator {
  const message = validationOptions?.message ?? `漢字・カタカナ・ひらがなで入力してください`
  return ValidateBy(
    {
      name: 'IsJpName',
      validator: {
        validate(value): boolean {
          return RegExp(
            /^(([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)|([\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}])|([\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]))+$/mu
          ).test(value)
        }
      }
    },
    { ...validationOptions, message }
  )
}

export function IsUserPassword(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'IsUserPassword',
      validator: {
        validate(value): boolean {
          return RegExp('^[!-~]+$').test(value)
        }
      }
    },
    validationOptions
  )
}

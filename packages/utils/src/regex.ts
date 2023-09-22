export const URL_REGEX = /^(http|https):\/\/[\w.:\-@]*/;

export const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

export const ID_NUMBER_REGEX =
  /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

export const MOBILE_PHONE_REGEX =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

export const CAR_NUMBER_NEW_REGEX =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

export const CAR_NUMBER_REGEX =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;

export function isUrl(str: string) {
  return URL_REGEX.test(str);
}

export function isEmail(str: string) {
  return EMAIL_REGEX.test(str);
}

export function isIdNumber(str: string) {
  return ID_NUMBER_REGEX.test(str);
}

export function isMobilePhone(str: string) {
  return MOBILE_PHONE_REGEX.test(str);
}

export function isCarNo(str: string) {
  return CAR_NUMBER_REGEX.test(str) || CAR_NUMBER_NEW_REGEX.test(str);
}

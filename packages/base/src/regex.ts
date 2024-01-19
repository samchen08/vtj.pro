/**
 * url表达式
 */
export const rURL = /^(http|https):\/\/[\w.:\-@]*/;

/**
 * 邮箱地址表达式
 */
export const rEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

/**
 * 身份证号码表达式
 */
export const rID =
  /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

/**
 * 手机号码表达式
 */
export const rMobile = /^(0|86|17951)?(1[\d]{10})$/;

/**
 * 车牌号码表达式
 */
export const rCar =
  /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/;

/**
 * 检查url
 * @param content
 * @returns
 */
export function isUrl(content: string) {
  return rURL.test(content);
}

/**
 *  检查邮箱地址
 * @param content
 * @returns
 */
export function isEmail(content: string) {
  return rEmail.test(content);
}

/**
 * 检查身份证号码
 * @param content
 * @returns
 */
export function isIdCardNo(content: string) {
  return rID.test(content);
}

/**
 * 检查手机号码
 * @param content
 * @returns
 */
export function isMobilePhone(content: string) {
  return rMobile.test(content);
}

/**
 * 检查车牌号码
 * @param content
 * @returns
 */
export function isCarNo(content: string) {
  return rCar.test(content);
}

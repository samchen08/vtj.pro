import type { MaybePromise } from '../shared';

export interface CaptchaProps {
  /**
   * 图片加载函数
   * @returns
   */
  src?: () => MaybePromise<string>;
  /**
   * 验证码长度
   */
  maxlength?: number;

  placeholder?: string;

  /**
   * 校验函数
   * @param value
   * @returns
   */
  validate?: (value: string) => MaybePromise<boolean>;
}

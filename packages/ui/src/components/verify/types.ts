export interface VerifyProps {
  /**
   * 发送验证码接口
   */
  api?: () => Promise<boolean>;
  /**
   * 重发倒数秒数
   */
  seconds?: number;
  /**
   * 验证码长度
   */
  maxlength?: number;

  /**
   * 提示文本
   */
  placeholder?: string;
}

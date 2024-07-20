import type { QRCodeOptions } from 'qrcode';
import type { MaybePromise } from '../shared';
export type QrCodeContentLoader = () => MaybePromise<string>;

export interface QrCodeProps {
  /**
   * 二维码尺寸
   */
  size?: number;

  /**
   * 二维码内容
   */
  content?: string | QrCodeContentLoader;

  /**
   *  过期时间
   */
  expired?: number;

  /**
   * 提示文本
   */
  tip?: string;

  /**
   * qrcode 配置参数
   */
  options?: QRCodeOptions;
}

export type QrCodeEmits = {
  draw: [value: string];
  expired: [];
};

export {};

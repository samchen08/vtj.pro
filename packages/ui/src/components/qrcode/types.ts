import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';
import type {
  QRCodeToDataURLOptions,
  QRCodeToDataURLOptionsJpegWebp
} from 'qrcode';

export type { QRCodeSegment } from 'qrcode';

export type QRCodeValue = string | (() => Promise<string>);

export const TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const;

export type QRCodeProps = Omit<QRCodeToDataURLOptions, 'renderOptions'> &
  QRCodeToDataURLOptionsJpegWebp['rendererOpts'] & {
    value: QRCodeValue;
  };

export const qrcodeProps = {
  /**
   * 外边距 margin
   */
  margin: {
    type: Number,
    default: 4
  },
  /**
   *  规模 scale
   */
  scale: {
    type: Number,
    default: 4
  },
  /**
   *  宽度 width
   */
  width: {
    type: Number
  },
  // color
  color: {
    type: Object
  },
  /**
   * dark color
   */
  darkColor: {
    type: String,
    default: '#000000ff'
  },

  /**
   * dark color
   */
  lightColor: {
    type: String,
    default: '#ffffffff'
  },
  // 品质 quality
  quality: {
    type: Number,
    default: 0.92
  },
  // 值 value
  value: {
    type: [String, Function] as PropType<QRCodeValue>,
    default: ''
  },
  // 超时时间  毫秒
  timeout: {
    type: Number,
    default: 0
  },
  // tip
  tip: {
    type: String,
    default: '二维码已失效请刷新居重试'
  }
};

export type qrcodeProps = ComponentPropsType<typeof qrcodeProps>;

export type qrcodeEmits = {
  refresh: [];
};

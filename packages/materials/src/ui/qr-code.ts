import type { MaterialDescription } from '@vtj/core';

const qrcode: MaterialDescription = {
  name: 'XQrCode',
  label: '二维码',
  categoryId: 'base',
  props: [
    {
      name: 'size',
      title: '二维码尺寸',
      setters: 'NumberSetter'
    },
    {
      name: 'content',
      setters: ['StringSetter', 'FunctionSetter']
    },
    {
      name: 'expired',
      title: '设置过期时间，单位毫秒',
      setters: 'NumberSetter'
    },
    {
      name: 'tip',
      title: '过期时提示文本',
      setters: 'StringSetter'
    },
    {
      name: 'options',
      title: 'qrcode工具配置参数：https://www.npmjs.com/package/qrcode',
      setters: 'ObjectSetter'
    }
  ],
  events: [
    {
      name: 'refresh'
    },
    {
      name: 'draw'
    }
  ],
  slots: ['tip'],
  snippet: {
    props: {}
  }
};

export default qrcode;

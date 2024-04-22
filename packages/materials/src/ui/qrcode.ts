import type { MaterialDescription } from '@vtj/core';

const qrcode: MaterialDescription = {
  name: 'XQrcode',
  label: '二维码',
  categoryId: 'base',
  props: [
    {
      name: 'margin',
      setters: 'NumberSetter',
      defaultValue: 4
    },
    {
      name: 'scale',
      setters: 'NumberSetter',
      defaultValue: 4
    },
    {
      name: 'width',
      setters: 'NumberSetter',
      defaultValue: 400
    },
    {
      name: 'darkColor',
      setters: 'StringSetter',
      defaultValue: '#000000ff'
    },
    {
      name: 'lightColor',
      setters: 'StringSetter',
      defaultValue: '#ffffffff'
    },
    {
      name: 'quality',
      title: 'number(0-1)',
      setters: 'NumberSetter',
      defaultValue: 0.92
    },
    {
      name: 'value',
      setters: ['StringSetter', 'FunctionSetter']
    },
    {
      name: 'timeout',
      setters: 'NumberSetter',
      defaultValue: 0
    },
    {
      name: 'tip',
      setters: 'StringSetter'
    }
  ],
  events: [
    {
      name: 'refresh'
    }
  ],
  snippet: {
    props: {
      value: '二维码数据',
      timeout: 2000
    }
  }
};

export default qrcode;

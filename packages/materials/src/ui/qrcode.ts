import type { MaterialDescription } from '@vtj/core';

const qrcode: MaterialDescription = {
  name: 'XQrcode',
  label: '二维码',
  categoryId: 'base',
  props: [
    {
      name: 'margin',
      setters: 'NumberSetter'
    },
    {
      name: 'scale',
      setters: 'NumberSetter'
    },
    {
      name: 'width',
      setters: 'NumberSetter'
    },
    {
      name: 'darkColor',
      setters: 'StringSetter'
    },
    {
      name: 'lightColor',
      setters: 'StringSetter'
    },
    {
      name: 'quality',
      title: 'number(0-1)',
      setters: 'NumberSetter'
    },
    {
      name: 'value',
      setters: ['StringSetter', 'FunctionSetter']
    },
    {
      name: 'timeout',
      setters: 'NumberSetter'
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

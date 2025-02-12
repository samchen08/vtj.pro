import type { MaterialDescription } from '@vtj/core';

const Signature: MaterialDescription = {
  name: 'VanSignature',
  alias: 'Signature',
  label: '签名',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/signature',
  props: [
    {
      name: 'type',
      title: '导出图片类型',
      defaultValue: 'png',
      setters: 'StringSetter'
    },
    {
      name: 'pen-color',
      title: '笔触颜色，默认黑色',
      defaultValue: '#000000',
      setters: 'StringSetter'
    },
    {
      name: 'line-width',
      title: '线条宽度',
      defaultValue: 3,
      setters: 'NumberSetter'
    },
    {
      name: 'background-color',
      title: '背景颜色',
      setters: 'StringSetter'
    },
    {
      name: 'tips',
      title: '当不支持 Canvas 的时候出现的提示文案',
      setters: 'StringSetter'
    },
    {
      name: 'clear-button-text',
      title: '清除按钮文案',
      defaultValue: '清空',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-text',
      title: '	确认按钮文案',
      defaultValue: '确认',
      setters: 'StringSetter'
    }
  ],
  events: [
    { name: 'start' },
    { name: 'end' },
    { name: 'signing', params: ['event'] },
    { name: 'submit', params: ['data'] },
    { name: 'clear' }
  ]
};

export default Signature;

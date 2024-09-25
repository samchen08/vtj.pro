import type { MaterialDescription } from '@vtj/core';

const PasswordInput: MaterialDescription = {
  name: 'VantPasswordInput',
  alias: 'PasswordInput',
  label: '密码输入框',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/password-input',
  props: [
    {
      name: 'value',
      title: '密码值',
      setters: 'StringSetter'
    },
    {
      name: 'info',
      title: '输入框下方文字提示',
      setters: 'StringSetter'
    },
    {
      name: 'error-info',
      title: '输入框下方错误提示',
      setters: 'StringSetter'
    },
    {
      name: 'length',
      title: '密码最大长度',
      defaultValue: 6,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'gutter',
      title: '输入框格子之间的间距，如 20px 2em，默认单位为px',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'mask',
      title: '是否隐藏密码内容',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'focused',
      title: '是否已聚焦，聚焦时会显示光标',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['focus'],
  snippet: {
    props: {
      value: '123456'
    }
  }
};

export default PasswordInput;

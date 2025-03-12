import type { MaterialDescription } from '@vtj/core';

const ContactEdit: MaterialDescription = {
  name: 'VanContactEdit',
  alias: 'ContactEdit',
  label: '联系人编辑',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/contact-edit',
  props: [
    {
      name: 'contact-info',
      title: '联系人信息',
      defaultValue: {},
      setters: 'ObjectSetter'
    },
    {
      name: 'is-edit',
      title: '是否为编辑联系人',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'is-saving',
      title: '是否显示保存按钮加载动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'is-deleting',
      title: '是否显示删除按钮加载动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'tel-validator',
      title: '手机号格式校验函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'show-set-default',
      title: '是否显示默认联系人栏',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'set-default-label',
      title: '默认联系人栏文案',
      setters: 'StringSetter'
    }
  ],
  events: [
    { name: 'save', params: ['content'] },
    { name: 'delete', params: ['content'] },
    { name: 'changeDefault', params: ['checked'] }
  ],
  snippet: {
    props: {
      'is-edit': true,
      'show-set-default': true,
      'contact-info': {
        tel: '',
        name: ''
      },
      'set-default-label': '设为默认联系人'
    }
  }
};

export default ContactEdit;

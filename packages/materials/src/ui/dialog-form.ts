import type { MaterialDescription } from '@vtj/core';
import dialog from './dialog';
import { omitPropItem, size } from '../shared';

const desc: MaterialDescription = {
  name: 'XDialogForm',
  label: '弹窗表单',
  categoryId: 'form',
  props: [
    {
      name: 'modelValue',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    size(),
    {
      name: 'submit',
      setters: ['StringSetter', 'BooleanSetter'],
      defaultValue: '确定'
    },
    {
      name: 'cancel',
      setters: ['StringSetter', 'BooleanSetter'],
      defaultValue: '取消'
    },
    {
      name: 'model',
      setters: 'ObjectSetter'
    },
    {
      name: 'rules',
      setters: 'ObjectSetter'
    },
    {
      name: 'formProps',
      title: '表单XForm组件参数选项',
      setters: 'ObjectSetter'
    },
    {
      name: 'submitMethod',
      title: '表单提交处理方法, return true 关闭弹窗',
      setters: 'FunctionSetter'
    },
    ...omitPropItem(dialog.props, ['modelValue', 'size', 'submit', 'cancel'])
  ],
  events: [
    { name: 'update:modelValue', params: ['modelValue'] },
    { name: 'submit', params: ['model'] },
    { name: 'close' }
  ],
  slots: ['default', 'extra', 'handle', 'footer'],
  snippet: {
    props: {
      title: '弹窗表单'
    }
  }
};

export default desc;

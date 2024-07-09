import type { MaterialDescription } from '@vtj/core';
import dialog from './dialog';
import { omitPropItem } from '../shared';

const desc: MaterialDescription = {
  name: 'XDialogGrid',
  label: '弹窗表格',
  categoryId: 'form',
  props: [
    {
      name: 'modelValue',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'columns',
      title: '表格列配置',
      setters: 'ArraySetter'
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
      name: 'formatter',
      title: ' model数据转换为表格数据',
      setters: 'FunctionSetter'
    },
    {
      name: 'valueFormatter',
      title: ' 表格数据转换为model数据',
      setters: 'FunctionSetter'
    },
    {
      name: 'puls',
      title: '显示增行按钮',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'minus',
      title: '显示删行按钮',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'submitMethod',
      title: '表单提交处理方法, return true 关闭弹窗',
      setters: 'FunctionSetter'
    },
    {
      name: 'gridProps',
      title: '表格其他配置',
      setters: 'ObjectSetter'
    },
    ...omitPropItem(dialog.props, ['modelValue', 'size', 'submit', 'cancel'])
  ],
  events: [
    { name: 'update:modelValue', params: ['modelValue'] },
    { name: 'submit', params: ['model'] },
    { name: 'close' }
  ],
  slots: ['buttons', 'extra', 'top'],
  snippet: {
    props: {
      title: '弹窗表格'
    }
  }
};

export default desc;

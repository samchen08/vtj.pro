import type { MaterialDescription } from '@vtj/core';
import select from '../element/select';
import { omitPropItem } from '../shared';
const desc: MaterialDescription = {
  name: 'XPicker',
  label: '数据选择器',
  categoryId: 'form',
  childIncludes: false,
  props: [
    {
      name: 'columns',
      title: '表格列配置',
      setters: 'ArraySetter'
    },
    {
      name: 'fields',
      title: '查询条件表单字段配置',
      setters: 'ArraySetter'
    },
    {
      name: 'loader',
      title: '表格数据加载函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'modelValue',
      setters: 'StringSetter'
    },
    {
      name: 'multiple',
      title: '多选模式',
      setters: 'BooleanSetter'
    },
    {
      name: 'raw',
      title: '值为对象模式',
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      setters: 'BooleanSetter'
    },
    {
      name: 'append',
      title: '多选可追加',
      setters: 'BooleanSetter'
    },
    {
      name: 'valueKey',
      title: '值映射字段名称',
      setters: 'StringSetter',
      defaultValue: 'value'
    },
    {
      name: 'labelKey',
      title: '输入框显示映射字段名称',
      setters: 'StringSetter',
      defaultValue: 'label'
    },
    {
      name: 'queryKey',
      title: '查询参数名称',
      setters: 'StringSetter'
    },
    {
      name: 'preload',
      title: '单选模式，回车时自动检测取回有且计有唯一数据',
      setters: 'BooleanSetter'
    },
    {
      name: 'defaultQuery',
      title: '初始默认查询参数 () => Record<string,any>',
      setters: 'FunctionSetter'
    },
    {
      name: 'dialogProps',
      title: '弹窗组件配置参数',
      setters: 'ObjectSetter'
    },
    {
      name: 'gridProps',
      title: '表格组件配置参数',
      setters: 'ObjectSetter'
    },
    {
      name: 'formProps',
      title: '查询表单配置参数',
      setters: 'ObjectSetter'
    },
    {
      name: 'formatter',
      title: '接受数据转换函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'valueFormatter',
      title: '发送数据转换函数',
      setters: 'FunctionSetter'
    },
    ...omitPropItem(select[0].props, [
      'modelValue',
      'disabled',
      'valueKey',
      'teleported',
      'multiple'
    ])
  ],
  events: ['picked', ...(select[0].events || [])],
  slots: [],
  snippet: {
    props: {}
  }
};

export default desc;

import type { MaterialDescription } from '@vtj/core';
import elForm from '../element/form';
import { omitPropItem, size } from '../shared';

const desc: MaterialDescription = {
  name: 'XField',
  label: '字段',
  categoryId: 'form',
  props: [
    {
      name: 'name',
      title: '字段名称',
      setters: 'StringSetter'
    },
    {
      name: 'label',
      title: '字段标题文本',
      setters: 'StringSetter'
    },
    {
      name: 'editor',
      title: '编辑器组件',
      setters: 'SelectSetter',
      options: [
        'none',
        'text',
        'textarea',
        'select',
        'checkbox',
        'radio',
        'number',
        'date',
        'time',
        'datetime',
        'switch',
        'slider',
        'rate',
        'cascader'
      ]
    },
    {
      name: 'props',
      title: '编辑器组件参数',
      setters: 'ObjectSetter'
    },
    {
      name: 'modelValue',
      setters: 'StringSetter'
    },
    size(),
    {
      name: 'width',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'tooltipMessage',
      title: '是否在tooltip显示校验信息',
      setters: ['BooleanSetter', 'ObjectSetter']
    },
    {
      name: 'tooltipPosition',
      setters: ['SelectSetter', 'NumberSetter'],
      options: ['inner', 'outer'],
      defaultValue: 'outer'
    },
    {
      name: 'placeholder',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      setters: 'BooleanSetter'
    },
    {
      name: 'options',
      setters: ['ArraySetter', 'FunctionSetter']
    },
    {
      name: 'visible',
      setters: 'BooleanSetter'
    },
    {
      name: 'cascader',
      title: '级联字段，根据字段值变化刷新options',
      setters: ['StringSetter', 'ArraySetter']
    },
    {
      name: 'error',
      setters: 'StringSetter'
    },
    {
      name: 'tip',
      setters: 'StringSetter'
    },
    {
      name: 'inline',
      title: '表单项内容采用inline布局',
      setters: 'BooleanSetter'
    },
    ...omitPropItem(elForm[1].props, ['prop', 'size', 'label'])
  ],
  events: ['update:modelValue', 'change', 'focus', 'blur'],
  slots: [
    {
      name: 'label'
    },
    {
      name: 'error',
      params: ['error']
    },
    {
      name: 'editor',
      params: ['editor']
    },
    {
      name: 'tip'
    },
    {
      name: 'default'
    }
  ],
  snippet: {
    props: {
      label: '字段名称'
    }
  }
};

export default desc;

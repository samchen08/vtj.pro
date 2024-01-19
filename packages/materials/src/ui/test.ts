import type { MaterialDescription } from '@vtj/core';

const test: MaterialDescription = {
  name: 'XTest',
  label: '测试组件',
  categoryId: 'test',
  props: [
    {
      name: 'booleanProp',
      label: '布尔值',
      setters: 'BooleanSetter',
      title: '提示说明文本',
      defaultValue: true
    },
    {
      name: 'stringProp',
      setters: 'StringSetter'
    },
    {
      name: 'numberProp',
      setters: 'NumberSetter'
    },
    {
      name: 'selectProp',
      setters: 'SelectSetter',
      defaultValue: 'default',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
    },
    {
      name: 'objectProp',
      setters: 'ObjectSetter'
    },
    {
      name: 'arrayProp',
      setters: 'ArraySetter'
    },
    {
      name: 'iconProp',
      setters: 'IconSetter'
    },
    {
      name: 'colorProp',
      setters: 'ColorSetter'
    },
    {
      name: 'modelValue',
      setters: 'StringSetter'
    },
    {
      name: 'syncProp',
      setters: 'StringSetter'
    }
  ],
  events: [
    {
      name: 'click',
      params: ['props']
    },
    {
      name: 'submit',
      params: ['props']
    },
    {
      name: 'change',
      params: ['data']
    },
    {
      name: 'update:modelValue',
      params: ['value']
    },
    {
      name: 'update:syncProp',
      params: ['value']
    }
  ],
  slots: [
    {
      name: 'default',
      params: ['props', 'data']
    },
    {
      name: 'extra',
      params: ['props', 'data']
    }
  ],
  snippet: {
    props: {}
  }
};

export default test;

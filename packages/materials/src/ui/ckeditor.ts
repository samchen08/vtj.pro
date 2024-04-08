import type { MaterialDescription } from '@vtj/core';

const test: MaterialDescription = {
  name: 'XCKEditor',
  label: '富文本编辑器',
  categoryId: 'form',
  props: [
    {
      name: 'modelValue',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      setters: 'BooleanSetter'
    },
    {
      name: 'editable',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'border',
      title: '显示边框, 当 editable=false 时有效',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'uploader',
      title: '图片上传函数',
      setters: 'FunctionSetter'
    }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'focus'
    },
    {
      name: 'blur'
    },
    {
      name: 'update:modelValue',
      params: ['value']
    }
  ],
  snippet: {
    props: {}
  }
};

export default test;

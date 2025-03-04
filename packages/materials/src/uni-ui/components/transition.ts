import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniTransition',
  label: '过渡动画',
  categoryId: 'ext',
  props: [
    {
      name: 'show',
      title: '控制组件显示或隐藏',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'mode-class',
      title: '内置过渡动画类型',
      defaultValue: '',
      setters: ['SelectSetter', 'ArraySetter', 'StringSetter'],
      options: [
        'fade',
        'slide-top',
        'slide-right',
        'slide-bottom',
        'slide-left',
        'zoom-in',
        'zoom-out'
      ]
    },
    {
      name: 'custom-class',
      title: '自定义类名',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'duration',
      title: '过渡动画持续时间',
      defaultValue: 30,
      setters: 'NumberSetter'
    },
    {
      name: 'styles',
      title: '组件样式',
      defaultValue: '',
      setters: 'ObjectSetter'
    }
  ],
  events: ['click', 'change'],
  snippet: {
    props: {
      'mode-class': 'fade',
      styles: { width: '100px', height: '100px', backgroundColor: 'red' },
      show: 'show'
    }
  }
};

export default desc;

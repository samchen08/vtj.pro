import type { MaterialDescription } from '@vtj/core';
const Skeleton: MaterialDescription = {
  name: 'ElSkeleton',
  label: '骨架屏',
  doc: 'https://element-plus.org/zh-CN/component/skeleton.html',

  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'animated',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'count',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'loading',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'rows',
      defaultValue: 3,
      setters: 'NumberSetter'
    },
    {
      name: 'throttle',
      defaultValue: 0,
      setters: 'NumberSetter'
    }
  ],
  slots: ['default', 'template']
};

export default Skeleton;

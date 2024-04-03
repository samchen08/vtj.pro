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

const SkeletonItem: MaterialDescription = {
  name: 'ElSkeletonItem',
  label: '骨架项',
  doc: 'https://element-plus.org/zh-CN/component/skeleton.html',

  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'variant',
      setters: 'SelectSetter',
      options: [
        'p',
        'text',
        'h1',
        'h3',
        'caption',
        'button',
        'image',
        'circle',
        'rect'
      ],
      defaultValue: 'text'
    }
  ],
  snippet: {
    props: {
      variant: 'image',
      style: {
        width: '240px',
        height: '240px'
      }
    }
  }
};

export default [Skeleton, SkeletonItem];

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
      title: '是否使用动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'count',
      title: '渲染多少个 template, 建议使用尽可能小的数字',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'loading',
      title: '是否显示加载结束后的 DOM 结构',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'rows',
      title: '骨架屏段落数量',
      defaultValue: 3,
      setters: 'NumberSetter'
    },
    {
      name: 'throttle',
      title: '渲染延迟（以毫秒为单位） 数字代表延迟显示, 也可以设置为延迟隐藏, 例如 { leading: 500, trailing: 500 } 当需要控制初始加载值时，您可以设置 { initVal: true }',
      defaultValue: 0,
      setters: ['NumberSetter', 'ObjectSetter']
    }
  ],
  slots: [
    {
      name: 'default',
      params: ['object']
    },
    {
      name: 'template',
      params: ['object']
    }
  ]
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
      title: '当前渲染 skeleton 类型',
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

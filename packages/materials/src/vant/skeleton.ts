import type { MaterialDescription } from '@vtj/core';

const Skeleton: MaterialDescription[] = [
  {
    name: 'VanSkeleton',
    alias: 'Skeleton',
    label: '骨架屏',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'row',
        title: '段落占位图行数',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'row-width',
        title: '段落占位图宽度，可传数组来设置每一行的宽度',
        defaultValue: '100%',
        setters: ['StringSetter', 'NumberSetter', 'ArraySetter']
      },
      {
        name: 'title',
        title: '是否显示标题占位图',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'avatar',
        title: '是否显示头像占位图',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        title: '是否显示骨架屏，传 false 时会展示子组件内容',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'animate',
        title: '是否开启动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        title: '是否将标题和段落显示为圆角风格',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'title-width',
        title: '标题占位图宽度',
        defaultValue: '40%',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'avatar-size',
        title: '头像占位图大小',
        defaultValue: 32,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'avatar-shape',
        title: '头像占位图形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ],
    slots: ['default', 'template'],
    snippet: {
      props: {
        title: true,
        avatar: true,
        row: 3
      }
    }
  },
  {
    name: 'VanSkeletonParagraph',
    alias: 'SkeletonParagraph',
    label: '骨架屏文本',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'round',
        title: '是否将段落显示为圆角风格',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'row-width',
        title: '段落占位图宽度',
        defaultValue: '100%',
        setters: 'StringSetter'
      }
    ]
  },
  {
    name: 'VanSkeletonTitle',
    alias: 'SkeletonTitle',
    label: '骨架屏标题',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'round',
        title: '是否将段落显示为圆角风格',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'row-width',
        title: '段落占位图宽度',
        defaultValue: '40%',
        setters: ['StringSetter', 'NumberSetter']
      }
    ]
  },
  {
    name: 'VanSkeletonAvatar',
    alias: 'SkeletonAvatar',
    label: '骨架屏头像',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'avatar-size',
        title: '头像占位图大小',
        defaultValue: '32px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'avatar-shape',
        title: '头像占位图形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ]
  },
  {
    name: 'VanSkeletonImage',
    alias: 'SkeletonImage',
    label: '骨架屏图片',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/skeleton',
    props: [
      {
        name: 'image-size',
        title: '图片占位图大小',
        defaultValue: '32px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'image-shape',
        title: '图片占位图形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ]
  }
];

export default Skeleton;

import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASkeleton',
    alias: 'Skeleton',
    label: '骨架屏',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/skeleton-cn',
    props: [
      {
        name: 'active',
        label: 'active',
        title: '是否展示动画效果',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'avatar',
        label: 'avatar',
        title: '是否显示头像占位图',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? SkeletonAvatarProps
        defaultValue: false
      },
      {
        name: 'loading',
        label: 'loading',
        title: '为 true 时，显示占位图。反之则直接展示子组件',
        setters: 'BooleanSetter'
      },
      {
        name: 'paragraph',
        label: 'paragraph',
        title: '是否显示段落占位图',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? SkeletonAvatarProps
        defaultValue: true
      },
      {
        name: 'title',
        label: 'title',
        title: '是否显示标题占位图',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? SkeletonAvatarProps
        defaultValue: true
      }
    ]
  },
  {
    name: 'ASkeletonAvatar',
    alias: 'SkeletonAvatar',
    label: '头像骨架屏',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/skeleton-cn',
    props: [
      {
        name: 'shape',
        label: 'shape',
        title: '指定头像的形状',
        setters: 'SelectSetter',
        options: ['circle', 'square']
      },
      {
        name: 'size',
        label: 'size',
        title: '设置头像占位图的大小',
        setters: ['SelectSetter', 'NumberSetter'],
        options: ['large', 'small', 'default']
      }
    ]
  },
  {
    name: 'ASkeletonButton',
    alias: 'SkeletonButton',
    label: '按钮骨架屏',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/skeleton-cn',
    props: [
      {
        name: 'active',
        label: 'active',
        title: '是否展示动画效果',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'block',
        label: 'block',
        title: '将按钮宽度调整为其父宽度的选项',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'shape',
        label: 'shape',
        title: '指定按钮的形状',
        setters: 'SelectSetter',
        options: ['circle', 'round', 'default']
      },
      {
        name: 'size',
        label: 'size',
        title: '设置按钮的大小',
        setters: 'SelectSetter',
        options: ['large', 'small', 'default']
      }
    ]
  },
  {
    name: 'ASkeletonInput',
    alias: 'SkeletonInput',
    label: '输入框骨架屏',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/skeleton-cn',
    props: [
      {
        name: 'active',
        label: 'active',
        title: '是否展示动画效果',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'size',
        label: 'size',
        title: '设置输入框的大小',
        setters: 'SelectSetter',
        options: ['large', 'small', 'default']
      }
    ]
  }
];
export default components;

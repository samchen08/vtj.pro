import type { MaterialDescription } from '@vtj/core';

const Avatar: MaterialDescription = {
  name: 'ElAvatar',
  label: '头像',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/avatar.html',
  package: 'element-plus',
  props: [
    {
      name: 'icon',
      title: '设置 Avatar 的图标类型',
      defaultValue: '',
      setters: 'IconSetter'
    },
    {
      name: 'size',
      title: '大小',
      setters: ['SelectSetter', 'NumberSetter'],
      options: ['large', 'default', 'small'],
      defaultValue: 'default'
    },
    {
      name: 'shape',
      title: '形状',
      defaultValue: 'circle',
      options: ['circle', 'square'],
      setters: 'SelectSetter'
    },
    {
      name: 'src',
      title: '图片的源地址',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'srcSet',
      title: '图片的原生 srcset 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'alt',
      title: '图片的原生 alt 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'fit',
      title: '当展示类型为图片的时候，设置图片如何适应容器',
      defaultValue: 'cover',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      setters: 'SelectSetter'
    }
  ],
  events: ['error'],
  slots: ['default', 'icon'],
  snippet: {
    props: {
      src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
};

export default Avatar;

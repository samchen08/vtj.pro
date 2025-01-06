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
      defaultValue: '',
      setters: 'IconSetter'
    },
    {
      name: 'size',
      setters: ['SelectSetter', 'NumberSetter'],
      options: ['large', 'default', 'small'],
      defaultValue: 'default'
    },
    {
      name: 'shape',
      defaultValue: 'circle',
      options: ['circle', 'square'],
      setters: 'SelectSetter'
    },
    {
      name: 'src',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'srcSet',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'alt',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'fit',
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

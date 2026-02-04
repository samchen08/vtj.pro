import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription = {
  name: 'ElPageHeader',
  label: '页头',

  doc: 'https://element-plus.org/zh-CN/component/page-header.html',
  categoryId: 'nav',
  package: 'element-plus',
  props: [
    {
      name: 'icon',
      title: '图标',
      defaultValue: 'Back',
      setters: 'InputSetter'
    },
    {
      name: 'title',
      title: '主标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'content',
      title: '内容',
      defaultValue: '',
      setters: 'InputSetter'
    }
  ],
  events: [
    {
      name: 'back'
    }
  ],
  slots: [
    {
      name: 'icon'
    },
    {
      name: 'title'
    },
    {
      name: 'content'
    },
    {
      name: 'extra'
    },
    {
      name: 'breadcrumb'
    },
    {
      name: 'default'
    }
  ],
  snippet: {
    name: 'ElPageHeader',
    children: [
      {
        name: 'component',
        slot: 'content',
        props: {
          is: 'span'
        },
        children: 'Title'
      }
    ]
  }
};

export default components;

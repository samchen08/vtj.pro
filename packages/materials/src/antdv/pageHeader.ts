import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'APageHeader',
    alias: 'PageHeader',
    label: '页头',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/page-header-cn',
    props: [
      {
        name: 'avatar',
        label: 'avatar',
        title: '标题栏旁的头像',
        setters: 'ObjectSetter'
      },
      {
        name: 'backIcon',
        label: 'backIcon',
        title: '自定义 back icon ，如果为 false 不渲染 back icon',
        setters: 'IconSetter'
      },
      {
        name: 'breadcrumb',
        label: 'breadcrumb',
        title: '面包屑的配置',
        setters: ['ExpressionSetter', 'ArraySetter']
      },
      {
        name: 'extra',
        label: 'extra',
        title: '操作区，位于 title 行的行尾',
        setters: 'StringSetter' // slot
      },
      {
        name: 'footer',
        label: 'footer',
        title: 'PageHeader 的页脚，一般用于渲染 TabBar',
        setters: 'StringSetter' // slot
      },
      {
        name: 'ghost',
        label: 'ghost',
        title: 'pageHeader 的类型，将会改变背景颜色',
        setters: 'BooleanSetter',
        defaultValue: 'true'
      },
      {
        name: 'subTitle',
        label: 'subTitle',
        title: '自定义的二级标题文字',
        setters: 'StringSetter' // slot
      },
      {
        name: 'tags',
        label: 'tags',
        title: 'title 旁的 tag 列表',
        setters: ['ObjectSetter', 'ArraySetter'] //?? 	Tag[] | Tag
      },
      {
        name: 'title',
        label: 'title',
        title: '自定义标题文字',
        setters: 'StringSetter' // slot
      }
    ],
    events: ['back'],
    slots: ['default', 'backIcon', 'extra', 'footer', 'subTitle', 'title'],
    snippet: {
      name: 'APageHeader',
      props: {
        title: 'Title',
        subTitle: 'This is a subtitle',
        style: { border: '1px solid rgb(235, 237, 240)' }
      }
    }
  }
];
export default components;

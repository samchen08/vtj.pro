import type { MaterialDescription } from '@vtj/core';

const Steps: MaterialDescription[] = [
  {
    name: 'VanSteps',
    alias: 'Steps',
    label: '步骤条',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/steps',
    props: [
      {
        name: 'active',
        title: '当前步骤对应的索引值',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'direction',
        title: '步骤条方向',
        defaultValue: 'horizontal',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'active-icon',
        title: '当前步骤对应的底部图标',
        defaultValue: 'checked',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'inactive-icon',
        title: '非当前步骤对应的底部图标',
        setters: ['VanIconSetter', 'StringSetter']
      },
      {
        name: 'finish-icon',
        title: '已完成步骤对应的底部图标，优先级高于 inactive-icon',
        setters: 'StringSetter'
      },
      {
        name: 'active-color',
        title: '当前步骤和已完成步骤的颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'inactive-color',
        title: '未激活步骤的颜色',
        defaultValue: '#969799',
        setters: 'StringSetter'
      },
      {
        name: 'icon-prefix',
        title: '图标类名前缀',
        defaultValue: 'van-icon',
        setters: 'StringSetter'
      }
    ],
    events: [{ name: 'clickStep', params: ['index'] }],
    snippet: {
      props: {
        active: 1
      },
      children: [
        { name: 'VanStep', children: '买家下单' },
        { name: 'VanStep', children: '商家接单' },
        { name: 'VanStep', children: '买家提货' },
        { name: 'VanStep', children: '交易完成' }
      ]
    }
  },
  {
    name: 'VanStep',
    alias: 'Step',
    label: '步骤条项',
    categoryId: 'view',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/steps',
    slots: ['default', 'active-icon', 'inactive-icon', 'finish-icon'],
    snippet: {
      children: '步骤条项'
    }
  }
];

export default Steps;

import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AAlert',
    alias: 'Alert',
    label: '警告提示',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/alert-cn',
    props: [
      {
        name: 'afterClose',
        label: 'afterClose',
        title: '关闭动画结束后触发的回调函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'banner',
        label: 'banner',
        title: '是否用作顶部公告',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'closable',
        label: 'closable',
        title: '默认不显示关闭按钮',
        setters: 'BooleanSetter'
      },
      {
        name: 'closeText',
        label: 'closeText',
        title: '自定义关闭按钮',
        setters: 'StringSetter'
      },
      {
        name: 'description',
        label: 'description',
        title: '警告提示的辅助性文字介绍',
        setters: 'StringSetter'
      },
      {
        name: 'message',
        label: 'message',
        title: '警告提示内容',
        setters: 'StringSetter'
      },
      {
        name: 'showIcon',
        label: 'showIcon',
        title: '是否显示辅助图标',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'type',
        label: 'type',
        title: '指定警告提示的样式，有四种选择 success、info、warning、error',
        setters: 'SelectSetter',
        options: ['success', 'info', 'warning', 'error'],
        defaultValue: 'info'
      }
    ],
    events: ['close'],
    slots: [
      'default',
      'action',
      'closeIcon',
      'closeText',
      'description',
      'icon',
      'message'
    ],
    snippet: {
      props: {
        message: 'Success Text',
        type: 'success'
      }
    }
  }
];
export default components;

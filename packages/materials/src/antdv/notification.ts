import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'ANotification',
    alias: 'Notification',
    label: '通知提醒框',
    categoryId: 'feedback',
    doc: 'https://www.antdv.com/components/notification-cn',
    props: [
      {
        name: 'bottom',
        label: 'bottom',
        title: '消息从底部弹出时，距离底部的位置，单位像素',
        setters: 'StringSetter',
        defaultValue: '24px'
      },
      {
        name: 'btn',
        label: 'btn',
        title: '自定义关闭按钮',
        setters: 'FunctionSetter'
      },
      {
        name: 'class',
        label: 'class',
        title: '自定义 CSS class',
        setters: 'StringSetter'
      },
      {
        name: 'closeIcon',
        label: 'closeIcon',
        title: '自定义关闭图标',
        setters: 'FunctionSetter'
      },
      {
        name: 'description',
        label: 'description',
        title: '通知提醒内容，必选',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'duration',
        label: 'duration',
        title: '默认 4.5 秒后自动关闭，配置为 null 则不自动关闭',
        setters: 'NumberSetter',
        defaultValue: 4.5
      },
      {
        name: 'getContainer',
        label: 'getContainer',
        title: '配置渲染节点的输出位置',
        setters: 'FunctionSetter'
      },
      {
        name: 'icon',
        label: 'icon',
        title: '自定义图标',
        setters: 'FunctionSetter'
      },
      {
        name: 'key',
        label: 'key',
        title: '当前通知唯一标志',
        setters: 'StringSetter'
      },
      {
        name: 'message',
        label: 'message',
        title: '通知提醒标题，必选',
        setters: ['StringSetter', 'FunctionSetter']
      },
      {
        name: 'placement',
        label: 'placement',
        title:
          '弹出位置，可选 top topLeft topRight bottom bottomLeft bottomRight',
        setters: 'SelectSetter',
        options: [
          'top',
          'topLeft',
          'topRight',
          'bottom',
          'bottomLeft',
          'bottomRight'
        ],
        defaultValue: 'topRight'
      },
      {
        name: 'style',
        label: 'style',
        title: '自定义内联样式',
        setters: ['ObjectSetter', 'StringSetter']
      },
      {
        name: 'top',
        label: 'top',
        title: '消息从顶部弹出时，距离顶部的位置，单位像素',
        setters: 'StringSetter',
        defaultValue: '24px'
      },
      {
        name: 'onClick',
        label: 'onClick',
        title: '点击通知时触发的回调函数',
        setters: 'FunctionSetter'
      },
      {
        name: 'onClose',
        label: 'onClose',
        title: '点击默认关闭按钮时触发的回调函数',
        setters: 'FunctionSetter'
      }
    ],
    slots: ['btn', 'closeIcon', 'description', 'message']
  }
];
export default components;

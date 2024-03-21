import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'AApp',
    alias: 'App',
    label: '包裹组件',
    categoryId: 'other',
    doc: 'https://www.antdv.com/components/app-cn',
    props: [
      {
        name: 'message',
        label: 'message',
        title: 'App 内 Message 的全局配置',
        setters: ''
        //?? message.config({
        //   top: `100px`,
        //   duration: 2,
        //   maxCount: 3,
        //   rtl: true,
        //   prefixCls: 'my-message',
        // });
      },
      {
        name: 'notification',
        label: 'notification',
        title: 'App 内 Notification 的全局配置',
        setters: '' //?? //?? message.config({
      }
    ]
  }
];
export default components;

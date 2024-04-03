import type { MaterialDescription } from '@vtj/core';

const configProvider: MaterialDescription = {
  name: 'ElConfigProvider',
  label: '全局配置',
  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/config-provider.html',
  props: [
    {
      name: 'locale',
      label: 'locale',
      title: '翻译文本对象',
      setters: 'ObjectSetter'
    },
    {
      name: 'size',
      label: 'size',
      title: '全局组件大小',
      setters: 'SelectSetter',
      options: ['large', 'default', 'small'],
      defaultValue: 'default'
    },
    {
      name: 'zIndex',
      label: 'zIndex',
      title: '全局初始化 zIndex 的值',
      setters: 'NumberSetter'
    },
    {
      name: 'namespace',
      label: 'namespace',
      title: '全局组件类名称前缀',
      setters: 'StringSetter',
      defaultValue: 'el'
    },
    {
      name: 'button',
      label: 'button',
      title: '按钮相关配置',
      setters: 'ObjectSetter',
      defaultValue: { autoInsertSpace: false }
    },
    {
      name: 'message',
      label: 'message',
      title: '消息相关配置',
      setters: 'ObjectSetter'
    },
    {
      name: 'experimentalFeatures',
      label: 'experimentalFeatures',
      title: '将要添加的实验阶段的功能，所有功能都是默认设置为 false',
      setters: 'ObjectSetter'
    }
  ],
  slots: ['default']
};

export default configProvider;

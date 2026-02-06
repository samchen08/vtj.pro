import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';

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
      ...size('size'),
      title: '全局组件大小',
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
      defaultValue: {
        type: null,
        autoInsertSpace: false,
        plain: false,
        text: false,
        round: false,
      }
    },
    {
      name: 'link',
      title: '链接相关的配置',
      setters: 'ObjectSetter',
      defaultValue: {
        type: 'default',
        underline: 'hover'
      }
    },
    {
      name: 'card',
      title: 'card 相关的配置',
      setters: 'ObjectSetter',
      defaultValue: {
        shadow: null,
      }
    },
    {
      name: 'dialog',
      title: 'dialog 相关的配置',
      setters: 'ObjectSetter',
      defaultValue: {
        alignCenter: false,
        draggable: false,
        overflow: false,
        transition: null
      }
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
    },
    {
      name: 'emptyValues',
      label: 'emptyValues',
      title: '输入类组件空值',
      setters: 'ArraySetter'
    },
    {
      name: 'valueOnClear',
      label: 'valueOnClear',
      title: '输入类组件清空值',
      setters: ['InputSetter', 'NumberSetter', 'BooleanSetter', 'FunctionSetter']
    }
  ],
  slots: ['default']
};

export default configProvider;

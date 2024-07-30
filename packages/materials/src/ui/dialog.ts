import type { MaterialDescription } from '@vtj/core';
import panel from './panel';
import { omitPropItem, size } from '../shared';

const desc: MaterialDescription = {
  name: 'XDialog',
  label: '弹窗',
  categoryId: 'layout',
  props: [
    {
      name: 'modelValue',
      title: '控制是否显示弹窗',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'title',
      setters: 'StringSetter'
    },
    {
      name: 'subtitle',
      setters: 'StringSetter'
    },
    {
      name: 'icon',
      setters: 'IconSetter'
    },
    size(),
    {
      name: 'width',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'height',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'left',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'top',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'modal',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'draggable',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'resizable',
      setters: 'BooleanSetter'
    },
    {
      name: 'closable',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'maximizable',
      setters: 'BooleanSetter'
    },
    {
      name: 'minimizable',
      setters: 'BooleanSetter'
    },
    {
      name: 'mode',
      setters: 'SelectSetter',
      options: ['normal', 'maximized', 'minimized'],
      defaultValue: 'normal'
    },
    {
      name: 'src',
      title: '加载页码url',
      setters: 'StringSetter'
    },
    {
      name: 'beforeClose',
      title: '关闭弹窗回调函数，return true 阻止关闭',
      setters: 'FunctionSetter'
    },
    {
      name: 'submit',
      setters: ['Boolean', 'StringSetter']
    },
    {
      name: 'cancel',
      setters: ['Boolean', 'StringSetter']
    },
    {
      name: 'bodyPadding',
      setters: 'BooleanSetter'
    },
    {
      name: 'primary',
      setters: 'BooleanSetter'
    },
    ...omitPropItem(panel.props, ['size'])
  ],
  events: [
    {
      name: 'update:modelValue',
      params: ['modelValue']
    },
    {
      name: 'open',
      params: ['instance']
    },
    {
      name: 'close'
    },
    {
      name: 'destroy'
    },
    {
      name: 'maximized'
    },
    {
      name: 'minimized'
    },
    {
      name: 'normal'
    },
    {
      name: 'modeChange',
      params: ['mode']
    },
    {
      name: 'dragStart',
      params: ['position']
    },
    {
      name: 'dragging',
      params: ['position']
    },
    {
      name: 'dragEnd',
      params: ['position']
    },
    {
      name: 'resizeStart',
      params: ['dir', 'mie']
    },
    {
      name: 'resizeEnd',
      params: ['dir', 'mie']
    },
    {
      name: 'resizing',
      params: ['dir', 'mie']
    },
    {
      name: 'submit'
    },
    {
      name: 'cancel'
    }
  ],
  slots: [
    {
      name: 'title'
    },
    {
      name: 'actions'
    },
    {
      name: 'default'
    },
    {
      name: 'footer'
    },
    {
      name: 'extra'
    },
    {
      name: 'handle'
    }
  ],
  snippet: {
    props: {
      title: '弹窗标题'
    }
  }
};

export default desc;

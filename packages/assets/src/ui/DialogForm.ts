import { ComponentDescription } from '@vtj/engine';
import Dialog from './Dialog';
const component: ComponentDescription = {
  name: 'XDialogForm',
  title: '弹窗表单',
  categoryId: 'form',
  package: '@vtj/ui',
  props: [
    {
      name: 'submitMethod',
      label: 'submitMethod',
      title: '表单提交处理方法, return true 关闭弹窗',
      setters: 'FunctionSetter'
    },
    {
      name: 'formProps',
      label: '表单组件参数',
      setters: 'JSONSetter'
    },
    ...(Dialog.props || [])
  ],
  events: [
    'update:modelValue',
    'open',
    'close',
    'destroy',
    'maximized',
    'minimized',
    'normal',
    'modeChange',
    'dragStart',
    'dragging',
    'dragEnd',
    'resizeStart',
    'resizeEnd',
    'resizing',
    'submit',
    'cancel'
  ],
  slots: ['default', 'extra', 'handle', 'footer'],
  snippet: {
    props: {
      title: '弹窗表单'
    }
  }
};

export default component;

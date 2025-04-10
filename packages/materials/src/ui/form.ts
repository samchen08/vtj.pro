import type { MaterialDescription } from '@vtj/core';
import elForm from '../element/form';
import { omitPropItem } from '../shared';

const desc: MaterialDescription = {
  name: 'XForm',
  label: '表单',
  categoryId: 'form',
  props: [
    {
      name: 'model',
      setters: 'ObjectSetter'
    },
    {
      name: 'inline',
      setters: 'BooleanSetter'
    },
    {
      name: 'inlineColumns',
      title: 'inline模式显示列数',
      setters: 'NumberSetter'
    },
    {
      name: 'footer',
      setters: 'BooleanSetter'
    },
    {
      name: 'submitText',
      setters: 'StringSetter',
      defaultValue: '提交'
    },
    {
      name: 'resetText',
      setters: 'StringSetter',
      defaultValue: '重置'
    },
    {
      name: 'submitMethod',
      title: '表单提交处理方法',
      setters: 'FunctionSetter'
    },
    {
      name: 'tooltipMessage',
      title: '是否在tooltip显示校验信息',
      setters: ['BooleanSetter', 'ObjectSetter']
    },
    {
      name: 'enterSubmit',
      title: '回车键触发提交',
      setters: 'BooleanSetter'
    },
    {
      name: 'sticky',
      title: '开启底部sticky定位',
      setters: 'BooleanSetter'
    },
    {
      name: 'footerAlign',
      title: '底部对齐方式',
      setters: 'SelectSetter',
      defaultValue: 'left',
      options: ['left', 'center', 'right']
    },
    ...omitPropItem(elForm[0].props, ['model', 'inline'])
  ],
  events: [
    {
      name: 'change',
      params: ['model']
    },
    {
      name: 'submit',
      params: ['model']
    },
    {
      name: 'reset'
    }
  ],
  slots: ['default', 'footer', 'action'],
  snippet: {
    props: {
      labelWidth: '100px'
    },
    children: [
      {
        name: 'XField',
        props: {
          label: '字段名称'
        }
      }
    ]
  }
};

export default desc;

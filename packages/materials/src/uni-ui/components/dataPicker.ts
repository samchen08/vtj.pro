import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniDataPicker',
  label: '级联选择框',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '绑定数据',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'spaceInfo',
      title: '服务空间配置',
      setters: 'ObjectSetter'
    },
    {
      name: 'localdata',
      title: '数据',
      setters: 'ArraySetter'
    },
    {
      name: 'preload',
      title: '预加载数据',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clear-icon',
      title: '是否显示清除按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'ellipsis',
      title: '是否隐藏 tab 标签过长的文本',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'step-searh',
      title: '分步查询时，点击节点请求数据',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'self-field',
      title: '分步查询时当前字段名称',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'parent-field',
      title: '分步查询时父字段名称',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'collection',
      title: '表名。支持输入多个表名，用 , 分割',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'field',
      title: '查询字段，多个字段用 , 分割',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'where',
      title: '查询条件',
      setters: 'StringSetter'
    },
    {
      name: 'orderby',
      title: '排序字段及正序倒叙设置',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'popup-title',
      title: '弹出层标题',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'map',
      title: '字段映射，将text/value映射到数据中的其他字段',
      defaultValue: { text: 'text', value: 'value' },
      setters: 'ObjectSetter'
    }
  ],
  events: ['change', 'nodeclick', 'popupopened', 'popupclosed'],
  slots: ['default'],
  snippet: {
    props: {
      placeholder: '请选择班级',
      'popup-title': '请选择所在地区',
      localdata: [
        {
          text: '一年级',
          value: '1-0',
          children: [
            {
              text: '1.1班',
              value: '1-1'
            },
            {
              text: '1.2班',
              value: '1-2'
            }
          ]
        },
        {
          text: '二年级',
          value: '2-0',
          children: [
            {
              text: '2.1班',
              value: '2-1'
            },
            {
              text: '2.2班',
              value: '2-2'
            }
          ]
        },
        {
          text: '三年级',
          value: '3-0',
          disable: true
        }
      ]
    }
  }
};

export default desc;

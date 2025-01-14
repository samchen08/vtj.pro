import type { MaterialDescription } from '@vtj/core';

const Area: MaterialDescription = {
  name: 'VanArea',
  alias: 'Area',
  label: '省市区选择',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/area',
  props: [
    {
      name: 'modelValue',
      title: '当前选中项对应的地区码',
      setters: 'StringSetter'
    },
    {
      name: 'title',
      title: '顶部栏标题',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-text',
      title: '确认按钮文字',
      defaultValue: '确认',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-button-text',
      title: '取消按钮文字',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'area-list',
      title: '省市区数据',
      setters: 'ObjectSetter'
    },
    {
      name: 'columns-placeholder',
      title: '列占位提示文字',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'loading',
      title: '是否显示加载状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下无法切换选项',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'option-height',
      title: '选项高度，支持 px vw vh rem 单位，默认 px',
      defaultValue: 44,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'columns-num',
      title: '显示列数，3-省市区，2-省市，1-省',
      defaultValue: 3,
      setters: 'SelectSetter',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 }
      ]
    },
    {
      name: 'visible-option-num',
      title: '可见的选项个数',
      defaultValue: 6,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'swipe-duration',
      title: '快速滑动时惯性滚动的时长，单位 ms',
      defaultValue: 1000,
      setters: ['NumberSetter', 'StringSetter']
    }
  ],
  events: [
    { name: 'update:modelValue' },
    { name: 'confirm', params: ['data'] },
    { name: 'cancel', params: ['data'] },
    { name: 'change', params: ['data'] }
  ],
  slots: [
    'toolbar',
    'title',
    'confirm',
    'cancel',
    'columns-top',
    'columns-bottom'
  ],
  snippet: {
    props: {
      title: '标题',
      'area-list': {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          120100: '天津市'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区'
        }
      }
    }
  }
};

export default Area;

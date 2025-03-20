import type { MaterialDescription } from '@vtj/core';

const AddressList: MaterialDescription = {
  name: 'VanAddressList',
  alias: 'AddressList',
  label: '地址列表',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/address-list',
  props: [
    {
      name: 'modelValue',
      title: '当前选中地址的 id，支持多选（类型为 []）',
      setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
    },
    {
      name: 'list',
      title: '地址列表',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'disabled-list',
      title: '不可配送地址列表',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'disabled-text',
      title: '不可配送提示文案',
      setters: 'StringSetter'
    },
    {
      name: 'switchable',
      title: '是否允许切换地址',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-add-button',
      title: '是否显示底部按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'add-button-text',
      title: '底部按钮文字',
      defaultValue: '	新增地址',
      setters: 'StringSetter'
    },
    {
      name: 'default-tag-text',
      title: '默认地址标签文字',
      setters: 'StringSetter'
    },
    {
      name: 'right-icon',
      title: '右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'edit',
      setters: ['VanIconSetter', 'StringSetter']
    }
  ],
  events: [
    { name: 'update:modelValue' },
    { name: 'add', params: ['item', 'index'] },
    { name: 'edit', params: ['item', 'index'] },
    { name: 'select', params: ['item', 'index'] },
    { name: 'editDisabled', params: ['item', 'index'] },
    { name: 'selectDisabled', params: ['item', 'index'] },
    { name: 'clickItem', params: ['item', 'index', 'data'] }
  ],
  slots: ['default', 'top', 'item-bottom', 'tag'],
  snippet: {
    props: {
      'disabled-text': '以下地址超出配送范围',
      'default-tag-text': '默认',
      modelValue: 1,
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  }
};

export default AddressList;

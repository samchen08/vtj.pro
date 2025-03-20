import type { MaterialDescription } from '@vtj/core';

const AddressEdit: MaterialDescription = {
  name: 'VanAddressEdit',
  alias: 'AddressEdit',
  label: '地址编辑',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/address-edit',
  props: [
    {
      name: 'area-list',
      title: '地区列表',
      setters: 'ObjectSetter'
    },
    {
      name: 'area-columns-placeholder',
      title: '地区选择列占位提示文字',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'area-placeholder',
      title: '地区输入框占位提示文字',
      defaultValue: '选择省 / 市 / 区',
      setters: 'StringSetter'
    },
    {
      name: 'address-info',
      title: '地址信息初始值',
      defaultValue: {},
      setters: 'ObjectSetter'
    },
    {
      name: 'search-result',
      title: '详细地址搜索结果',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'show-delete',
      title: '是否显示删除按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-set-default',
      title: '是否显示默认地址栏',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-search-result',
      title: '是否显示搜索结果',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-area',
      title: '是否显示地区',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-detail',
      title: '是否显示详细地址',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disable-area',
      title: '是否禁用地区选择',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'save-button-text',
      title: '保存按钮文字',
      defaultValue: '保存',
      setters: 'StringSetter'
    },
    {
      name: 'delete-button-text',
      title: '删除按钮文字',
      defaultValue: '删除',
      setters: 'StringSetter'
    },
    {
      name: 'detail-rows',
      title: '详细地址输入框行数',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'detail-maxlength',
      title: '详细地址最大长度',
      defaultValue: 200,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'is-saving',
      title: '是否显示保存按钮加载动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'is-deleting',
      title: '是否显示删除按钮加载动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'tel-validator',
      title: '手机号格式校验函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'tel-maxlength',
      title: '手机号最大长度',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'validator',
      title: '自定义校验函数',
      setters: 'FunctionSetter'
    }
  ],
  events: [
    { name: 'save', params: ['info'] },
    { name: 'focus', params: ['key'] },
    { name: 'change', params: ['data'] },
    { name: 'delete', params: ['info'] },
    { name: 'selectSearch', params: ['value'] },
    { name: 'clickArea' },
    { name: 'changeArea', params: ['selectedOptions'] },
    { name: 'changeDetail', params: ['value'] },
    { name: 'changeDefault', params: ['checked'] }
  ],
  slots: ['default'],
  snippet: {
    props: {
      'show-delete': true,
      'show-set-default': true,
      'show-search-result': true,
      'area-list': [],
      'area-columns-placeholder': ['请选择', '请选择', '请选择'],
      'search-result': [
        {
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }
      ]
    }
  }
};

export default AddressEdit;

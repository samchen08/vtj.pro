import type { MaterialDescription } from '@vtj/core';

const Coupon: MaterialDescription[] = [
  {
    name: 'VantCouponList',
    alias: 'CouponList',
    label: '优惠券列表',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/coupon',
    props: [
      {
        name: 'code',
        title: '当前输入的兑换码',
        setters: 'StringSetter'
      },
      {
        name: 'chosen-coupon',
        title: '当前选中优惠券的索引,支持多选',
        defaultValue: -1,
        setters: ['NumberSetter', 'ArraySetter']
      },
      {
        name: 'coupons',
        title: '可用优惠券列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'disabled-coupons',
        title: '不可用优惠券列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'enabled-title',
        title: '可用优惠券列表标题',
        defaultValue: '可使用优惠券',
        setters: 'StringSetter'
      },
      {
        name: 'disabled-title',
        title: '不可用优惠券列表标题',
        defaultValue: '不可使用优惠券',
        setters: 'StringSetter'
      },
      {
        name: 'exchange-button-text',
        title: '兑换按钮文字',
        defaultValue: '兑换',
        setters: 'StringSetter'
      },
      {
        name: 'exchange-button-loading',
        title: '是否显示兑换按钮加载动画',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'exchange-button-disabled',
        title: '是否禁用兑换按钮',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'exchange-min-length',
        title: '兑换码最小长度',
        defaultValue: 1,
        setters: 'NumberSetter'
      },
      {
        name: 'displayed-coupon-index',
        title: '滚动至特定优惠券位置',
        setters: 'NumberSetter'
      },
      {
        name: 'show-close-button',
        title: '是否显示列表底部按钮',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'close-button-text',
        title: '列表底部按钮文字',
        defaultValue: '不使用优惠',
        setters: 'StringSetter'
      },
      {
        name: 'input-placeholder',
        title: '输入框文字提示',
        defaultValue: '请输入优惠码',
        setters: 'StringSetter'
      },
      {
        name: 'show-exchange-bar',
        title: '是否展示兑换栏',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'currency',
        title: '货币符号',
        defaultValue: '￥',
        setters: 'StringSetter'
      },
      {
        name: 'empty-image',
        title: '列表为空时的占位图',
        setters: 'StringSetter'
      },
      {
        name: 'show-count',
        title: '是否展示可用 / 不可用数量',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      { name: 'change', params: ['index'] },
      { name: 'exchange', params: ['code'] }
    ],
    slots: ['list-footer', 'disabled-list-footer', 'list-button'],
    snippet: {
      props: {
        coupons: [
          {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元'
          }
        ],
        'chosen-coupon': -1,
        'disabled-coupons': [
          {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元'
          }
        ]
      }
    }
  },
  {
    name: 'VantCouponCell',
    alias: 'CouponCell',
    label: '优惠券单元格',
    categoryId: 'business',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/coupon',
    props: [
      {
        name: 'title',
        title: '单元格标题',
        defaultValue: '优惠券',
        setters: 'StringSetter'
      },
      {
        name: 'chosen-coupon',
        title: '当前选中优惠券的索引',
        defaultValue: -1,
        setters: ['NumberSetter', 'ArraySetter']
      },
      {
        name: 'coupons',
        title: '可用优惠券列表',
        defaultValue: [],
        setters: 'ArraySetter'
      },
      {
        name: 'editable',
        title: '能否切换优惠券',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示内边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'currency',
        title: '货币符号',
        defaultValue: '￥',
        setters: 'StringSetter'
      }
    ],
    snippet: {
      props: {
        coupons: [
          {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元'
          }
        ],
        'chosen-coupon': -1
      }
    }
  }
];

export default Coupon;

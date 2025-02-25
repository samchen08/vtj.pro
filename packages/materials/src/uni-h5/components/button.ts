import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Button',
  label: '按钮',
  categoryId: 'form',
  props: [
    {
      name: 'size',
      title: '按钮的大小',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['default', 'mini']
    },
    {
      name: 'type',
      title: '按钮的样式类型',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['primary', 'default', 'warn']
    },
    {
      name: 'plain',
      title: '按钮是否镂空，背景色透明',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '名称前是否带 loading 图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'form-type',
      title: '用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件',
      setters: 'SelectSetter',
      options: ['submit', 'reset']
    },
    {
      name: 'open-type',
      title: '开放能力',
      setters: 'SelectSetter',
      options: [
        'feedback',
        'share',
        'getUserInfo',
        'contact',
        'getPhoneNumber',
        'launchApp',
        'openSetting',
        'chooseAvatar',
        'agreePrivacyAuthorization',
        'uploadDouyinVideo',
        'im',
        'getAuthorize',
        'lifestyle',
        'contactShare',
        'openGroupProfile',
        'openGuildProfile',
        'openPublicProfile',
        'shareMessageToFriend',
        'addFriend',
        'addColorSign',
        'addGroupApp',
        'addToFavorites',
        'chooseAddress',
        'chooseInvoiceTitle',
        'login',
        'subscribe',
        'favorite',
        'watchLater',
        'openProfile'
      ]
    },
    {
      name: 'hover-class',
      title: '指定按钮按下去的样式类',
      defaultValue: 'button-hover',
      setters: 'StringSetter'
    },
    {
      name: 'hover-start-time',
      title: '按住后多久出现点击态，单位毫秒',
      defaultValue: 20,
      setters: 'NumberSetter'
    },
    {
      name: 'hover-stay-time',
      title: '手指松开后点击态保留时间，单位毫秒',
      defaultValue: 70,
      setters: 'NumberSetter'
    },
    {
      name: 'app-parameter',
      title: '打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效',
      setters: 'StringSetter'
    },
    {
      name: 'hover-stop-propagation',
      title: '指定是否阻止本节点的祖先节点出现点击态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'lang',
      title: '指定返回用户信息的语言',
      defaultValue: 'en',
      setters: 'SelectSetter',
      options: ['en', 'zh_CN', 'zh_TW']
    },
    {
      name: 'session-from',
      title: '会话来源，open-type="contact"时有效',
      setters: 'StringSetter'
    },
    {
      name: 'send-message-title',
      title: '会话内消息卡片标题，open-type="contact"时有效',
      setters: 'StringSetter'
    },
    {
      name: 'send-message-path',
      title: '会话内消息卡片点击跳转小程序路径，open-type="contact"时有效',
      setters: 'StringSetter'
    },
    {
      name: 'send-message-img',
      title: '会话内消息卡片图片，open-type="contact"时有效',
      setters: 'StringSetter'
    },
    {
      name: 'show-message-card',
      title: '是否显示会话内消息卡片',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'group-id',
      title: '打开群资料卡时，传递的群号',
      setters: 'StringSetter'
    },
    {
      name: 'guild-id',
      title: '打开频道页面时，传递的频道号',
      setters: 'StringSetter'
    },
    {
      name: 'public-id',
      title: '打开公众号资料卡时，传递的号码',
      setters: 'StringSetter'
    },
    {
      name: 'data-im-id',
      title: '客服的抖音号',
      setters: 'StringSetter'
    },
    {
      name: 'data-im-type',
      title: 'IM卡片类型',
      setters: 'StringSetter'
    },
    {
      name: 'data-goods-id',
      title: '商品的id',
      setters: 'StringSetter'
    },
    {
      name: 'data-order-id',
      title: '订单的id，仅支持交易2.0订单',
      setters: 'StringSetter'
    },
    {
      name: 'data-biz-line',
      title: '商品类型，“1”代表生活服务，“2”代表泛知识。',
      setters: 'StringSetter'
    }
  ],
  events: [
    'getphonenumber',
    'getuserinfo',
    'error',
    'opensetting',
    'launchapp',
    'contact',
    'chooseavatar',
    'agreeprivacyauthorization',
    'addgroupapp',
    'chooseaddress',
    'chooseinvoicetitle',
    'subscribe',
    'login',
    'im'
  ],
  snippet: {
    children: 'Button'
  }
};

export default desc;

import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Input',
  label: '单行输入框',
  categoryId: 'form',
  props: [
    {
      name: 'modelValue',
      title: '输入框的初始内容',
      setters: 'StringSetter'
    },
    {
      name: 'type',
      title: 'input 的类型 有效值',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: [
        'text',
        'number',
        'idcard',
        'digit',
        'tel',
        'safe-password',
        'nickname'
      ]
    },
    {
      name: 'text-content-type',
      title: '文本区域的语义，根据类型自动填充 有效值',
      setters: 'StringSetter'
    },
    {
      name: 'password',
      title: '是否是密码类型',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      title: '输入框为空时占位符',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder-style',
      title: '指定 placeholder 的样式',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder-class',
      title: '指定 placeholder 的样式类',
      defaultValue: 'input-placeholder',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'maxlength',
      title: '最大输入长度，设置为 -1 的时候不限制最大长度',
      defaultValue: 140,
      setters: 'NumberSetter'
    },
    {
      name: 'cursor-spacing',
      title: '指定光标与键盘的距离',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'focus',
      title: '获取焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'confirm-type',
      title: '设置键盘右下角按钮的文字，仅在 type="text" 时生效。有效值',
      defaultValue: 'done',
      setters: 'SelectSetter',
      options: ['send', 'search', 'next', 'go', 'done']
    },
    {
      name: 'confirm-hold',
      title: '点击键盘右下角按钮时是否保持键盘不收起',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'cursor',
      title: '指定focus时的光标位置',
      setters: 'NumberSetter'
    },
    {
      name: 'cursor-color',
      title: '光标颜色',
      setters: 'StringSetter'
    },
    {
      name: 'selection-start',
      title: '光标起始位置，自动聚集时有效，需与selection-end搭配使用',
      defaultValue: -1,
      setters: 'NumberSetter'
    },
    {
      name: 'selection-end',
      title: '光标结束位置，自动聚集时有效，需与selection-start搭配使用',
      defaultValue: -1,
      setters: 'NumberSetter'
    },
    {
      name: 'adjust-position',
      title: '键盘弹起时，是否自动上推页面',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-blur',
      title: '键盘收起时，是否自动失去焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'ignoreCompositionEvent',
      title: '是否忽略组件内对文本合成系统事件的处理',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'always-embed',
      title:
        '强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hold-keyboard',
      title: 'focus时，点击页面的时候不收起键盘',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'safe-password-cert-path',
      title: '安全键盘加密公钥的路径，只支持包内路径',
      setters: 'StringSetter'
    },
    {
      name: 'safe-password-length',
      title: '安全键盘输入密码长度',
      setters: 'NumberSetter'
    },
    {
      name: 'safe-password-time-stamp',
      title: '安全键盘加密时间戳',
      setters: 'NumberSetter'
    },
    {
      name: 'safe-password-nonce',
      title: '安全键盘加密盐值',
      setters: 'StringSetter'
    },
    {
      name: 'safe-password-salt',
      title: '安全键盘计算 hash 盐值，若指定custom-hash 则无效',
      setters: 'StringSetter'
    },
    {
      name: 'safe-password-custom-hash',
      title: '安全键盘计算 hash 的算法表达式',
      setters: 'StringSetter'
    },
    {
      name: 'random-number',
      title: '当 type 为 number, digit, idcard 数字键盘是否随机排列',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'controlled',
      title: '是否为受控组件。为 true 时，value 内容会完全受 setData 控制',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'always-system',
      title:
        '是否强制使用系统键盘和 Web-view 创建的 input 元素。为 true 时，confirm-type、confirm-hold 可能失效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'inputmode',
      title:
        '是一个枚举属性，它提供了用户在编辑元素或其内容时可能输入的数据类型的提示',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: [
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url'
      ]
    }
  ],
  events: ['input', 'focus', 'blur', 'confirm', 'update:modelValue'],
  snippet: {
    props: {
      placeholder: '这个是一个输入框'
    }
  }
};

export default desc;

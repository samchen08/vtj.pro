import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniPopup',
    label: '弹出层',
    categoryId: 'ext',
    props: [
      {
        name: 'animation',
        title: '是否开启动画',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        title: '弹出方式',
        defaultValue: 'center',
        setters: 'SelectSetter',
        options: [
          'top',
          'center',
          'bottom',
          'left',
          'right',
          'message',
          'dialog',
          'share'
        ]
      },
      {
        name: 'mask-click',
        title: '蒙版点击是否关闭弹窗',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'is-mask-click',
        title: '蒙版点击是否关闭弹窗',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'mask-background-color',
        title: '蒙版颜色，建议使用 rgba 颜色值',
        defaultValue: 'rgba(0,0,0,0.4)',
        setters: ['ColorSetter', 'StringSetter']
      },
      {
        name: 'background-color',
        title: '主窗口背景色',
        defaultValue: 'none',
        setters: 'StringSetter'
      },
      {
        name: 'borderRadius',
        title: '设置圆角',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'safe-area',
        title: '是否适配底部安全区',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'maskClick'],
    snippet: {
      children: [{ name: 'View', children: 'popup 内容' }]
    }
  },
  {
    name: 'UniPopupMessage',
    label: '提示信息',
    categoryId: 'ext',
    props: [
      {
        name: 'type',
        title: '消息提示主题',
        defaultValue: 'success',
        setters: 'SelectSetter',
        options: ['success', 'warn', 'error', 'info']
      },
      {
        name: 'message',
        title: '消息提示文字',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'duration',
        title:
          '消息显示时间，超过显示时间组件自动关闭，设置为0 将不会关闭，需手动调用 close 方法关闭',
        defaultValue: 3000,
        setters: 'NumberSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        type: 'success',
        message: '这是一条成功提示',
        duration: '2000'
      }
    }
  },
  {
    name: 'UniPopupDialog',
    label: '对话框',
    categoryId: 'ext',
    props: [
      {
        name: 'type',
        title: '对话框标题主题',
        defaultValue: 'success',
        setters: 'SelectSetter',
        options: ['success', 'warn', 'info', 'error']
      },
      {
        name: 'mode',
        title: '对话框模式',
        defaultValue: 'base',
        setters: 'SelectSetter',
        options: ['base', 'input']
      },
      {
        name: 'title',
        title: '对话框标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'content',
        title: '对话框内容，base模式下生效',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'confirmText',
        title: '定义确定按钮文本',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'cancelText',
        title: '定义取消按钮文本',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'maxlength',
        title: '限制输入框字数（当mode="input"时生效）',
        defaultValue: '',
        setters: 'NumberSetter'
      },
      {
        name: 'showClose',
        title: '是否显示取消按钮',
        defaultValue: '',
        setters: 'BooleanSetter'
      },
      {
        name: 'modelValue',
        title: '输入框值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'placeholder',
        title: '输入框提示文字，input模式下生效',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'borderRadius',
        title: '四周圆角值（左上、右上、右下、左下）',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'before-close',
        title: '是否拦截按钮事件',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['close', 'confirm', 'update:modelValue'],
    slots: ['default'],
    snippet: {}
  },
  {
    name: 'UniPopupShare',
    label: '分享示例',
    categoryId: 'ext',
    props: [
      {
        name: 'title',
        title: '分享弹窗标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'before-close',
        title: '是否拦截按钮事件',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['select']
  }
];

export default desc;

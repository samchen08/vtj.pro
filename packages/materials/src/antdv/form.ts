import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AForm',
    alias: 'Form',
    label: '表单',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/form-cn',
    props: [
      {
        name: 'colon',
        label: 'colon',
        title:
          '配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效)',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '设置表单组件禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'hideRequiredMark',
        label: 'hideRequiredMark',
        title: '隐藏所有表单项的必选标记',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'labelAlign',
        label: 'labelAlign',
        title: 'label 标签的文本对齐方式',
        setters: 'SelectSetter',
        options: ['left', 'right'],
        defaultValue: 'right'
      },
      {
        name: 'labelCol',
        label: 'labelCol',
        title:
          'label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}',
        setters: 'ObjectSetter'
      },
      {
        name: 'labelWrap',
        label: 'labelWrap',
        title: 'label 标签的文本换行方式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'layout',
        label: 'layout',
        title: '表单布局',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical', 'inline'],
        defaultValue: 'horizontal'
      },
      {
        name: 'model',
        label: 'model',
        title: '表单数据对象',
        setters: 'ObjectSetter'
      },
      {
        name: 'name',
        label: 'name',
        title: '表单名称，会作为表单字段 id 前缀使用',
        setters: 'StringSetter'
      },
      {
        name: 'noStyle',
        label: 'noStyle',
        title: '为 true 时不带样式，作为纯字段控件使用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'rules',
        label: 'rules',
        title: '表单验证规则',
        setters: 'ObjectSetter'
      },
      {
        name: 'scrollToFirstError',
        label: 'scrollToFirstError',
        title: '提交失败自动滚动到第一个错误字段',
        setters: ['BooleanSetter', 'ObjectSetter'],
        defaultValue: false
      },
      {
        name: 'validateOnRuleChange',
        label: 'validateOnRuleChange',
        title: '是否在 rules 属性改变后立即触发一次验证',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'validateTrigger',
        label: 'validateTrigger',
        title: '统一设置字段校验规则',
        setters: ['StringSetter', 'ArraySetter'],
        defaultValue: 'change'
      },
      {
        name: 'wrapperCol',
        label: 'wrapperCol',
        title: '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
        setters: 'ObjectSetter'
      }
    ],
    events: ['finish', 'finishFailed', 'submit', 'validate'],
    snippet: {
      children: [
        {
          name: 'AFormItem',
          props: {
            label: 'Username',
            name: 'username',
            rules: [{ required: true, message: 'Please input your username!' }]
          },
          children: [{ name: 'AInput' }]
        },
        {
          name: 'AFormItem',
          props: {
            label: 'Password',
            name: 'password',
            rules: [{ required: true, message: 'Please input your password!' }]
          },
          children: [{ name: 'AInputPassword' }]
        },
        {
          name: 'AFormItem',
          props: {
            name: 'remember',
            wrapperCol: { offset: 8, span: 16 }
          },
          children: [{ name: 'ACheckbox', children: 'Remember me' }]
        },
        {
          name: 'AFormItem',
          props: {
            wrapperCol: { offset: 8, span: 16 }
          },
          children: [
            { name: 'AButton', props: { type: 'primary' }, children: 'Submit' }
          ]
        }
      ]
    }
  },
  {
    name: 'AFormItem',
    alias: 'Item',
    parent: 'Form',
    label: '表单项',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/form-cn',
    props: [
      {
        name: 'autoLink',
        label: 'autoLink',
        title:
          '是否自动关联表单域，对于大部分情况都可以使用自动关联，如果不满足自动关联的条件，可以手动关联',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'colon',
        label: 'colon',
        title: '配合 label 属性使用，表示是否显示 label 后面的冒号',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'extra',
        label: 'extra',
        title:
          '额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个',
        setters: 'StringSetter'
      },
      {
        name: 'hasFeedback',
        label: 'hasFeedback',
        title:
          '配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'help',
        label: 'help',
        title: '提示信息，如不设置，则会根据校验规则自动生成',
        setters: 'StringSetter'
      },
      {
        name: 'htmlFor',
        label: 'htmlFor',
        title: '设置子元素 label htmlFor 属性',
        setters: 'StringSetter'
      },
      {
        name: 'label',
        label: 'label',
        title: 'label 标签的文本',
        setters: 'StringSetter'
      },
      {
        name: 'labelAlign',
        label: 'labelAlign',
        title: 'label 标签的文本对齐方式',
        setters: 'SelectSetter',
        options: ['left', 'right'],
        defaultValue: 'right'
      },
      {
        name: 'labelCol',
        label: 'labelCol',
        title:
          'label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}',
        setters: 'ObjectSetter'
      },
      {
        name: 'name',
        label: 'name',
        title:
          '表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的',
        setters: ['StringSetter', 'NumberSetter', 'ArraySetter']
      },
      {
        name: 'required',
        label: 'required',
        title: '是否必填，如不设置，则会根据校验规则自动生成',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'rules',
        label: 'rules',
        title: '表单验证规则',
        setters: ['ObjectSetter', 'ArraySetter']
      },
      {
        name: 'tooltip',
        label: 'tooltip',
        title: '配置提示信息',
        setters: 'StringSetter'
      },
      {
        name: 'validateFirst',
        label: 'validateFirst',
        title: '当某一规则校验不通过时，是否停止剩下的规则的校验',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'validateStatus',
        label: 'validateStatus',
        title: '校验状态，如不设置，则会根据校验规则自动生成',
        setters: 'SelectSetter',
        options: ['success', 'warning', 'error', 'validating']
      },
      {
        name: 'validateTrigger',
        label: 'validateTrigger',
        title: '设置字段校验的时机',
        setters: ['StringSetter', 'ArraySetter'],
        defaultValue: 'change'
      },
      {
        name: 'wrapperCol',
        label: 'wrapperCol',
        title: '要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
        setters: 'ObjectSetter'
      }
    ],
    slots: ['default', 'extra', 'help', 'label', 'tooltip'],
    snippet: {
      props: {
        label: '表单项'
      },
      children: [
        {
          name: 'AInput'
        }
      ]
    }
  }
];
export default components;

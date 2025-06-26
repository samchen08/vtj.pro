import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AInput',
    alias: 'Input',
    label: '输入框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/input-cn',
    props: [
      {
        name: 'addonAfter',
        label: 'addonAfter',
        title: '带标签的 input，设置后置标签',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'addonBefore',
        label: 'addonBefore',
        title: '带标签的 input，设置前置标签',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '可以点击清除图标删除内容',
        setters: 'BooleanSetter'
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '输入框默认内容',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用状态，默认为 false',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'id',
        label: 'id',
        title: '输入框的 id',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框的提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'maxlength',
        label: 'maxlength',
        title: '最大长度',
        setters: 'NumberSetter'
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '带有前缀图标的 input',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'showCount',
        label: 'showCount',
        title: '是否展示字数',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'size',
        label: 'size',
        title:
          '控件大小。注：标准表单内的输入框大小限制为 middle。可选 large middle small',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small']
      },
      {
        name: 'suffix',
        label: 'suffix',
        title: '带有后缀图标的 input',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'type',
        label: 'type',
        title:
          '声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 <a-textarea /> 代替 type="textarea")',
        setters: 'StringSetter',
        defaultValue: 'text'
      },
      {
        name: 'value',
        label: 'value',
        title: '输入框内容',
        setters: 'StringSetter',
        defaultValue: 'text'
      }
    ],
    events: ['change', 'pressEnter', 'update:value'],
    slots: [
      'default',
      'addonAfter',
      'addonBefore',
      'clearIcon',
      'prefix',
      'suffix'
    ]
  },
  {
    name: 'ATextarea',
    alias: 'Textarea',
    label: '文本域',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/input-cn',
    props: [
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '可以点击清除图标删除内容',
        setters: 'BooleanSetter'
      },
      {
        name: 'autosize',
        label: 'autosize',
        title:
          '自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }',
        setters: ['BooleanSetter', 'ObjectSetter'] //?? 	boolean|object
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '输入框默认内容',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框的提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'showCount',
        label: 'showCount',
        title: '是否展示字数',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'value',
        label: 'value',
        title: '输入框内容',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用状态',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'rows',
        label: 'rows',
        title: '指定输入框的行数',
        setters: 'NumberSetter',
        defaultValue: 2
      },
      {
        name: 'maxlength',
        label: 'maxlength',
        title: '最大长度',
        setters: 'NumberSetter'
      },
      {
        name: 'minlength',
        label: 'minlength',
        title: '最小长度',
        setters: 'NumberSetter'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框的提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'readonly',
        label: 'readonly',
        title: '是否只读',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'wrap',
        label: 'wrap',
        title: '文本域的文本换行方式',
        setters: 'SelectSetter',
        options: ['soft', 'hard', 'off'],
        defaultValue: 'soft'
      }
    ],
    events: ['pressEnter', 'update:value']
  },
  {
    name: 'AInputSearch',
    alias: 'Search',
    parent: 'Input',
    label: '搜索框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/input-cn',
    props: [
      {
        name: 'enterButton',
        label: 'enterButton',
        title: '是否有确认按钮，可设为按钮文字。该属性会与 addon 冲突',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'loading',
        label: 'loading',
        title: '搜索 loading',
        setters: 'BooleanSetter'
      },
      {
        name: 'addonAfter',
        label: 'addonAfter',
        title: '带标签的 input，设置后置标签',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'addonBefore',
        label: 'addonBefore',
        title: '带标签的 input，设置前置标签',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'allowClear',
        label: 'allowClear',
        title: '可以点击清除图标删除内容',
        setters: 'BooleanSetter'
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultValue',
        label: 'defaultValue',
        title: '输入框默认内容',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用状态，默认为 false',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'id',
        label: 'id',
        title: '输入框的 id',
        setters: 'StringSetter'
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框的提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'maxlength',
        label: 'maxlength',
        title: '最大长度',
        setters: 'NumberSetter'
      },
      {
        name: 'prefix',
        label: 'prefix',
        title: '带有前缀图标的 input',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'showCount',
        label: 'showCount',
        title: '是否展示字数',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'status',
        label: 'status',
        title: '设置校验状态',
        setters: 'SelectSetter',
        options: ['error', 'warning']
      },
      {
        name: 'size',
        label: 'size',
        title:
          '控件大小。注：标准表单内的输入框大小限制为 middle。可选 large middle small',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small']
      },
      {
        name: 'suffix',
        label: 'suffix',
        title: '带有后缀图标的 input',
        setters: 'StringSetter' //?? 	string|slot
      },
      {
        name: 'type',
        label: 'type',
        title:
          '声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 <a-textarea /> 代替 type="textarea")',
        setters: 'StringSetter',
        defaultValue: 'text'
      },
      {
        name: 'value',
        label: 'value',
        title: '输入框内容',
        setters: 'StringSetter',
        defaultValue: 'text'
      }
    ],
    events: ['change', 'pressEnter', 'search', 'update:value'],
    slots: ['enterButton']
  },
  {
    name: 'AInputGroup',
    alias: 'Group',
    parent: 'Input',
    label: '输入框组合',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/input-cn',
    props: [
      {
        name: 'compact',
        label: 'compact',
        title: '是否用紧凑模式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'size',
        label: 'size',
        title: 'Input.Group 中所有的 Input 的大小，可选 large default small',
        setters: 'SelectSetter',
        options: ['large', 'default', 'small'],
        defaultValue: 'default'
      }
    ],
    snippet: {
      children: [
        {
          name: 'AInput',
          children: 'input1'
        },
        {
          name: 'AInput',
          children: 'input2'
        },
        {
          name: 'AInput',
          children: 'input3'
        }
      ]
    }
  },
  {
    name: 'AInputPassword',
    alias: 'Password',
    parent: 'Input',
    label: '密码输入框',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/input-cn',
    props: [
      {
        name: 'visible',
        label: 'visible',
        title: '密码是否可见',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'placeholder',
        label: 'placeholder',
        title: '输入框的提示文字',
        setters: 'StringSetter'
      },
      {
        name: 'visibilityToggle',
        label: 'visibilityToggle',
        title: '是否显示切换按钮或者控制密码显隐',
        setters: 'BooleanSetter',
        defaultValue: true
      }
    ],
    events: ['update:visible'],
    slots: ['iconRender']
  }
];
export default components;

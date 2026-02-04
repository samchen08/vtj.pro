import type { MaterialDescription } from '@vtj/core';
const Radio: MaterialDescription[] = [
  {
    name: 'ElRadio',
    label: '单选框',

    categoryId: 'form',
    doc: 'https://element-plus.org/zh-CN/component/radio.html',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '选中项绑定值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'value',
        title: '单选框的值',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        title: '单选框的 label 如果value没有值， label则作为value使用',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用单选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: '单选框的尺寸',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'name',
        title: '原始 name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        label: '选项一',
        value: '1'
      }
    }
  },
  {
    name: 'ElRadioGroup',
    label: '单选框组',

    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        title: '绑定值',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'size',
        title: '单选框按钮或边框按钮的大小',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'validateEvent',
        title: '输入时是否触发表单的校验',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'textColor',
        title: '按钮形式的 Radio 激活时的文本颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'fill',
        title: '按钮形式的 Radio 激活时的填充色和边框色',
        defaultValue: '#409EFF',
        setters: 'ColorSetter'
      },
      {
        name: 'aria-label',
        title: '与 RadioGroup 中的 aria-label 属性相同',
        setters: 'StringSetter'
      },
      {
        name: 'name',
        label: 'name',
        title: '原生 name 属性',
        setters: 'StringSetter'
      },
      {
        name: 'id',
        label: 'id',
        title: '原生 id 属性',
        setters: 'StringSetter'
      },
      {
        name: 'options',
        title: '选项的数据源， value 的 key 和 label 和  disabled可以通过 props自定义.',
        setters: 'ArraySetter'
      },
      {
        name: 'props',
        title: 'options 的配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'type',
        title: '\t用于渲染选项的组件类型（例如 \'button\'）',
        defaultValue: 'radio',
        options: ['radio', 'button'],
        setters: 'SelectSetter'
      },
    ],
    events: [
      {
        name: 'change'
      },
      {
        name: 'update:modelValue'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElRadioGroup',
      children: [
        {
          name: 'ElRadio',
          props: {
            label: '选项一',
            value: '1'
          }
        },
        {
          name: 'ElRadio',
          props: {
            label: '选项二',
            value: '2'
          }
        },
        {
          name: 'ElRadio',
          props: {
            label: '选项三',
            value: '3'
          }
        }
      ]
    }
  },
  {
    name: 'ElRadioButton',
    label: '单选框按钮',

    categoryId: 'form',
    package: 'element-plus',
    props: [
      {
        name: 'label',
        title: '单选框的label,如果没有value,label则作为value使用',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'value',
        title: '单选框的值',
        defaultValue: '',
        setters: ['StringSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'disabled',
        title: '是否禁用单选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '原生 name 属性',
        defaultValue: '',
        setters: 'StringSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      children: '按钮选项'
    }
  }
];

export default Radio;

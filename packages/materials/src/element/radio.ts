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
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'value',
        label: 'value',
        title: '单选框的值',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: ['InputSetter']
      },
      {
        name: 'value',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'BooleanSetter'
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
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'textColor',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },

      {
        name: 'fill',
        defaultValue: '#409EFF',
        setters: 'ColorSetter'
      },

      {
        name: 'validateEvent',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'label',
        label: 'label',
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
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'value',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter', 'BooleanSetter']
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        defaultValue: '',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      children: '按钮选项'
    }
  }
];

export default Radio;

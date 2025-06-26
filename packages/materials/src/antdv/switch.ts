import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASwitch',
    alias: 'Switch',
    label: '开关',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/switch-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '组件自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'checked',
        label: 'checked',
        title: '指定当前是否选中',
        setters: 'BooleanSetter', //?? checkedValue | unCheckedValue
        defaultValue: false
      },
      {
        name: 'checkedChildren',
        label: 'checkedChildren',
        title: '选中时的内容',
        setters: 'StringSetter'
      },
      {
        name: 'checkedValue',
        label: 'checkedValue',
        title: '选中时的值',
        setters: ['BooleanSetter', 'StringSetter', 'NumberSetter'],
        defaultValue: true
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '是否禁用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'loading',
        label: 'loading',
        title: '加载中的开关',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'size',
        label: 'size',
        title: '开关大小，可选值：default small',
        setters: 'SelectSetter',
        options: ['default', 'small'],
        defaultValue: 'default'
      },
      {
        name: 'unCheckedChildren',
        label: 'unCheckedChildren',
        title: '非选中时的内容',
        setters: 'StringSetter'
      },
      {
        name: 'unCheckedValue',
        label: 'unCheckedValue',
        title: '非选中时的值',
        setters: ['BooleanSetter', 'StringSetter', 'NumberSetter'],
        defaultValue: false
      }
    ],
    events: ['change', 'click', 'update:checked'],
    slots: ['default', 'checkedChildren', 'unCheckedChildren']
  }
];
export default components;

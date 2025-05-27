import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'AConfigProvider',
    alias: 'ConfigProvider',
    label: '全局化配置',
    categoryId: 'other',
    doc: 'https://www.antdv.com/components/config-provider-cn',
    props: [
      {
        name: 'autoInsertSpaceInButton',
        label: 'autoInsertSpaceInButton',
        title: '设置为 false 时，移除按钮中 2 个汉字之间的空格',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'componentSize',
        label: 'componentSize',
        title: '设置 antd 组件大小',
        setters: 'SelectSetter',
        options: ['small', 'middle', 'large']
      },
      {
        name: 'csp',
        label: 'csp',
        title: '设置 Content Security Policy 配置',
        setters: 'ObjectSetter' //?? { nonce: string }
      },
      {
        name: 'direction',
        label: 'direction',
        title: '设置文本展示方向',
        setters: 'SelectSetter',
        options: ['ltr', 'rtl'],
        defaultValue: 'ltr'
      },
      {
        name: 'dropdownMatchSelectWidth',
        label: 'dropdownMatchSelectWidth',
        title:
          '下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动',
        setters: ['BooleanSetter', 'NumberSetter']
      },
      {
        name: 'form',
        label: 'form',
        title: '设置 Form 组件的通用属性',
        setters: 'ObjectSetter' //?? 	{ validateMessages?: ValidateMessages, requiredMark?: boolean | optional, colon?: boolean}
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title:
          '弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上',
        setters: 'FunctionSetter' //?? Function(triggerNode, dialogContext)
      },
      {
        name: 'getTargetContainer',
        label: 'getTargetContainer',
        title: '配置 Affix、Anchor 滚动监听容器',
        setters: 'FunctionSetter' //?? () => HTMLElement
      },
      {
        name: 'input',
        label: 'input',
        title: '设置 Input 组件的通用属性',
        setters: 'ObjectSetter' //?? { autocomplete?: string }
      },
      {
        name: 'locale',
        label: 'locale',
        title: '语言包配置',
        setters: 'ObjectSetter'
      },
      {
        name: 'pageHeader',
        label: 'pageHeader',
        title: '统一设置 pageHeader 的 ghost',
        setters: 'ObjectSetter', //?? { ghost: boolean }
        defaultValue: { ghost: true }
      },
      {
        name: 'prefixCls',
        label: 'prefixCls',
        title: '设置统一样式前缀。注意：需要配合 less 变量 @ant-prefix 使用',
        setters: 'StringSetter',
        defaultValue: 'ant'
      },
      {
        name: 'renderEmpty',
        label: 'renderEmpty',
        title: '自定义组件空状态。参考 空状态',
        setters: 'FunctionSetter' //?? slot | Function(componentName: string): VNode
      },
      {
        name: 'space',
        label: 'space',
        title: '设置 Space 的 size，参考 Space',
        setters: 'ObjectSetter' //?? 	{ size: small | middle | large | number }
      },
      {
        name: 'transformCellText',
        label: 'transformCellText',
        title: 'Table 数据渲染前可以再次改变，一般用户空数据的默认配置',
        setters: 'FunctionSetter' //?? 	Function({ text, column, record, index }) => any
      },
      {
        name: 'virtual',
        label: 'virtual',
        title: '设置 false 时关闭虚拟滚动',
        setters: 'BooleanSetter'
      },
      {
        name: 'wave',
        label: 'wave',
        title: '设置水波纹特效',
        setters: 'ObjectSetter' //?? 	{ disabled?: boolean }
      }
    ],
    slots: ['default', 'renderEmpty']
  }
];
export default components;

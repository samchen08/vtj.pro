# XAction 操作按钮

## 示例

### 基础用法

:::preview
demo-preview=../examples/ui/action/action-1.vue
:::

### 提示信息 用法

:::preview
demo-preview=../examples/ui/action/action-3.vue
:::

### mode: icon 用法

:::preview
demo-preview=../examples/ui/action/action-4.vue
:::

### 下拉菜单 用法

:::preview
demo-preview=../examples/ui/action/action-2.vue
:::

<!-- ### 拖拽 用法


:::preview
demo-preview=../examples/ui/action/action-5.vue
:::


### 拖拽 用法


:::preview
demo-preview=../examples/ui/action/action-6.vue
::: -->

## API

### 属性

| 属性名     | 说明                                     | 类型                                   | 默认值  |
| ---------- | ---------------------------------------- | -------------------------------------- | ------- |
| name       | 动作名称标识                             | string                                 | -       |
| label      | 动作标题文本                             | boolean                                | false   |
| value      | 动作值，用来传输数据                     | string \| number \| object \| array \| | -       |
| icon       | 图标配置                                 | string \| object                       | -       |
| mode       | 模式                                     | string                                 | button  |
| menus      | 下拉菜单配置                             | array                                  | -       |
| tooltip    | tooltip 配置                             | string \| object                       | -       |
| badge      | badge配置                                | string \| Number \| Object             | -       |
| dropdown   | ElDropdown 组件配置                      | object                                 | -       |
| button     | ElButton 组件配置，mode为button时有效    | object                                 | -       |
| disabled   | 禁用                                     | boolean                                | -       |
| size       | 尺寸                                     | string                                 | default |
| type       | 颜色类型                                 | string                                 | -       |
| background | icon 背景设置，当 mode为 icon 时有效     | string `always, hover, none`           | always  |
| circle     | icon 背景样式圆形，当 mode为 icon 时有效 | string                                 | -       |
| draggable  | 是否可拖拽                               | boolean                                | -       |

### 事件

| 名称    | 说明               | 参数 |
| ------- | ------------------ | ---- |
| click   | 点击事件           | -    |
| command | menu菜单项点击事件 | -    |

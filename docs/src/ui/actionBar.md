# XActionBar 操作按钮集

## 示例

### 基础用法

:::preview
demo-preview=../examples/ui/actionBar/actionBar-1.vue
:::

### mode:icon 效果

:::preview
demo-preview=../examples/ui/actionBar/actionBar-2.vue
:::

## API

### 属性

| 属性名     | 说明                                     | 类型                         | 默认值  |
| ---------- | ---------------------------------------- | ---------------------------- | ------- |
| items      | 动作项                                   | array                        | -       |
| mode       | 模式                                     | string `button\|text\|icon`  | -       |
| size       | 尺寸                                     | string                       | default |
| type       | 颜色类型                                 | string                       | -       |
| background | icon 背景设置，当 mode为 icon 时有效     | string `always\|hover\|none` | always  |
| circle     | icon 背景样式圆形，当 mode为 icon 时有效 | boolean                      | -       |
| disabled   | 禁用                                     | boolean \| () => boolean     | -       |
| tooltip    | tooltip 配置                             | object                       | -       |
| badge      | Badge 配置                               | object                       | -       |
| dropdown   | ElDropdown 组件配置                      | object                       | -       |
| button     | ElButton 组件配置，mode为button时有效    | object                       | -       |

### 事件

| 名称    | 说明               | 参数 |
| ------- | ------------------ | ---- |
| click   | 点击事件           | -    |
| command | menu菜单项点击事件 | -    |

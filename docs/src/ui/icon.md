# XIcon 图标

VTJ 提供了一套常用的图标集合，包含SVG、Iconfont，它们都统一以Vue组件的形式使用。[内置图标](./icons.md)

## 示例

### 基础用法

图标组件的基础用法

:::preview
demo-preview=../examples/ui/icon/icon-1.vue
:::

### 定义尺寸

:::preview
demo-preview=../examples/ui/icon/icon-2.vue
:::

### 定义颜色

:::preview
demo-preview=../examples/ui/icon/icon-3.vue
:::

## 定义边距、圆角

:::preview
demo-preview=../examples/ui/icon/icon-4.vue
:::

## 定义图标内容

:::preview
demo-preview=../examples/ui/icon/icon-5.vue
:::

## API

### 属性

| 属性名     | 说明                                                                   | 类型                      | 默认值  |
| ---------- | ---------------------------------------------------------------------- | ------------------------- | ------- |
| icon       | 图标内容, 可以是`element-plus/icons-vue`的组件或内置的`Iconfont`样式名 | string \| object \| VNode | -       |
| color      | 颜色码                                                                 | string                    | -       |
| size       | 尺寸, 支持数字或固定值 `inherit` `large` `default` `small`             | number \| string          | inherit |
| src        | 图片资源URL，单图标是图片形式是可用                                    | string                    | -       |
| background | 背景颜色码                                                             | string                    | -       |
| padding    | 内边距值                                                               | number                    | -       |
| radius     | 圆角值                                                                 | number                    | -       |

### 事件

| 名称  | 说明         | 参数 |
| ----- | ------------ | ---- |
| click | 点击图标事件 | -    |

### 插槽

| 插槽名  | 说明           | 类型 |
| ------- | -------------- | ---- |
| default | 自定义图标内容 | -    |

### 暴露

| 名称 | 说明 | 类型 |
| ---- | ---- | ---- |
| 无   |

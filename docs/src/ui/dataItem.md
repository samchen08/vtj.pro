# XDataItem 数据项

## 示例

### 基础用法

:::preview
demo-preview=../examples/ui/dataItem/base.vue
:::

### 排列展示

:::preview
demo-preview=../examples/ui/dataItem/dataItem-1.vue
:::

### 插槽展示

:::preview
demo-preview=../examples/ui/dataItem/dataItem-2.vue
:::

## API

### 属性

| 属性名         | 说明                  | 类型                        | 默认值                                     |
| -------------- | --------------------- | --------------------------- | ------------------------------------------ |
| direction      | 排列方式              | `string<'row' \| 'column'>` | column                                     |
| imageSrc       | 图片路径              | `string`                    | -                                          |
| imageWidth     | 图片宽度              | `number \| string`          | -                                          |
| imageHeight    | 图片高度              | `number \| string`          | -                                          |
| icon           | 图标                  | `string \| object`          | -                                          |
| title          | 数据项标题            | `string`                    | -                                          |
| description    | 数据项描述            | `string`                    | -                                          |
| actions        | 底部按钮              | `array`                     | -                                          |
| actionBarProps | XActionBar 的属性对象 | `object`                    | -                                          |
| split          | css控制间隔           | `boolean`                   | pt-[10px],mt-[10px],bt-[1px solid #e4e7ed] |
| onImageClick   | 点击图片              | `function`                  | -                                          |
| onTitleClick   | 点击标题              | `function`                  | -                                          |

### 事件

| 名称          | 说明     | 参数          |
| ------------- | -------- | ------------- |
| imageClick    | 点击图片 | -             |
| titleClick    | 点击标题 | -             |
| actionClick   | 点击图标 | (action)      |
| actionCommand | 点击图标 | (action,menu) |

### 插槽

| 插槽名      | 说明     | 类型 |
| ----------- | -------- | ---- |
| default     | 默认插槽 | -    |
| image       | -        | -    |
| title       | -        | -    |
| description | -        |
| actions     | -        | -    |

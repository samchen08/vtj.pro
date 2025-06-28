# XDialog 弹窗

## 示例

### 基础用法

:::preview
demo-preview=../examples/ui/dialog/dialog-1.vue
:::

### 自定义内容

:::preview
demo-preview=../examples/ui/dialog/dialog-2.vue
:::

## API

### 属性

| 属性名      | 说明                               | 类型                          | 默认值    |
| ----------- | ---------------------------------- | ----------------------------- | --------- |
| modelValue  | 是否显示 Dialog                    | `boolean`                     | `true`    |
| title       | 标题                               | `string`                      | -         |
| subtitle    | 副标题                             | `string`                      | -         |
| icon        | 图标                               | `string \| object`            | -         |
| size        | 尺寸                               | `string`                      | `default` |
| width       | 宽度                               | `number \| string`            | `70%`     |
| height      | 高度                               | `number \| string`            | `70%`     |
| left        | Dialog CSS 中的 margin-left 值     | `number \| string`            | -         |
| top         | Dialog CSS 中的 margin-top 值      | `number \| string`            | -         |
| modal       | 是否展示遮罩层                     | `boolean`                     | `true`    |
| draggable   | 是否可拖拽                         | `boolean \| object`           | `true`    |
| resizable   | 是否可以拉伸                       | `boolean \| object`           | -         |
| closable    | 是否显示关闭图标                   | `boolean`                     | `true`    |
| maximizable | 是否显示放大图标                   | `boolean`                     | `false`   |
| minimizable | 是否显示缩小图标                   | `boolean`                     | `false`   |
| mode        | 弹窗模式<最大化、最小化、正常化>   | `string`                      | `normal`  |
| content     | 定义内容                           | `object` <VNode \| component> | -         |
| src         | 内容路径                           | `string`                      | -         |
| beforeClose | 关闭前的回调，会暂停 Dialog 的关闭 | `function`                    | -         |
| submit      | 显示确认按钮                       | `boolean\| string`            | -         |
| cancel      | 显示取消按钮                       | `boolean\| string`            | -         |
| bodyPadding | 显示内容区域的内边距               | `boolean`                     | `true`    |
| primary     | 标题背景颜色                       | `boolean`                     | -         |

#### 接收 XPanel 所有参数

### 事件

| 名称                  | 说明                         | 回调参数 |
| --------------------- | ---------------------------- | -------- |
| `'update:modelValue'` | 显示与隐藏 dialog 触发的回调 | -        |
| `open`                | Dialog `打开`的回调          | -        |
| `close`               | Dialog `关闭`的回调          | -        |
| `destroy`             | 销毁组件时触发的回调         | -        |
| `maximized`           | 点击`弹窗最大化`时的回调     | -        |
| `minimized`           | 点击`弹窗最小化`时的回调     | -        |
| `normal`              | 点击`弹窗正常化`时的回调     | -        |
| `modeChange`          | 当`弹窗模式改变`时触发的事件 | `mode`   |
| `dragStart`           | 当`拖拽开始`时触发的事件     | -        |
| `dragging`            | 当`拖拽中`时触发的事件       | -        |
| `dragEnd`             | 当`拖拽结束`时触发的事件     | -        |
| `resizeStart`         | 当`变换开始`时触发的事件     | -        |
| `resizing`            | 当`变换中`时触发的事件       | -        |
| `resizeEnd`           | 当`变换结束`时触发的事件     | -        |
| `submit`              | Dialog 点击确认按钮的回      | -        |
| `cancel`              | Dialog 点击取消按钮的回      | -        |

### 暴露

| 名称       | 说明                                       | 类型   |
| ---------- | ------------------------------------------ | ------ |
| $vtjEl     | 组件父元素的实例                           | -      |
| panelRef   | 当前组件实例                               | -      |
| state      | 组件的参数                                 | object |
| maximized  | 是否显示放大图标                           | -      |
| minimized  | 是否显示缩小图标                           | -      |
| changeMode | 改变模式（最大化、最小化、正常形状）的回调 | -      |
| show       | 显示 Dialog方法                            | -      |
| hide       | 隐藏 Dialog方法                            | -      |
| submit     | Dialog 点击确认按钮的回调                  | -      |
| cancel-    | Dialog 点击取消按钮的回调                  | -      |
| close      | Dialog 关闭的回调                          | -      |

#### state 参数说明

| 参数          | 类型                                            |
| ------------- | ----------------------------------------------- |
| mode          | string <`normal` \| `maximized` \| `minimized`> |
| wrapperWidth  | number                                          |
| wrapperHeight | number                                          |
| width         | number                                          |
| height        | number                                          |
| left          | number                                          |
| top           | number                                          |
| zIndex        | number                                          |
| dragging      | boolean                                         |
| resizing      | boolean                                         |

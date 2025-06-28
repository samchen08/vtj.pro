# XContainer 容器

## 示例

### 基础用法

XContainer 容器 的基本用法

:::preview
demo-preview=../examples/ui/container/container-1.vue
:::

### 定义 组件渲染html标签:span、 尺寸 、overflow:hidden

:::preview
demo-preview=../examples/ui/container/container-2.vue
:::

### 定义 Flex 布局

:::preview
demo-preview=../examples/ui/container/container-3.vue
:::

### 定义 放大 缩小

:::preview
demo-preview=../examples/ui/container/container-4.vue
:::

### 全部用法

:::preview
demo-preview=../examples/ui/container/container-5.vue
:::

## API

### 属性

| 属性名       | 说明                                                                               | 类型             | 默认值     |
| ------------ | ---------------------------------------------------------------------------------- | ---------------- | ---------- |
| tag          | 组件渲染html标签                                                                   | string           | div        |
| fit          | 宽高自适应                                                                         | boolean          | false      |
| width        | 指定高度，fit 为true 失效                                                          | string \| number | -          |
| height       | 指定高度，fit 为true失效                                                           | string \| number | -          |
| flex         | 开启flex布局                                                                       | boolean          | -          |
| inline       | inline-flex                                                                        | boolean          | -          |
| direction    | flex主轴方向                                                                       | string           | row        |
| wrap         | 换行                                                                               | string           | nowrap     |
| justify      | 主轴上的对齐方式                                                                   | string           | flex-start |
| align        | 交叉轴上对齐方式                                                                   | string           | flex-start |
| alignContent | 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用.(即 `flex-wrap="nowrap"`) | string           | stretch    |
| grow         | 放大                                                                               | boolean          | false      |
| shrink       | 缩小                                                                               | boolean          | false      |
| alignSelf    | 单个项目有与其他项目不一样的对齐方式。可覆盖容器的align-items属性                  | string           | auto       |
| overflow     | css overflow                                                                       | string           | -          |
| padding      | 内边距                                                                             | boolean          | false      |
| gap          | 嵌套子组件加间隔                                                                   | boolean          | -          |
| autoPointer  | cursor-pointer                                                                     | boolean          | -          |

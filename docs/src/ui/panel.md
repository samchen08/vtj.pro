# XPanel 面板



## 示例

### 基本用法

:::preview
demo-preview=../examples/ui/panel/base.vue
:::


### 定义尺寸

:::preview
demo-preview=../examples/ui/panel/panel-1.vue
:::


### 定义 header

:::preview
demo-preview=../examples/ui/panel/panel-2.vue
:::




## API

### 属性

| 属性名 | 说明                      | 类型                                      | 默认值 |
| ------ | ------------------------- | ----------------------------------------- | ------ |
| fit    | 宽高自适应                | `boolean`                                 | false  |
| height | 指定高度，fit 为true 失效 | `string` \| `number`                      | -      |
| width  | 指定宽度，fit 为true 失效 | `string` \| `number`                      | -      |
| border | 显示边框                  | `boolean`                                 | true   |
| radius | 圆角                      | `boolean`                                 | true   |
| card   | 卡片模式                  | `boolean`                                 | -      |
| size   | 尺寸                      | `string`                                  | -      |
| shadow | 阴影设置                  | `string < 'none' \| 'always' \| 'hover'>` | -      |
| header | 头部设置                  | `string \| object`                        | -      |
| body   | body设置                  | `object`                                  | -      |
| footer | 尾部设置                  | `object`                                  | -      |




### 暴露

| 名称    | 说明     | 类型 |
| ------- | -------- | ---- |
| bodyRef | body实例 | -    |

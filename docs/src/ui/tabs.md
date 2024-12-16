# XTabs 选项卡


## 示例


### 基础用法


:::preview
demo-preview=../examples/ui/tabs/tabs-1.vue
:::



### 插槽用法


:::preview
demo-preview=../examples/ui/tabs/tabs-2.vue
:::


## API

### 属性

| 属性名      | 说明           | 类型                                | 默认值  |
| ----------- | -------------- | ----------------------------------- | ------- |
| items       | 选项           | `array`                             | []      |
| border      | 显示下划线     | `boolean`                           | `false` |
| fit         | 自适应宽高     | `boolean`                           | -       |
| align       | 对齐方式       | `string`< left \| center \| right > | `left`  |
| modelValue  | 当前激活项     | `number`                            | 1       |
| type        | 选项卡类型     | `string` <card \| border-card>      | -       |
| closable    | 展示删除的图标 | `boolean`                           | false   |
| addable     | 展示添加的图标 | `boolean`                           | false   |
| editable    | 展示编辑的图标 | `boolean`                           | false   |
| tabPosition | 选项卡位置     | `string`                            | `top`   |
| stretch     | 伸展           | `boolean`                           | false   |
| beforeLeave |


 ### 事件

| 名称          | 说明             | 类型 |
| ------------- | ---------------- | ---- |
| actionClick   | 点击图标时触发   | -    |
| actionCommand | 点击每一项时触发 | -    |




 ### 插槽

| 名称    | 说明 | 类型 |
| ------- | ---- | ---- |
| default | -    | -    |

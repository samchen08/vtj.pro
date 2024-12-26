# XQueryForm 查询表单


## 示例


### 基础用法

:::preview
demo-preview=../examples/ui/queryForm/queryForm-1.vue
:::


### 行内用法

:::preview
demo-preview=../examples/ui/queryForm/queryForm-2.vue
:::


### 表单验证

:::preview
demo-preview=../examples/ui/queryForm/queryForm-3.vue
:::


### 按钮

:::preview
demo-preview=../examples/ui/queryForm/queryForm-4.vue
:::






## API

### 属性 

| 属性名         | 说明                       | 类型               | 默认值  |
| -------------- | -------------------------- | ------------------ | ------- |
| collapsible    | 是否折叠面板               | `boolean`          | true    |
| items          | 表单中的项                 | `array`            | -       |
| inlineColumns  | inline模式显示列数         | `number`           | -       |
| inline         | 行内表单模式               | `boolean`          | false   |
| model          | 表单数据对象               | `object`           | -       |
| footer         | 显示底部按钮               | `boolean`          | false   |
| submitText     | 提交按钮文本               | `string`           | 提交    |
| resetText      | 重置按钮文本               | `string`           | 重置    |
| submitMethod   | 表单提交处理方法           | `function`         | -       |
| tooltipMessage | 是否在tooltip显示校验信息  | `boolean`          | false   |
| label          | 标签                       | `string`           | -       |
| label-width    | 标签宽度                   | `string \| number` | -       |
| required       | 是否必填                   | `boolean`          | false   |
| rules          | 校验规则                   | `object`           | -       |
| error          | 错误信息                   | `string`           | -       |
| show-message   | 是否显示校验错误信息       | `boolean`          | true    |
| inline-message | 是否以行内形式展示校验信息 | `boolean`          | false   |
| size           | 用于控制该表单内组件的尺寸 | `string`           | default |



##### 接收 ElForm 的所有属性




### 插槽

| 插槽名 | 说明       | 类型 |
| ------ | ---------- | ---- |
| custom | 自定义内容 | -    |



### 暴露

| 名称             | 说明     | 类型 |
| ---------------- | -------- | ---- |
| validate         | 校验方法 |
| submit           | -        |
| reset            | -        |
| formRef          | -        |
| $vtjDynamicSlots | -        |
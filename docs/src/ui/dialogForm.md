# XDialogForm 弹窗表单


## 示例


### 基础用法


:::preview
demo-preview=../examples/ui/dialogForm/dialogForm-1.vue
:::



### 插槽用法


:::preview
demo-preview=../examples/ui/dialogForm/dialogForm-2.vue
:::




## API

### 属性 

| 属性名       | 说明                                   | 类型               | 默认值  |
| ------------ | -------------------------------------- | ------------------ | ------- |
| modelValue   | 控制弹窗显示或隐藏                     | `boolean`          | false   |
| size         | 控制头部和尾部的尺寸                   | `string`           | default |
| primary      | 弹窗主题颜色                           | `boolean`          | false   |
| formProps    | -                                      | `object`           | -       |
| submit       | 确认按钮                               | `boolean\| string` | `确认`  |
| cancel       | 取消按钮                               | `boolean\| string` | `取消`  |
| model        | 表单模型                               | `object`           | {}      |
| rules        | 表单校验规则                           | `object`           | {}      |
| submitMethod | 表单提交处理方法, return true 关闭弹窗 | `function`         | -       |


### 事件

| 名称   | 说明             | 参数 |
| ------ | ---------------- | ---- |
| submit | 点击确认按钮触发 | -    |
| close  | 点击取消按钮触发 |



### 插槽

| 插槽名 | 说明         | 类型 |
| ------ | ------------ | ---- |
| extra  | -            | -    |
| handle | 底部按钮区域 | -    |
| footer | -            | -    |



### 暴露

| 名称      | 说明                  | 类型 |
| --------- | --------------------- | ---- |
| $vtjEl    | 组件父元素的ref       |
| formRef   | 组件内部form表单的ref |
| dialogRef | 弹窗表单组件的ref     |
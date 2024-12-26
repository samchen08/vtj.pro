# XField 字段


## 示例


### 基础用法

:::preview
demo-preview=../examples/ui/field/field-1.vue
:::


### 输入框类型 选择器

:::preview
demo-preview=../examples/ui/field/field-4.vue
:::

### 输入框类型 选项

:::preview
demo-preview=../examples/ui/field/field-2.vue
:::

### 输入框类型 单选框 多选框

:::preview
demo-preview=../examples/ui/field/field-5.vue
:::


### 输入框类型

:::preview
demo-preview=../examples/ui/field/field-3.vue
:::









## API

### 属性 

| 属性名          | 说明                                | 类型                                             | 默认值 |
| --------------- | ----------------------------------- | ------------------------------------------------ | ------ |
| name            | 字段名称                            | `string`                                         | -      |
| label           | 字段标题文本                        | `string`                                         | -      |
| editor          | 编辑器组件                          | `string \| object`                               | text   |
| props           | 编辑器组件参数                      | `object`                                         | -      |
| modelValue      | 字段值                              | `string \| number \| boolean \| object \| array` | -      |
| size            | 输入框尺寸                          | `string`                                         | -      |
| width           | 输入框宽度                          | `string \| number`                               | -      |
| tooltipMessage  | 是否在tooltip显示校验信息           | `boolean \  object`                              | -      |
| tooltipPosition | tooltip信息显示相对输入框的位置     | `string <inner \| outer>   \| number`            | outer  |
| placeholder     | 输入框占位文本                      | `string`                                         | -      |
| disabled        | 禁用                                | `boolean`                                        | -      |
| readonly        | 只读                                | `boolean`                                        | -      |
| options         | 选项数据                            | `array \| function`                              | -      |
| visible         | 是否显示控制                        | `boolean \| object \| function`                  | true   |
| cascader        | 级联字段，根据字段值变化刷新options | `string \| array`                                | -      |
| error           | 校验错误信息                        | `string`                                         | -      |
| tip             | 提示文本                            | `string`                                         | -      |
| inline          | 表单项内容采用inline布局            | `boolean`                                        | -      |
| labelWidth      | 字段标题文本宽度                    | `string \| number`                               | -      |
| required        | 是否为必填字段                      | `boolean`                                        | false  |
| rules           | 校验规则                            | `object`                                         | false  |
| error           | 错误信息                            | `string`                                         |        |
| show-message    | 是否显示校验错误信息                | `boolean`                                        | false  |
| inline-message  | 是否在行内显示校验信息              | `boolean`                                        | false  |



### 事件

| 名称   | 说明                 | 参数  |
| ------ | -------------------- | ----- |
| change | 输入值改变时触发     | value |
| focus  | 输入框获取焦点时触发 | -     |
| blur   | 输入框失去焦点时触发 |



### 插槽

| 插槽名 | 说明       | 类型 |
| ------ | ---------- | ---- |
| editor | 编辑器类型 | -    |



### 暴露

| 名称       | 说明       | 类型 |
| ---------- | ---------- | ---- |
| fieldValue | 输入框的值 | -    |
| itemRef    | 输入框ref  | -    |
| editorRef  | 编辑器ref  | -    |
| focus      | -          | -    |
| blur       | -          | -    |
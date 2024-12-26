# XForm 表单


## 示例


### 基础用法


:::preview
demo-preview=../examples/ui/form/form-1.vue
:::


### 详细用法-添加/删除表单项  


:::preview
demo-preview=../examples/ui/form/form-2.vue
:::


### 表单校验


:::preview
demo-preview=../examples/ui/form/form-3.vue
:::





## API

### 属性 

| 属性名         | 说明                       | 类型                                    | 默认值    |
| -------------- | -------------------------- | --------------------------------------- | --------- |
| model          | 表单数据对象               | `object`                                | {}        |
| inline         | 行内表单模式               | `boolean`                               | -         |
| inlineColumns  | inline模式显示列数         | `number`                                | -         |
| footer         | 显示底部操作按钮           | `boolean`                               | true      |
| submitText     | 提交按钮文本               | `string`                                | -         |
| resetText      | 重置按钮文本               | `string`                                | -         |
| submitMethod   | 表单提交处理方法           | `function`                              | -         |
| tooltipMessage | 是否在tooltip显示校验信息  | `object \| boolean`                     | undefined |
| size           | 用于控制该表单内组件的尺寸 | `string`   <large \| default \|  small> | default   |

##### 接收 ElForm 的所有属性



### 事件

| 名称   | 说明               | 参数  |
| ------ | ------------------ | ----- |
| change | 表单数据改变时触发 | modal |
| submit | 提交按钮点击触发   | model |
| reset  | 重置按钮点击触发   | -     |


### 插槽

| 名称   | 说明     | 参数 |
| ------ | -------- | ---- |
| action | 底部按钮 | -    |



### 暴露

| 名称     | 说明 | 类型 |
| -------- | ---- | ---- |
| formRef  | -    | -    |
| model    | -    | -    |
| submit   | -    | -    |
| reset    | -    | -    |
| validate | -    | -    |

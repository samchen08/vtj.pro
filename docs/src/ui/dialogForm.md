# XDialogForm 对话框表单

## 示例用法

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

| 属性名       | 说明                                   | 类型               | 默认值    |
| ------------ | -------------------------------------- | ------------------ | --------- |
| modelValue   | 控制对话框显示状态                     | `boolean`          | `false`   |
| size         | 对话框尺寸（small, default, large）    | `string`           | `default` |
| primary      | 是否使用主色调标题背景                 | `boolean`          | `false`   |
| formProps    | 传递给内部表单组件的属性               | `object`           | -         |
| submit       | 确认按钮配置                           | `boolean\| string` | `确认`    |
| cancel       | 取消按钮配置                           | `boolean\| string` | `取消`    |
| model        | 表单数据模型                           | `object`           | `{}`      |
| rules        | 表单验证规则                           | `object`           | `{}`      |
| submitMethod | 表单提交处理方法（返回true关闭对话框） | `function`         | -         |

### 事件

| 事件名称 | 说明             | 参数 |
| -------- | ---------------- | ---- |
| submit   | 确认按钮点击事件 | -    |
| close    | 取消按钮点击事件 | -    |

### 插槽

| 插槽名 | 说明         | 类型 |
| ------ | ------------ | ---- |
| extra  | 额外内容区域 | -    |
| handle | 底部按钮区域 | -    |
| footer | 整个底部区域 | -    |

### 暴露API

| 名称      | 说明                 | 类型 |
| --------- | -------------------- | ---- |
| $vtjEl    | 组件父元素实例引用   | -    |
| formRef   | 内部表单组件实例引用 | -    |
| dialogRef | 对话框组件实例引用   | -    |

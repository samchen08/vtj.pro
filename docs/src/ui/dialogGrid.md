# XDialogGrid 弹窗表格


## 示例


### 基础用法

:::preview
demo-preview=../examples/ui/dialogGrid/base.vue
:::


## API

### 属性 

| 属性名         | 说明                                | 类型                    | 默认值 |
| -------------- | ----------------------------------- | ----------------------- | ------ |
| columns        | 表格列配置                          | `array`                 | -      |
| model          | 表格数据                            | `any`                   | -      |
| formatter      | model数据转换为表格数据             | `(model: any) => any[]` | -      |
| valueFormatter | 表格数据转换为model数据             | `(rows: any) => any`    | -      |
| rules          | 表格验证规则                        | -                       | -      |
| plus           | 显示增行按钮                        | `boolean`               | -      |
| minus          | 显示删行按钮                        | `boolean`               | -      |
| gridProps      | 表格其他配置                        | -                       | -      |
| submitMethod   | 表单提交方法， return true 关闭弹窗 | `function`              | -      |

#### 接收 XPanel 所有参数

### 插槽

| 插槽名    | 说明 | 类型 |
| --------- | ---- | ---- |
| valueCell | -    | -    |

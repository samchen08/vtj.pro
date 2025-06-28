# XDialogGrid 对话框表格

## 示例用法

### 基础用法

:::preview
demo-preview=../examples/ui/dialogGrid/base.vue
:::

## API

### 属性

| 属性名         | 说明                                    | 类型                    | 默认值 |
| -------------- | --------------------------------------- | ----------------------- | ------ |
| columns        | 表格列配置                              | `array`                 | -      |
| model          | 表格数据模型                            | `any`                   | -      |
| formatter      | 数据格式化函数（模型数据→表格数据）     | `(model: any) => any[]` | -      |
| valueFormatter | 反向数据格式化函数（表格数据→模型数据） | `(rows: any) => any`    | -      |
| rules          | 表格数据验证规则                        | `object`                | -      |
| plus           | 是否显示添加行按钮                      | `boolean`               | `true` |
| minus          | 是否显示删除行按钮                      | `boolean`               | `true` |
| gridProps      | 传递给内部表格组件的属性                | `object`                | -      |
| submitMethod   | 表单提交方法（返回true关闭对话框）      | `function`              | -      |

### 插槽

| 插槽名    | 说明             | 类型 |
| --------- | ---------------- | ---- |
| valueCell | 自定义单元格内容 | -    |

### 备注

- 该组件继承所有 XPanel 组件的属性

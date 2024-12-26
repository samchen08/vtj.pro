# XPicker 数据选择器


## 示例


### 基础用法


:::preview
demo-preview=../examples/ui/picker/base.vue
:::


### 搭配 XField 使用


:::preview
demo-preview=../examples/ui/picker/picker-1.vue
:::


## API

### 属性 

| 属性名      | 说明                                         | 类型                                  | 默认值 |
| ----------- | -------------------------------------------- | ------------------------------------- | ------ |
| columns     | 表格列配置                                   | `array`                               | -      |
| fields      | 查询条件表单字段                             | `array`                               | -      |
| model       | 查询表单字段值                               | `object`                              | -      |
| loader      | 表格数据加载器                               | `function`                            | -      |
| modelValue  | 值                                           | `string \| number \| object \| array` | -      |
| multiple    | 多选                                         | `boolean`                             | -      |
| raw         | 值为对象形式                                 | `boolean`                             | -      |
| disabled    | 禁用                                         | `boolean`                             | -      |
| append      | 多选追加模式                                 | `boolean`                             | -      |
| valueKey    | 值映射字段名称                               | `string`                              | value  |
| labelKey    | 输入框显示映射字段名称                       | `string`                              | label  |
| queryKey    | 查询参数名称                                 | `string`                              | -      |
| preload     | 单选模式，回车时自动检测取回有且计有唯一数据 | `boolean`                             | -      |
| dialogProps | 弹窗组件配置参数                             | `object`                              | -      |
| gridProps   | 表格组件配置参数                             | `object`                              | -      |
| formProps   | 查询表单参数                                 | `object`                              | -      |

#### 接收 ElSelect 所有参数

### 事件

| 名称   | 说明           | 参数 |
| ------ | -------------- | ---- |
| change | 值改变时触发   | data |
| picked | 选中数据是触发 | raw  |


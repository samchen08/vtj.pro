# XAttachment 附件

## 示例

### 基础用法

:::preview
demo-preview=../examples/ui/attachment/base.vue
:::

### 模式用法

:::preview
demo-preview=../examples/ui/attachment/attachment-1.vue
:::

### 插槽用法

:::preview
demo-preview=../examples/ui/attachment/attachment-2.vue
:::

## API

### 属性

| 属性名         | 说明                                                                                                                   | 类型                   | 默认值                                                                             |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| modelValue     | 列表显示的文件                                                                                                         | `array`                | -                                                                                  |
| selectValue    | 选中值，开启 selectable 有效                                                                                           | `object \| array`      | -                                                                                  |
| uploader       | 文件上传方法                                                                                                           | `function`             | -                                                                                  |
| multiple       | 支持多文件上传, 同时在selectable时控制多选                                                                             | `boolean`              | -                                                                                  |
| limit          | 允许上传文件的最大数量                                                                                                 | `number`               | -                                                                                  |
| accept         | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers) | `string`               | 'image/_ ,audio/_ ,video/\*,.zip,.svg,.pdf,.json,.docx,.xlsx,.pptx,.doc,.xls,.ppt' |
| disabled       | 禁止更改文件，不能上传和删除                                                                                           | `boolean`              | -                                                                                  |
| size           | 图片显示尺寸                                                                                                           | `string`               | default                                                                            |
| thumbnail      | 缩略图生成方法                                                                                                         | `function`             | -                                                                                  |
| addable        | 可增加                                                                                                                 | `boolean`              | true                                                                               |
| removable      | 可删除                                                                                                                 | `boolean`              | true                                                                               |
| downloadable   | 可下载                                                                                                                 | `boolean`              | true                                                                               |
| previewable    | 可预览                                                                                                                 | `boolean`              | true                                                                               |
| selectable     | 可选择                                                                                                                 | `boolean`              | false                                                                              |
| clickable      | 可点击                                                                                                                 | `boolean`              | false                                                                              |
| listType       | 列表类型                                                                                                               | `string<card \| list>` | card                                                                               |
| beforeUpload   | 上传前守卫                                                                                                             | `function`             | -                                                                                  |
| limitSize      | 允许上传的文件大写最大值， 支持 K / M                                                                                  | `string`               | 10M                                                                                |
| formatter      | 格式化                                                                                                                 | `function`             | -                                                                                  |
| valueFormatter | 列表数据格式化                                                                                                         | `function`             | -                                                                                  |
| previewer      | 预览器方法                                                                                                             | `function`             | -                                                                                  |
| downloader     | 下载器方法                                                                                                             | `function`             | -                                                                                  |
| autoUpload     | 是否自动上传文件                                                                                                       | `boolean`              | true                                                                               |

### 事件

| 名称     | 说明         | 参数 |
| -------- | ------------ | ---- |
| select   | 选择文件上传 | -    |
| click    | 点击文件     | -    |
| change   | 文件数据改变 | -    |
| remove   | 删除         | -    |
| download | 下载         | -    |
| preview  | 预览         | -    |

### 插槽

| 插槽名 | 说明     | 类型 |
| ------ | -------- | ---- |
| tip    | 提示信息 | -    |

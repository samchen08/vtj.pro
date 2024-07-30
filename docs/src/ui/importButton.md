# XImportButton 导入按钮

支持 `el-button` 的  [属性](https://element.eleme.cn/#/zh-CN/component/button)


## 示例


### 基础用法


:::preview
demo-preview=../examples/ui/importButton/base.vue
:::


## API

### 属性

| 属性名   | 说明               | 类型               | 默认值 |
| -------- | ------------------ | ------------------ | ------ |
| uploader | 文件上传函数       | function           | -      |
| multiple | 允许上传多个文件   | boolean            | -      |
| accept   | 接受上传的文件类型 | string             | -      |
| parser   | 文件解析器         | string \| function | -      |





### parser 类型配置

| type       | value                          | default value |
| ---------- | ------------------------------ | ------------- |
| `string`   | `text` \| `json` \| `base64`   |               |
| `function` | `(file: File) => Promise<any>` |               |

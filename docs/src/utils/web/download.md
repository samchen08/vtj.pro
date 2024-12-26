# 文件下载


| 函数名             | 描述             | 类型                                                         | 参数                                                    | 返回值 |
| ------------------ | ---------------- | ------------------------------------------------------------ | ------------------------------------------------------- | ------ |
| downloadUrl        | 在新窗口打开图片 | `(url: string, filename: string = '') => void`               | `(url: 文件的路径, filename: 文件名称)`                 | -      |
| downloadBlob       | 下载Blob文件     | `(data: any, filename: string = '', type?: string) => void`  | `(data: 文件数据, filename: 文件名称, type?: 文件格式)` | -      |
| downloadRemoteFile | 下载文件         | `(  url: string,filename: string = '',type?: string)=> void` | `(  url:下载路径,filename: 文件名称,type?: 文件格式)`   | -      |
| downloadJson       | 下载JSON         | `(data: any, filename: string = '')=> void`                  | `(data: 需下载的数据, filename: 文件的名称)`            | -      |



### 示例
:::preview
demo-preview=../../examples/utils/download/download.vue
:::
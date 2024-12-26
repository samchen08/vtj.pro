# URL 处理


| 函数名         | 描述                     | 类型                                       | 参数                                       | 返回值          |
| -------------- | ------------------------ | ------------------------------------------ | ------------------------------------------ | --------------- |
| getCurrentHost | 获取当前页面的 host      | `(includePath: boolean) => string \| null` | `(includePath: 包不包含路径名称)`          | `string \|null` |
| getHost        | 获取指定url的host        | `(uel: string = '') => string`             | `(url:路径)`                               | `string`        |
| stringify      | 键值对转换成查询字符串   | `(query: string) => object`                | `(query: query 参数)`                      | `object`        |
| parse          | 参数字符串转换成对象形式 | `(str: string, sep?: string, eq?: string)` | `(str: string, sep?: string, eq?: string)` | `object`        |
| append         | 在url追加参数            | `(url: string, query: string \| object>`   | `(url: 目标路径, query: 追加的参数)`       | `string`        |


### 示例

    在控制台查看效果

:::preview
demo-preview=../../examples/utils/url/url-1.vue
:::
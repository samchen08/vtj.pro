# regex 正则表达式


## 数据类型正则

| 函数名        | 描述           | 类型                          | 参数         | 返回值    |
| ------------- | -------------- | ----------------------------- | ------------ | --------- |
| isUrl         | 检查url        | `(content: string)=> boolean` | 需检测的数据 | `boolean` |
| isEmail       | 检查邮箱地址   | `(content: string)=> boolean` | 需检测的数据 | `boolean` |
| isIdCardNo    | 检查身份证号码 | `(content: string)=> boolean` | 需检测的数据 | `boolean` |
| isMobilePhone | 检查手机号码   | `(content: string)=> boolean` | 需检测的数据 | `boolean` |
| isCarNo       | 检查车牌号码   | `(content: string)=> boolean` | 需检测的数据 | `boolean` |




### 示例

:::preview
demo-preview=../../examples/utils/regex/regex-1.vue
:::



##   path-to-regexp

### [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)

### 将路径字符串转换为正则表达式

该工具库用来处理 url 中地址与参数，能够很方便得到我们想要的数据。

js 中有 RegExp 方法做正则表达式校验，而 path-to-regexp 可以看成是 url 字符串的正则表达式。



| 函数名              | 描述                        | 类型                                     | 参数                 | 返回值                                                              |
| ------------------- | --------------------------- | ---------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| pathToRegexp        | 将路径字符串转换为 RegExp   | `(url:string, options?:array)=> string`  | url: 需转换的路径    | string                                                              |
| pathToRegexpMatch   | 匹配 url 地址与规则是否相符 | `(url:string,options?:array)=> function` | url 需匹配的路径规则 | function                                                            |
| pathToRegexpParse   | 解析 url 字符串中的参数部分 | `(url:string,options?:array)=> array`    | url 需解析的路径     | 返回一个数组，从第二个数据可以就可以得到 url 地址携带参数的属性名称 |
| pathToRegexpCompile | 快速填充 url 字符串的参数值 | `(url:string,options?:array)=> function` | url 需匹配的路径规则 | function                                                            |



### pathToRegexp

#### 作用：这里这个方法可以类比于 js 中 new RegExp('xxx')。

```js
pathToRegexp(/user/:name)
// => /^\/user(?:\/([^\/#\?]+?))[\/#\?]?$/i

```


### pathToRegexpMatch

#### 作用：匹配 url 地址与规则是否相符。

```js
const fn = pathToRegexpMatch("/user/:id");

fn("/user/123"); //=> { path: '/user/123', index: 0, params: { id: '123' } }
fn("/invalid"); //=> false
fn("/user/caf%C3%A9"); //=> { path: '/user/caf%C3%A9', index: 0, params: { id: 'café' } }
```


### pathToRegexpParse

#### 作用：解析 url 字符串中的参数部分。

```js
var url = '/user/:id';
console.log(pathToRegexpParse(url));

// [ '/user',
//   { name: 'id',
//     prefix: '/',
//     delimiter: '/',
//     optional: false,
//     repeat: false,
//     partial: false,
//     pattern: '[^\\/]+?' } ]

```

### pathToRegexpCompile

#### 快速填充 url 字符串的参数值。



```js
var url = '/user/:id/:name'
var data = {id: 10001, name: 'bob'}
console.log(pathToRegexpCompile(url)(data))

// => /user/10001/bob




const toPathRaw = compile("/user/:id", { encode: false });

toPathRaw({ id: "%3A%2F" }); //=> "/user/%3A%2F"
toPathRaw({ id: ":/" }); //=> Throws, "/user/:/" when `validate` is `false`.
```



<!-- ### 示例

:::preview
demo-preview=../../examples/utils/regex/pathRegex.vue
::: -->

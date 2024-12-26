# Lodash

内置 Lodash 工具函数

## 数据类型校验

| 函数名        | 描述                                                                                         | 类型                             | 参数                    | 返回值                                                          |
| ------------- | -------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------- | --------------------------------------------------------------- |
| isString      | 判断数据类型是否字符串                                                                       | `(val: any) => boolean`          | 需检测的数据            | 是否字符串                                                      |
| isFunction    | 判断数据类型是否函数类型                                                                     | `(val: any) => boolean`          | 需检测的数据            | 是否字函数                                                      |
| isArray       | 检查 value 是否是 Array 类对象                                                               | `(val:any) => boolean`           | value (*): 要检查的值。 | (boolean): 如果value是一个数组返回 true，否则返回 false。       |
| isObject      | 检查 value 是否为 Object 的language type                                                     | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isBoolean     | 检查 value 是否是原始 boolean 类型或者对象                                                   | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isBuffer      | 检查 value 是否是个 buffer                                                                   | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isArrayBuffer | 检查 value 是否是 ArrayBuffer 对象。                                                         | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isDate        | 检查 value 是否是 Date 对象                                                                  | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isUndefined   | 检查 value 是否是 undefined                                                                  | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isNaN         | 检查 value 是否是 NaN。                                                                      | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isNull        | 检查 value 是否是 null                                                                       | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isNumber      | 检查 value 是否是原始Number数值型 或者 对象                                                  | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isSymbol      | 检查 value 是否是原始 Symbol 或者对象                                                        | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isPlainObject | 检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建，或者 [[Prototype]] 为 null | `(val:any) => boolean`           | value (*): 要检查的值。 | boolean                                                         |
| isEqual       | 执行深比较来确定两者的值是否相等。[注意](https://www.lodashjs.com/docs/lodash.isEqual)       | `(val:any,other:any) => boolean` | value (*): 要检查的值。 | (boolean): 如果 两个值完全相同，那么返回 true，否则返回 false。 |


### 示例

:::preview
demo-preview=../../examples/utils/lodash/lodash-1.vue
:::

## 字符串转换

| 函数名     | 描述                                                                                                                                                                                                                                                                                  | 类型                                                       | 参数                                                                                               | 返回值                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| lowerFirst | 转换字符串string的首字母为小写                                                                                                                                                                                                                                                        | `lowerFirst('First')=> 'first'`                            | (string): 要转换的字符串。                                                                         | (string): 返回转换后的字符串。                 |
| upperFirst | 转换字符串string的首字母为大写                                                                                                                                                                                                                                                        | `upperFirst('fred') => 'Fred'`                             | (string): 要转换的字符串。                                                                         | (string): 返回转换后的字符串。                 |
| camelCase  | 转换字符串string为驼峰写法                                                                                                                                                                                                                                                            | `camelCase('Foo Bar') => 'fooBar'`                         | (string): 要转换的字符串。                                                                         | (string): 返回驼峰写法的字符串。               |
| kebabCase  | 转换字符串string为kebab case.                                                                                                                                                                                                                                                         | `kebabCase('fooBar') => 'foo-bar'`                         | (string): 要转换的字符串。                                                                         | (string): 返回转换后的字符串。                 |
| snakeCase  | 转换字符串string为snake case                                                                                                                                                                                                                                                          | `snakeCase('Foo Bar') => 'foo_bar'`                        | (string): 要转换的字符串。                                                                         | (string): 返回转换后的字符串。                 |
| noop       | 这个方法返回 undefined。                                                                                                                                                                                                                                                              | noop()=> undefined                                         | -                                                                                                  | undefined                                      |
| get        | 根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。                                                                                                                                                                                                | `(obj:object,path:any,default?:<array\| string>)=> any`    | (object: 要检索的对象,path:要获取属性的路径,val:如果解析值是 `undefined` ，这值会被返回 `default`) | (*): 返回解析的值。                            |
| set        | 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用_.setWith 定制path创建                                                                                                                                 | `(obj:object,path:any,default?:<array\| string>)=> object` | (object:要修改的对象,path:要设置的对象路径,val:要设置的值)                                         | (Object): 返回object                           |
| merge      | 该方法类似_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为undefined的sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。 | `(obj:object,source:(...object))`                          | (object:目标对象,[source]:来源对象)                                                                | (Object): 返回 object.                         |
| cloneDeep  | 会递归拷贝 value。（注：也叫深拷贝）。                                                                                                                                                                                                                                                | `(value:T)=> T`                                            | value (*): 要深拷贝的值。                                                                          | (*): 返回拷贝后的值。                          |
| debounce   | 防抖                                                                                                                                                                                                                                                                                  | `(func:function,wait:number,options:array)=> function`     | (func:要防抖动的函数,wait:需要延迟的毫秒数,options:选项对象)                                       | (Function): 返回新的 debounced（防抖动）函数。 |
| throttle   | 节流                                                                                                                                                                                                                                                                                  | `(func:function,wait:number,options:array)=> function`     | (func:要节流的函数,wait:需要节流的毫秒,options:选项对象)                                           | (Function): 返回节流的函数。                   |
| template   | 创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖_.templateSettings 的值。                          | `(str:string,opt:object)=> function`                       | ((string): 模板字符串, (Object): 选项对象)                                                         | (Function): 返回编译模板函数。                 |

### 示例


:::preview
demo-preview=../../examples/utils/lodash/lodash-2.vue
:::



## Noop

#### 描述

  这个方法返回 undefined。




## Get

#### 描述

  根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。


#### 参数

- object (Object): 要检索的对象。
- path (Array|string): 要获取属性的路径。
- [defaultValue] (*): 如果解析值是 undefined ，这值会被返回。
  

#### 返回
(*): 返回解析的值。

#### 例子

``` javascript
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'

```


## Set

#### 描述

  设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用_.setWith 定制path创建。


##### 注意: 这个方法会改变 object。


#### 参数

- object (Object): 要修改的对象。
- path (Array|string): 要设置的对象路径。
- value (*): 要设置的值。
  

#### 返回
(Object): 返回 object。

#### 例子

``` javascript
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// => 4
 
_.set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// => 5

```


## Merge

#### 描述

 该方法类似_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为undefined的sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。


##### 注意: 这个方法会改变 object。


#### 参数

- object (Object): 目标对象。
- [sources] (...Object): 来源对象。
  

#### 返回
(Object): 返回 object。

#### 例子

``` javascript
var object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};
 
var other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};
 
_.merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

```


## cloneDeep
#### 描述
这个方法类似_.clone，除了它会递归拷贝 value。（注：也叫深拷贝）。
#### 参数
- value (*): 要深拷贝的值。
#### 返回
(*): 返回拷贝后的值。
#### 例子
``` javascript
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false

```
## Debounce 
#### 描述
 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 func 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。

#### 注意
如果 leading 和 trailing 选项为 true, 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用防抖方法。

如果 wait 为 0 并且 leading 为 false, func调用将被推迟到下一个点，类似setTimeout为0的超时。
#### 参数
- func (Function): 要防抖动的函数。
- [wait=0] (number): 需要延迟的毫秒数。
- [options=] (Object): 选项对象。
- [options.leading=false] (boolean): 指定在延迟开始前调用。
- [options.maxWait] (number): 设置 func 允许被延迟的最大值。
- [options.trailing=true] (boolean): 指定在延迟结束后调用。

#### 返回
(Function): 返回新的 debounced（防抖动）函数。



## Throttle 
#### 描述
创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。

#### 注意
如果 **leading** 和 **trailing** 都设定为 **true** 则 **func** 允许 **trailing** 方式调用的条件为: 在 **wait** 期间多次调用。

如果 **wait** 为 **0** 并且 **leading** 为 **false**, **func**调用将被推迟到下一个点，类似**setTimeout**为0的超时。
#### 参数
- func (Function): 要防抖动的函数。
- [wait=0] (number): 需要延迟的毫秒数。
- [options=] (Object): 选项对象。
- [options.leading=false] (boolean): 指定在延迟开始前调用。
- [options.maxWait] (number): 设置 func 允许被延迟的最大值。
- [options.trailing=true] (boolean): 指定在延迟结束后调用。

#### 返回
(Function): 返回节流的函数。


## Template 
#### 描述
创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖_.templateSettings 的值。

#### 注意
在开发过程中，构建_.template可以使用sourceURLs， 便于调试。
#### 参数
- [string=''] (string): 模板字符串.
- [options=] (Object): 选项对象.
- [options.escape=_.templateSettings.escape] (RegExp): "escape" 分隔符.
- [options.evaluate=_.templateSettings.evaluate] (RegExp): "evaluate" 分隔符.
- [options.imports=_.templateSettings.imports] (Object): 导入对象到模板中作为自由变量。
- [options.interpolate=_.templateSettings.interpolate] (RegExp): "interpolate" 分隔符。
- [options.sourceURL='lodash.templateSources[n]'] (string): 模板编译的来源URL。
- [options.variable='obj'] (string): 数据对象的变量名。

#### 返回
(Function): 返回编译模板函数。

#### 例子
```js
// 使用 "interpolate" 分隔符创建编译模板
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'
 
// 使用 HTML "escape" 转义数据的值
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b><script></b>'
 
// 使用 "evaluate" 分隔符执行 JavaScript 和 生成HTML代码
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 在 "evaluate" 分隔符中使用内部的 `print` 函数
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'
 
// 使用 ES 分隔符代替默认的 "interpolate" 分隔符
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'
 
// 使用自定义的模板分隔符
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'
 
// 使用反斜杠符号作为纯文本处理
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'
 
// 使用 `imports` 选项导入 `jq` 作为 `jQuery` 的别名
var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 使用 `sourceURL` 选项指定模板的来源URL
var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => 在开发工具的 Sources 选项卡 或 Resources 面板中找到 "greeting.jst"
 
// 使用 `variable` 选项确保在编译模板中不声明变量
var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }
 
// 使用 `source` 特性内联编译模板
// 便以查看行号、错误信息、堆栈
fs.writeFileSync(path.join(cwd, 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
');


```
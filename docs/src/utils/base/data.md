# 数据转换




| 函数名         | 描述                                    | 类型                                                        | 参数                                              | 返回值        |
| -------------- | --------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------- | ------------- |
| arrayToMap     | 数组转Map                               | `(data, prop) => Map`                                       | (data:需转换的数组, prop: 字段)                   | Map           |
| mapToObject    | Map转键值对                             | `(map:Map) => object  `                                     | (map: Map对象 )                                   | object        |
| arrayToKv      | 数组转键值对                            | `(data:array, key:string=key,value:string=value) => object` | (data:转换的数组, key:键,value:值)                | object        |
| kvToArray      | 键值对转数组                            | `(data:object, key:string=key,value:string=value) => array` | (data:转换的对象, key:键,value:值)                | array         |
| dedupArray     | 数组去重                                | `(data: T[], prop: keyof T) => array`                       | (data: 需去重的数字, prop: 去重的字段)            | array         |
| toArray        | 转换数组                                | `(val: any)=> array`                                        | (val:需转换成数组的值)                            | array         |
| zipObject      | 压缩对称，清除值为undefined或null的属性 | `(obj:object)=> object`                                     | (obj:需压缩的对象)                                | object        |
| omit           | 对象排除属性                            | `(target:object,keys:string[])=> object`                    | ( target:需要处理的对象, keys:需要排除的属性名称) | object        |
| pick           | 对象提取属性                            | `(target:object,keys:string[])=> object`                    | ( target:需要处理的对象, keys:需要挑选的属性名称) | object        |
| trim           | 递归对象或数组清除文本类型值的两边空格  | `(val:object\| array)=> object\|array`                      | (val:需要处理的数据)                              | object\|array |
| sum            | 求合计                                  | `(list:array,field:string)=> number`                        | (list: 需处理的对象,field: 需合并的属性)          | number        |
| avg            | 求平均值                                | `(list:array,field:string)=> number`                        | (list: 需处理的对象,field: 需合并的属性)          | number        |
| splitParser    | 字符串分隔转换成数组                    | `(val:string, flag:string)=> array`                         | (val:需处理的数据, flag：以那种方式 `默认','`)    | array         |
| splitStringify | 数组转换为字符串分隔                    | `(val:array, flag:string)=> string`                         | (val:需处理的数据, flag：以那种方式  `默认','`)   | string        |


### 示例

:::preview
demo-preview=../../examples/utils/data/data-1.vue
:::


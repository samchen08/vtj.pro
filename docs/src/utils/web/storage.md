# 浏览器存储


## Storage 
| 函数名         | 描述     | 类型                                                    | 参数                                               | 返回值 |
| -------------- | -------- | ------------------------------------------------------- | -------------------------------------------------- | ------ |
| Storage        | -        | `class`                                                 | -                                                  | -      |
| Storage.config | 配置     | `(options:object)=>object`                              | options:\{type:类型,expired:过期时间,prefix:前缀\} | object |
| Storage.save   | 保存     | `(key: string, value: any, opts:object<options>)=>void` | key:标识符,value:保存的值, opts: 配置的参数        | -      |
| Storage.get    | 获取     | `(key: string, opts:object<options>)=>string`           | key:标识符, opts: 配置的参数                       | string |
| Storage.remove | 移除     | `(key: string, opts:object<options>)=>string`           | key:标识符, opts: 配置的参数                       | -      |
| Storage.clear  | 移除所有 | `(opts:object<options>)=>void`                          | opts: 配置的参数                                   | -      |




### 示例
    在控制台查看效果
:::preview
demo-preview=../../examples/utils/storage/storage-1.vue
:::


## Cookies 

| 函数名 | 描述   | 类型                                             | 参数                                  | 返回值 |
| ------ | ------ | ------------------------------------------------ | ------------------------------------- | ------ |
| set    | 设置值 | `(name:string,value:string,opts:object) => void` | name: 键名,value: 保存的值，opts:选项 | -      |
| get    | 获取值 | `(name:string) => string`                        | name: 键名                            | string |
| remove | 移除值 | `(name:string,opts:object) => void`              | name: 键名,opts:选项                  | -      |

opts 选项 object

- expires?: number;
- path?: string;
- domain?: string;
- secure?: boolean;
- sameSite?: string;

### 示例
    在控制台查看效果
:::preview
demo-preview=../../examples/utils/storage/cookies.vue
:::


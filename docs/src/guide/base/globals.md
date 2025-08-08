# 应用全局设置

设计器`v0.13.0` 对**web**和**H5**平台增加了应用全局设置功能，支持应用CSS、状态、权限、请求、路由守卫等全局功能配置。

![](../../assets/globals/1.png)

## 应用全局CSS

![](../../assets/globals/2.png)

全局CSS仅支持标准CSS代码，不支持SCSS、LESS等预编译语言。

## 应用状态

全局应用状态采用 `Pinia`, 应用启动后注入一个全局名称为 `$store` 模块，可以在页面组件组件中通过 `this.$store` 调用。

![](../../assets/globals/3.png)

## 权限控制

全局的权限控制是使用 [**Access**插件](./access.md) 实现。利用Access可以实现给接口请求头注入用户token，限制页面路由访问，页面展示、功能操作等全方位的权限控制。

### 常用的配置项

| 参数名              | 类型              | 默认值                     | 说明                                                  |
| ------------------- | ----------------- | -------------------------- | ----------------------------------------------------- |
| session             | boolean           | false                      | 开启session, token 储存到cookie，关闭浏览器将登录失效 |
| authKey             | string            | Authorization              | 请求头和cookie记录token名称                           |
| storagePrefix       | string            | \_\_VTJ\_                  | 本地缓存key前缀                                       |
| storageKey          | string            | ACCESS_STORAGE             | 本地缓存key                                           |
| auth                | string            | /#/login                   | 登录页面 pathname，注意：不是路由，是页面的url path   |
| redirectParam       | string            | r                          | 重定向到登录页面时带上当前页面url的参数名             |
| whiteList           | string[]/Function | 路由白名单                 | 在白名单的路由不加路由拦截                            |
| unauthorized        | string[]/Function | undefined                  | 未授权页面路由路径截                                  |
| unauthorizedMessage | string            | 登录已经失效，请重新登录！ | 未登录提示文本                                        |
| noPermissionMessage | string            | 无权限访问该页面           | 无权限提示                                            |
| statusKey           | string            | code                       | 请求响应数据状态的key                                 |
| unauthorizedCode    | number            | 401                        | 未登录响应状态码                                      |

### 开启权限控制

开启权限控制功能至少需要配置以下信息：

- **storageKey**: 浏览器缓存Key
- **auth**: 登录页面Path

![](../../assets/globals/4.png)

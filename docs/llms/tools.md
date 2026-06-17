# VTJ 设计器工具方法说明

> 本文档描述 AI 可调用的所有工具方法（Tools），每个工具均通过 `action` + `parameters` 的 JSON 格式调用。

---

## 调用格式

```json
{
  "action": "工具名称",
  "parameters": [参数1, 参数2, ...]
}
```

---

## 一、技能与辅助

### `getSkills` — 获取技能文档

获取指定 ID 的技能文档内容，用于查阅特定功能的详细用法说明。

**参数：**

- `...ids: string[]` — 一个或多个技能 ID

**示例：**

```json
{
  "action": "getSkills",
  "parameters": ["pinia", "axios"]
}
```

---

## 二、页面管理

### `getMenus` — 获取页面菜单树

获取当前项目的页面菜单树结构（含层级关系）。

**参数：** 无

**返回：** 树形结构数组，每项包含 `id`、`name`、`title`、`layout`、`dir`、`icon`、`children`

**示例：**

```json
{
  "action": "getMenus",
  "parameters": []
}
```

---

### `getPages` — 获取所有页面

获取当前项目的全部页面列表（扁平结构）。

**参数：** 无

**返回：** 数组，每项包含 `id`、`name`、`title`、`layout`、`dir`、`icon`

**示例：**

```json
{
  "action": "getPages",
  "parameters": []
}
```

---

### `createPage` — 创建页面

在当前项目中新建页面。有层级关系时，需先创建父级（目录或布局页面），再创建子页面。

**参数：**

| 参数          | 类型    | 必填 | 说明                                                                          |
| ------------- | ------- | ---- | ----------------------------------------------------------------------------- |
| `page`        | object  | ✅   | 页面对象                                                                      |
| `page.name`   | string  | ✅   | 页面名称，PascalCase，如 `UserList`                                           |
| `page.title`  | string  | ✅   | 页面标题，如 `用户列表`                                                       |
| `page.icon`   | string  | ❌   | 图标名称，可选 ElementPlus 图标或 `@vtj/icons` 图标                           |
| `page.dir`    | boolean | ❌   | 是否目录，目录可包含子目录或子页面                                            |
| `page.layout` | boolean | ❌   | 是否布局页面，布局页面的子级为子页面（需配合 RouterView 使用），UniApp 不支持 |
| `parentId`    | string  | ❌   | 父页面 ID，不传则创建在根目录                                                 |

**注意：**

- UniApp 平台不支持 `dir` 和 `layout` 类型，会自动忽略
- 创建成功后会自动打开（激活）该页面（目录类型除外）

---

### `updatePage` — 更新页面信息

修改已有页面的元信息（名称、标题、图标等）。

**参数：**

| 参数         | 类型   | 必填 | 说明     |
| ------------ | ------ | ---- | -------- |
| `page.id`    | string | ✅   | 页面 ID  |
| `page.name`  | string | ✅   | 页面名称 |
| `page.title` | string | ✅   | 页面标题 |
| `page.icon`  | string | ❌   | 图标名称 |

**示例：**

```json
{
  "action": "updatePage",
  "parameters": [
    {
      "id": "abc123",
      "name": "Dashboard",
      "title": "仪表盘",
      "icon": "DataAnalysis"
    }
  ]
}
```

---

### `movePage` — 移动页面层级

将页面移动到指定父级下（改变层级关系）。

**参数：**

| 参数       | 类型   | 必填 | 说明                                  |
| ---------- | ------ | ---- | ------------------------------------- |
| `id`       | string | ✅   | 要移动的页面 ID                       |
| `parentId` | string | ❌   | 目标父页面 ID，传 `null` 则移到根目录 |

**示例：**

```json
{
  "action": "movePage",
  "parameters": ["abc123", "xyz789"]
}
```

---

### `removePage` — 删除页面

删除指定页面或目录。

**注意：** 删除目录或布局类型页面前，需先删除其所有子页面。

**参数：**

- `id: string` — 页面文件 ID

**示例：**

```json
{
  "action": "removePage",
  "parameters": ["abc123"]
}
```

---

### `setHomepage` — 设置应用主页

将指定页面设为应用首页。

**参数：**

- `id: string` — 页面 ID

**示例：**

```json
{
  "action": "setHomepage",
  "parameters": ["abc123"]
}
```

---

## 三、区块组件管理

### `getBlocks` — 获取所有区块

获取当前项目的全部区块组件列表。

**参数：** 无

**返回：** 数组，每项包含 `id`、`name`、`title`、`category`

**示例：**

```json
{
  "action": "getBlocks",
  "parameters": []
}
```

---

### `createBlock` — 创建区块

在当前项目中新建区块组件，创建后自动打开（激活）。

**参数：**

| 参数             | 类型   | 必填 | 说明                                |
| ---------------- | ------ | ---- | ----------------------------------- |
| `block.name`     | string | ✅   | 区块名称，PascalCase，如 `UserCard` |
| `block.title`    | string | ✅   | 区块标题                            |
| `block.category` | string | ❌   | 区块分类/分组名称                   |

**示例：**

```json
{
  "action": "createBlock",
  "parameters": [
    {
      "name": "UserCard",
      "title": "用户卡片",
      "category": "通用"
    }
  ]
}
```

---

### `updateBlock` — 更新区块信息

修改已有区块的元信息。

**参数：**

| 参数             | 类型   | 必填 | 说明     |
| ---------------- | ------ | ---- | -------- |
| `block.id`       | string | ✅   | 区块 ID  |
| `block.name`     | string | ❌   | 区块名称 |
| `block.title`    | string | ❌   | 区块标题 |
| `block.category` | string | ❌   | 分类     |

**示例：**

```json
{
  "action": "updateBlock",
  "parameters": [
    {
      "id": "def456",
      "name": "UserProfile",
      "title": "用户资料",
      "category": "业务组件"
    }
  ]
}
```

---

### `removeBlock` — 删除区块

删除指定区块文件。

**参数：**

- `id: string` — 区块文件 ID

**示例：**

```json
{
  "action": "removeBlock",
  "parameters": ["def456"]
}
```

---

## 四、文件操作

### `active` — 打开文件

在设计器中打开（激活）指定的页面或区块。

**参数：**

- `id: string` — 文件（页面或区块）ID

**示例：**

```json
{
  "action": "active",
  "parameters": ["abc123"]
}
```

---

### `getCurrentFile` — 获取当前文件信息

获取当前设计器中打开的文件元信息（名称、标题、ID）。

**参数：** 无

**返回：** `{ id, name, title }`，无打开文件时抛出错误

**示例：**

```json
{
  "action": "getCurrentFile",
  "parameters": []
}
```

---

### `getCurrentFileContent` — 获取当前文件源码

获取当前打开文件的 Vue 组件源码内容。

**参数：** 无

**返回：** Vue 组件源码字符串

**示例：**

```json
{
  "action": "getCurrentFileContent",
  "parameters": []
}
```

---

### `refresh` — 刷新运行时

刷新当前页面/区块的运行时渲染，并检测是否存在运行时错误。

**参数：** 无

**返回：**

- `true` — 无运行时错误
- 错误信息字符串 — 检测到运行时报错，需修复代码

**用途：** 代码生成完毕后调用，确认是否有运行时错误。

**示例：**

```json
{
  "action": "refresh",
  "parameters": []
}
```

---

### `getNodeSelected` — 获取当前选中节点路径

获取当前页面中选中元素的节点路径，路径最后一项为选中元素名称。

**参数：** 无

**返回：** 路径字符串，如 `ElTable[0]>ElTableColumn[2]`，无选中时返回 `null`

**示例：**

```json
{
  "action": "getNodeSelected",
  "parameters": []
}
```

---

## 五、接口 API 管理

### `getApis` — 获取接口列表

获取当前项目中已配置的所有接口。

**参数：** 无

**返回：** `ApiSchema[]` 数组

**示例：**

```json
{
  "action": "getApis",
  "parameters": []
}
```

---

### `setApi` — 新增或更新接口

新增或更新一个接口配置。若接口名称已存在则更新，不存在则新增。

**参数：**

| 参数                                    | 类型    | 必填 | 说明                                                                                  |
| --------------------------------------- | ------- | ---- | ------------------------------------------------------------------------------------- |
| `api.name`                              | string  | ✅   | 接口名称，camelCase，如 `getUserList`                                                 |
| `api.url`                               | string  | ✅   | 请求 URL，支持路径参数如 `/api/user/:id`                                              |
| `api.label`                             | string  | ❌   | 接口描述说明                                                                          |
| `api.method`                            | string  | ❌   | `get` \| `post` \| `put` \| `delete` \| `patch` \| `jsonp`，默认 `get`                |
| `api.category`                          | string  | ❌   | 接口分组名称，用于 UI 分类展示                                                         |
| `api.settings.type`                     | string  | ❌   | 发送数据类型：`form`（表单）\| `json`（JSON）\| `data`（文件/FormData），默认 `form`  |
| `api.settings.loading`                  | boolean | ❌   | 请求时是否显示全局 loading 动画，默认 `true`                                           |
| `api.settings.failMessage`              | boolean | ❌   | 请求失败时是否弹出错误提示，默认 `true`                                                |
| `api.settings.validSuccess`             | boolean | ❌   | 是否校验响应是否成功（调用全局 validate 函数），默认 `false`                           |
| `api.settings.originResponse`           | boolean | ❌   | 是否返回原始 Axios 响应对象（而非 data 部分），默认 `true`                             |
| `api.settings.injectHeaders`            | boolean | ❌   | 是否注入请求拦截器中自定义的请求头，默认 `false`                                        |
| `api.settings.proxy`                    | boolean | ❌   | 是否开启请求代理，默认 `false`                                                          |
| `api.headers`                           | object  | ❌   | 请求头配置，JSExpression 对象 `{ type: 'JSExpression', value: '...' }`                 |
| `api.mock`                              | boolean | ❌   | 是否开启模拟数据，默认 `false`                                                          |
| `api.mockTemplate`                      | object  | ❌   | 模拟数据模板函数，JSFunction 对象 `{ type: 'JSFunction', value: '(req) => {...}' }`    |
| `api.jsonpOptions.jsonpCallback`        | string  | ❌   | jsonp 回调函数名（仅 `method: 'jsonp'` 时有效）                                        |
| `api.jsonpOptions.jsonpCallbackFunction` | string  | ❌   | jsonp 回调函数（仅 `method: 'jsonp'` 时有效）                                          |
| `api.jsonpOptions.timeout`              | number  | ❌   | jsonp 超时时间，毫秒（仅 `method: 'jsonp'` 时有效）                                    |
| `api.jsonpOptions.crossorigin`          | boolean | ❌   | jsonp 是否跨域（仅 `method: 'jsonp'` 时有效）                                          |

**示例：**

```json
{
  "action": "setApi",
  "parameters": [
    {
      "name": "getUserList",
      "label": "获取用户列表",
      "url": "/api/users",
      "method": "get"
    }
  ]
}
```

---

### `setApis` — 批量新增或更新接口

批量新增或更新多个接口配置。遍历数组中的每个 ApiSchema，逐个执行新增或更新逻辑。

**参数：**

| 参数   | 类型    | 必填 | 说明                 |
| ------ | ------- | ---- | -------------------- |
| `apis` | array   | ✅   | ApiSchema 对象数组   |
| `apis[].name`   | string | ✅   | 接口名称，camelCase |
| `apis[].url`    | string | ✅   | 请求 URL             |
| `apis[].label`  | string | ❌   | 接口描述说明         |
| `apis[].method` | string | ❌   | 请求方法，默认 `get` |

每个 ApiSchema 对象的完整字段与 `setApi` 相同（含 `settings`、`headers`、`mock`、`mockTemplate`、`jsonpOptions` 等）。

**示例：**

```json
{
  "action": "setApis",
  "parameters": [
    [
      {
        "name": "getUserList",
        "label": "获取用户列表",
        "url": "/api/users",
        "method": "get"
      },
      {
        "name": "createUser",
        "label": "创建用户",
        "url": "/api/users",
        "method": "post"
      }
    ]
  ]
}
```

---

### `removeApi` — 删除接口

删除指定接口。

**参数：**

- `name: string` — 接口名称或 ID

**示例：**

```json
{
  "action": "removeApi",
  "parameters": ["getUserList"]
}
```

---

### `removeApis` — 批量删除接口

批量删除多个接口。

**参数：**

- `apis: string[]` — 接口名称或 ID 数组

**示例：**

```json
{
  "action": "removeApis",
  "parameters": [["getUserList", "createUser"]]
}
```

---

## 六、依赖管理

### `getDeps` — 获取依赖列表

获取当前项目配置的所有依赖包。

**参数：** 无

**返回：** `Dependencie[]` 数组，每项包含 `package`、`version`、`library`、`urls`、`platform`、`official` 等

**示例：**

```json
{
  "action": "getDeps",
  "parameters": []
}
```

---

### `setDeps` — 批量新增或更新依赖

批量新增或更新项目的依赖包配置。**不会操作 `official: true` 的内置依赖**（如 Vue、Element Plus 等平台内置依赖会跳过）。

**参数：**

| 参数                  | 类型    | 必填 | 说明                                                                 |
| --------------------- | ------- | ---- | -------------------------------------------------------------------- |
| `deps[].package`      | string  | ✅   | 包名，如 `vue`、`element-plus`、`echarts`                            |
| `deps[].version`      | string  | ✅   | 版本号，如 `latest`、`^3.4.0`                                        |
| `deps[].library`      | string  | ✅   | 库导出名称，如 `Vue`、`ElementPlus`、`echarts`                       |
| `deps[].urls`         | string[] | ✅  | 加载资源 URL 数组，如 `@vtj/materials/deps/vue/index.umd.js`         |
| `deps[].platform`     | string[] | ❌  | 支持平台 `web` \| `h5` \| `uniapp`，不填则所有平台通用               |
| `deps[].required`     | boolean  | ❌  | 是否必须依赖，默认 `false`                                           |
| `deps[].enabled`      | boolean  | ❌  | 是否启用，默认 `true`                                                |
| `deps[].localeLibrary` | string  | ❌   | 语言包库导出名称                                                     |
| `deps[].assetsUrl`    | string  | ❌   | 资产配置 URL                                                         |
| `deps[].assetsLibrary` | string  | ❌  | 资产配置导出名称                                                     |
| `deps[].easycom`      | object  | ❌   | UniApp easycom 自动导入配置，`{ key: '^El[A-Z]', value: '...' }`     |

**注意：** 当操作包含 `official: true` 的内置依赖时，工具会跳过并返回跳过的包名。

**示例：**

```json
{
  "action": "setDeps",
  "parameters": [
    [
      {
        "package": "echarts",
        "version": "latest",
        "library": "echarts",
        "urls": ["@vtj/materials/deps/echarts/index.umd.js"]
      }
    ]
  ]
}
```

---

### `removeDeps` — 批量删除依赖

批量删除项目的依赖包。**不会删除 `official: true` 的内置依赖**。

**参数：**

- `packages: string[]` — 依赖包名数组

**返回：** 成功时返回 `true`；若跳过了内置依赖，返回 `{ success: true, skipped: string[], message: '...' }`

**示例：**

```json
{
  "action": "removeDeps",
  "parameters": [["lodash", "moment"]]
}
```

---

## 七、全局配置

### `getGlobalCss` / `setGlobalCss` — 全局 CSS

获取或设置应用的全局 CSS 样式代码。

**`setGlobalCss` 参数：**

- `css: string` — CSS 代码字符串

**注意：** UniApp 平台会自动将全局 CSS 存入 UniApp 配置的 `css` 项中。

**调用示例：**

```json
{
  "action": "getGlobalCss",
  "parameters": []
}
```

```json
{
  "action": "setGlobalCss",
  "parameters": ["body { background: #f5f5f5; }"]
}
```

---

### `getGlobalStore` / `setGlobalStore` — 全局 Pinia Store

获取或设置应用的全局 Pinia 状态。

**`setGlobalStore` 参数：**

- `store: string` — JS 函数代码字符串

函数接收 `app`（Vue 应用实例），返回标准 Pinia Store 配置对象：

```javascript
(app) => {
  return {
    state: () => ({
      user: null,
      token: ''
    }),
    getters: {
      isLogined: (state) => !!state.token
    },
    actions: {
      setUser(user) {
        this.user = user;
      },
      logout() {
        this.user = null;
        this.token = '';
      }
    }
  };
};
```

组件中通过 `__store.xxx` 访问（如 `__store.user`、`__store.setUser(data)`）。

**调用示例：**

```json
{
  "action": "getGlobalStore",
  "parameters": []
}
```

```json
{
  "action": "setGlobalStore",
  "parameters": ["(app) => { return { state: () => ({ user: null, token: '' }), getters: { isLogined: (state) => !!state.token }, actions: { setUser(user) { this.user = user }, logout() { this.user = null; this.token = '' } } } }"]
}
```

---

### `getGlobalAccess` / `setGlobalAccess` — 权限控制配置

获取或设置权限控制插件配置。

**`setGlobalAccess` 参数：**

- `access: string` — JS 函数代码字符串

函数接收 `app`，返回 `AccessOptions` 配置对象：

```javascript
(app) => {
  return {
    session: false,
    authKey: 'Authorization',
    storageKey: 'ACCESS_STORAGE',
    auth: '/#/login',
    whiteList: (to) => false,
    redirectParam: 'r',
    unauthorizedCode: 401,
    unauthorizedMessage: '登录已经失效，请重新登录！',
    noPermissionMessage: '无权限访问该页面',
    statusKey: 'code'
  };
};
```

组件中通过 `__access` 访问（如 `__access.isLogined()`、`__access.can('user:edit')`）。

**调用示例：**

```json
{
  "action": "getGlobalAccess",
  "parameters": []
}
```

```json
{
  "action": "setGlobalAccess",
  "parameters": ["(app) => { return { session: false, authKey: 'Authorization', storageKey: 'ACCESS_STORAGE', auth: '/#/login', whiteList: (to) => false, redirectParam: 'r', unauthorizedCode: 401, unauthorizedMessage: '登录已经失效，请重新登录！', noPermissionMessage: '无权限访问该页面', statusKey: 'code' } }"]
}
```

---

### `getGlobalAxios` / `setGlobalAxios` — Axios 基础配置

获取或设置全局 Axios 请求工具的基础配置（baseURL、超时、响应校验等）。

**`setGlobalAxios` 参数：**

- `axios: string` — JS 函数代码字符串

函数接收 `app`，返回 `IRequestOptions` 配置对象：

```javascript
(app) => {
  return {
    baseURL: '/',
    timeout: 60000,
    settings: {
      type: 'json',
      validSuccess: false,
      originResponse: true,
      loading: true,
      failMessage: true,
      validate: (res) => {
        return res.data?.code === 0 || !!res.data?.success;
      }
    }
  };
```

**调用示例：**

```json
{
  "action": "getGlobalAxios",
  "parameters": []
}
```

```json
{
  "action": "setGlobalAxios",
  "parameters": ["(app) => { return { baseURL: '/', timeout: 60000, settings: { type: 'json', validSuccess: false, originResponse: true, loading: true, failMessage: true, validate: (res) => res.data?.code === 0 || !!res.data?.success } } }"]
}
```

---

### `getGlobalRequestInterceptor` / `setGlobalRequestInterceptor` — 请求拦截器

获取或设置全局 Axios 请求拦截器，用于在发请求前修改请求配置（如注入 token）。

**`setGlobalRequestInterceptor` 参数：**

- `request: string` — JS 函数代码字符串

函数接收两个参数：

- `config` — 请求配置对象
- `app` — Vue 应用实例

函数**必须返回** `config`：

```javascript
(config, app) => {
  const token = app.config.globalProperties.$access?.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};
```

**调用示例：**

```json
{
  "action": "getGlobalRequestInterceptor",
  "parameters": []
}
```

```json
{
  "action": "setGlobalRequestInterceptor",
  "parameters": ["(config, app) => { const token = app.config.globalProperties.$access?.getToken(); if (token) { config.headers['Authorization'] = `Bearer ${token}`; } return config; }"]
}
```

---

### `getGlobalResponseInterceptor` / `setGlobalResponseInterceptor` — 响应拦截器

获取或设置全局 Axios 响应拦截器，用于统一处理响应数据。

**`setGlobalResponseInterceptor` 参数：**

- `response: string` — JS 函数代码字符串

函数接收两个参数：

- `res` — Axios 原始响应对象
- `app` — Vue 应用实例

函数**必须返回** `res`：

```javascript
(res, app) => {
  return res;
};
```

**调用示例：**

```json
{
  "action": "getGlobalResponseInterceptor",
  "parameters": []
}
```

```json
{
  "action": "setGlobalResponseInterceptor",
  "parameters": ["(res, app) => { return res; }"]
}
```

---

### `getGlobalBeforeEach` / `setGlobalBeforeEach` — 前置路由守卫

获取或设置全局前置路由守卫（`router.beforeEach`）。

**`setGlobalBeforeEach` 参数：**

- `value: string` — JS 函数代码字符串

函数接收 4 个参数：

- `to` — 即将进入的目标路由
- `from` — 当前正要离开的路由
- `next` — 执行跳转的函数
- `app` — Vue 应用实例

```javascript
(to, from, next, app) => {
  const access = app.config.globalProperties.$access;
  if (!access.isLogined() && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
};
```

**调用示例：**

```json
{
  "action": "getGlobalBeforeEach",
  "parameters": []
}
```

```json
{
  "action": "setGlobalBeforeEach",
  "parameters": ["(to, from, next, app) => { const access = app.config.globalProperties.$access; if (!access.isLogined() && to.path !== '/login') { next('/login'); } else { next(); } }"]
}
```

---

### `getGlobalAfterEach` / `setGlobalAfterEach` — 后置路由守卫

获取或设置全局后置路由守卫（`router.afterEach`）。

**`setGlobalAfterEach` 参数：**

- `value: string` — JS 函数代码字符串

函数接收 4 个参数：

- `to` — 即将进入的目标路由
- `from` — 当前正要离开的路由
- `failure` — 导航失败信息（无失败则为 `undefined`）
- `app` — Vue 应用实例

```javascript
(to, from, failure, app) => {
  if (!failure) {
    console.log('navigated to', to.path);
  }
};
```

**调用示例：**

```json
{
  "action": "getGlobalAfterEach",
  "parameters": []
}
```

```json
{
  "action": "setGlobalAfterEach",
  "parameters": ["(to, from, failure, app) => { if (!failure) { console.log('navigated to', to.path); } }"]
}
```

---

## 八、环境变量管理

### `getEnv` — 获取环境变量列表

获取项目中配置的所有环境变量。

**参数：** 无

**返回：** `EnvConfig[]` 数组，每项包含 `name`、`development`、`production`

**组件中访问环境变量：** `__provider.env.变量名`

**示例：**

```json
{
  "action": "getEnv",
  "parameters": []
}
```

---

### `createEnv` — 新增环境变量

新增一个环境变量，区分开发/生产两套值。

**参数：**

| 参数                 | 类型   | 必填 | 说明                  |
| -------------------- | ------ | ---- | --------------------- |
| `config.name`        | string | ✅   | 变量名，如 `BASE_URL` |
| `config.development` | string | ✅   | 开发环境的值          |
| `config.production`  | string | ✅   | 生产环境的值          |

**示例：**

```json
{
  "action": "createEnv",
  "parameters": [
    {
      "name": "BASE_URL",
      "development": "http://dev.api.com",
      "production": "https://api.com"
    }
  ]
}
```

---

### `removeEnv` — 删除环境变量

删除指定名称的环境变量。

**参数：**

- `name: string` — 环境变量名称

**示例：**

```json
{
  "action": "removeEnv",
  "parameters": ["BASE_URL"]
}
```

---

## 九、国际化（i18n）管理

### `getI18nMessage` — 获取词条列表

获取 vue-i18n 的所有中英文对照词条。

**参数：** 无

**返回：** `I18nMessage[]` 数组，每项包含 `key`、`zh-CN`、`en`

**组件中使用词条：** `__i18n.t('key')`

**示例：**

```json
{
  "action": "getI18nMessage",
  "parameters": []
}
```

---

### `createI18nMessage` — 新增词条（批量）

批量新增一条或多条中英文对照词条。**支持批量创建**，参数为数组而非单个对象。

**参数：**

| 参数                    | 类型   | 必填 | 说明                          |
| ----------------------- | ------ | ---- | ----------------------------- |
| `messages[].key`        | string | ✅   | 词条标识，如 `common.confirm` |
| `messages[].zh-CN`      | string | ✅   | 中文内容                      |
| `messages[].en`         | string | ✅   | 英文内容                      |

**示例：**

```json
{
  "action": "createI18nMessage",
  "parameters": [
    [
      { "key": "common.confirm", "zh-CN": "确认", "en": "Confirm" },
      { "key": "common.cancel", "zh-CN": "取消", "en": "Cancel" }
    ]
  ]
}
```

---

### `removeI18nMessage` — 删除词条（批量）

批量删除指定 key 的词条。**支持批量删除**，参数为数组而非单个 key。

**参数：**

- `keys: string[]` — 词条标识 key 数组

**示例：**

```json
{
  "action": "removeI18nMessage",
  "parameters": [["common.confirm", "common.cancel"]]
}
```

---

## 十、UniApp 专属配置

> 以下工具仅适用于 UniApp 平台项目。

### `getUniConfig` / `setUniConfig` — UniApp 全局配置

获取或设置 UniApp 全局配置，包括 pages.json、manifest.json、全局 CSS、App.vue 生命周期等。

**参数：**

| 参数    | 类型   | 必填      | 说明                       |
| ------- | ------ | --------- | -------------------------- |
| `key`   | string | ✅        | 配置类型名称（见下方枚举） |
| `value` | string | ✅（set） | 配置内容（见下方规则）     |

**`key` 枚举值：**

| key                    | 说明                    |
| ---------------------- | ----------------------- |
| `manifestJson`         | manifest.json 应用配置  |
| `pagesJson`            | pages.json 页面路由配置 |
| `css`                  | App.vue 中的全局 CSS    |
| `onLaunch`             | App 启动时              |
| `onShow`               | App 显示时              |
| `onHide`               | App 隐藏时              |
| `onError`              | App 报错时              |
| `onLastPageBackPress`  | 最后一个页面返回事件    |
| `onPageNotFound`       | 页面不存在时            |
| `onUnhandledRejection` | 未处理 Promise 拒绝时   |
| `onThemeChange`        | 主题变化时              |
| `onUniNViewMessage`    | nvue 发送消息时         |
| `onExit`               | App 退出时              |

**`value` 格式规则：**

1. `key` 为 `manifestJson` 或 `pagesJson` 时，`value` 为 **JSON 字符串**
2. `key` 为 `css` 时，`value` 为 **CSS 代码字符串**
3. `key` 为生命周期名称时，`value` 为 **JS 函数代码块**：
   ```javascript
   () => {
     // 生命周期逻辑
   };
   ```
4. `value` 为 `null` 时，表示清除该配置

**示例（设置 pages.json）：**

```json
{
  "action": "setUniConfig",
  "parameters": [
    "pagesJson",
    "{\"pages\":[{\"path\":\"pages/index/index\",\"style\":{\"navigationBarTitleText\":\"首页\"}}],\"globalStyle\":{\"navigationBarTextStyle\":\"black\",\"navigationBarTitleText\":\"uni-app\",\"navigationBarBackgroundColor\":\"#F8F8F8\",\"backgroundColor\":\"#F8F8F8\"}}"
  ]
}
```

**示例（设置 onLaunch 生命周期）：**

```json
{
  "action": "setUniConfig",
  "parameters": ["onLaunch", "() => { console.log('App launched') }"]
}
```

**调用示例（获取配置）：**

```json
{
  "action": "getUniConfig",
  "parameters": ["css"]
}
```

---

## 十一、工具调用建议

### 典型工作流程

1. **了解项目结构：** 先调用 `getMenus` 或 `getPages` 了解页面结构
2. **创建页面：** 用 `createPage` 创建，层级页面先建父级
3. **生成内容：** 结合 Vue 代码规范生成页面源码
4. **验证结果：** 调用 `refresh` 检测是否有运行时错误
5. **配置接口：** 用 `setApi` 注册后端接口
6. **管理依赖：** 用 `getDeps` 查看当前依赖，`setDeps` 添加第三方库
7. **全局配置：** 按需配置 store、access、axios 等全局选项

### 注意事项

- 调用 `createPage`/`createBlock` 后，目标文件会自动激活打开
- `refresh` 会等待渲染完成（约 1 秒），建议生成完整代码后再调用
- UniApp 平台不支持 `dir`（目录）和 `layout`（布局）类型页面
- 函数类型配置（store、access、axios、拦截器、路由守卫）均传入 **JS 函数代码字符串**，不是 JSON
- `setGlobalStore` 的函数必须返回 Pinia store 配置对象，可用 `getSkills` 查询 pinia 用法
- `setDeps` 和 `removeDeps` 均会跳过 `official: true` 的内置依赖（如 Vue、Element Plus）

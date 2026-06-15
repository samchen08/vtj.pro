# VTJ 应用设置 — AI 配置指南

> 本文档帮助 AI 理解如何通过工具方法配置应用级别的全局设置。
> 设计器的"应用设置"面板提供 9 个配置项，覆盖 3 大类：全局配置、请求配置、路由守卫。
> 这些配置最终存储在 `project.globals` 中，由渲染引擎在初始化时按顺序执行。

---

## 一、数据流全貌

```
设计器面板                          项目数据                         渲染引擎
globals/index.vue  ──setGloblas()──▶  project.globals  ──initRuntimeGlobals()──▶  运行时生效
    (UI)                              (GlobalConfig)                              (globals.ts)
```

**关键流程：**

1. 通过工具方法设置 → 存入 `project.globals`（`GlobalConfig` 类型）
2. 应用启动时 `Provider.install()` → 调用 `initGlobals()` → 调用 `initRuntimeGlobals()`
3. 渲染引擎按**固定顺序**初始化各项配置

> **注意：** 设计模式（Design Mode）下 `initGlobals` 不会被调用，仅在预览/运行时生效。

---

## 二、配置项与工具方法对照表

| 设计器面板项                | 配置键名     | 设置工具                       | 查询工具                       | 值类型     |
| --------------------------- | ------------ | ------------------------------ | ------------------------------ | ---------- |
| 应用全局「CSS」             | `css`        | `setGlobalCss`                 | `getGlobalCss`                 | CSS 字符串 |
| 应用状态「Pinia」           | `store`      | `setGlobalStore`               | `getGlobalStore`               | JS 函数    |
| 权限控制「Access」          | `access`     | `setGlobalAccess`              | `getGlobalAccess`              | JS 函数    |
| 应用增强「JS」              | `enhance`    | ⚠️ 暂无工具                    | ⚠️ 暂无工具                    | JS 函数    |
| 请求配置「IRequestOptions」 | `axios`      | `setGlobalAxios`               | `getGlobalAxios`               | JS 函数    |
| 请求拦截器                  | `request`    | `setGlobalRequestInterceptor`  | `getGlobalRequestInterceptor`  | JS 函数    |
| 响应拦截器                  | `response`   | `setGlobalResponseInterceptor` | `getGlobalResponseInterceptor` | JS 函数    |
| 前置守卫「beforeEach」      | `beforeEach` | `setGlobalBeforeEach`          | `getGlobalBeforeEach`          | JS 函数    |
| 后置守卫「afterEach」       | `afterEach`  | `setGlobalAfterEach`           | `getGlobalAfterEach`           | JS 函数    |

> ⚠️ **`enhance`（应用增强 JS）** 目前没有对应的工具方法，暂无法通过 AI 工具配置。

---

## 三、渲染引擎初始化顺序

`initRuntimeGlobals()` 严格按以下顺序执行，**顺序不可更改**，配置时需注意依赖关系：

```
1. CSS（全局样式）         ── adoptedStyleSheets 注入
    │
2. Store（Pinia 状态）     ── 创建 Pinia 实例，注册 $store
    │
3. Axios + 拦截器          ── 先设基础配置，再设请求拦截器，最后设响应拦截器
    │
4. Access（权限控制）      ── 创建 Access 实例，连接 router/request
    │
5. 路由守卫                ── 先 beforeEach，后 afterEach
    │
6. Enhance（应用增强）     ── 最后执行，可访问全部已初始化的 libs 和 app
```

**含义：**

- `store` 中的状态可在 `access`、路由守卫、拦截器中通过 `app.config.globalProperties.$store` 访问
- `access` 实例挂载后，路由守卫可通过 `app.config.globalProperties.$access` 访问
- `enhance` 最后执行，可访问所有已初始化的资源（store、access、router 等）

---

## 四、各配置项详细说明

### 4.1 应用全局 CSS — `css`

**对应工具：** `setGlobalCss` / `getGlobalCss`

直接传入 CSS 代码字符串，会在应用启动时注入为全局样式表。

**示例：**

```json
{
  "action": "setGlobalCss",
  "parameters": [
    "body { margin: 0; padding: 0; font-family: 'Helvetica Neue', sans-serif; }\n.page-container { min-height: 100vh; }"
  ]
}
```

**设计器默认值：** 空字符串（不注入额外 CSS）

---

### 4.2 应用状态 Pinia — `store`

**对应工具：** `setGlobalStore` / `getGlobalStore`

定义应用的全局 Pinia Store，函数必须返回一个标准 Pinia Store 配置对象。

**函数签名：** `(app) => ({ state, getters, actions })`

| 参数  | 说明                                                             |
| ----- | ---------------------------------------------------------------- |
| `app` | Vue 应用实例，可用于获取全局属性如 `app.config.globalProperties` |

**设计器默认模板：**

```javascript
(app) => {
  return {
    state: () => {
      return {
        // 定义状态
      };
    },
    getters: {
      // 计算属性
    },
    actions: {
      // 方法
    }
  };
};
```

**完整示例：**

```json
{
  "action": "setGlobalStore",
  "parameters": [
    "(app) => {\n  return {\n    state: () => ({\n      user: null,\n      token: '',\n      permissions: []\n    }),\n    getters: {\n      isLogined: (state) => !!state.token,\n      userName: (state) => state.user?.name || '游客'\n    },\n    actions: {\n      login(data) {\n        this.token = data.token\n        this.user = data.user\n        this.permissions = data.permissions || []\n      },\n      logout() {\n        this.token = ''\n        this.user = null\n        this.permissions = []\n      },\n      hasPermission(code) {\n        return this.permissions.includes(code)\n      }\n    }\n  }\n}"
  ]
}
```

**运行时访问：** 组件中通过 `__store.xxx` 访问：

```javascript
const user = __store.user;
__store.login({ token: 'xxx', user: { name: '张三' } });
```

---

### 4.3 权限控制 Access — `access`

**对应工具：** `setGlobalAccess` / `getGlobalAccess`

配置应用的权限控制插件，函数返回 `AccessOptions` 配置对象。

**函数签名：** `(app) => AccessOptions`

**设计器默认模板：**

```javascript
(app) => {
  return {
    // session: false,
    // authKey: 'Authorization',
    // storageKey: 'ACCESS_STORAGE',
    // auth: '/#/login',
    // whiteList: (to) => true,
    // redirectParam: 'r',
    // unauthorizedCode: 401,
    // unauthorizedMessage: '登录已经失效，请重新登录！',
    // noPermissionMessage: '无权限访问该页面',
    // statusKey: 'code'
  };
};
```

**`AccessOptions` 配置项说明：**

| 配置项                | 类型     | 默认值         | 说明                                                               |
| --------------------- | -------- | -------------- | ------------------------------------------------------------------ |
| `session`             | boolean  | false          | 是否开启 session 存储（关闭浏览器即失效），false 使用 localStorage |
| `authKey`             | string   | Authorization  | 请求头和 cookie 中 token 的键名                                    |
| `storageKey`          | string   | ACCESS_STORAGE | 本地缓存的键名                                                     |
| `auth`                | string   | /#/login       | 登录页面的 hash 路径                                               |
| `whiteList`           | function | (to) => false  | 路由白名单，返回 true 跳过权限校验，接收 to 路由对象               |
| `redirectParam`       | string   | r              | 登录后重定向的参数名                                               |
| `unauthorizedCode`    | number   | 401            | 未登录时后端返回的状态码                                           |
| `unauthorizedMessage` | string   | 登录已失效...  | 未登录时的提示消息                                                 |
| `noPermissionMessage` | string   | 无权限...      | 无权限时的提示消息                                                 |
| `statusKey`           | string   | code           | 响应数据中状态码的字段名                                           |

**运行时访问：** 组件中通过 `__access` 访问：

```javascript
// 检查是否已登录
__access.isLogined();

// 检查是否拥有指定权限
__access.can('user:edit');

// 检查是否至少有一个权限
__access.some(['user:edit', 'user:view']);

// 获取当前 token
__access.getToken();

// 获取登录用户数据
__access.getData();

// 登录
__access.login({
  token: 'xxx',
  user: { name: '张三' },
  permissions: ['user:view']
});

// 登出
__access.logout();
```

---

### 4.4 应用增强 JS — `enhance`

⚠️ **尚无对应工具方法。**

该配置允许在应用初始化的最后阶段注入自定义增强逻辑，函数接收 `app`（Vue 应用实例）和 `libs`（所有注册的第三方库集合）。

**设计器默认模板：**

```javascript
(app) => {
  // 在此添加增强代码
};
```

**执行时机：** 在所有其他全局配置（CSS、Store、Axios、Access、路由守卫）初始化完成后执行。

---

### 4.5 请求配置 IRequestOptions — `axios`

**对应工具：** `setGlobalAxios` / `getGlobalAxios`  
UI 标签中也称 `getGlobalAxios`，设置时使用 `setGlobalAxios`。

配置 Axios 请求工具的基础选项（baseURL、超时、响应校验等）。

**函数签名：** `(app) => IRequestOptions`

**设计器默认模板：**

```javascript
(app) => {
  return {
    // baseURL: '/',
    // timeout: 60000,
    // settings: {
    //   type: 'form',
    //   validSuccess: false,
    //   originResponse: true,
    //   loading: true,
    //   failMessage: true,
    //   validate: (res) => {
    //     return res.data?.code === 0 || !!res.data?.success;
    //   }
    // }
  };
};
```

**`IRequestOptions` 常见配置项：**

| 配置项                    | 类型     | 说明                                                             |
| ------------------------- | -------- | ---------------------------------------------------------------- |
| `baseURL`                 | string   | 请求的基础 URL 前缀                                              |
| `timeout`                 | number   | 请求超时时间（毫秒）                                             |
| `settings.type`           | string   | 请求数据类型：`form`（表单）、`json`（JSON）、`data`（FormData） |
| `settings.validSuccess`   | boolean  | 是否校验响应是否成功                                             |
| `settings.originResponse` | boolean  | 是否返回原始 Axios 响应对象                                      |
| `settings.loading`        | boolean  | 请求时是否显示全局 loading                                       |
| `settings.failMessage`    | boolean  | 请求失败时是否显示错误提示                                       |
| `settings.validate`       | function | 自定义响应成功校验函数，接收 `res` 返回 boolean                  |

**完整示例：**

```json
{
  "action": "setGlobalAxios",
  "parameters": [
    "(app) => {\n  return {\n    baseURL: 'https://api.example.com',\n    timeout: 30000,\n    settings: {\n      type: 'json',\n      validSuccess: true,\n      originResponse: false,\n      loading: true,\n      failMessage: true,\n      validate: (res) => {\n        return res.data?.code === 0\n      }\n    }\n  }\n}"
  ]
}
```

---

### 4.6 请求拦截器 — `request`

**对应工具：** `setGlobalRequestInterceptor` / `getGlobalRequestInterceptor`

在每次请求发送前执行，常用于注入 token、设置请求头等。

**函数签名：** `(config, app) => config`

| 参数     | 说明               |
| -------- | ------------------ |
| `config` | Axios 请求配置对象 |
| `app`    | Vue 应用实例       |

**必须返回**请求配置对象 `config`。

**设计器默认模板：**

```javascript
(config, app) => {
  return config;
};
```

**典型示例（自动注入 token）：**

```javascript
(config, app) => {
  const access = app.config.globalProperties.$access;
  if (access?.getToken()) {
    config.headers['Authorization'] = `Bearer ${access.getToken()}`;
  }
  return config;
};
```

---

### 4.7 响应拦截器 — `response`

**对应工具：** `setGlobalResponseInterceptor` / `getGlobalResponseInterceptor`

在每次请求收到响应后执行，常用于统一处理响应数据、错误处理等。

**函数签名：** `(res, app) => res`

| 参数  | 说明               |
| ----- | ------------------ |
| `res` | Axios 原始响应对象 |
| `app` | Vue 应用实例       |

**必须返回**响应对象 `res`。

**设计器默认模板：**

```javascript
(res, app) => {
  return res;
};
```

**典型示例（统一错误处理）：**

```javascript
(res, app) => {
  if (res.data?.code === 401) {
    const access = app.config.globalProperties.$access;
    if (access) {
      access.logout();
    }
  }
  return res;
};
```

---

### 4.8 前置路由守卫 beforeEach — `beforeEach`

**对应工具：** `setGlobalBeforeEach` / `getGlobalBeforeEach`

在路由跳转前执行，常用于权限校验、登录拦截等。

**函数签名：** `(to, from, next, app) => void`

| 参数   | 说明                                            |
| ------ | ----------------------------------------------- |
| `to`   | 即将进入的目标路由对象                          |
| `from` | 当前正要离开的路由对象                          |
| `next` | 执行跳转的函数（与 vue-router beforeEach 一致） |
| `app`  | Vue 应用实例                                    |

**设计器默认模板：**

```javascript
(to, from, next, app) => {
  next();
};
```

**典型示例（登录校验）：**

```javascript
(to, from, next, app) => {
  const access = app.config.globalProperties.$access;
  const isPublic = access?.options?.whiteList?.(to);
  if (!isPublic && !access?.isLogined()) {
    next('/login');
  } else {
    next();
  }
};
```

---

### 4.9 后置路由守卫 afterEach — `afterEach`

**对应工具：** `setGlobalAfterEach` / `getGlobalAfterEach`

在路由跳转完成后执行，常用于页面标题更新、埋点上报等。

**函数签名：** `(to, from, failure, app) => void`

| 参数      | 说明                               |
| --------- | ---------------------------------- |
| `to`      | 进入的目标路由对象                 |
| `from`    | 离开的路由对象                     |
| `failure` | 导航失败信息，成功时为 `undefined` |
| `app`     | Vue 应用实例                       |

**设计器默认模板：**

```javascript
(to, from, failure, app) => {};
```

**典型示例（埋点上报）：**

```javascript
(to, from, failure, app) => {
  if (!failure) {
    // 页面浏览埋点
    console.log('Page view:', to.path);
  }
};
```

---

## 五、配置建议与注意事项

### 5.1 典型配置流程

当 AI 需要配置应用级别功能时，建议按以下顺序调用工具：

```
1. setGlobalCss        → 设置全局样式
2. setGlobalStore      → 定义全局 Pinia 状态
3. setGlobalAxios      → 配置请求基础选项
4. setGlobalRequestInterceptor  → 设置请求拦截（如注入 token）
5. setGlobalResponseInterceptor → 设置响应拦截（如统一错误处理）
6. setGlobalAccess     → 配置权限控制插件
7. setGlobalBeforeEach → 设置前置路由守卫（登录校验等）
8. setGlobalAfterEach  → 设置后置路由守卫（埋点等）
```

这个顺序与渲染引擎内部初始化顺序一致，可以保证依赖关系正确。

### 5.2 重要约定

1. **值类型：** `css` 为普通字符串，其余 7 项（store、access、enhance、axios、request、response、beforeEach、afterEach）均为 **JS 函数代码字符串**，不是 JSON 对象

2. **工具参数格式：** 所有 set 类工具的配置内容均作为**单个字符串参数**传入（即 `parameters` 数组的第一个元素），不要在字符串外额外包裹对象

3. **`enhance` 暂无工具：** 如需初始化后执行自定义逻辑，目前只能通过设计器面板手动编辑，无对应 AI 工具方法

4. **运行时不直接调用：** 工具方法只负责**存储配置**到项目中，配置的实际生效发生在应用启动时，不影响当前打开的预览窗口（可调用 `refresh` 刷新查看效果）

5. **设计模式不生效：** 设计器内编辑页面时，全局配置不会立即在页面渲染中生效（`initGlobals` 仅在非设计模式下执行）

6. **函数内可访问全局属性：**
   - `app.config.globalProperties.$store` — Pinia store 实例
   - `app.config.globalProperties.$access` — 权限控制实例
   - `app.config.globalProperties.$router` — 路由实例
   - `app.config.globalProperties.$provider` — Provider 实例

### 5.3 查询已有配置

在修改配置前，建议先调用对应的 `get` 工具查看已有内容，避免覆盖：

```
getGlobalCss      → 查看当前全局 CSS
getGlobalStore    → 查看当前 Pinia store 代码
getGlobalAccess   → 查看当前权限配置
getGlobalAxios    → 查看当前请求基础配置
getGlobalRequestInterceptor  → 查看当前请求拦截器
getGlobalResponseInterceptor → 查看当前响应拦截器
getGlobalBeforeEach → 查看当前前置路由守卫
getGlobalAfterEach  → 查看当前后置路由守卫
```

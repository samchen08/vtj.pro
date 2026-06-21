# VTJ API 管理 — AI 配置指南

> 本文档帮助 AI 理解如何通过工具方法管理项目 API，以及在组件中调用 API 发送请求。

---

## 一、数据流全貌

```
设计器 API 管理面板                  项目数据                       渲染引擎
apis/index.vue ──setApi()────▶  project.apis  ──createSchemaApis()──▶  provider.apis
apis/form.vue   (增/删/改)        (ApiSchema[])   (register by id+name)  (callable functions)
                                                                    │
                                                    组件中调用: __apis['apiName'](data, opts)
```

**关键流程：**

1. **创建阶段：** 通过 `setApi` 工具将 API 配置存入 `project.apis`
2. **初始化阶段：** 应用启动时 `Provider.load()` → `createSchemaApis(apis, meta, adapter)` 将每条 API 编译为可调用的函数
3. **注册方式：** 每条 API 同时以 `id` 和 `name` 作为键注册到 `provider.apis`，组件中通过 `__apis['name']` 调用
4. **调用阶段：** `__apis['apiName'](data, opts)` → 底层调用 `request.send(config)` 发送请求

---

## 二、API 工具方法

### `setApi` — 新增或更新 API

新增一条 API 配置。若 `name` 已存在则更新，否则新增。

**参数：**

| 参数               | 类型    | 必填 | 说明                                                                        |
| ------------------ | ------- | ---- | --------------------------------------------------------------------------- |
| `api.name`         | string  | ✅   | 接口名称，camelCase，如 `getUserList`                                       |
| `api.url`          | string  | ✅   | 请求 URL，支持路径参数如 `/api/user/:id`                                    |
| `api.label`        | string  | ❌   | 接口描述说明                                                                |
| `api.method`       | string  | ❌   | 请求方法：`get` / `post` / `put` / `delete` / `patch` / `jsonp`，默认 `get` |
| `api.category`     | string  | ❌   | 分组名称，用于 UI 分类展示                                                  |
| `api.settings`     | object  | ❌   | 请求配置（下表）                                                            |
| `api.headers`      | string  | ❌   | 请求头，JS 表达式字符串，如 `"({'Content-Type': 'application/json'})"`      |
| `api.mock`         | boolean | ❌   | 是否开启模拟数据，默认 `false`                                              |
| `api.mockTemplate` | string  | ❌   | 模拟数据模板函数（JS 函数字符串），签名 `(req) => template`                 |
| `api.jsonpOptions` | object  | ❌   | JSONP 配置（仅 method 为 `jsonp` 时有效）                                   |

**`api.settings` 子字段：**

| 字段             | 类型    | 默认值  | 说明                                                                  |
| ---------------- | ------- | ------- | --------------------------------------------------------------------- |
| `type`           | string  | `form`  | 发送数据类型：`form`（表单）/ `json`（JSON）/ `data`（文件/FormData） |
| `loading`        | boolean | `true`  | 请求时是否显示全局 loading                                            |
| `failMessage`    | boolean | `true`  | 请求失败时是否弹出错误提示                                            |
| `validSuccess`   | boolean | `false` | 是否校验响应成功                                                      |
| `originResponse` | boolean | `true`  | 是否返回原始 Axios 响应对象                                           |
| `injectHeaders`  | boolean | `false` | 是否注入自定义请求头                                                  |
| `proxy`          | boolean | `false` | 是否开启请求代理                                                      |

**`api.jsonpOptions` 子字段（仅 method 为 `jsonp`）：**

| 字段                    | 类型    | 说明             |
| ----------------------- | ------- | ---------------- |
| `jsonpCallback`         | string  | 回调函数名       |
| `jsonpCallbackFunction` | string  | 回调函数         |
| `timeout`               | number  | 超时时间（毫秒） |
| `crossorigin`           | boolean | 是否跨域         |

**示例（简单配置）：**

```json
{
  "action": "setApi",
  "parameters": [
    {
      "name": "getUserList",
      "label": "获取用户列表",
      "url": "/api/users",
      "method": "get",
      "category": "用户管理"
    }
  ]
}
```

**示例（完整配置）：**

```json
{
  "action": "setApi",
  "parameters": [
    {
      "name": "getUserList",
      "label": "获取用户列表",
      "url": "/api/users",
      "method": "get",
      "category": "用户管理",
      "settings": {
        "type": "json",
        "loading": true,
        "failMessage": true,
        "validSuccess": false,
        "originResponse": true,
        "injectHeaders": false,
        "proxy": false
      },
      "headers": {
        "type": "JSExpression",
        "value": "({'Content-Type': 'application/json'})"
      },
      "mock": false,
      "mockTemplate": {
        "type": "JSFunction",
        "value": "(req) => {\n  return {\n    code: 0,\n    message: 'ok',\n    data: {\n      'list|10': [{\n        id: '@guid',\n        name: '@cname',\n        'age|18-60': 1\n      }]\n    }\n  };\n}"
      }
    }
  ]
}
```

---

### `getApis` — 获取所有 API

获取当前项目中已配置的全部 API 列表。

**参数：** 无

**返回：** `ApiSchema[]` 数组，每项包含 `id`、`name`、`url`、`method`、`label`、`category` 等字段

---

### `removeApi` — 删除单个 API

通过名称或 ID 删除一条 API。

**参数：**

- `name: string` — API 名称或 ID

---

### `removeApis` — 批量删除 API

批量删除多条 API。

**参数：**

- `apis: string[]` — API 名称或 ID 数组

---

## 三、API 完整配置（ApiSchema）

设计器表单分为 4 个 Tab：**基础信息**、**请求配置**、**模拟数据**、**接口测试**。以下是 `ApiSchema` 的完整字段：

### 3.1 基础信息（必填）

| 字段       | 类型   | 必填     | 说明                                                            |
| ---------- | ------ | -------- | --------------------------------------------------------------- |
| `id`       | string | 自动生成 | 唯一标识（UUID），系统自动分配                                  |
| `name`     | string | ✅       | 接口名称，camelCase，如 `getUserList`，该名称也是组件中调用的键 |
| `label`    | string | ❌       | 接口描述说明                                                    |
| `url`      | string | ✅       | 请求 URL，支持路径参数占位符如 `/api/users/:id`                 |
| `method`   | string | ❌       | 请求方法：`get` / `post` / `put` / `delete` / `patch` / `jsonp` |
| `category` | string | ❌       | 分组名称，用于 UI 分类展示                                      |

### 3.2 请求配置（settings + headers）

| 字段                      | 类型         | 默认值  | 说明                                                                  |
| ------------------------- | ------------ | ------- | --------------------------------------------------------------------- |
| `settings.type`           | string       | `form`  | 发送数据类型：`form`（表单）、`json`（JSON）、`data`（文件/FormData） |
| `settings.loading`        | boolean      | `true`  | 请求时是否显示全局 loading 动画                                       |
| `settings.failMessage`    | boolean      | `true`  | 请求失败时是否弹出错误提示                                            |
| `settings.validSuccess`   | boolean      | `false` | 是否校验响应是否成功（调用全局 validate 函数）                        |
| `settings.originResponse` | boolean      | `true`  | 是否返回原始 Axios 响应对象（而非 data 部分）                         |
| `settings.injectHeaders`  | boolean      | `false` | 是否注入请求拦截器中自定义的请求头                                    |
| `settings.proxy`          | boolean      | `false` | 是否开启请求代理                                                      |
| `headers`                 | JSExpression | `({})`  | 请求头配置，值为 JS 表达式字符串                                      |

**headers 示例：**

```javascript
// headers.value 的内容是一个 JS 表达式
({
  'Content-Type': 'application/json',
  'X-Custom-Header': 'value'
});
```

### 3.3 模拟数据（mock）

| 字段           | 类型       | 默认值  | 说明             |
| -------------- | ---------- | ------- | ---------------- |
| `mock`         | boolean    | `false` | 是否开启模拟数据 |
| `mockTemplate` | JSFunction | —       | 模拟数据模板函数 |

**mockTemplate 函数签名：** `(req) => template`

`req` 参数提供的信息：

| 属性         | 说明         |
| ------------ | ------------ |
| `req.url`    | 请求 URL     |
| `req.type`   | 请求方法类型 |
| `req.data`   | 请求体数据   |
| `req.params` | URL 路径参数 |
| `req.query`  | URL 查询参数 |

函数返回的数据会被 Mock.js 处理生成随机模拟数据：

```javascript
(req) => {
  return {
    code: 0,
    message: 'ok',
    data: {
      id: '@guid',
      name: '@cname',
      'age|18-60': 1
    }
  };
};
```

> 模板使用 Mock.js 语法规则，参考：https://vtj.pro/help/mock.html

### 3.4 jsonp 专用配置

当 `method` 为 `jsonp` 时，额外提供以下字段：

| 字段                                 | 类型    | 说明             |
| ------------------------------------ | ------- | ---------------- |
| `jsonpOptions.jsonpCallback`         | string  | 回调函数名       |
| `jsonpOptions.jsonpCallbackFunction` | string  | 回调函数         |
| `jsonpOptions.timeout`               | number  | 超时时间（毫秒） |
| `jsonpOptions.crossorigin`           | boolean | 是否跨域         |

### 3.5 常见问题

#### 返回数据异常或 `undefined`

如果调用 API 后发现返回数据不符合预期（如为 `undefined`、缺少字段或结构不对），请检查以下两处 `originResponse` 配置是否一致：

1. **应用设置中的全局请求配置**（`setGlobalAxios`）
2. **单个 API 的请求配置**（`setApi` 的 `settings.originResponse`）

**原理说明：**

- 当 `originResponse: true`（默认）时，返回完整的 Axios 响应对象（`AxiosResponse`），需通过 `res.data` 获取后端响应体，再通过 `res.data.data` 获取业务数据
- 当 `originResponse: false` 时，VTJ 自动提取并返回 `res.data?.data`，即后端响应体中的业务数据，省去手动取值步骤
- 单个 API 的 `settings.originResponse` 会覆盖全局配置

**典型错误场景：**

```javascript
// 错误示例 1：全局 originResponse: true（默认），但代码按业务数据直接取值
const res = await __apis['getUserList']();
this.list = res.list; // ❌ res 是完整 Axios 响应对象，不是业务数据

// 正确写法
const res = await __apis['getUserList']();
this.list = res.data.data.list; // ✅ originResponse: true 时，res.data.data 才是业务数据
// 或在 setApi 中设置 settings.originResponse: false，则可直接 res.list
```

```javascript
// 错误示例 2：全局 originResponse: false，但代码按原始响应对象处理
const res = await __apis['getUserList']();
console.log(res.status); // ❌ res 是业务数据（res.data?.data），没有 status 属性

// 正确写法：临时开启 originResponse
const res = await __apis['getUserList'](
  {},
  { settings: { originResponse: true } }
);
console.log(res.status); // ✅ 200
```

**排查步骤：**

1. 确认应用设置中 `setGlobalAxios` 的 `settings.originResponse` 值
2. 确认该 API 在 `setApi` 中是否单独设置了 `settings.originResponse`
3. 确保组件中处理响应数据的方式与当前生效的 `originResponse` 值匹配

#### 请求成功但进入 `catch` 或弹出错误提示

如果接口实际已返回 200 且数据正常，但代码进入了 `catch` 分支，或页面弹出了错误提示，请检查 `validSuccess` 配置：

1. **应用设置中的全局请求配置**（`setGlobalAxios` 的 `settings.validSuccess`）
2. **单个 API 的请求配置**（`setApi` 的 `settings.validSuccess`）
3. **全局请求配置中的 `validate` 函数**是否与后端响应结构匹配

**原理说明：**

- 当 `validSuccess: false`（默认）时，VTJ 不校验后端业务响应码，只要 HTTP 状态码为 2xx 即视为成功
- 当 `validSuccess: true` 时，VTJ 会调用 `validate` 函数对响应体进行业务成功校验；若 `validate` 返回 `false`，请求会被视为失败，Promise 被 `reject` 并弹出错误提示
- 全局默认 `validate` 函数逻辑为：`res.data?.code === 0 || !!res.data?.success`，即要求后端响应体中包含 `code: 0` 或 `success: true`
- 单个 API 的 `settings.validSuccess` 会覆盖全局配置

**典型错误场景：**

```javascript
// 错误示例 1：后端返回结构不匹配默认 validate
// 后端响应：{ status: 'ok', data: [...] }
const res = await __apis['getUserList']();
// ❌ 若 validSuccess: true，默认 validate 找不到 code/success，判定失败，进入 catch

// 解决方案：自定义 validate 函数匹配后端结构
{
  "action": "setGlobalAxios",
  "parameters": [
    "(app) => {\n  return {\n    settings: {\n      validSuccess: true,\n      validate: (res) => {\n        return res.data?.status === 'ok';\n      }\n    }\n  };\n}"
  ]
}
```

```javascript
// 错误示例 2：未处理 validSuccess 导致的 reject
// 全局 validSuccess: true，但代码未加 try/catch
const res = await __apis['getUserList'](); // ❌ 校验失败时会抛出异常，导致后续代码不执行

// 正确写法
try {
  const res = await __apis['getUserList']();
  this.list = res;
} catch (e) {
  // 校验失败或请求异常时进入此处
  console.error('请求失败', e);
}
```

```javascript
// 错误示例 3：某个 API 不需要校验但全局 validSuccess: true
// 该 API 后端返回无固定 code/success 结构
const res = await __apis['getRawData'](); // ❌ 被全局 validate 误判为失败

// 解决方案：该 API 单独关闭 validSuccess
{
  "action": "setApi",
  "parameters": [
    {
      "name": "getRawData",
      "url": "/api/raw",
      "settings": {
        "validSuccess": false
      }
    }
  ]
}
```

**排查步骤：**

1. 确认应用设置中 `setGlobalAxios` 的 `settings.validSuccess` 值
2. 确认全局 `validate` 函数逻辑是否与后端实际响应结构匹配（如 `code`、`success`、`status` 等字段）
3. 确认该 API 在 `setApi` 中是否单独设置了 `settings.validSuccess`
4. 若 `validSuccess: true`，确保调用处已处理 `reject` 场景（`try/catch` 或 `.catch()`）

---

## 四、组件中调用 API

### 4.1 基本调用

API 在运行时通过 `__apis` 全局变量访问，键名为 API 的 `name` 或 `id`：

```javascript
// 无参数 GET 请求
const res = await __apis['getUserList']();

// POST 请求，带请求体
const res = await __apis['createUser']({
  name: '张三',
  age: 28
});
```

**调用签名：**

```
(data?, opts?) => Promise<any>
```

- `data` — 请求体数据（GET/JSONP 时通常为空）
- `opts` — 额外配置，可覆盖 API 的默认 settings，也可传递路径参数（`opts.params`）和查询参数（`opts.query`）

### 4.2 路径参数（URL 中的 `:id` 占位符）

如果 API 的 URL 包含路径参数（如 `/api/users/:id`），通过第二个参数 `opts.params` 传入：

```javascript
// URL: /api/users/:id
const user = await __apis['getUserById'](
  {}, // 无请求体
  { params: { id: 'abc123' } } // 路径参数
);

// URL: /api/orders/:orderId/items/:itemId
const item = await __apis['getOrderItem'](
  {},
  { params: { orderId: '100', itemId: '5' } }
);
```

### 4.3 查询参数

查询参数（即 `?key=value`）通过 `opts.query` 传入：

```javascript
// 最终请求: /api/users?page=1&size=20&keyword=张三
const res = await __apis['getUserList'](
  {},
  { query: { page: 1, size: 20, keyword: '张三' } }
);
```

> **区分：** `opts.params` 用于替换 URL 中的路径占位符（如 `/api/users/:id`），`opts.query` 用于拼接 URL 查询字符串（`?key=value`）。两者不可混用。

### 4.4 覆盖请求配置

`opts` 参数支持临时覆盖 API 的 settings：

```javascript
// 本次请求不显示 loading，不显示错误提示
const res = await __apis['getUserList'](
  {},
  { settings: { loading: false, failMessage: false } }
);

// 自定义请求头
const res = await __apis['getUserList'](
  {},
  {
    settings: { injectHeaders: true },
    headers: { 'X-Device': 'mobile' }
  }
);
```

### 4.5 响应数据提取与 `originResponse`

VTJ 的请求底层基于 Axios，后端接口通常返回如下格式的响应体：

```json
{
  "code": 0,
  "msg": "ok",
  "data": { ... }
}
```

**默认行为（`originResponse: true`）：** 请求成功后，返回完整的 Axios 响应对象（`AxiosResponse`），需通过 `res.data` 获取后端响应体，再通过 `res.data.data` 获取业务数据：

```javascript
// 默认 originResponse: true
const res = await __apis['getUserList']();
// res 是 Axios 响应对象，res.data 是 { code: 0, msg: 'ok', data: { list: [...] } }
// res.data.data 才是业务数据 { list: [...], total: 100 }
```

**设置 `originResponse: false`：** VTJ 自动提取 `res.data?.data`，即只返回响应体中 `data` 字段的值，省去手动 `.data.data` 的取值步骤：

```javascript
// 设置 originResponse: false
const res = await __apis['getUserList']();
// res 直接是 { list: [...], total: 100 }，而非完整的响应包装
```

**开启 `originResponse: true`（默认）：** 返回完整的 Axios 响应对象（`AxiosResponse`），包含以下属性：

| 属性          | 说明                            |
| ------------- | ------------------------------- |
| `res.data`    | 响应体（即后端返回的完整 JSON） |
| `res.status`  | HTTP 状态码（如 200）           |
| `res.headers` | 响应头对象                      |
| `res.config`  | 请求配置对象                    |

适用场景：

- 需要读取 HTTP 响应头（如分页总数 `X-Total-Count`、下载文件的 `Content-Disposition`）
- 需要判断 HTTP 状态码做差异化处理
- 需要访问后端响应体的顶层字段（如 `code`、`msg`），而不仅是 `data` 部分

**设置方式：**

1. **在 API 配置中全局设置：**

```json
{
  "action": "setApi",
  "parameters": [
    {
      "name": "getFileList",
      "url": "/api/files",
      "method": "get",
      "settings": {
        "originResponse": true
      }
    }
  ]
}
```

2. **在调用时临时覆盖：**

```javascript
// 临时获取原始响应对象
const res = await __apis['getUserList'](
  {},
  {
    settings: { originResponse: true }
  }
);
console.log(res.status); // 200
console.log(res.headers); // { 'x-total-count': '50', ... }
console.log(res.data); // { code: 0, msg: 'ok', data: { list: [...] } }
```

**示例：读取分页响应头**

```javascript
const __state = reactive({
  list: [],
  total: 0,
  async fetchPage(page = 1) {
    // 后端通过响应头返回总数
    const res = await __apis['getUserList'](
      {},
      {
        query: { page, size: 20 },
        settings: { originResponse: true }
      }
    );
    this.list = res.data.data || []; // res.data 是响应体，res.data.data 是业务数据
    this.total = Number(res.headers['x-total-count']) || 0;
  }
});
```

**示例：读取下载文件响应**

```javascript
const __state = reactive({
  async downloadFile(id) {
    const res = await __apis['downloadFile'](
      {},
      {
        params: { id },
        settings: { originResponse: true }
      }
    );
    // 从响应头获取文件名
    const disposition = res.headers['content-disposition'];
    const filename = disposition?.match(/filename=(.+)/)?.[1] || 'unknown.bin';
    // res.data 为文件二进制内容（需配合 responseType: 'blob'）
    return { content: res.data, filename };
  }
});
```

> **注意：** 设置 `originResponse: false` 后，返回值从 Axios 响应对象变为业务数据（`res.data?.data`），取值路径需相应调整。默认返回完整 Axios 响应对象，需通过 `res.data.data` 或 `res.data`（取决于后端响应结构）获取数据。

### 4.6 JSONP 请求

JSONP 类型 API 的调用签名特殊：

```javascript
(query?) => Promise<any>
```

```javascript
// 设置 API: method = 'jsonp', url = 'https://api.example.com/data'
const res = await __apis['getExternalData']({
  userId: '123',
  callback: 'jsonpCallback'
});
```

### 4.7 Vue SFC 中使用

在 `<script setup>` 中，通过 `__state` 中定义方法调用 API：

```javascript
const __state = reactive({
  list: [],
  loading: false,
  async fetchData() {
    this.loading = true;
    const res = await __apis['getUserList']({}, { query: { page: 1 } });
    this.list = res.data?.data || [];
    this.loading = false;
  }
});

// 在生命周期中调用
onMounted(() => {
  __state.fetchData();
});
```

在模板中绑定：

```html
<el-button :loading="__state.loading" @click="__state.fetchData">
  加载数据
</el-button>
```

---

## 五、渲染器底层 API（@vtj/renderer）

### 5.1 `__provider.apis` — 直接调用已注册的 API 函数

`__provider.apis` 是渲染器 Provider 实例上的 API 函数注册表，所有通过 `setApi` 配置的 API 在运行时会被编译为可调用的函数并注册到此对象中。

**访问方式：**

```javascript
// 通过 API 的 name 或 id 访问
const apiFunction = __provider.apis['getUserList'];

// 直接调用
const res = await __provider.apis['getUserList'](data, opts);
```

**与 `__apis` 的关系：**

- `__apis` 是 `__provider.apis` 的快捷引用，两者指向同一对象
- 组件中推荐使用 `__apis`，代码更简洁
- `__provider.apis` 主要用于底层框架代码或需要显式访问 Provider 实例的场景

**示例：**

```javascript
// 在数据源方法中使用
const fetchData = async (...args) => {
  return await __provider.apis['getUserList']
    .apply(null, args)
    .then((res) => res.data?.data);
};
```

---

### 5.2 `__provider.createMock` — 创建模拟数据函数

`__provider.createMock` 用于根据 Mock.js 模板函数创建模拟数据 API。它会解析模板函数，并在调用时使用 Mock.js 生成随机数据。

**函数签名：**

```typescript
createMock(mockTemplate: (req?: any) => object): (...args: any[]) => Promise<any>
```

**参数：**

- `mockTemplate` — Mock.js 模板函数，签名为 `(req) => template`，返回 Mock.js 模板对象
  - `req` — 请求信息对象，包含 `url`、`type`、`data`、`params`、`query` 等属性
  - 返回值 — Mock.js 模板对象，使用 Mock.js 占位符语法（如 `@guid`、`@cname`、`@integer(10, 100)`）

**返回：**

- 一个异步函数，调用后返回 Mock.js 生成的模拟数据

**示例 1：基础用法**

```javascript
// 创建模拟数据函数
const mockApi = __provider.createMock((req) => {
  return {
    code: 0,
    message: 'ok',
    data: {
      'list|10': [
        {
          id: '@guid',
          name: '@cname',
          'age|18-60': 1
        }
      ]
    }
  };
});

// 调用模拟 API
const res = await mockApi();
console.log(res);
// 输出：{ code: 0, message: 'ok', data: { list: [...] } }
```

**示例 2：在数据源方法中使用**

```javascript
// Composition 模式数据源方法
const getMockData = async (...args) => {
  const mock = __provider.createMock((req) => {
    return {
      code: 0,
      data: {
        totalUsers: '@integer(100, 10000)',
        todayOrders: '@integer(10, 500)',
        revenue: '@float(1000, 50000, 2, 2)'
      }
    };
  });
  return await mock.apply(null, args);
};
```

**示例 3：根据请求参数动态生成模拟数据**

```javascript
const mockUserApi = __provider.createMock((req) => {
  const count = req.query?.size || 5;
  return {
    code: 0,
    data: {
      [`list|${count}`]: [
        {
          id: '@guid',
          name: '@cname',
          email: '@email'
        }
      ]
    }
  };
});

// 调用时传入查询参数
const res = await mockUserApi({}, { query: { size: 3 } });
// 返回 3 条模拟数据
```

**Mock.js 常用占位符：**

| 占位符                         | 说明             | 示例                                     |
| ------------------------------ | ---------------- | ---------------------------------------- | ------ | ----------------------- |
| `@guid`                        | 生成 GUID        | `'f3c8b5a7-1d2e-4f6a-8b9c-0d1e2f3a4b5c'` |
| `@cname`                       | 生成中文姓名     | `'张三'`                                 |
| `@email`                       | 生成邮箱         | `'example@email.com'`                    |
| `@integer(min, max)`           | 生成整数         | `@integer(10, 100)`                      |
| `@float(min, max, dmin, dmax)` | 生成浮点数       | `@float(1000, 50000, 2, 2)`              |
| `'key                          | min-max': value` | 生成数组                                 | `'list | 10': [{ id: '@guid' }]` |

> Mock.js 完整语法规则参考：https://vtj.pro/help/mock.html

**异常处理：**

`createMock` 内部会捕获模板函数执行异常，并输出警告日志，不会阻断调用流程：

```javascript
const mockApi = __provider.createMock((req) => {
  throw new Error('模板错误');
});

// 不会抛出异常，返回空对象 {}
const res = await mockApi();
```

---

## 六、典型配置示例

### 示例 1：配置一个完整的 CRUD 接口组

```json
[
  {
    "action": "setApi",
    "parameters": [
      {
        "name": "getUserList",
        "label": "获取用户列表",
        "url": "/api/users",
        "method": "get",
        "category": "用户管理"
      }
    ]
  },
  {
    "action": "setApi",
    "parameters": [
      {
        "name": "getUserById",
        "label": "获取用户详情",
        "url": "/api/users/:id",
        "method": "get",
        "category": "用户管理"
      }
    ]
  },
  {
    "action": "setApi",
    "parameters": [
      {
        "name": "createUser",
        "label": "创建用户",
        "url": "/api/users",
        "method": "post",
        "category": "用户管理"
      }
    ]
  },
  {
    "action": "setApi",
    "parameters": [
      {
        "name": "updateUser",
        "label": "更新用户",
        "url": "/api/users/:id",
        "method": "put",
        "category": "用户管理"
      }
    ]
  },
  {
    "action": "setApi",
    "parameters": [
      {
        "name": "deleteUser",
        "label": "删除用户",
        "url": "/api/users/:id",
        "method": "delete",
        "category": "用户管理"
      }
    ]
  }
]
```

### 示例 2：带完整模拟数据的 API

```json
{
  "action": "setApi",
  "parameters": [
    {
      "name": "getDashboard",
      "label": "获取仪表盘数据",
      "url": "/api/dashboard",
      "method": "get",
      "category": "仪表盘",
      "mock": true,
      "mockTemplate": {
        "type": "JSFunction",
        "value": "(req) => {\n  return {\n    code: 0,\n    data: {\n      totalUsers: '@integer(100, 10000)',\n      todayOrders: '@integer(10, 500)',\n      revenue: '@float(1000, 50000, 2, 2)'\n    }\n  };\n}"
      }
    }
  ]
}
```

> `mockTemplate` 使用 Mock.js 语法规则，`@integer`、`@float`、`@cname` 等为 Mock.js 占位符。

### 示例 3：带路径参数的 POST 接口

```json
{
  "action": "setApi",
  "parameters": [
    {
      "name": "updateUser",
      "label": "更新用户信息",
      "url": "/api/users/:id",
      "method": "put",
      "category": "用户管理",
      "settings": {
        "type": "json",
        "loading": true,
        "failMessage": true
      }
    }
  ]
}
```

---

## 七、常用请求场景速查

| 场景                        | 调用方式                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| 简单查询（无参数）          | `__apis['apiName']()`                                                           |
| GET 查询（带查询参数）      | `__apis['apiName']({}, { query: { page: 1 } })`                                 |
| POST 提交表单               | `__apis['apiName']({ name: '张三', age: 28 })`                                  |
| 带路径参数                  | `__apis['apiName']({}, { params: { id: 'xxx' } })`                              |
| 上传文件                    | `__apis['upload'](formData)`，设置 `settings.type = 'data'`                     |
| 静默请求（无 loading/提示） | `__apis['apiName'](data, { settings: { loading: false, failMessage: false } })` |
| JSONP 跨域                  | `__apis['externalApi']({ userId: '123' })`                                      |
| 获取原始响应对象            | `__apis['apiName'](data, { settings: { originResponse: true } })`               |

---

## 八、注意事项

1. **name 唯一性：** API 的 `name` 在同一项目中必须唯一，创建前建议先调用 `getApis` 检查是否已存在同名 API
2. **路径参数放 `opts.params`：** URL 中的 `:id` 占位符替换依赖 `opts.params` 字段，不要将路径参数放在 `data` 中
3. **查询参数放 `opts.query`：** URL 查询字符串 `?key=value` 通过 `opts.query` 传入，不要与路径参数 `opts.params` 混用
4. **请求体仅用于 POST/PUT/PATCH：** GET 和 DELETE 请求通常不需要 `data` 参数
5. **settings 覆盖规则：** 调用时传入的 `opts.settings` 会与 API 配置的 `settings` 合并，调用时的值优先级更高
6. **$provider.apis vs \_\_apis：** 两者指向同一对象，组件中推荐使用 `__apis`
7. **API 需刷新后生效：** 通过 `setApi` 新增的 API 需要通过 `refresh` 刷新运行时才能生效

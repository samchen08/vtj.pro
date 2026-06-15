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

---

### `getPages` — 获取所有页面

获取当前项目的全部页面列表（扁平结构）。

**参数：** 无

**返回：** 数组，每项包含 `id`、`name`、`title`、`layout`、`dir`、`icon`

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

**示例：**

```json
{
  "action": "createPage",
  "parameters": [
    {
      "name": "Dashboard",
      "title": "仪表盘",
      "icon": "DataAnalysis"
    },
    "2gqoc7vp"
  ]
}
```

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

---

### `movePage` — 移动页面层级

将页面移动到指定父级下（改变层级关系）。

**参数：**

| 参数       | 类型   | 必填 | 说明                                  |
| ---------- | ------ | ---- | ------------------------------------- |
| `id`       | string | ✅   | 要移动的页面 ID                       |
| `parentId` | string | ❌   | 目标父页面 ID，传 `null` 则移到根目录 |

---

### `removePage` — 删除页面

删除指定页面或目录。

**注意：** 删除目录或布局类型页面前，需先删除其所有子页面。

**参数：**

- `id: string` — 页面文件 ID

---

### `setHomepage` — 设置应用主页

将指定页面设为应用首页。

**参数：**

- `id: string` — 页面 ID

---

## 三、区块组件管理

### `getBlocks` — 获取所有区块

获取当前项目的全部区块组件列表。

**参数：** 无

**返回：** 数组，每项包含 `id`、`name`、`title`、`category`

---

### `createBlock` — 创建区块

在当前项目中新建区块组件，创建后自动打开（激活）。

**参数：**

| 参数             | 类型   | 必填 | 说明                                |
| ---------------- | ------ | ---- | ----------------------------------- |
| `block.name`     | string | ✅   | 区块名称，PascalCase，如 `UserCard` |
| `block.title`    | string | ✅   | 区块标题                            |
| `block.category` | string | ❌   | 区块分类/分组名称                   |

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

---

### `removeBlock` — 删除区块

删除指定区块文件。

**参数：**

- `id: string` — 区块文件 ID

---

## 四、文件操作

### `active` — 打开文件

在设计器中打开（激活）指定的页面或区块。

**参数：**

- `id: string` — 文件（页面或区块）ID

---

### `getCurrentFile` — 获取当前文件信息

获取当前设计器中打开的文件元信息（名称、标题、ID）。

**参数：** 无

**返回：** `{ id, name, title }`，无打开文件时抛出错误

---

### `getCurrentFileContent` — 获取当前文件源码

获取当前打开文件的 Vue 组件源码内容。

**参数：** 无

**返回：** Vue 组件源码字符串

---

### `refresh` — 刷新运行时

刷新当前页面/区块的运行时渲染，并检测是否存在运行时错误。

**参数：** 无

**返回：**

- `true` — 无运行时错误
- 错误信息字符串 — 检测到运行时报错，需修复代码

**用途：** 代码生成完毕后调用，确认是否有运行时错误。

---

### `getNodeSelected` — 获取当前选中节点路径

获取当前页面中选中元素的节点路径，路径最后一项为选中元素名称。

**参数：** 无

**返回：** 路径字符串，如 `ElTable[0]>ElTableColumn[2]`，无选中时返回 `null`

---

## 五、接口 API 管理

### `getApis` — 获取接口列表

获取当前项目中已配置的所有接口。

**参数：** 无

**返回：** `ApiSchema[]` 数组

---

### `setApi` — 新增或更新接口

新增或更新一个接口配置。若接口名称已存在则更新，不存在则新增。

**参数：**

| 参数         | 类型   | 必填 | 说明                                                                             |
| ------------ | ------ | ---- | -------------------------------------------------------------------------------- |
| `api.name`   | string | ✅   | 接口名称，camelCase，如 `getUserList`                                            |
| `api.label`  | string | ❌   | 接口描述说明                                                                     |
| `api.url`    | string | ✅   | 请求 URL，支持路径参数如 `/api/user/:id`                                         |
| `api.method` | string | ❌   | 请求方法：`get` \| `post` \| `put` \| `delete` \| `patch` \| `jsonp`，默认 `get` |

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

### `removeApi` — 删除接口

删除指定接口。

**参数：**

- `name: string` — 接口名称或 ID

---

### `removeApis` — 批量删除接口

批量删除多个接口。

**参数：**

- `apis: string[]` — 接口名称或 ID 数组

---

## 六、全局配置

### `getGlobalCss` / `setGlobalCss` — 全局 CSS

获取或设置应用的全局 CSS 样式代码。

**`setGlobalCss` 参数：**

- `css: string` — CSS 代码字符串

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

组件中通过 `__store.xxx` 访问（如 `__store.state.user`、`__store.setUser(data)`）。

---

### `getGlobalAccess` / `setGlobalAccess` — 权限控制配置

获取或设置权限控制插件配置。

**`setGlobalAccess` 参数：**

- `access: string` — JS 函数代码字符串

函数接收 `app`，返回 `AccessOptions` 配置对象：

```javascript
(app) => {
  return {
    session: false, // 是否开启 session（关闭浏览器失效）
    authKey: 'Authorization', // 请求头和 cookie 中 token 的键名
    storageKey: 'ACCESS_STORAGE', // 本地缓存键名
    auth: '/#/login', // 登录页路径
    whiteList: (to) => false, // 路由白名单，返回 true 则跳过权限校验
    redirectParam: 'r', // 重定向参数名
    unauthorizedCode: 401, // 未登录响应状态码
    unauthorizedMessage: '登录已经失效，请重新登录！',
    noPermissionMessage: '无权限访问该页面',
    statusKey: 'code' // 响应数据中状态码的 key
  };
};
```

组件中通过 `__access` 访问（如 `__access.isLogined()`、`__access.can('user:edit')`）。

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
      type: 'json', // 请求数据类型：form | json | data
      validSuccess: true, // 是否校验响应成功
      originResponse: false, // 是否返回原始 Axios 响应
      loading: true, // 是否显示 loading
      failMessage: true, // 是否显示错误提示
      validate: (res) => {
        return res.data?.code === 0 || !!res.data?.success;
      }
    }
  };
};
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
  // 可在此处做统一的数据转换
  return res;
};
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
  // 示例：登录校验
  const access = app.config.globalProperties.$access;
  if (!access.isLogined() && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
};
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
    // 路由跳转成功后的操作，如记录埋点
    console.log('navigated to', to.path);
  }
};
```

---

## 七、环境变量管理

### `getEnv` — 获取环境变量列表

获取项目中配置的所有环境变量。

**参数：** 无

**返回：** `EnvConfig[]` 数组，每项包含 `name`、`development`、`production`

**组件中访问环境变量：** `__provider.env.变量名`

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

---

## 八、国际化（i18n）管理

### `getI18nMessage` — 获取词条列表

获取 vue-i18n 的所有中英文对照词条。

**参数：** 无

**返回：** `I18nMessage[]` 数组，每项包含 `key`、`zh-CN`、`en`

**组件中使用词条：** `__i18n.t('key')` 或模板中 `{{ $t('key') }}`

---

### `createI18nMessage` — 新增词条

新增一条中英文对照词条。

**参数：**

| 参数            | 类型   | 必填 | 说明                          |
| --------------- | ------ | ---- | ----------------------------- |
| `message.key`   | string | ✅   | 词条标识，如 `common.confirm` |
| `message.zh-CN` | string | ✅   | 中文内容                      |
| `message.en`    | string | ✅   | 英文内容                      |

---

### `removeI18nMessage` — 删除词条

删除指定 key 的词条。

**参数：**

- `key: string` — 词条标识 key

---

## 九、UniApp 专属配置

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

---

## 十、工具调用建议

### 典型工作流程

1. **了解项目结构：** 先调用 `getMenus` 或 `getPages` 了解页面结构
2. **创建页面：** 用 `createPage` 创建，层级页面先建父级
3. **生成内容：** 结合 Vue 代码规范生成页面源码
4. **验证结果：** 调用 `refresh` 检测是否有运行时错误
5. **配置接口：** 用 `setApi` 注册后端接口
6. **全局配置：** 按需配置 store、access、axios 等全局选项

### 注意事项

- 调用 `createPage`/`createBlock` 后，目标文件会自动激活打开
- `refresh` 会等待渲染完成（约 1 秒），建议生成完整代码后再调用
- UniApp 平台不支持 `dir`（目录）和 `layout`（布局）类型页面
- 函数类型配置（store、access、axios、拦截器、路由守卫）均传入 **JS 函数代码字符串**，不是 JSON
- `setGlobalStore` 的函数必须返回 Pinia store 配置对象，可用 `getSkills` 查询 pinia 用法

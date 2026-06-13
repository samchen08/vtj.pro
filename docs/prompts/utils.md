# VTJ 工具库（@vtj/utils）— AI 使用指南

> 本文档帮助 AI 理解如何使用 `@vtj/utils` 工具库中的各类工具方法，在组件中实现网络请求、数据存储、URL 处理、文件下载等常见功能。

---

## 一、工具库概览

`@vtj/utils` 是 VTJ 平台的通用工具库，提供以下核心功能模块：

| 模块           | 功能                                             | 导入方式                                                               |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| **request**    | HTTP 请求封装（基于 axios）                      | `import { request, createApi, createApis, useApi } from '@vtj/utils'`  |
| **storage**    | 本地存储（localStorage/sessionStorage/内存缓存） | `import { storage } from '@vtj/utils'`                                 |
| **cookie**     | Cookie 操作                                      | `import * as cookie from '@vtj/utils/cookie'`                          |
| **url**        | URL 解析与拼接                                   | `import * as url from '@vtj/utils/url'`                                |
| **download**   | 文件下载                                         | `import { downloadUrl, downloadBlob, downloadJson } from '@vtj/utils'` |
| **logger**     | 日志打印                                         | `import { logger } from '@vtj/utils'`                                  |
| **loadScript** | 动态加载外部脚本                                 | `import { loadScript } from '@vtj/utils'`                              |
| **jsonp**      | JSONP 跨域请求                                   | `import { jsonp } from '@vtj/utils'`                                   |
| **client**     | 客户端环境检测                                   | `import { getClientInfo } from '@vtj/utils'`                           |
| **raf**        | requestAnimationFrame 封装                       | `import { rAF, cAF } from '@vtj/utils'`                                |
| **util**       | 通用工具函数                                     | `import { isClient, fileToBase64, formDataToJson } from '@vtj/utils'`  |

---

## 二、HTTP 请求模块（request）

### 2.1 核心 API

| 方法                             | 说明                           | 返回值                             |
| -------------------------------- | ------------------------------ | ---------------------------------- |
| `request(config)`                | 发送 HTTP 请求                 | `Promise<R>`                       |
| `createApi(url \| config, req?)` | 创建单个 API 函数              | `(data?, opts?) => Promise<R>`     |
| `createApis(map, req?)`          | 批量创建 API 函数              | `Record<string, Function>`         |
| `useApi(loader, transform?)`     | Composition API 风格的请求钩子 | `{ data, error, loading, reload }` |

### 2.2 request 实例方法

```javascript
request.send(config)        // 发送请求
request.cancel(id?)         // 取消请求（不传 id 取消全部）
request.setConfig(options)  // 修改全局配置
request.useRequest(fn)      // 请求拦截器
request.useResponse(fn)     // 响应拦截器
```

### 2.3 请求配置（IRequestConfig）

```javascript
{
  url: string,              // 请求地址
  method: string,           // 请求方法：get/post/put/patch/delete
  settings: {
    type: 'form' | 'json' | 'data',  // 数据格式（默认 form）
    loading: boolean,                // 是否显示 loading
    showLoading: () => void,         // 自定义显示 loading
    hideLoading: () => void,         // 自定义隐藏 loading
    failMessage: boolean,            // 是否显示失败提示
    showError: (msg, e) => void,     // 自定义错误提示
    originResponse: boolean,         // 返回原始 axios 响应
    headers: object | function,      // 自定义请求头
    injectHeaders: boolean,          // 是否注入自定义请求头
    proxy: boolean,                  // 是否开启代理
    proxyPath: string                // 代理服务路径
  },
  query: object             // URL path 参数对象（用于路径参数替换）
}
```

### 2.4 使用示例

#### 方式一：直接使用 request

```javascript
import { request } from '@vtj/utils';

// GET 请求
const res = await request({
  url: '/api/users',
  method: 'get',
  settings: {
    type: 'json',
    loading: true
  }
});

// POST 请求（form 格式）
const res = await request({
  url: '/api/users',
  method: 'post',
  data: { name: '张三', age: 25 }
});

// POST 请求（JSON 格式）
const res = await request({
  url: '/api/users',
  method: 'post',
  settings: { type: 'json' },
  data: { name: '张三', age: 25 }
});

// 带路径参数（query 用于替换 URL 中的 :id）
const res = await request({
  url: '/api/users/:id',
  method: 'get',
  query: { id: 123 }
});
// 实际请求：/api/users/123
```

#### 方式二：使用 createApi（推荐）

```javascript
import { createApi } from '@vtj/utils';

// 创建 API 函数
const getUserList = createApi('/api/users');
const getUserById = createApi('/api/users/:id');
const createUser = createApi({
  url: '/api/users',
  method: 'post',
  settings: { type: 'json' }
});

// 调用 API
const list = await getUserList();
const user = await getUserById(null, { query: { id: 123 } });
const newUser = await createUser({ name: '张三' });
```

#### 方式三：使用 createApis 批量创建

```javascript
import { createApis } from '@vtj/utils';

const __apis = createApis({
  getUserList: '/api/users',
  getUserById: '/api/users/:id',
  createUser: {
    url: '/api/users',
    method: 'post',
    settings: { type: 'json' }
  },
  updateUser: {
    url: '/api/users/:id',
    method: 'put',
    settings: { type: 'json' }
  },
  deleteUser: {
    url: '/api/users/:id',
    method: 'delete'
  }
});

// 在组件中使用
onMounted(async () => {
  const res = await __apis.getUserList();
  __state.userList = res.data || [];
});

// 带路径参数调用
await __apis.getUserById(null, { query: { id: 123 } });

// 带请求体调用
await __apis.createUser({ name: '张三', age: 25 });
```

#### 方式四：使用 useApi 钩子

```javascript
import { useApi, createApi } from '@vtj/utils';

const getUserList = createApi('/api/users');

// 自动加载数据
const { data, error, loading, reload } = useApi(getUserList());

// 带数据转换
const { data } = useApi(getUserList(), (res) => res.data?.list || []);
```

### 2.5 params 与 query 的职责区分

> ⚠️ **重要规范：** 在 VTJ 的请求体系中，`params` 和 `query` 有明确的语义区分：

| 参数类型   | 用途                                 | 位置         | 示例                                |
| ---------- | ------------------------------------ | ------------ | ----------------------------------- |
| **query**  | URL **路径参数**（Path Parameters）  | URL 路径中   | `/api/users/:id` → `/api/users/123` |
| **params** | URL **查询参数**（Query Parameters） | URL `?` 后面 | `/api/users?page=1&size=10`         |

**正确使用方式：**

```javascript
// ✅ query 用于路径参数替换
await request({
  url: '/api/users/:id',
  query: { id: 123 }
});
// 实际请求：GET /api/users/123

// ✅ data 中的字段会自动成为查询参数（GET 请求）
await request({
  url: '/api/users',
  method: 'get',
  data: { page: 1, size: 10 }
});
// 实际请求：GET /api/users?page=1&size=10

// ✅ POST 请求中 query 用于路径参数，data 用于请求体
await request({
  url: '/api/users/:id',
  method: 'post',
  query: { id: 123 },
  data: { name: '张三' }
});
// 实际请求：POST /api/users/123
// 请求体：{ name: '张三' }
```

### 2.6 路径参数传参规范

当 API 地址包含路径参数（如 `:id`）时，必须通过 `query` 字段传入：

```javascript
// API 定义
const __apis = createApis({
  getUser: '/api/users/:id',
  updateUser: {
    url: '/api/users/:id',
    method: 'put',
    settings: { type: 'json' }
  }
});

// 正确调用方式
await __apis.getUser(null, { query: { id: 123 } });
await __apis.updateUser({ name: '张三' }, { query: { id: 123 } });
```

**原理说明：** `request` 内部使用 `pathToRegexpCompile` 将 URL 中的 `:paramName` 替换为 `query` 对象中对应的值。

---

## 三、本地存储模块（storage）

### 3.1 核心 API

```javascript
import { storage } from '@vtj/utils';

storage.save(key, value, opts?)   // 保存数据
storage.get(key, opts?)           // 读取数据
storage.remove(key, opts?)        // 删除数据
storage.clear(opts?)              // 清空存储
storage.config(opts?)             // 修改默认配置
```

### 3.2 存储类型（type）

| 类型      | 说明           | 过期支持 | 环境     |
| --------- | -------------- | -------- | -------- |
| `local`   | localStorage   | ✅ 支持  | 浏览器   |
| `session` | sessionStorage | ✅ 支持  | 浏览器   |
| `cache`   | 内存缓存       | ✅ 支持  | 所有环境 |

### 3.3 配置选项

```javascript
{
  type: 'cache' | 'local' | 'session',  // 存储类型（默认 cache）
  expired: number,                       // 过期时间（毫秒），0 为永不过期
  prefix: string                         // key 前缀（默认 '__VTJ_'）
}
```

### 3.4 使用示例

```javascript
import { storage } from '@vtj/utils';

// 保存数据（永不过期）
storage.save('userToken', 'abc123');

// 保存数据（1 小时后过期）
storage.save('userToken', 'abc123', {
  type: 'local',
  expired: 60 * 60 * 1000
});

// 读取数据
const token = storage.get('userToken');

// 读取数据（指定存储类型）
const token = storage.get('userToken', { type: 'local' });

// 删除数据
storage.remove('userToken');

// 清空所有缓存
storage.clear();

// 修改默认配置
storage.config({
  type: 'local',
  prefix: 'MY_APP_'
});
```

### 3.5 在 Composition API 中使用

```javascript
import { reactive, onMounted } from 'vue';
import { storage } from '@vtj/utils';

const __state = reactive({
  user: null,
  token: ''
});

onMounted(() => {
  // 从本地存储读取用户信息
  __state.token = storage.get('userToken') || '';
  __state.user = storage.get('userInfo', { type: 'local' });
});

function login(user) {
  __state.user = user;
  __state.token = user.token;

  // 保存到本地存储
  storage.save('userToken', user.token, {
    type: 'local',
    expired: 7 * 24 * 60 * 60 * 1000 // 7 天
  });
  storage.save('userInfo', user, {
    type: 'local',
    expired: 7 * 24 * 60 * 60 * 1000
  });
}

function logout() {
  storage.remove('userToken', { type: 'local' });
  storage.remove('userInfo', { type: 'local' });
  __state.user = null;
  __state.token = '';
}
```

---

## 四、Cookie 操作模块（cookie）

### 4.1 核心 API

```javascript
import * as cookie from '@vtj/utils/cookie';

cookie.set(name, value, opts?)    // 设置 Cookie
cookie.get(name)                  // 读取 Cookie
cookie.remove(name, opts?)        // 删除 Cookie
```

### 4.2 配置选项

```javascript
{
  expires: number,      // 过期天数
  path: string,         // 路径（默认 '/'）
  domain: string,       // 域名
  secure: boolean,      // 仅 HTTPS
  sameSite: string      // SameSite 策略
}
```

### 4.3 使用示例

```javascript
import * as cookie from '@vtj/utils/cookie';

// 设置 Cookie（会话级别）
cookie.set('userId', '12345');

// 设置 Cookie（7 天过期）
cookie.set('userId', '12345', { expires: 7 });

// 设置 Cookie（指定路径和域名）
cookie.set('userId', '12345', {
  expires: 7,
  path: '/',
  domain: '.example.com'
});

// 读取 Cookie
const userId = cookie.get('userId');

// 删除 Cookie
cookie.remove('userId');
```

---

## 五、URL 处理模块（url）

### 5.1 核心 API

```javascript
import * as url from '@vtj/utils/url';

url.stringify(query)              // 对象转查询字符串
url.parse(str?)                   // 查询字符串转对象
url.append(url, query)            // 在 URL 后追加参数
url.getHost(url)                  // 获取 URL 的 host
url.getCurrentHost(includePath)   // 获取当前页面 host
```

### 5.2 使用示例

```javascript
import * as url from '@vtj/utils/url';

// 对象转查询字符串
const str = url.stringify({ page: 1, size: 10 });
// 结果：'page=1&size=10'

// 查询字符串转对象
const obj = url.parse('page=1&size=10');
// 结果：{ page: '1', size: '10' }

// 获取当前 URL 参数
const params = url.parse();
// 结果：从 location.search 解析参数

// 在 URL 后追加参数
const newUrl = url.append('/api/users', { page: 2 });
// 结果：'/api/users?page=2'

// 追加参数到已有参数的 URL
const newUrl = url.append('/api/users?sort=asc', { page: 2 });
// 结果：'/api/users?sort=asc&page=2'

// 获取 URL 的 host
const host = url.getHost('https://example.com/api/users');
// 结果：'https://example.com'

// 获取当前页面 host
const host = url.getCurrentHost(false);
// 结果：'https://example.com'

const hostWithPath = url.getCurrentHost(true);
// 结果：'https://example.com/path/to/page'
```

---

## 六、文件下载模块（download）

### 6.1 核心 API

```javascript
import { downloadUrl, downloadBlob, downloadJson, downloadRemoteFile } from '@vtj/utils';

downloadUrl(url, filename?)              // 下载指定 URL 的文件
downloadBlob(data, filename?, type?)     // 下载 Blob 数据
downloadJson(data, filename?)            // 下载 JSON 数据
downloadRemoteFile(url, filename?, type?)// 下载远程文件
```

### 6.2 使用示例

```javascript
import {
  downloadUrl,
  downloadBlob,
  downloadJson,
  downloadRemoteFile
} from '@vtj/utils';

// 下载 URL 文件
downloadUrl('https://example.com/file.pdf', 'report.pdf');

// 下载 JSON 数据
const data = { name: '张三', age: 25 };
downloadJson(data, 'user.json');

// 下载 Blob 数据（CSV 文件）
const csvContent = 'name,age\n张三,25';
downloadBlob(csvContent, 'users.csv', 'text/csv');

// 下载远程文件
await downloadRemoteFile(
  'https://example.com/image.png',
  'avatar.png',
  'image/png'
);
```

### 6.3 在组件中使用

```javascript
import { reactive } from 'vue';
import { downloadJson, createApi } from '@vtj/utils';

const exportData = createApi('/api/users/export');

const __state = reactive({
  async exportUsers() {
    const res = await exportData();
    downloadJson(res.data, 'users.json');
  }
});
```

---

## 七、日志模块（logger）

### 7.1 核心 API

```javascript
import { logger, getLogger } from '@vtj/utils';

logger.debug(...args); // 调试日志
logger.log(...args); // 普通日志
logger.info(...args); // 信息日志
logger.warn(...args); // 警告日志
logger.error(...args); // 错误日志
```

### 7.2 日志级别

| 级别     | 值  | 说明     |
| -------- | --- | -------- |
| debug    | -1  | 调试信息 |
| log/info | 0   | 普通信息 |
| warn     | 1   | 警告信息 |
| error    | 2   | 错误信息 |

### 7.3 使用示例

```javascript
import { logger, getLogger } from '@vtj/utils';

// 使用默认 logger（bizName: 'VTJ'）
logger.info('页面加载完成');
logger.warn('用户未登录');
logger.error('请求失败', error);

// 创建自定义 logger
const myLogger = getLogger({
  level: 'debug',
  bizName: 'MyApp'
});

myLogger.debug('调试信息');
myLogger.info('[MyApp] 业务日志');

// 日志输出格式：[bizName] message
// 例如：[VTJ] 页面加载完成
```

### 7.4 动态控制日志级别

通过 URL 参数控制日志输出：

```
https://example.com?__logConf__=debug
https://example.com?__logConf__=warn:MyApp
```

格式：`__logConf__=logLevel[:bizName]`

---

## 八、动态脚本加载（loadScript）

### 8.1 核心 API

```javascript
import { loadScript } from '@vtj/utils';

loadScript(src, options?)  // 动态加载外部 JS 脚本
```

### 8.2 配置选项

```javascript
{
  async: boolean,           // 是否异步加载（默认 true）
  attrs: object,            // 自定义属性
  charset: string,          // 字符集（默认 'utf-8'）
  text: string,             // 追加的脚本内容
  type: string,             // 脚本类型（默认 'text/javascript'）
  library: string           // window 上的全局变量名
}
```

### 8.3 使用示例

```javascript
import { loadScript } from '@vtj/utils';

// 加载外部脚本
await loadScript('https://cdn.example.com/chart.js');

// 加载并获取全局变量
const Chart = await loadScript('https://cdn.example.com/chart.js', {
  library: 'Chart'
});

// 加载带自定义属性
await loadScript('https://cdn.example.com/sdk.js', {
  async: true,
  attrs: {
    'data-app-id': '12345'
  }
});
```

---

## 九、JSONP 跨域请求（jsonp）

### 9.1 核心 API

```javascript
import { jsonp } from '@vtj/utils';

jsonp(url, options?)  // 发送 JSONP 请求
```

### 9.2 配置选项

```javascript
{
  query: object,                // 查询参数
  timeout: number,              // 超时时间（毫秒）
  jsonpCallback: string,        // 回调函数名
  jsonpCallbackFunction: string // 回调函数名
}
```

### 9.3 使用示例

```javascript
import { jsonp } from '@vtj/utils';

// 基础 JSONP 请求
const data = await jsonp('https://api.example.com/data');

// 带查询参数
const data = await jsonp('https://api.example.com/data', {
  query: { page: 1, size: 10 }
});

// 带模板字符串的 URL
const data = await jsonp('https://api.example.com/users/${id}', {
  query: { id: 123 }
});
```

---

## 十、客户端环境检测（client）

### 10.1 核心 API

```javascript
import { getClientInfo } from '@vtj/utils';

getClientInfo(); // 获取客户端环境信息
```

### 10.2 返回值

```javascript
{
  os: string,              // 操作系统：Windows/Mac OS/iOS/Android/Linux
  osVersion: string,       // 系统版本
  browser: string,         // 浏览器：Chrome/Safari/Firefox/Edge/Opera/IE
  browserVersion: string,  // 浏览器版本
  isMobile: boolean        // 是否为移动设备
}
```

### 10.3 使用示例

```javascript
import { getClientInfo } from '@vtj/utils';

const info = getClientInfo();

if (info.isMobile) {
  console.log('移动设备:', info.os, info.browser);
} else {
  console.log('桌面设备:', info.os, info.browser);
}
```

---

## 十一、requestAnimationFrame 封装（raf）

### 11.1 核心 API

```javascript
import { rAF, cAF } from '@vtj/utils';

rAF(fn); // 请求动画帧（兼容 SSR）
cAF(handle); // 取消动画帧
```

### 11.2 使用示例

```javascript
import { rAF, cAF } from '@vtj/utils';

let handle;

function animate() {
  // 动画逻辑
  handle = rAF(animate);
}

// 开始动画
handle = rAF(animate);

// 停止动画
cAF(handle);
```

---

## 十二、通用工具函数（util）

### 12.1 核心 API

```javascript
import {
  isClient,
  fileToBase64,
  formDataToJson,
  dataURLtoBlob,
  blobToFile
} from '@vtj/utils';

isClient; // 是否为浏览器环境
fileToBase64(file); // File 转 Base64
formDataToJson(data); // FormData 转 JSON
dataURLtoBlob(dataurl); // Base64 转 Blob
blobToFile(blob, fileName); // Blob 转 File
```

### 12.2 使用示例

```javascript
import { isClient, fileToBase64, formDataToJson } from '@vtj/utils';

// 环境检测
if (isClient) {
  // 浏览器环境代码
  console.log(window.location.href);
}

// File 转 Base64
const base64 = await fileToBase64(file);

// FormData 转 JSON
const json = formDataToJson(formData);
```

---

## 十三、典型工作流程

### 13.1 数据获取与展示

```javascript
import { reactive, onMounted } from 'vue';
import { createApis, storage } from '@vtj/utils';

const __apis = createApis({
  getUserList: '/api/users',
  getUserById: '/api/users/:id'
});

const __state = reactive({
  users: [],
  loading: false
});

onMounted(async () => {
  // 尝试从缓存读取
  const cached = storage.get('userList', { type: 'local' });
  if (cached) {
    __state.users = cached;
    return;
  }

  // 从服务器获取
  __state.loading = true;
  try {
    const res = await __apis.getUserList();
    __state.users = res.data || [];

    // 缓存 5 分钟
    storage.save('userList', __state.users, {
      type: 'local',
      expired: 5 * 60 * 1000
    });
  } finally {
    __state.loading = false;
  }
});
```

### 13.2 文件上传与下载

```javascript
import { reactive } from 'vue';
import { createApi, downloadBlob, fileToBase64 } from '@vtj/utils';

const uploadFile = createApi({
  url: '/api/upload',
  method: 'post',
  settings: { type: 'data' } // multipart/form-data
});

const __state = reactive({
  async handleUpload(file) {
    // File 转 Base64
    const base64 = await fileToBase64(file);

    // 上传文件
    const formData = new FormData();
    formData.append('file', file);
    const res = await uploadFile(formData);

    return res.data;
  },

  async handleExport() {
    const res = await __apis.exportData();
    downloadBlob(res.data, 'export.xlsx', 'application/vnd.ms-excel');
  }
});
```

### 13.3 动态加载第三方库

```javascript
import { reactive, onMounted } from 'vue';
import { loadScript } from '@vtj/utils';

const __state = reactive({
  chartLoaded: false
});

onMounted(async () => {
  try {
    const Chart = await loadScript('https://cdn.example.com/chart.js', {
      library: 'Chart'
    });

    if (Chart) {
      __state.chartLoaded = true;
      // 使用 Chart 库
    }
  } catch (error) {
    logger.error('加载图表库失败', error);
  }
});
```

---

## 十四、注意事项

1. **request 默认返回 `res.data.data`：** 除非设置 `originResponse: true` 才会返回完整的 axios 响应对象
2. **query 与 params 语义区分：** `query` 用于路径参数替换，请求体数据使用 `data` 字段
3. **storage 支持过期机制：** 过期时间单位为毫秒，0 表示永不过期
4. **isClient 用于 SSR 兼容：** 在非浏览器环境中访问 `window` 前先判断 `isClient`
5. **logger 支持动态级别控制：** 通过 URL 参数 `__logConf__` 可以动态调整日志输出
6. **loadScript 返回 Promise：** 加载成功返回 window 上的全局变量（如果指定了 `library`）
7. **download 方法需要浏览器环境：** 依赖 `document.createElement`，SSR 环境下不可用
8. **cookie 基于 js-cookie：** 完整 API 参考 [js-cookie 文档](https://github.com/js-cookie/js-cookie)

---

## 十五、从 @vtj/base 继承的工具

`@vtj/utils` 还从 `@vtj/base` 导出了以下常用工具：

```javascript
import {
  merge, // 深度合并对象
  omit, // 排除对象属性
  debounce, // 防抖函数
  throttle, // 节流函数
  uuid, // 生成唯一 ID
  pathToRegexpCompile, // 路径参数编译
  isUrl, // 判断是否为 URL
  template // 模板字符串编译
} from '@vtj/utils';
```

这些工具在 request、storage、url 等模块内部广泛使用，也可以在业务代码中直接使用。

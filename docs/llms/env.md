# VTJ 环境变量 — AI 配置与使用指南

> 本文档帮助 AI 理解如何通过工具方法配置环境变量，以及在组件中读取环境变量。

---

## 一、数据流全貌

```
设计器 env 面板                   项目数据                       渲染引擎
env/index.vue  ──setEnv()──▶  project.env  ──initEnv()──▶  provider.env
  (表格编辑)                     (EnvConfig[])  (按当前环境平铺)   (Record<string, string>)
                                                                  │
                                                  组件中: __provider.env.VAR_NAME
```

**关键机制：**

1. **双环境值存储：** 每条环境变量同时配置 `development`（开发）和 `production`（生产）两个值
2. **运行时切换：** `initEnv()` 根据当前 `nodeEnv` 自动选取对应的值，平铺为 `{ VAR_NAME: value }` 对象
3. **全局可访问：** `provider.env` 挂载在 Provider 实例上，组件通过 `__provider.env.VAR_NAME` 读取

---

## 二、EnvConfig 数据结构

| 字段          | 类型   | 必填 | 说明                                              |
| ------------- | ------ | ---- | ------------------------------------------------- |
| `name`        | string | ✅   | 变量名，通常大写+下划线，如 `BASE_URL`、`API_KEY` |
| `development` | string | ✅   | 开发环境下的值                                    |
| `production`  | string | ✅   | 生产环境下的值                                    |

**示例数据：**

```json
[
  {
    "name": "BASE_URL",
    "development": "http://localhost:8080",
    "production": "https://api.example.com"
  },
  { "name": "APP_TITLE", "development": "VTJ 开发版", "production": "VTJ" },
  {
    "name": "API_KEY",
    "development": "dev-key-123",
    "production": "prod-key-456"
  }
]
```

运行时（开发环境）`__provider.env` 的实际值：

```javascript
{
  BASE_URL: 'http://localhost:8080',
  APP_TITLE: 'VTJ 开发版',
  API_KEY: 'dev-key-123'
}
```

---

## 三、环境变量工具方法

### `getEnv` — 获取所有环境变量

获取当前项目配置的全部环境变量列表（包含两套值）。

**参数：** 无

**返回：** `EnvConfig[]` 数组，每项包含 `name`、`development`、`production`

---

### `createEnv` — 新增环境变量

新增一条环境变量。如果 `name` 已存在则追加（同名可重复）。

**参数：**

| 参数                 | 类型   | 必填 | 说明                                   |
| -------------------- | ------ | ---- | -------------------------------------- |
| `config.name`        | string | ✅   | 变量名，推荐大写+下划线，如 `BASE_URL` |
| `config.development` | string | ✅   | 开发环境的值                           |
| `config.production`  | string | ✅   | 生产环境的值                           |

**示例：**

```json
{
  "action": "createEnv",
  "parameters": [
    {
      "name": "BASE_URL",
      "development": "http://localhost:8080/api",
      "production": "https://api.example.com"
    }
  ]
}
```

---

### `removeEnv` — 删除环境变量

根据变量名 `name` 删除环境变量。如果存在多个同名变量，同时全部删除。

**参数：**

- `name: string` — 变量名称

**示例：**

```json
{
  "action": "removeEnv",
  "parameters": ["BASE_URL"]
}
```

---

## 四、组件中读取环境变量

### 4.1 在 `<script setup>` 中使用

VTJ 使用 Composition API 模式，环境变量通过 `__provider.env` 全局实例访问：

```javascript
// 读取单个变量
const baseUrl = __provider.env.BASE_URL;

// 带默认值的安全读取
const apiKey = __provider.env.API_KEY || 'default-key';

// 用于 API 请求前缀
const fullUrl = `${__provider.env.BASE_URL}/api/users`;
```

### 4.2 在模板中使用

```html
<template>
  <div>
    <p>应用标题: {{ __provider.env.APP_TITLE }}</p>
    <p>API 地址: {{ __provider.env.BASE_URL }}</p>
  </div>
</template>
```

### 4.3 完整 SFC 示例

```html
<template>
  <div class="page">
    <h1>{{ __provider.env.APP_TITLE || 'VTJ' }}</h1>
    <el-button @click="__state.loadData">加载数据</el-button>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';

  const __state = reactive({
    data: null,
    loading: false,
    async loadData() {
      this.loading = true;
      const res = await __apis['getDashboard']();
      this.data = res.data || null;
      this.loading = false;
    }
  });

  onMounted(() => {
    // 开发环境下打印日志
    if (__provider.env.DEBUG === 'true') {
      console.log('当前 BASE_URL:', __provider.env.BASE_URL);
    }
  });
</script>
```

---

## 五、典型使用场景

### 5.1 API 基础地址

```json
{
  "action": "createEnv",
  "parameters": [
    {
      "name": "API_BASE_URL",
      "development": "http://localhost:3000/api",
      "production": "https://api.myapp.com"
    }
  ]
}
```

组件中使用环境变量拼接 API URL：

```javascript
// 注意：API 的 url 字段可直接使用相对路径 /api/users，
// 实际请求地址由全局 axios 的 baseURL 决定。
// 环境变量更适用于非请求场景的地址引用。
const uploadUrl = `${__provider.env.API_BASE_URL}/upload`;
```

### 5.2 功能开关

```json
{
  "action": "createEnv",
  "parameters": [
    {
      "name": "ENABLE_DEBUG_PANEL",
      "development": "true",
      "production": "false"
    }
  ]
}
```

组件中：

```html
<debug-panel v-if="__provider.env.ENABLE_DEBUG_PANEL === 'true'" />
```

### 5.3 第三方 Key / 配置

```json
{
  "action": "createEnv",
  "parameters": [
    {
      "name": "MAP_KEY",
      "development": "dev-abc123",
      "production": "prod-xyz789"
    }
  ]
}
```

---

## 六、注意事项

1. **值类型为字符串：** `EnvConfig` 的 `development` 和 `production` 字段类型均为 `string`，布尔值需使用 `'true'` / `'false'` 字符串
2. **同名不覆盖：** `createEnv` 不检查同名变量是否已存在，直接追加。如需更新，建议先 `removeEnv` 再 `createEnv`
3. **运行时自动选取：** `initEnv()` 根据 `provider.nodeEnv`（`development` 或 `production`）自动选择对应值，无需手动判断环境
4. **变量名约定：** 推荐使用大写字母 + 下划线命名（`UPPER_SNAKE_CASE`），如 `BASE_URL`、`APP_TITLE`
5. **脚本层访问：** 环境变量通过 `__provider.env` 实例属性访问，不是 `$provider.env` 或 `this.$provider.env`
6. **不在 `__state` 中存储：** 环境变量是全局只读配置，不要将 `__provider.env` 的值复制到 `__state` 中，直接在需要的地方读取即可
7. **不需要手动 import：** `__provider` 由框架在组件模板中通过 `useProvider()` 自动声明，组件内直接使用

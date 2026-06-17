# VTJ UniApp 全局配置 — AI 配置指南

> 本文档帮助 AI 理解 UniApp 平台的全局配置项，以及如何通过工具方法进行配置。

---

## 一、配置数据流

```
设计器 UniApp 配置面板             项目数据                      渲染引擎
uni-config/index.vue            project.uniConfig              uni/setup/app.ts
  ├── manifest.json ──┐         ┌── manifestJson ──→ injectUniConfig() → window.__uniConfig
  ├── pages.json ─────┤ setUni  │── pagesJson    ──→ injectUniRoutes() → window.__uniRoutes
  ├── CSS ────────────┤ Config  │── css          ──→ injectUniCSS()   → adoptedStyleSheets
  └── 生命周期 ───────┘         └── onXxx        ──→ createUniAppComponent() → App 组件方法

仅 UniApp 平台有效：
  项目 platform === 'uniapp' 时，配置才会在运行时生效
```

---

## 二、UniConfig 完整字段

```typescript
interface UniConfig {
  manifestJson?: Record<string, any>; // manifest.json 应用配置（JSON 对象）
  pagesJson?: Record<string, any>; // pages.json 页面配置（JSON 对象）
  css?: string; // 全局 CSS 样式字符串

  // ---- 应用生命周期函数 ----
  onLaunch?: JSFunction; // 初始化完成时触发（全局只触发一次）
  onShow?: JSFunction; // 启动或从后台进入前台时触发
  onHide?: JSFunction; // 从前台进入后台时触发
  onError?: JSFunction; // 报错时触发
  onPageNotFound?: JSFunction; // 页面不存在监听
  onUnhandledRejection?: JSFunction; // 未处理的 Promise 拒绝监听（2.8.1+）
  onUniNViewMessage?: JSFunction; // nvue 页面数据通信监听
  onThemeChange?: JSFunction; // 系统主题变化监听
  onLastPageBackPress?: JSFunction; // 最后一个页面按 Android back 键
  onExit?: JSFunction; // 应用退出监听
}
```

---

## 三、配置工具方法

### 3.1 `setUniConfig` — 设置 UniApp 配置

**参数：**

| 参数    | 类型   | 必填 | 说明                                     |
| ------- | ------ | ---- | ---------------------------------------- |
| `key`   | string | ✅   | 配置类型名，必须从枚举值中取（详见下方） |
| `value` | string | ✅   | 配置内容，格式取决于 key                 |

**`key` 可选枚举值（共 13 项）：**

| key                    | value 格式        | 说明                   |
| ---------------------- | ----------------- | ---------------------- |
| `manifestJson`         | JSON 字符串       | manifest.json 应用配置 |
| `pagesJson`            | JSON 字符串       | pages.json 页面配置    |
| `css`                  | CSS 代码字符串    | 全局样式               |
| `onLaunch`             | JS 函数代码字符串 | 应用初始化完成         |
| `onShow`               | JS 函数代码字符串 | 应用进入前台           |
| `onHide`               | JS 函数代码字符串 | 应用进入后台           |
| `onError`              | JS 函数代码字符串 | 应用报错               |
| `onLastPageBackPress`  | JS 函数代码字符串 | 最后一个页面返回事件    |
| `onPageNotFound`       | JS 函数代码字符串 | 页面不存在             |
| `onUnhandledRejection` | JS 函数代码字符串 | 未处理 Promise 拒绝    |
| `onThemeChange`        | JS 函数代码字符串 | 主题变化               |
| `onUniNViewMessage`    | JS 函数代码字符串 | nvue 数据通信          |
| `onExit`               | JS 函数代码字符串 | 应用退出               |

**value 格式规则：**

- `manifestJson` / `pagesJson`：JSON 字符串，如 `'{"appid":"xxx","name":"MyApp"}'`
- `css`：CSS 代码字符串，如 `'body { background: #f5f5f5; }'`
- 生命周期：JS 函数代码块，默认模板 `() => { }`
- 传 `null`：清除该配置项

**示例：**

```json
// 配置 manifest.json
{
  "action": "setUniConfig",
  "parameters": [
    "manifestJson",
    "{\"appid\":\"__UNI__123456\",\"name\":\"我的应用\",\"versionName\":\"1.0.0\"}"
  ]
}

// 配置 pages.json（含 tabBar）
{
  "action": "setUniConfig",
  "parameters": [
    "pagesJson",
    "{\"globalStyle\":{\"navigationBarTitleText\":\"首页\"},\"tabBar\":{\"list\":[{\"pagePath\":\"/\",\"text\":\"首页\"}]}}"
  ]
}

// 配置全局 CSS
{
  "action": "setUniConfig",
  "parameters": [
    "css",
    "body { margin: 0; padding: 0; font-family: sans-serif; }"
  ]
}

// 配置 onLaunch 生命周期
{
  "action": "setUniConfig",
  "parameters": [
    "onLaunch",
    "() => {\n  console.log('App 启动', uni.getLaunchOptionsSync())\n}"
  ]
}
```

### 3.2 `getUniConfig` — 获取 UniApp 配置

**参数：** `key: string` — 配置类型名（枚举值同 `setUniConfig`）

**返回：**

- `manifestJson` / `pagesJson`：格式化的 JSON 字符串
- `css`：CSS 字符串
- 生命周期：函数代码字符串

---

## 四、配置详解

### 4.1 `manifestJson` — 应用配置

对应 uni-app 的 `manifest.json`。运行时被解析后注入到 `window.__uniConfig`。

**关键字段参考：**

| 字段             | 说明                                    |
| ---------------- | --------------------------------------- |
| `appid`          | 应用 ID                                 |
| `name`           | 应用名称                                |
| `versionName`    | 版本名称                                |
| `versionCode`    | 版本号                                  |
| `h5.router`      | H5 路由配置（mode、base）               |
| `h5.async`       | 异步组件配置（loading、error、timeout） |
| `networkTimeout` | 网络超时配置                            |
| `h5`             | 其他 H5 平台相关配置                    |

### 4.2 `pagesJson` — 页面配置

对应 uni-app 的 `pages.json`。影响全局样式、tabBar、easycom 等。

**关键字段参考：**

| 字段          | 说明                                      |
| ------------- | ----------------------------------------- |
| `globalStyle` | 全局页面样式（navigationBarTitleText 等） |
| `tabBar`      | 底部 tabBar 配置（list、color 等）        |
| `easycom`     | 自动导入组件配置                          |

**注意：** `pagesJson` 中的 `pages` 字段**不需要手动配置**，VTJ 会根据 `project.pages` 自动生成路由。

### 4.3 `css` — 全局样式

注入为全局 CSS（通过 adoptedStyleSheets），影响所有页面。适用于定义全局字体、重置样式、CSS 变量等。

### 4.4 应用生命周期

对应 uni-app 的 `App.vue` 组件方法。配置的函数将在应用级别的对应生命周期触发。

| 生命周期               | 触发时机               | 参数说明            |
| ---------------------- | ---------------------- | ------------------- |
| `onLaunch`             | 初始化完成（全局一次） | launchOptions       |
| `onShow`               | 启动 / 后台进入前台    | launchOptions       |
| `onHide`               | 前台进入后台           | 无                  |
| `onError`              | 报错时                 | error               |
| `onPageNotFound`       | 页面路由不存在         | { path, query }     |
| `onUnhandledRejection` | 未处理 Promise 拒绝    | { reason, promise } |
| `onThemeChange`        | 系统主题变化           | { theme }           |
| `onUniNViewMessage`    | nvue 数据通讯          | data                |
| `onExit`               | 应用退出               | 无                  |

**生命周期函数示例：**

```javascript
// onShow — 监听应用进入前台
() => {
  const options = uni.getLaunchOptionsSync();
  console.log('App Show', options);
  // 检查登录状态
  // const token = uni.getStorageSync('token')
  // if (!token) uni.reLaunch({ url: '/pages/login' })
};

// onError — 全局错误捕获
() => {
  console.error('应用错误:', arguments);
  // 上报错误到监控平台
};
```

---

## 五、运行时处理流程

```
setupUniApp(opts)
  ├── injectUniFeatures(opts, window)      → 注入 UniApp 特性
  ├── injectUniConfig(opts, window)        → 解析 manifest.json → window.__uniConfig
  ├── injectUniGlobal(UniH5, window)       → 注入 UniApp 全局 API
  ├── injectUniRoutes(Vue, UniH5, ...)     → 根据 pages + pagesJson 生成路由
  ├── injectUniCSS(appid, css, window)     → 注入全局 CSS
  ├── Vue.createApp(setupApp(App))         → 创建 App 实例
  ├── app.use(install, UniH5)              → 安装 UniApp 插件
  └── app.use(plugin)                      → 安装 H5 插件
```

---

## 六、注意事项

1. **仅 UniApp 平台有效：** 只有 `project.platform === 'uniapp'` 时，这些配置才会被加载和执行
2. **`pagesJson` 不配置 pages 字段：** VTJ 根据项目页面树自动生成路由，`pagesJson` 中只需配置 `globalStyle`、`tabBar` 等全局项
3. **manifestJson 影响运行时行为：** 如 `h5.router.mode` 决定路由模式（hash/history），`networkTimeout` 决定请求超时
4. **生命周期函数格式：** 必须是箭头函数或普通函数代码字符串，框架通过 `new Function()` 动态解析
5. **配置为 null 即清除：** 传 `value: null` 可清除对应配置项
6. **CSS 为全局注入：** 通过 adoptedStyleSheets 注入，不要在其中定义页面特定的样式
7. **manifestJson / pagesJson 需完整 JSON：** 每次设置会覆盖对应字段的全部内容，如需部分修改，应先 `getUniConfig` 读取再合并设置
8. **tabBar 来自 pagesJson：** tabBar 配置在 `pagesJson.tabBar` 中，各页面的 `style` 会与路由合并

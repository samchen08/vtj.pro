# 项目集成指南

通过脚手架可以快速创建新项目，但对于已有项目，本章将详细介绍如何集成VTJ低代码设计器。

## 前提条件

:::warning 项目技术要求
前端工程必须是基于 **Vite + TypeScript** 的 **Vue3** 项目
:::

目前暂不支持以下项目类型：

- Vue2 项目
- 使用 Webpack 构建的项目
- 非 TypeScript 项目

## 集成步骤

现有项目需按以下步骤集成VTJ低代码能力：

### 一、添加依赖包

在项目中安装必要的依赖包：

1. 将以下包添加到 `devDependencies`：

```sh
npm install @vtj/cli @vtj/pro --save-dev
```

2. 将核心包添加到 `dependencies`：

```sh
npm install @vtj/web --save
```

### 二、配置Vite插件

在项目根目录的 `vite.config.ts` 文件中引入VTJ开发工具插件：

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 导入VTJ开发工具
import { createDevTools } from '@vtj/pro/vite';

export default defineConfig({
  plugins: [
    vue(),
    // 添加VTJ开发工具插件
    createDevTools()
  ]
});
```

:::tip 插件作用
此插件提供：

- 实时设计器预览
- 热重载支持
- 低代码组件编译
  :::

### 三、改造应用入口

需要对项目入口文件 `main.ts` 进行改造，以支持低代码生成的组件：

```js
import { createApp } from 'vue';
// 1. 引入VTJ核心功能
import {
  createProvider,
  LocalService,
  createModules,
  NodeEnv
} from '@vtj/web';

// 2. 引入组件库样式
import '@vtj/web/src/index.scss';

import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// 3. 实例化低代码服务
// 注意：LocalService仅适用于开发环境
// 生产环境需实现RemoteService接口
const service = new LocalService();

// 4. 创建VTJ提供者实例
const { provider, onReady } = createProvider({
  // 设置运行环境
  nodeEnv: process.env.NODE_ENV as NodeEnv,

  // 注册应用模块
  modules: createModules(),

  // 注入服务实例
  service,

  // 注入路由实例
  router
});

// 5. 初始化完成后挂载应用
onReady(async () => {
  app.use(router);
  app.use(provider);
  app.mount('#app');
});
```

关键改造点说明：

1. **核心功能导入**：从 `@vtj/web` 引入必要的功能模块
2. **样式引入**：确保加载组件库样式
3. **服务实例化**：
   - `LocalService`：开发环境使用本地服务
   - 生产环境需实现远程服务接口
4. **提供者创建**：配置运行环境和依赖模块
5. **异步初始化**：确保所有依赖就绪后再挂载应用

### 四、添加异步支持

由于低代码组件采用异步加载，需在 `App.vue` 中添加 `<Suspense>` 组件：

```html
<template>
  <!-- 添加异步加载边界 -->
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<script lang="ts" setup>
  import { Suspense } from 'vue';
</script>
```

:::warning 为什么需要Suspense？
VTJ生成的组件是异步加载的，`<Suspense>` 提供：

- 加载状态处理
- 错误边界捕获
- 异步组件生命周期管理
  :::

### 五、配置TypeScript

在 `tsconfig.json` 中排除 `.vtj` 目录的检查：

```json
{
  "exclude": [".vtj"]
}
```

:::info 排除原因
`.vtj` 目录包含：

- 运行时生成的临时文件
- 设计器元数据
- 低代码编译中间产物
  :::

## 进阶配置

### 二级目录部署

当项目配置了 `base` 路径时，需同步设置 `staticBase`：

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createDevTools } from '@vtj/pro/vite';

// 设置基础路径
const base = '/sub/';

export default defineConfig({
  base,
  plugins: [
    vue(),
    createDevTools({
      // 同步设置静态资源基础路径
      staticBase: base
    })
  ]
});
```

### History路由模式适配

使用 `createWebHistory` 路由模式时，需设置物料路径：

```js
const { provider, onReady } = createProvider({
  // 关键：设置物料基础路径
  materialPath: '/',

  nodeEnv: process.env.NODE_ENV as NodeEnv,
  modules: createModules(),
  service,
  router
});
```

:::warning 物料路径说明
内置物料存储在：

```
/node_modules/@vtj/materials/dist/
```

`materialPath` 确保正确加载这些资源
:::

## 设计器使用指南

项目启动后，可在页面右下角激活设计器：

![设计器入口](../assets/vite-app.png)

### 设计器功能

1. **页面编辑**：实时修改当前页面
2. **组件拖拽**：从物料库添加组件
3. **属性配置**：可视化调整组件属性
4. **代码生成**：导出Vue单文件组件

### 生产环境部署

1. 实现 `RemoteService` 接口替代 `LocalService`
2. 部署物料资源到CDN
3. 配置API端点获取设计数据

:::warning 安全提示
生产环境务必移除 `createDevTools()` 插件
:::

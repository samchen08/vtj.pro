# 集成指南

本文档介绍如何将 VTJ 组件和工具集成到现有的 Vue.js 项目和开发工作流程中。它解释了嵌入 VTJ 的低代码功能的不同集成方法、服务配置、身份验证设置和特定于平台的注意事项。

有关从头开始进行项目设置的信息，请参阅 **项目设置和基架** 。有关集成过程中的 AI 增强功能，请参阅 **AI 集成** 。

## 集成方法

VTJ 提供两种主要的集成模式：用于在生产应用程序中呈现低代码内容的**运行时集成** ，以及用于将可视化设计器嵌入到开发工具中的**设计时集成** 。

### 运行时集成架构

![](../svg/18/1.png)

**运行时集成**允许现有的 Vue 应用程序渲染使用 VTJ 的低代码设计器创建的页面和组件。该集成使用 `createProvider（）` 建立运行时上下文，并使用 `@vtj/renderer` 来显示低代码内容。

### 设计时集成体系结构

![](../svg/18/2.png)

**设计时集**成将 VTJ 可视化设计器嵌入到开发环境中，允许开发人员在其现有开发工作流程中创建和编辑低代码内容。

## Service Layer 集成

服务层提供 VTJ 组件和后端系统之间的接口。VTJ 包括多个可以扩展或替换的服务实现。

### 基本服务配置

![](../svg/18/3.png)

`BaseService` 类为所有服务实现提供了基础。要与现有后端集成，请执行以下作：

| 服务方法       | 目的           | 需要实施                |
| -------------- | -------------- | ----------------------- |
| getExtension() | 加载平台配置   | 返回 VTJConfig 对象     |
| init()         | 初始化项目数据 | 从存储加载项目架构      |
| saveProject()  | 保留项目更改   | 保存到您的后端/文件系统 |
| publishFile()  | 生成产品代码   | 部署生成的 Vue 文件     |

### 自定义服务实施

要与现有后端集成，请扩展 `BaseService`：

```ts
// Example custom service integration
export class MyBackendService extends BaseService {
  async init(project: ProjectSchema): Promise<ProjectSchema> {
    // Load project from your database
    return await this.api('myBackend/projects', project);
  }

  async saveProject(project: ProjectSchema): Promise<boolean> {
    // Save to your storage system
    return await this.api('myBackend/save', project);
  }
}
```

该服务通过 `packages/local/src/shared.ts`中定义的标准化 API 格式进行通信

## Provider 和 Adapter 配置

提供者/适配器模式允许 VTJ 与不同的 Vue 应用程序架构和 UI 框架集成。

### 提供商设置流程

![](../svg/18/4.png)

### 适配器配置

适配器系统将 VTJ 与现有的 UI 组件和实用程序连接起来：

| Adapter 属性 | 目的            | 示例实现                    |
| ------------ | --------------- | --------------------------- |
| request      | HTTP 客户端集成 | Axios，fetch 包装器         |
| loading      | 加载指示器      | Element 加 ElLoading        |
| notify       | 通知系统        | Element Plus ElNotification |
| useTitle     | 页面标题管理    | Vue 使用 useTitle           |
| access       | 认证系统        | 自定义访问类                |

```ts
const adapter = createAdapter({
  loading: () => ElLoading.service(),
  notify: (msg: string) => ElNotification.error(msg),
  useTitle,
  alert: (msg: string) => ElMessageBox.alert(msg),
  access: {
    authKey: 'Authorization',
    storageKey: 'MY_APP_ACCESS'
  }
});
```

## 访问控制集成

VTJ 包括一个与现有身份验证机制集成的综合访问控制系统。

### 访问控制架构

![](../svg/18/4.png)

### 访问配置

`Access` 类提供了身份验证和授权功能：

| 配置         | 目的                 | 默认值           |
| ------------ | -------------------- | ---------------- |
| authKey      | 授权标头名称         | '授权'           |
| storageKey   | 本地存储密钥         | “ACCESS_STORAGE” |
| session      | 基于会话的身份验证   | 假               |
| whiteList    | 未进行身份验证的路由 | 定义             |
| unauthorized | 未经授权的重定向     | 定义             |

```ts
const access = createAccess({
  authKey: 'Bearer',
  storageKey: 'MY_APP_TOKEN',
  session: true,
  auth: '/login',
  unauthorized: '/403',
  alert: (msg) => ElMessage.error(msg)
});
```

### 权限集成

VTJ 支持对页面和组件进行基于角色的访问控制：

```ts
// Check permissions in components
const access = useAccess();
const canEdit = access?.can('page.edit');
const canPublish = access?.some(['admin', 'publisher']);

// Route-level permissions
router.beforeEach((to, from, next) => {
  if (access?.can(to.params.id)) {
    next();
  } else {
    next('/unauthorized');
  }
});
```

## 特定于平台的集成

VTJ 支持具有特定集成要求的多个部署平台。

### 平台集成矩阵

| 平台      | 包           | 主要特点          | 集成说明              |
| --------- | ------------ | ----------------- | --------------------- |
| Web       | @vtj/web     | 桌面应用程序      | 标准 Vue.js 集成      |
| 移动式 H5 | @vtj/h5      | 移动 Web 应用程序 | 触摸优化组件          |
| UniApp    | @vtj/uni-app | 跨平台应用程序    | 小程序兼容性          |
| 专业版    | @vtj/pro     | 企业功能          | Designer + 运行时组合 |

### Web 平台集成

```ts
import { createApp } from 'vue';
import VTJWeb from '@vtj/web';
import { createProvider } from '@vtj/renderer';

const app = createApp(App);
app.use(VTJWeb);

const provider = createProvider({
  mode: ContextMode.Runtime,
  service: new MyService(),
  adapter: createAdapter(adapterOptions)
});

app.use(provider);
```

### Uni-App 平台集成

对于跨平台应用，VTJ 提供了专门的 Uni-App 集成：

```ts
import VTJUni from '@vtj/uni-app';
import { createProvider } from '@vtj/renderer';

// Uni-App specific configuration
const provider = createProvider({
  mode: ContextMode.Runtime,
  service: new UniService(),
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router')
  }
});
```

## 材料和组件集成

VTJ 的材质系统允许集成现有组件库和自定义组件。

### 物料集成流程

![](../svg/18/6.png)

### 材质配置

材质描述定义了组件在 Designer 中的显示方式以及它们的呈现方式：

```ts
// Example material integration
const materials = new Map([
  [
    'MyButton',
    {
      title: 'Custom Button',
      component: 'MyButton',
      props: {
        type: { type: 'String', default: 'primary' },
        size: { type: 'String', default: 'default' }
      },
      slots: ['default'],
      events: ['click']
    }
  ]
]);

await service.saveMaterials(project, materials);
```

### 元件库集成

VTJ 为流行的组件库提供预构建的材质集：

| 库           | 构建目标                  | 包含的组件       |
| ------------ | ------------------------- | ---------------- |
| Element Plus | BUILD_TYPE=element        | 表单、表格、导航 |
| Ant Design   | 视图 BUILD_TYPE=antdv     | 企业组件         |
| Vant         | BUILD_TYPE=vant           | 移动组件         |
| Uni-UI       | 用户界面 BUILD_TYPE=uniUI | 跨平台组件       |

## 配置示例

### 完整的集成示例

```ts
// main.ts - Complete VTJ integration
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createProvider, ContextMode } from '@vtj/renderer';
import { createAdapter, createAccess } from '@vtj/pro';
import MyCustomService from './services/MyCustomService';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/page/:id', component: VTJPage, name: 'page' }]
});

// Configure VTJ integration
const service = new MyCustomService();
const access = createAccess({
  authKey: 'Authorization',
  auth: '/login',
  unauthorized: '/403'
});

const adapter = createAdapter({
  loading: () => ElLoading.service(),
  notify: (msg) => ElNotification.error(msg),
  access: { session: true }
});

const provider = createProvider({
  mode: ContextMode.Runtime,
  service,
  adapter,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router')
  }
});

app.use(router);
app.use(provider);
app.mount('#app');
```

:::info 提示
内容由AI翻译，可能会出现错漏或过时信息，请查阅原文：https://deepwiki.com/ChenXiaohui99/vtj/6.2-integration-guide
:::

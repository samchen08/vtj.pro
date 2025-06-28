# Provider 核心提供者

Provider 是应用的核心提供者，负责管理整个应用的配置、状态、依赖加载和资源管理。它提供统一的接口来访问项目配置、API服务、路由系统以及动态组件渲染能力。

## 核心功能

### 1. 项目配置管理

- 加载项目配置（`load()`方法）
- 管理项目状态（`project`属性）
- 提供项目文件访问（`getFile()`, `getPage()`等方法）

### 2. 依赖和资源加载

- 动态加载JS/CSS依赖（`loadDependencies()`）
- 管理物料资源（`materials`属性）
- 全局变量管理（`globals`属性）

### 3. 路由管理

- 自动初始化路由系统（`initRouter()`）
- 动态添加页面路由
- 管理首页路由

### 4. Vue插件集成

- 自动安装所有第三方Vue插件
- 提供全局错误处理（设计模式下）
- 支持自定义增强函数（`enhance`选项）

### 5. DSL渲染

- 创建DSL渲染器（`createDslRenderer()`）
- 获取可渲染组件（`getRenderComponent()`）
- 支持基于URL的异步组件（`defineUrlSchemaComponent()`）

### 6. API服务

- 自动创建API接口（`createSchemaApis()`）
- 支持API Mock（`createMock()`）
- 统一请求适配器（`adapter`属性）

## 基本使用方法

### 创建Provider实例

```typescript
import { createProvider } from '@vtj/renderer';

const { provider, onReady } = createProvider({
  service: myService, // 核心服务
  mode: ContextMode.Design, // 运行模式
  router: myRouter // Vue路由实例
  // 其他配置...
});

onReady(() => {
  console.log('Provider已就绪');
});
```

### 在Vue应用中安装

```typescript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
provider.install(app);
app.mount('#app');
```

### 在组件中使用

```typescript
import { useProvider } from '@vtj/renderer';

export default {
  setup() {
    const provider = useProvider();

    // 获取当前项目
    console.log(provider.project);

    // 调用API
    provider.apis.getUserInfo().then((data) => {
      console.log(data);
    });

    return { provider };
  }
};
```

## 高级用法

### 动态渲染组件

```typescript
// 获取页面组件
const pageComponent = await provider.getRenderComponent('page-id', (file) => {
  console.log('找到页面文件:', file);
});

// 使用动态组件
<component :is="pageComponent" />
```

### 创建自定义DSL渲染器

```typescript
const dslRenderer = provider.createDslRenderer(myDsl, {
  // 自定义渲染选项
  mode: ContextMode.Preview,
  components: myCustomComponents
});

// 渲染DSL
const app = createApp(dslRenderer.renderer);
app.mount('#app');
```

### 定义基于URL的异步组件

```typescript
const RemoteComponent = provider.defineUrlSchemaComponent(
  'https://example.com/component.dsl.json',
  'RemoteComponent'
);

// 在模板中使用
<RemoteComponent />
```

## API参考

### Provider 属性

| 属性           | 类型                                 | 说明                           |
| -------------- | ------------------------------------ | ------------------------------ |
| `mode`         | `ContextMode`                        | 当前运行模式（设计/源码/预览） |
| `globals`      | `Record<string, any>`                | 全局变量                       |
| `adapter`      | `ProvideAdapter`                     | 适配器接口                     |
| `apis`         | `Record<string, Function>`           | API接口集合                    |
| `dependencies` | `Record<string, () => Promise<any>>` | 依赖加载器                     |
| `service`      | `Service`                            | 核心服务                       |
| `project`      | `ProjectSchema`                      | 当前项目配置                   |
| `components`   | `Record<string, any>`                | 组件集合                       |

### Provider 方法

| 方法                                           | 说明                   |
| ---------------------------------------------- | ---------------------- |
| `load(project: ProjectSchema)`                 | 加载项目配置           |
| `createMock(func: Function)`                   | 创建Mock函数           |
| `install(app: App)`                            | 安装到Vue应用          |
| `getFile(id: string)`                          | 获取文件（页面或区块） |
| `getPage(id: string)`                          | 获取页面文件           |
| `getDsl(id: string)`                           | 获取区块DSL            |
| `createDslRenderer(dsl: BlockSchema, opts?)`   | 创建DSL渲染器          |
| `getRenderComponent(id: string, output?)`      | 获取可渲染组件         |
| `defineUrlSchemaComponent(url: string, name?)` | 定义基于URL的异步组件  |

## 注意事项

1. Provider需要在Vue应用初始化之前创建
2. 设计模式下会自动设置错误处理器
3. 使用`onReady`回调确保Provider完全初始化
4. 物料加载在生产环境和开发环境有不同行为

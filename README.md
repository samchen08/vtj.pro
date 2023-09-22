# VTJ

VTJ 一款基于 Vue3 + Typescript 的低代码开发工具，内置了设计器引擎、渲染器和代码生成器。

## 演示

[http://newgateway.gitee.io/vtj](http://newgateway.gitee.io/vtj)

## VTJ 的特点

- 面向前端开发者，不改变前端开发流程和编码习惯，会 Vue 就会用，无学习成本。
- 内置代码引擎，采用配置化构建，所有部件都支持自定义，可单独使用引擎实现属于你自己的低代码平台，对标 Low-Code Engine。
- IDE 提供本地离线服务，安全易接入，采用设计器和渲染器分离，不污染项目代码。
- 内置丰富组件提供支持，可定制可复用区块组件。

![输入图片说明](dev/public/preview.png)

## 开发环境要求

VTJ 使用了最新的 Vue3 生态技术栈，要求 Node 版本必须是 v18+， 建议使用 nvm 切换 Node 版本。

## 快速体验

VTJ 提供了项目脚手架，可快速创建新项目。 命令：

```sh
npm create vtj -- -t web
```

## 安装到现有项目

1. 安装依赖 `@vtj/cli` `@vtj/serve` `@vtj/ide` `@vtj/runtime`

```sh
npm i @vtj/cli @vtj/serve @vtj/ide -D
```

```sh
npm i @vtj/runtime -S
```

2. 改造 `main.ts`

在项目入口文件，在合适的地方增加以下代码， 以下代码仅是示例，实际需要按您的项目情况做调整。

```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@vtj/runtime';
import Mask from '@/components/Mask.vue';
import '@vtj/icons/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';

const app = createApp(App);

(async () => {
  await createProvider({
    app,
    router,
    components: {
      Mask
    }
  });
  app.use(router);
  app.mount('#app');
})();
```

3.  项目工程配置`vite.config.ts`引用 IDE Vite 插件

```ts
import { defineConfig } from 'vite';
import { IDEPlugin } from '@vtj/serve';

export default defineConfig({
  plugins: [IDEPlugin()]
});
```

## ProviderOptions 配置

实例化 Provider 的参数可以在 `main.ts` 或 `package.json` 中配置，配置项：

```ts
export interface ProjectProvider {
  // 项目id
  id: string;
  // 项目名称
  name: string;
  // 路由模式
  mode: 'hash' | 'history';
  // 路由前缀路径
  base: string;
  // 页面路由前缀路径
  page: string;
  // 区块预览路由前缀路径
  preview: string;
  // 首页路由
  home: string;
}

export interface IDEProvider extends Record<string, any> {
  // IDE 路径
  path?: string;
  // 链接按钮文本
  text?: string;
}

export interface ProviderBuiltinComponents {
  // 框架母版组件
  Mask?: any;

  // 404页面组件
  Empty?: any;

  // 启动页组件
  Startup?: any;

  // Ide入口组件
  IDELink?: any;
}

export interface ProviderOptions {
  //服务类型
  service: ServiceType;

  // 项目配置
  project: Partial<ProjectProvider>;

  // Vue应用
  app: App;

  // 路由实例
  router: Router;

  // 文件模块
  modules?: Record<string, () => Promise<any>>;

  // IDE 配置
  ide?: null | IDEProvider;

  // 显示启动页
  startup?: boolean;

  // 内置组件
  components?: ProviderBuiltinComponents;

  // 生成源码模式
  raw?: boolean;
}
```

## 交流群

![输入图片说明](dev/public/ding.jpg)

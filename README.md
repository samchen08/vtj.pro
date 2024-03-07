# VTJ.PRO

VTJ 一款基于 Vue3 + Typescript 的低代码开发工具，内置了设计器引擎、渲染器和代码生成器。

![VTJ.PRO](dev/public/startup.png)

## 演示

- [http://vtj.pro](http://vtj.pro)

- [http://newgateway.gitee.io/vtj](http://newgateway.gitee.io/vtj)

## VTJ 的特点

- 面向前端开发者，不改变前端开发流程和编码习惯，会 Vue 就会用，无学习成本。
- 内置代码引擎，采用配置化构建，所有部件都支持自定义，可单独使用引擎实现属于你自己的低代码平台，对标 Low-Code Engine。
- 开发环境提供本地离线服务，安全易接入，采用设计器和渲染器分离，不污染项目代码。
- 内置丰富组件提供支持，可定制可复用区块组件。

![输入图片说明](dev/public/preview.png)

## 开发环境要求

VTJ 使用了最新的 Vue3 生态技术栈，要求 Node 版本必须是 v20+， 建议使用 nvm 切换 Node 版本。
开发项目工程采用`lerna` 和 `pnpm` 包管理工具，需要全局安装。

```sh
npm install -g lerna@latest pnpm@latest --registry=https://registry.npmmirror.com
```

## 快速体验

使用或体验VTJ低代码功能是不需要拉源码的。VTJ 提供了项目脚手架，可快速创建新项目。 命令：

```sh
npm create vtj@latest -- -t app
```

## 贡献指南

如果需要二开或贡献代码，可以拉取仓库master分支。

### 快速开始

```sh
git clone https://gitee.com/newgateway/vtj.git
cd vtj
npm run setup && npm run build && npm run app:dev
```

首次启动需要执行初始化：`npm run setup && npm run build`
重启开发环境：`npm run app:dev`
清理项目：`npm run clean` 清理后需要重新执行初始化

### 模块说明

- `packages` 子模块
  - `base` 基础工具库，适配 Node 和 浏览器环境
  - `node` Node环境基础工具库
  - `cli` 项目工程脚手架及命令行工具
  - `utils` 浏览器环境工具库
  - `icons` 图标库
  - `ui` 通用组件库
  - `core` 低代码核心库，包含协议定义和模型
  - `renderer` 低代码Vue渲染器
  - `materials` 低代码物料库
  - `coder` 代码生成器
  - `local` 低代码本地开发环境辅助工具
  - `designer` 低代码设计器
- `platforms` 平台整合依赖包
  - `desktop` 桌面平台
  - `pro` 低代码开发平台
  - `server` 服务器端
  - `mobile` 移动端
  - `web` Web端
- `apps` 应用项目模板
  - `electron` 桌面跨端项目
  - `libaray` 类库项目
  - `uniapp` 移动跨端项目
  - `nest` 服务端项目
  - `app` PC端项目
- `create-vtj` 项目搭建工具
- `docs` 文档
- `dev` 开发工程
- `lcdp` 在线演示项目

### Todo

- `@vtj/designer` 低代码设计器
  - 样式设置器 `StyleSetter`
  - 数据设计器 `DataSetter`
- `@vtj/ui` 组件库
  - 富文本编辑器
  - 文件上传
  - 表格

## 交流群

![输入图片说明](dev/public/1709807457504.png)

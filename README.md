<div align="center"> <a href="https://gitee.com/newgateway/vtj"> <img width="100" src="./platforms/pro/public/logo.svg"> </a> <br> <br>

[![star](https://gitee.com/newgateway/vtj/badge/star.svg?theme=gvp)](https://gitee.com/newgateway/vtj)
[![npm version](https://img.shields.io/npm/v/@vtj/pro.svg?style=flat-square)](https://www.npmjs.com/package/@vtj/pro)
[![npm downloads](https://img.shields.io/npm/dt/@vtj/pro.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@vtj/pro)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

</div>

# VTJ.PRO

VTJ 是一款基于 Vue3 + Typescript 的低代码页面可视化设计器。内置低代码引擎、渲染器和代码生成器，面向前端开发者，开箱即用。 无缝嵌入本地开发工程，不改变前端开发流程和编码习惯。

- **官方文档**：[https://vtj.pro](https://vtj.pro)
- **在线应用开发平台**：[https://lcdp.vtj.pro](https://lcdp.vtj.pro)

## 特性

- 🔥 **流行的技术栈**： Vue3、Typescript、Vite、EelementPlus、VueUse、Axios、ECharts、Lodash、Monaco Editor、Prettier 等。

- 🛠️ **自由个性化**： 低代码设计器支持源码级别的自定义，可轻松适配个性化需求，理论上写代码开发能实现的在设计器上都能完成。

- 🚩 **低学习成本**： 专为前端开发者设计，无需改变您熟悉的前端开发流程和编码习惯。只需了解Vue，即可轻松上手，实现无缝对接，真正做到零学习成本。

- 🚀️ **高扩展性**： 配备了先进的内置低代码引擎，通过配置化构建方式，赋予您对所有部件的完全自定义能力。您可以单独运用此引擎，自主打造专属的低代码平台。

- 📦 **无污染，可二开**： 设计器无缝嵌入本地项目开发环境，既安全又便捷，轻松接入。同时，采用创新的设计器和渲染器分离模式，确保项目代码保持纯净，不受任何污染，并且产物支持二次开发。

- ✨ **物料丰富**： 此外，还内置了多款常用、功能强大的组件库以及丰富的页面模板，不仅支持高度定制，还提供了可复用的区块组件，助您高效构建出色的应用。

## 预览

![输入图片说明](dev/public/preview/p1.png)

![输入图片说明](dev/public/preview/p2.png)

![输入图片说明](dev/public/preview/p3.png)

## 体验

### 在线体验

- [http://lcdp.vtj.pro](http://lcdp.vtj.pro)

访问Vtj专属低代码开发平台，创建应用可以体验设计器和出码功能

### 本地体验（推荐：功能更全， 性能最佳）

可以使用VTJ提供的项目脚手架，可快速创建体验项目。 命令：

```sh
npm create vtj@latest --registry=https://registry.npmmirror.com -- -t app
```

## 贡献指南

### 开发环境要求

VTJ 使用了最新的 Vue3 生态技术栈，要求 Node 版本必须是 v20+， 建议使用 nvm 切换 Node 版本。
开发项目工程采用`lerna` 和 `pnpm` 包管理工具，需要全局安装。

```sh
npm install -g lerna@latest pnpm@latest --registry=https://registry.npmmirror.com
```

如果需要二开或贡献代码，可以拉取仓库master分支。

### 快速开始

```sh
git clone https://gitee.com/newgateway/vtj.git
cd vtj
npm run setup && npm run build && npm run app:dev
```

- 首次启动需要执行初始化：`npm run setup && npm run build`
- 重启开发环境：`npm run app:dev`
- 清理项目：`npm run clean` 清理后需要重新执行初始化

## 技术交流

钉钉群、 微信群

<table border="0">
<tr><td><img src="./dingtalk.png" /></td><td><img src="./wechat.png" width="" /></td></tr></table>

## 项目定制、集成

如有项目合作或项目外包，扫码加我好友，请备注来意。

<img src="./qrcode.png" width="400" />

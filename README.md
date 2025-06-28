<div align="center"> <a href="https://gitee.com/newgateway/vtj"> <img width="100" src="./platforms/pro/public/logo.svg"> </a> <br> <br>

[![star](https://gitee.com/newgateway/vtj/badge/star.svg?theme=gvp)](https://gitee.com/newgateway/vtj)
[![npm version](https://img.shields.io/npm/v/@vtj/pro.svg?style=flat-square)](https://www.npmjs.com/package/@vtj/pro)
[![npm downloads](https://img.shields.io/npm/dt/@vtj/core.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@vtj/core)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

</div>

# VTJ.PRO （ AI + 低代码 ）

VTJ 是一款以AI驱动的Vue3前端低代码开发工具。内置低代码引擎、渲染器和代码生成器，支持Vue源码与低代码DSL双向转换，面向前端开发者，开箱即用。 无缝嵌入本地开发工程，不改变前端开发流程和编码习惯。

- **官方文档**：[https://vtj.pro](https://vtj.pro)
- **在线应用开发平台**：[https://lcdp.vtj.pro](https://lcdp.vtj.pro)

## 核心特性

- ⚙️ **主流技术栈**: 基于 Vue3 + TypeScript + Vite 构建，深度整合 ElementPlus、Axios、ECharts 等主流工具链，开箱即用。

- 🧩 **源码级自定义**: 低代码设计器支持**源码级自由定制**，无缝实现传统编码开发的所有功能，满足深度个性化需求。

- 🚀 **零适应成本**: 完全遵循前端开发习惯，**Vue开发者无需额外学习**，设计器与本地项目环境天然融合。

- 🔌 **引擎化扩展**: 内置可拆解的**低代码引擎**，支持独立调用，快速构建自有低代码平台，扩展能力无上限。

- 💻 **源码零污染**: 采用**设计器-渲染器分离架构**，产物为纯净Vue代码，支持直接二次开发，杜绝环境侵入。

- 📦 **高复用物料库**: 内置多套企业级组件库+页面模板，提供**可定制区块组件**，大幅提升标准化开发效率。

- 🤖 **AI智能提效**: 支持通过自然语言/设计稿/网页截图**智能生成Vue组件**，快速实现需求可视化。

- 🔄 **双向代码转换**: 独创 **DSL与Vue源码双向编译**能力，保障低代码与手写代码的自由切换。

## 设计器预览

<table border="0">
  <tr>
    <td><img src="dev/public/preview/p5.jpg" /></td>
    <td><img src="dev/public/preview/p4.jpg" /></td>
  </tr>
  <tr>
    <td><img src="dev/public/preview/p1.png" /></td>
    <td><img src="dev/public/preview/p2.png" /></td>
  </tr>
  <tr>
    <td><img src="dev/public/preview/p3.png" /></td>
    <td><img src="dev/public/preview/p6.png" /></td>
  </tr>
</table>

## 试用体验

### 一、在线体验

- [https://lcdp.vtj.pro](https://lcdp.vtj.pro)

访问VTJ专属低代码开发平台，创建应用可以体验设计器和出码功能。

### 二、本地体验 <span style="color:red">（强烈推荐：功能全， 性能最佳）</span>

VTJ支持多种平台应用开发，可以使用脚手架搭建相应平台的项目工程。命令：

1. Web应用(PC端)

   ```sh
   npm create vtj@latest --registry=https://registry.npmmirror.com -- -t app
   ```

1. H5应用(移动端)

   ```sh
   npm create vtj@latest --registry=https://registry.npmmirror.com -- -t h5
   ```

1. uni-app(跨端应用)

   ```sh
   npm create vtj@latest --registry=https://registry.npmmirror.com -- -t uniapp
   ```

1. 物料开发项目

   ```sh
   npm create vtj@latest --registry=https://registry.npmmirror.com -- -t material
   ```

## 贡献指南

VTJ支持多种方式对设计器进行扩展，通常情况下你不需要用到源码，如果需要深度定制或与业务捆绑时才有可能需要用源码进行二开，欢迎各位喜欢VTJ的开发者贡献代码。

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

钉钉群、 微信群(加好友，拉进群，备注：vtj)

<table border="0">
<tr><td><img src="./dingtalk.png" /></td><td><img src="./wechat.png" width="" /></td></tr></table>

## ⭐ 优秀案例

### 悦码低代码平台

<table>
<tr>
<td>
<img src="dev/public/shiyue/logo.png" height="50" />
</td>
<td>
悦码是<strong>诗悦网络</strong>采用<code>VTJ</code>搭建低代码平台，已上线投产。
特点：<br />
1. 通过无界渲染器可跨技术栈引入低代码页面，实现低代码页面跨技术栈复用，包括：<code>react</code> <code>next.js</code> <code>vue</code> <code>svelte</code> ：<br />
2. 多应用独立设计器
</td>
</tr>
</table>

<table border="0">
<tr>
<td>多应用独立设计器</td>
<td>用户生命周期</td>
<td>静态资源管理</td>
</tr>
  <tr>
    <td>
    <img src="https://cms-ycode.shiyue.com/y-code/20250521/案例-低代码项目列表.png" />
    </td>
    <td>
    <img src="https://cms-ycode.shiyue.com/y-code/20250521/案例-用户生命周期.png" /></td>
   <td>
   <img src="https://cms-ycode.shiyue.com/y-code/20250521/案例-资源管理.png" /></td>
  </tr>
</table>

### 寄云科技低代码开发平台

<table>
<tr>
<td>
<img src="dev/public/neucloud/logo.png" height="50" />
</td>
<td>
已接入VTJ作为云画面的交互画面设计器之一，实现与平台深度融合，快速响应业务需求，构建应用，已成功服务于多家世界500强工业企业。

产品主页地址：<a href="https://www.neucloud.cn/product/lcdp">https://www.neucloud.cn/product/lcdp</a>

</td>
</tr>
</table>

<table border="0">
  <tr>
    <td>
    <img src="dev/public/neucloud/p1.jpg" />
    </td>
    <td>
    <img src="dev/public/neucloud/p2.jpg" /></td>
   <td>
   <img src="dev/public/neucloud/p3.jpg" /></td>
  </tr>
</table>

### 江西七叶莲科技

<table>
<tr>
<td>
<img src="https://www.qylian.cn/assets/img/logo.png" height="50" />
</td>
<td>
接入VTJ本地版本，使用AI生成页面集成到芋道项目。
</td>
</tr>
</table>

<table border="0">
  <tr>
    <td>
    <img src="dev/public/qylian/1.png" />
    </td>
    <td>
    <img src="dev/public/qylian/2.png" /></td>
   <td>
   <img src="dev/public/qylian/3.png" /></td>
  </tr>
</table>

## 媒体报道

- [解锁低码高效新篇章：VTJ，让开发“飞”起来！](https://mp.weixin.qq.com/s/2bOX6p3mBG1ys_HivCMHhA)
- [开箱即用，一款基于Vue3 + TypeScript的低代码开发神器！](https://mp.weixin.qq.com/s/mwD0dgeCl_GX_yDBwBsNtA)
- [一款以AI驱动的Vue3前端低代码开发工具](https://mp.weixin.qq.com/s/RDzHUZENIOpDuY9G98M2uw)
- [Vue3+TS 低代码神器 VTJ.PRO，0 学习成本玩转页面可视化设计](https://mp.weixin.qq.com/s/3QxgCenYT4KKdg1idhd06A)
- [[开源]一款低代码开发工具，内置设计器引擎、渲染器和代码生成器](https://mp.weixin.qq.com/s/I3KSeeKadoirY4Xo42sdlA)
- [基于 Vue3 + TypeScript 的低代码页面可视化设计器，开箱即用](https://mp.weixin.qq.com/s/Te84P6J-JXaU7mRLXVJ_-g)
- [5.4K Star 【VTJ.PRO】：重新定义前端开发的低代码神器](https://mp.weixin.qq.com/s/ySWojJ1DKMSYes_CeYk9qw)
- [低代码开发工具推荐，VTJ.PRO，一款基于Vue3和TypeScript打造的低代码开发工具，值得一试！](https://mp.weixin.qq.com/s/wIw7XWOJ4xQ8f7OOhqAyzQ)
- [开源|一个基于Vue3 + TypeScript的低代码开发工具平台，内置了设计器引擎、渲染器和代码生成器](https://mp.weixin.qq.com/s/JTfqmIfmbBcBUbCORCUHkA)

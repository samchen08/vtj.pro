<div align="center"> <a href="https://gitee.com/newgateway/vtj"> <img width="100" src="./platforms/pro/public/logo.svg"> </a> <br>
<h1>VTJ.PRO</h1>
<h3>AI 驱动的 Vue3 低代码开发平台</h3>
<br>

[![star](https://gitee.com/newgateway/vtj/badge/star.svg?theme=gvp)](https://gitee.com/newgateway/vtj)
[![npm version](https://img.shields.io/npm/v/@vtj/pro.svg?style=flat-square)](https://www.npmjs.com/package/@vtj/pro)
[![npm downloads](https://img.shields.io/npm/dt/@vtj/core.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@vtj/core)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

</div>

内置低代码引擎、渲染器与代码生成器，**实现 Vue 源码与低代码 DSL 的双向智能转换。专为前端开发者打造，开箱即用**。

**无缝融入现有工程**，**零侵入**开发流程与编码习惯。

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

### 双向代码转换

<table border="0">
<tr><td>
<img src="https://vtj.pro/assets/animation.I-2tk84M.gif" alt="">
<td></tr>
</table>

### 深度AI赋能

<table border="0">
<tr><td>
<img src="https://vtj.pro/assets/gpt.DRg0bDMT.gif" alt="">
<td></tr>
</table>

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

## 媒体报道

- [这个开源的「AI + 低代码」开发平台绝了，Gitee上斩获 9.2K Star!](https://mp.weixin.qq.com/s/DBoMp7ymX5XS9zWz9LzCMw)
- [【开源】告别重复代码！AI驱动的Vue3低代码平台，让开发快人一步](https://mp.weixin.qq.com/s/8zJyrGpL4yHxUCgmGg4qYQ)
- [解锁低码高效新篇章：VTJ，让开发“飞”起来！](https://mp.weixin.qq.com/s/2bOX6p3mBG1ys_HivCMHhA)
- [开箱即用，一款基于Vue3 + TypeScript的低代码开发神器！](https://mp.weixin.qq.com/s/mwD0dgeCl_GX_yDBwBsNtA)
- [一款以AI驱动的Vue3前端低代码开发工具](https://mp.weixin.qq.com/s/RDzHUZENIOpDuY9G98M2uw)
- [Vue3+TS 低代码神器 VTJ.PRO，0 学习成本玩转页面可视化设计](https://mp.weixin.qq.com/s/3QxgCenYT4KKdg1idhd06A)
- [[开源]一款低代码开发工具，内置设计器引擎、渲染器和代码生成器](https://mp.weixin.qq.com/s/I3KSeeKadoirY4Xo42sdlA)
- [基于 Vue3 + TypeScript 的低代码页面可视化设计器，开箱即用](https://mp.weixin.qq.com/s/Te84P6J-JXaU7mRLXVJ_-g)
- [5.4K Star 【VTJ.PRO】：重新定义前端开发的低代码神器](https://mp.weixin.qq.com/s/ySWojJ1DKMSYes_CeYk9qw)
- [低代码开发工具推荐，VTJ.PRO，一款基于Vue3和TypeScript打造的低代码开发工具，值得一试！](https://mp.weixin.qq.com/s/wIw7XWOJ4xQ8f7OOhqAyzQ)
- [开源|一个基于Vue3 + TypeScript的低代码开发工具平台，内置了设计器引擎、渲染器和代码生成器](https://mp.weixin.qq.com/s/JTfqmIfmbBcBUbCORCUHkA)

## 他们也在用 VTJ.PRO

众多企业和组织正在使用 **VTJ.PRO** 加速数字化转型和升级。

<style>
    .sponsors th,  .sponsors td {
     text-align:center
    }
  .sponsors img { height: 60px;}
</style>

<table border="0" class="sponsors"><tbody><tr><td>浪潮集团有限公司</td><td>北京百度网讯科技有限公司</td><td>上药控股有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/inspur.B1Nj6i_-.png"></td><td><img src="https://vtj.pro/assets/baidu.C-ODazGp.png"></td><td><img src="https://vtj.pro/assets/shaphar.DMIWR0O5.png"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>中国电子系统工程第三建设有限公司</td><td>中国铁塔股份有限公司</td><td>海尔消费金融有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/cese3.B17sUJw2.png"></td><td><img src="https://vtj.pro/assets/china-tower.6AoVbI9b.png"></td><td><img src="https://vtj.pro/assets/haierxj.D0r8pxLW.png"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>苹果电子产品商贸（北京）有限公司</td><td>广州诗悦网络科技有限公司</td><td>山东国子软件股份有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/apple.DA87OfrJ.png"></td><td><img src="https://vtj.pro/assets/shiyue.Dsry6-Pz.png"></td><td><img src="https://vtj.pro/assets/googosoft.DZwFHgml.png"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>乐至县清源水务有限公司</td><td>河南贤迈网络科技服务有限公司</td><td>中电福富信息科技有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/lzqysw.ze1Bd-co.png"></td><td><img src="https://vtj.pro/assets/xianmai.DqR6xkTB.png"></td><td><img src="https://vtj.pro/assets/ffcs.CWQHovDk.png"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>上海森克电子科技有限公司</td><td>南京韬盛信息科技有限公司</td><td>南京派光智慧感知信息技术有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/senke.Cy5TazGc.png"></td><td><img src="https://vtj.pro/assets/njtsxx.BadEl2x_.png"></td><td><img src="https://vtj.pro/assets/pgsensing.Bsn88Pe8.png"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>上海同筑信息科技有限公司</td><td>合肥晨飞网络科技有限公司</td><td>福建国通星驿网络科技有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/tztos.od2kT-_s.png"></td><td><img src="https://vtj.pro/assets/ahcfwl.B6d1z92_.png"></td><td><img src="data:image/png;base64,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"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>成都淞幸科技有限责任公司</td><td>北京万古科技股份有限公司</td><td>杭州江南布衣服饰有限公司</td></tr><tr><td><img src="https://vtj.pro/assets/sunsheen.Yb7cGhMs.png"></td><td><img src="https://vtj.pro/assets/vgtech.ClYS6cBc.png"></td><td><img src="https://vtj.pro/assets/jnby.ojrHJeXk.png"></td></tr></tbody></table>

<table border="0" class="sponsors"><tbody><tr><td>合肥市星之源信息技术有限公司</td><td>泉州海丝泓盛供应链有限公司</td><td>浪潮云洲工业互联网有限公司</td></tr><tr><td>武汉仓鼠科技有限公司</td><td>义乌市云度企业管理咨询有限公司</td><td>深圳海用智能科技有限公司</td></tr><tr><td>天津易讯文传科技有限公司</td><td>深圳市翱阳鸿宇科技有限公司</td><td>武汉兄弟桥科技发展有限公司</td></tr><tr><td>江西牛虎科技有限公司</td><td>青岛艾玛信息技术有限公司</td><td>贵阳市第四人民医院</td></tr><tr><td>常熟市融媒体中心</td><td>年华数据科技有限公司</td><td>Employers’ Advocate, Inc.</td></tr><tr><td>江西七叶莲科技</td><td>北京寄云鼎城科技有限公司</td><td></td></tr></tbody></table>

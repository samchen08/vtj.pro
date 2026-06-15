# VTJ Prompts 索引

> 本文档为 `/docs/llms/` 目录下的所有提示词文档提供标签索引,用于 AI 意图匹配度查询。

---

## 文档标签索引

### [api.md](./api.md) - VTJ API 管理指南

**简介:** 详细介绍 VTJ 平台中 API 接口的完整生命周期管理，包括如何通过设计器配置 API、API 的完整字段结构、请求配置选项、Mock 数据设置，以及在组件中如何通过 `__apis` 调用接口。涵盖路径参数、查询参数的正确使用方式，以及 JSONP、请求拦截等特殊场景。

**核心主题:** API 配置、调用、管理工具方法

**标签:**

- `API管理`
- `HTTP请求`
- `setApi工具`
- `路径参数`
- `查询参数`
- `Mock数据`
- `接口调用`
- `请求配置`
- `数据源`
- `CRUD接口`
- `ApiSchema`
- `JSONP请求`
- `请求拦截`
- `响应校验`
- `opts.params`
- `opts.query`
- `__apis调用`
- `模拟数据模板`
- `接口测试`
- `category分组`

---

### [block.md](./block.md) - 区块管理指南

**简介:** 说明 VTJ 中区块（Block）的三种来源类型（Schema、UrlSchema、Plugin），区块的创建、编辑、删除操作流程，以及区块在页面中的引用方式。同时介绍区块的代码生成规则和与页面的区别，帮助理解如何实现组件的跨页面复用。

**核心主题:** 区块创建、来源类型、复用机制

**标签:**

- `区块管理`
- `Schema区块`
- `UrlSchema`
- `Plugin插件`
- `组件复用`
- `区块工具方法`
- `from引用`
- `代码生成`
- `BlockFile`
- `嵌套引用`
- `createBlock`
- `updateBlock`
- `removeBlock`
- `getBlocks`
- `预设区块`
- `市场安装`
- `资源URL`
- `library库名`
- `双向复用`
- `页面保存为区块`

---

### [chart.md](./chart.md) - 图表库使用指南

**简介:** 介绍 `@vtj/charts` 图表库的完整使用方法，包括基于 ECharts 封装的 `XChart` 通用图表组件和 `XMapChart` 地图图表组件。涵盖组件 Props、事件监听、响应式 Option 更新、组合式 API（useChart、useMapChart），以及柱状图、折线图、饼图、地图等常用图表类型的配置示例。

**核心主题:** ECharts 图表组件、地图图表、组合式 API

**标签:**

- `图表库`
- `ECharts`
- `XChart组件`
- `XMapChart`
- `地图图表`
- `GeoJSON`
- `响应式Option`
- `useChart`
- `数据可视化`
- `图表事件`
- `组合式API`
- `useMapChart`
- `自动resize`
- `图表类型`
- `柱状图`
- `折线图`
- `饼图`
- `雷达图`
- `散点图`
- `层级地图`

---

### [coder.md](./coder.md) - Vue 代码编写约定

**简介:** 定义 AI 生成 Vue 组件代码时必须遵循的严格规范，确保输出内容能被 `@vtj/parser` 无损解析为 DSL。包括强制使用 Composition API、响应式状态命名（`__state`、`__props`、`__emit`）、全局 API 映射表、模板指令使用规范、Import 导入约定，以及明确的禁止事项清单。

**核心主题:** parser 可解析的 Vue 代码规范、Composition API 强制要求

**标签:**

- `代码规范`
- `Composition API`
- `script setup`
- `parser解析`
- `变量命名`
- `全局API映射`
- `模板约定`
- `Import规范`
- `DSL生成`
- `禁止事项`
- `__state命名`
- `__props声明`
- `__emit调用`
- `生命周期钩子`
- `computed计算`
- `watch监听`
- `指令使用`
- `Slot插槽`
- `动态class`
- `PascalCase命名`

---

### [env.md](./env.md) - 环境变量指南

**简介:** 讲解 VTJ 平台中环境变量的配置和使用方式，支持开发（development）和生产（production）双环境值存储。介绍如何通过 `createEnv` 工具创建环境变量、`getEnv` 查询配置，以及在组件中通过 `__provider.env` 运行时访问环境变量，适用于 API 地址、功能开关、第三方 Key 等场景。

**核心主题:** 环境变量配置、双环境值存储、运行时访问

**标签:**

- `环境变量`
- `双环境配置`
- `development`
- `production`
- `createEnv工具`
- `运行时访问`
- `EnvConfig`
- `功能开关`
- `API地址配置`
- `全局只读配置`
- `getEnv`
- `removeEnv`
- `nodeEnv切换`
- `平铺对象`
- `UPPER_SNAKE_CASE`
- `__provider.env`
- `环境值类型`
- `同名不覆盖`
- `自动选取`
- `第三方Key配置`

---

### [globals.md](./globals.md) - 全局 API 使用指南

**简介:** 详细说明 `@vtj/renderer` 提供的全局变量及其在 Vue 组件中的使用方式。这些变量由框架自动注入，包括 `__store`（Pinia 状态）、`__request`（HTTP 请求）、`__libs`（第三方库集合）、`__apis`（接口集合）、`__access`（权限控制）等，涵盖权限判断、登录管理、动态请求、跨 UI 库调用等典型场景。

**核心主题:** renderer 提供的全局变量、自动注入机制

**标签:**

- `全局API`
- `自动注入`
- `__store`
- `__request`
- `__libs`
- `__apis`
- `__access`
- `权限控制`
- `Pinia实例`
- `HTTP请求`
- `__pinia`
- `第三方库集合`
- `ElementPlus`
- `AntDesignVue`
- `VueUse`
- `登录管理`
- `权限判断`
- `Token管理`
- `请求封装`
- `拦截器注册`

---

### [i18n.md](./i18n.md) - 国际化指南

**简介:** 介绍 VTJ 平台的国际化（i18n）配置和使用方法，基于 vue-i18n 的 Composition API 模式。包括如何通过 `createI18nMessage` 创建中英文对照词条、词条 Key 的命名规范（点号分层）、在模板和 script 中使用 `__i18n.t()` 进行翻译，以及插值参数、数字格式化、日期格式化等高级功能。

**核心主题:** 多语言配置、词条管理、翻译函数使用

**标签:**

- `国际化`
- `i18n`
- `多语言`
- `词条管理`
- `vue-i18n`
- `翻译函数`
- `createI18nMessage`
- `插值参数`
- `Key命名规范`
- `locale设置`
- `getI18nMessage`
- `removeI18nMessage`
- `fallbackLocale`
- `zh-CN`
- `英文翻译`
- `点号分层`
- `模块页面元素`
- `__i18n.t()`
- `数字格式化`
- `日期格式化`

---

### [icons.md](./icons.md) - 图标库使用指南

**简介:** 全面介绍 `@vtj/icons` 图标库的四种图标来源（SVG 组件、Iconfont 图标、Element Plus 图标、Assets 图标），以及全局注册和按需导入两种使用方式。详细说明 `XIcon` 组件的用法，包括 `icon` 和 `src` 属性的区别、size/color 控制、动态图标切换，并提供完整的图标分类列表。

**核心主题:** 图标组件、按需导入、XIcon 渲染

**标签:**

- `图标库`
- `XIcon组件`
- `SVG图标`
- `Iconfont`
- `Element Plus图标`
- `Assets图标`
- `按需导入`
- `全局注册`
- `图标命名`
- `动态图标`
- `IconsPlugin`
- `VtjIcon前缀`
- `colors属性`
- `size属性`
- `color属性`
- `src属性`
- `CSS类实现`
- `组件引用`
- `图标分类`
- `业务操作图标`

---

### [page.md](./page.md) - 页面管理指南

**简介:** 讲解 VTJ 中页面的三种类型（page、dir、layout）及其路由行为，页面树的创建、编辑、删除操作流程，以及路由体系和菜单生成规则。涵盖特殊属性如 KeepAlive 缓存、mask 内嵌母版、hidden 隐藏菜单、raw 源码模式，以及 UniApp 平台的专属字段（needLogin、style）。

**核心主题:** 页面类型、路由体系、菜单生成

**标签:**

- `页面管理`
- `路由体系`
- `页面类型`
- `目录节点`
- `布局页面`
- `createPage工具`
- `菜单生成`
- `RouterView`
- `KeepAlive`
- `源码模式`
- `PageFile`
- `getPages`
- `updatePage`
- `removePage`
- `setHomepage`
- `movePage`
- `路由元信息`
- `mask内嵌母版`
- `hidden隐藏菜单`
- `needLogin登录校验`

---

### [settings.md](./settings.md) - 应用设置指南

**简介:** 详细介绍 VTJ 应用级别的全局配置项，覆盖三大类：全局配置（CSS、Pinia Store、Access 权限控制、Enhance 增强）、请求配置（Axios 基础配置、请求拦截器、响应拦截器）、路由守卫（beforeEach 前置守卫、afterEach 后置守卫）。说明渲染引擎的严格初始化顺序及各配置项的依赖关系。

**核心主题:** 全局配置、请求配置、路由守卫

**标签:**

- `应用设置`
- `全局配置`
- `Pinia Store`
- `权限控制`
- `Axios配置`
- `请求拦截器`
- `响应拦截器`
- `路由守卫`
- `beforeEach`
- `初始化顺序`
- `setGlobalCss`
- `setGlobalStore`
- `setGlobalAccess`
- `setGlobalAxios`
- `afterEach后置守卫`
- `enhance增强`
- `GlobalConfig`
- `设计模式不生效`
- `函数代码字符串`
- `依赖关系`

---

### [tools.md](./tools.md) - 设计器工具方法说明

**简介:** 汇总 AI 在 VTJ 设计器中可调用的所有工具方法（Tools），包括页面管理（createPage、updatePage、removePage）、区块管理（createBlock、getBlocks）、API 管理（setApi、getApis）、全局配置（setGlobalCss、setGlobalStore 等）、环境变量、国际化、UniApp 配置等。提供标准的 JSON 调用格式和典型工作流程建议。

**核心主题:** 所有可调用的工具方法、调用格式、工作流程

**标签:**

- `工具方法`
- `action调用`
- `页面管理工具`
- `区块管理工具`
- `API管理工具`
- `全局配置工具`
- `环境变量工具`
- `国际化配置`
- `UniApp配置`
- `工作流程`
- `getSkills`
- `refresh刷新`
- `getCurrentFile`
- `getNodeSelected`
- `active打开`
- `movePage移动`
- `parameters格式`
- `JSON调用`
- `技能文档`
- `运行时检测`

---

### [ui.md](./ui.md) - UI 组件库使用指南

**简介:** 全面介绍 `@vtj/ui` 企业级 UI 组件库的核心组件和使用规范，包括 XGrid 数据表格（基于 VXE Table）、XForm 表单、XField 字段、XDialog 对话框、XActionBar 操作栏、XQueryForm 查询表单、XContainer 布局容器等。同时说明 Hooks 工具（useIcon、useLoader）、Adapter 适配器系统，以及完整的 CRUD 页面示例。

**核心主题:** 业务组件、Hooks、Adapter 适配器系统

**标签:**

- `UI组件库`
- `XGrid表格`
- `XForm表单`
- `XField字段`
- `XDialog对话框`
- `XActionBar`
- `XQueryForm`
- `Hooks工具`
- `Adapter适配器`
- `CRUD页面`
- `VXE Table`
- `列渲染器`
- `单元格编辑`
- `行拖拽排序`
- `inline表单`
- `sticky按钮`
- `编辑器类型`
- `级联刷新`
- `useIcon`
- `useLoader`

---

### [uni.md](./uni.md) - UniApp 全局配置指南

**简介:** 专门针对 UniApp 平台的全局配置文档，介绍如何通过 `setUniConfig` 工具配置 manifest.json（应用配置）、pages.json（页面路由配置）、全局 CSS，以及应用生命周期函数（onLaunch、onShow、onHide、onError 等）。说明配置在运行时的注入流程和仅 UniApp 平台生效的限制条件。

**核心主题:** UniApp 平台配置、manifest.json、pages.json、生命周期

**标签:**

- `UniApp配置`
- `manifestJson`
- `pagesJson`
- `应用生命周期`
- `onLaunch`
- `全局样式`
- `tabBar配置`
- `setUniConfig`
- `平台专属`
- `运行时注入`
- `getUniConfig`
- `onShow`
- `onHide`
- `onError`
- `onPageNotFound`
- `onThemeChange`
- `onExit`
- `window.__uniConfig`
- `adoptedStyleSheets`
- `easycom`

---

### [utils.md](./utils.md) - 工具库使用指南

**简介:** 介绍 `@vtj/utils` 通用工具库的完整功能模块，包括 HTTP 请求封装（request、createApi、useApi）、本地存储（storage 支持过期机制）、Cookie 操作、URL 解析与拼接、文件下载、日志模块、动态脚本加载、JSONP 跨域请求、客户端环境检测、requestAnimationFrame 封装等。提供典型工作流程示例，如数据获取与展示、文件上传与下载。

**核心主题:** HTTP 请求、本地存储、URL 处理、文件下载等通用工具

**标签:**

- `工具库`
- `HTTP请求`
- `本地存储`
- `storage`
- `cookie操作`
- `URL处理`
- `文件下载`
- `日志模块`
- `动态脚本加载`
- `JSONP请求`
- `request封装`
- `createApi`
- `createApis`
- `useApi钩子`
- `缓存过期`
- `localStorage`
- `sessionStorage`
- `url.stringify`
- `downloadBlob`
- `loadScript`

---

## 标签分类汇总

### 按功能模块分类

**数据与接口:**

- API管理、HTTP请求、setApi工具、路径参数、查询参数、Mock数据、接口调用、请求配置、数据源、CRUD接口、**request、**apis、权限控制

**组件与UI:**

- 图表库、ECharts、XChart组件、XMapChart、UI组件库、XGrid表格、XForm表单、XField字段、XDialog对话框、XActionBar、XQueryForm、Hooks工具、Adapter适配器、图标库、XIcon组件

**配置与管理:**

- 环境变量、双环境配置、应用设置、全局配置、Pinia Store、Axios配置、请求拦截器、响应拦截器、路由守卫、UniApp配置、manifestJson、pagesJson

**国际化与本地化:**

- 国际化、i18n、多语言、词条管理、vue-i18n、翻译函数

**页面与路由:**

- 页面管理、路由体系、页面类型、目录节点、布局页面、RouterView、KeepAlive

**代码规范:**

- 代码规范、Composition API、script setup、parser解析、变量命名、全局API映射、模板约定

**工具与实用:**

- 工具方法、本地存储、storage、cookie操作、URL处理、文件下载、日志模块、动态脚本加载、JSONP请求

**区块与复用:**

- 区块管理、Schema区块、UrlSchema、Plugin插件、组件复用

---

## 使用建议

### AI 意图匹配查询示例

**场景 1:用户问"如何调用接口"**

- 匹配标签:`API管理`、`HTTP请求`、`接口调用`
- 推荐文档:[api.md](./api.md)、[globals.md](./globals.md)、[utils.md](./utils.md)

**场景 2:用户问"如何使用表格组件"**

- 匹配标签:`XGrid表格`、`UI组件库`
- 推荐文档:[ui.md](./ui.md)

**场景 3:用户问"如何配置多语言"**

- 匹配标签:`国际化`、`词条管理`
- 推荐文档:[i18n.md](./i18n.md)

**场景 4:用户问"如何设置环境变量"**

- 匹配标签:`环境变量`、`双环境配置`
- 推荐文档:[env.md](./env.md)

**场景 5:用户问"如何生成 Vue 代码"**

- 匹配标签:`代码规范`、`Composition API`、`parser解析`
- 推荐文档:[coder.md](./coder.md)

**场景 6:用户问"如何使用图表"**

- 匹配标签:`图表库`、`ECharts`、`XChart组件`
- 推荐文档:[chart.md](./chart.md)

**场景 7:用户问"如何配置路由守卫"**

- 匹配标签:`路由守卫`、`beforeEach`、`应用设置`
- 推荐文档:[settings.md](./settings.md)

**场景 8:用户问"如何使用图标"**

- 匹配标签:`图标库`、`XIcon组件`
- 推荐文档:[icons.md](./icons.md)

---

> **说明:** 每个文档的 20 个标签基于其核心内容、功能模块、使用场景、API方法、配置项等精准提取,可用于 AI 意图识别和文档推荐系统的匹配查询。

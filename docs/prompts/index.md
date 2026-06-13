# VTJ Prompts 索引

> 本文档为 `/docs/prompts/` 目录下的所有提示词文档提供标签索引,用于 AI 意图匹配度查询。

---

## 文档标签索引

### [api.md](./api.md) - VTJ API 管理指南

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

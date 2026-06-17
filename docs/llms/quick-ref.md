# VTJ 工具速查清单

> AI 意图 → 工具/文档 快速映射。按任务场景查找，直达对应工具或文档。

---

## 一、页面管理

| 意图                | 工具方法                                              | 参考文档             |
| ------------------- | ----------------------------------------------------- | -------------------- |
| 查看页面树/菜单结构 | [`getMenus`](./tools.md#getmenus--获取页面菜单树)     | [page.md](./page.md) |
| 获取所有页面列表    | [`getPages`](./tools.md#getpages--获取所有页面)       | [page.md](./page.md) |
| 新建页面            | [`createPage`](./tools.md#createpage--创建页面)       | [page.md](./page.md) |
| 修改页面信息        | [`updatePage`](./tools.md#updatepage--更新页面信息)   | [page.md](./page.md) |
| 调整页面层级/父级   | [`movePage`](./tools.md#movepage--移动页面层级)       | [page.md](./page.md) |
| 删除页面            | [`removePage`](./tools.md#removepage--删除页面)       | [page.md](./page.md) |
| 设为首页            | [`setHomepage`](./tools.md#sethomepage--设置应用主页) | [page.md](./page.md) |

## 二、区块管理

| 意图         | 工具方法                                              | 参考文档               |
| ------------ | ----------------------------------------------------- | ---------------------- |
| 查看所有区块 | [`getBlocks`](./tools.md#getblocks--获取所有区块)     | [block.md](./block.md) |
| 创建区块     | [`createBlock`](./tools.md#createblock--创建区块)     | [block.md](./block.md) |
| 修改区块信息 | [`updateBlock`](./tools.md#updateblock--更新区块信息) | [block.md](./block.md) |
| 删除区块     | [`removeBlock`](./tools.md#removeblock--删除区块)     | [block.md](./block.md) |

## 三、API 接口管理

| 意图           | 工具方法                                            | 参考文档                                       |
| -------------- | --------------------------------------------------- | ---------------------------------------------- |
| 查看所有接口   | [`getApis`](./tools.md#getapis--获取接口列表)       | [api.md](./api.md)                             |
| 新建/更新接口  | [`setApi`](./tools.md#setapi--新增或更新接口)       | [api.md](./api.md)                             |
| 删除单个接口   | [`removeApi`](./tools.md#removeapi--删除接口)       | [api.md](./api.md)                             |
| 批量删除接口   | [`removeApis`](./tools.md#removeapis--批量删除接口) | [api.md](./api.md)                             |
| 组件中调用接口 | → 用 `__apis.xxx()`                                 | [api.md](./api.md)、[globals.md](./globals.md) |

## 四、文件与运行时操作

| 意图                  | 工具方法                                                                      |
| --------------------- | ----------------------------------------------------------------------------- |
| 打开（激活）页面/区块 | [`active`](./tools.md#active--打开文件)                                       |
| 获取当前打开文件信息  | [`getCurrentFile`](./tools.md#getcurrentfile--获取当前文件信息)               |
| 获取当前文件 Vue 源码 | [`getCurrentFileContent`](./tools.md#getcurrentfilecontent--获取当前文件源码) |
| 刷新运行时、检测错误  | [`refresh`](./tools.md#refresh--刷新运行时)                                   |
| 获取选中节点路径      | [`getNodeSelected`](./tools.md#getnodeselected--获取当前选中节点路径)         |

## 五、全局配置

| 意图                         | 工具方法                                                        | 参考文档                     |
| ---------------------------- | --------------------------------------------------------------- | ---------------------------- |
| 全局 CSS                     | `getGlobalCss` / `setGlobalCss`                                 | [settings.md](./settings.md) |
| Pinia Store（vue3 状态管理） | `getGlobalStore` / `setGlobalStore`                             | [settings.md](./settings.md) |
| 权限控制配置                 | `getGlobalAccess` / `setGlobalAccess`                           | [settings.md](./settings.md) |
| Axios 请求基础配置           | `getGlobalAxios` / `setGlobalAxios`                             | [settings.md](./settings.md) |
| 请求拦截器                   | `getGlobalRequestInterceptor` / `setGlobalRequestInterceptor`   | [settings.md](./settings.md) |
| 响应拦截器                   | `getGlobalResponseInterceptor` / `setGlobalResponseInterceptor` | [settings.md](./settings.md) |
| 路由前置守卫                 | `getGlobalBeforeEach` / `setGlobalBeforeEach`                   | [settings.md](./settings.md) |
| 路由后置守卫                 | `getGlobalAfterEach` / `setGlobalAfterEach`                     | [settings.md](./settings.md) |

> 所有 set 类配置传入 **JS 函数代码字符串**，详见 [settings.md](./settings.md)。

## 六、环境变量管理

| 意图             | 工具方法                                        | 参考文档                                       |
| ---------------- | ----------------------------------------------- | ---------------------------------------------- |
| 查看所有环境变量 | [`getEnv`](./env.md#getenv--获取所有环境变量)   | [env.md](./env.md)                             |
| 新增环境变量     | [`createEnv`](./env.md#createenv--新增环境变量) | [env.md](./env.md)                             |
| 删除环境变量     | [`removeEnv`](./env.md#removeenv--删除环境变量) | [env.md](./env.md)                             |
| 组件中访问       | → `__provider.env.变量名`                       | [env.md](./env.md)、[globals.md](./globals.md) |

## 七、国际化 i18n

| 意图           | 工具方法                                     | 参考文档                                         |
| -------------- | -------------------------------------------- | ------------------------------------------------ |
| 查看所有词条   | `getI18nMessage`                             | [i18n.md](./i18n.md)                             |
| 新增词条       | `createI18nMessage`                          | [i18n.md](./i18n.md)                             |
| 删除词条       | `removeI18nMessage`                          | [i18n.md](./i18n.md)                             |
| 组件中使用翻译 | → `__i18n.t('key')`                                                                 | [i18n.md](./i18n.md)、[globals.md](./globals.md) |

## 八、UniApp 专属

| 意图                       | 工具方法/参数                           | 参考文档           |
| -------------------------- | --------------------------------------- | ------------------ |
| 查看 UniApp 配置           | `getUniConfig(key)`                     | [uni.md](./uni.md) |
| 配置 manifest.json         | `setUniConfig("manifestJson", jsonStr)` | [uni.md](./uni.md) |
| 配置 pages.json            | `setUniConfig("pagesJson", jsonStr)`    | [uni.md](./uni.md) |
| 全局 CSS                   | `setUniConfig("css", cssStr)`           | [uni.md](./uni.md) |
| 生命周期：启动/显示/隐藏等 | `setUniConfig("onLaunch", fnStr)` 等    | [uni.md](./uni.md) |
| 配置 tabBar                | → 编辑 pagesJson 中的 tabBar 字段       | [uni.md](./uni.md) |

## 九、技能文档查询

| 意图                   | 操作                                   |
| ---------------------- | -------------------------------------- |
| 查阅特定功能的详细用法 | `getSkills([技能ID])` — 技能 ID 见下表 |

**可用技能 ID 与文档映射：**

| 技能 ID    | 文档                         | 速查场景                                                          |
| ---------- | ---------------------------- | ----------------------------------------------------------------- |
| `api`      | [api.md](./api.md)           | API 配置、路径参数、Mock 数据、接口调用规范                       |
| `block`    | [block.md](./block.md)       | 区块概念、来源类型、复用机制                                      |
| `chart`    | [chart.md](./chart.md)       | XChart、XMapChart、ECharts 图表配置                               |
| `coder`    | [coder.md](./coder.md)       | **Vue Composition API 代码规范**（AI 生成代码前必读）             |
| `env`      | [env.md](./env.md)           | 环境变量双环境配置、UPPER_SNAKE_CASE 命名                         |
| `globals`  | [globals.md](./globals.md)   | 全局注入变量详解：`__store`、`__request`、`__apis`、`__access` 等 |
| `i18n`     | [i18n.md](./i18n.md)         | 多语言词条管理、`__i18n.t()` 翻译、参数插值                       |
| `icons`    | [icons.md](./icons.md)       | 图标库 4 种来源、XIcon 组件、按需导入                             |
| `page`     | [page.md](./page.md)         | 页面类型（page/dir/layout）、路由体系、KeepAlive                  |
| `settings` | [settings.md](./settings.md) | 全局配置（Store/Access/Axios/路由守卫）详细说明                   |
| `tools`    | [tools.md](./tools.md)       | 所有设计器工具方法完整文档                                        |
| `ui`       | [ui.md](./ui.md)             | @vtj/ui 组件：XGrid、XForm、XField、XDialog、Hooks                |
| `uni`      | [uni.md](./uni.md)           | UniApp 平台配置（仅 UniApp 生效）                                 |
| `utils`    | [utils.md](./utils.md)       | @vtj/utils 工具库：HTTP 请求、storage、URL 处理等                 |

## 十、编程库 / 全局 API 速查

| 模块            | 用途           | 组件中访问方式                                                                            | 参考文档                   |
| --------------- | -------------- | ----------------------------------------------------------------------------------------- | -------------------------- |
| `@vtj/renderer` | 全局注入能力   | `__store`、`__request`、`__apis`、`__access`、`__libs`、`__pinia`、`__i18n`、`__provider` | [globals.md](./globals.md) |
| `@vtj/ui`       | 企业级 UI 组件 | `<XGrid>`, `<XForm>`, `<XDialog>`, `<XField>` 等                                          | [ui.md](./ui.md)           |
| `@vtj/charts`   | ECharts 图表   | `<XChart>`, `<XMapChart>`, `useChart()`                                                   | [chart.md](./chart.md)     |
| `@vtj/icons`    | 图标系统       | `<XIcon icon="xxx">`                                                                      | [icons.md](./icons.md)     |
| `@vtj/utils`    | 通用工具函数   | `request()`, `storage`, `url`, `downloadBlob` 等                                          | [utils.md](./utils.md)     |

## 十一、代码生成速查

| 场景                       | 核心约束                                                                                                                                                            | 参考文档                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **生成 Vue 页面/区块代码** | 强制 Composition API + `script setup`；状态命名 `__state`、props `__props`、emit `__emit`；用 `__apis.xxx()` 调接口；全局变量用 `__store`/`__request`/`__access` 等 | **[coder.md](./coder.md)**（必读）                               |
| 使用 UI 组件               | 组件 PascalCase 引用；`@vtj/ui` 组件用 `<XGrid>` 等；图表用 `<XChart>`；图标用 `<XIcon>`                                                                            | [ui.md](./ui.md)、[chart.md](./chart.md)、[icons.md](./icons.md) |
| 调用 API                   | `const { data } = await __apis.getUserList({ ...opts })`                                                                                                            | [api.md](./api.md)                                               |
| 使用全局 Store             | `const user = __store.state.user; __store.setUser(data)`                                                                                                            | [settings.md](./settings.md)、[globals.md](./globals.md)         |
| 模板翻译                   | `{{ $t('key') }}` — 注意：Composition 下 `$t` 仅在模板可用                                                                                                          | [i18n.md](./i18n.md)                                             |

## 十二、典型工作流

```
1. 了解项目 → getMenus / getPages                 (了解页面结构)
2. 创建页面 → createPage(page, parentId?)           (先父级再子级)
3. 创建区块 → createBlock(block)                    (跨页面复用的组件)
4. 注册接口 → setApi(apiSchema)                     (后端 API 对接)
5. 生成代码 → 遵循 coder.md 规范 + 调用 getSkills    (AI 生成 Vue 源码)
6. 验证结果 → refresh                               (检测运行时错误)
7. 全局配置 → setGlobalStore / setGlobalAccess 等    (Store/权限/路由守卫)
8. i18n 配置 → createI18nMessage                    (多语言词条)
9. 环境变量 → createEnv                             (开发/生产双环境值)
```

---

## 速查索引（按关键词）

| 关键词                                | 动作                                                       |
| ------------------------------------- | ---------------------------------------------------------- |
| 创建页面/删除页面/移动页面            | → 见[页面管理](#一页面管理)                                |
| 创建区块/删除区块                     | → 见[区块管理](#二区块管理)                                |
| 注册接口/调接口/\_\_apis              | → 见[API 管理](#三-api-接口管理) + [api.md](./api.md)      |
| 获取源码/刷新/选中节点                | → 见[文件与运行时](#四文件与运行时操作)                    |
| 全局CSS/Store/Pinia                   | → 见[全局配置](#五全局配置) + [settings.md](./settings.md) |
| 权限/登录/access                      | → `setGlobalAccess` + [settings.md](./settings.md)         |
| Axios/baseURL/请求拦截                | → `setGlobalAxios` + [settings.md](./settings.md)          |
| 路由守卫/beforeEach                   | → `setGlobalBeforeEach` + [settings.md](./settings.md)     |
| 环境变量/env/\_\_provider             | → 见[环境变量](#六环境变量管理) + [env.md](./env.md)       |
| i18n/多语言/翻译/$t                   | → 见[i18n](#七国际化-i18n) + [i18n.md](./i18n.md)          |
| UniApp/manifest/pages.json            | → 见[UniApp](#八uniapp-专属) + [uni.md](./uni.md)          |
| 代码规范/Composition API/script setup | → [coder.md](./coder.md)                                   |
| 全局变量/**store/**request/\_\_libs   | → [globals.md](./globals.md)                               |
| XGrid 表格/XForm 表单/XDialog         | → [ui.md](./ui.md)                                         |
| XChart 图表/useChart/ECharts          | → [chart.md](./chart.md)                                   |
| XIcon 图标/SVG/Iconfont               | → [icons.md](./icons.md)                                   |
| request/storage/工具函数              | → [utils.md](./utils.md)                                   |
| 生成 Vue 代码/parser 解析             | → [coder.md](./coder.md)                                   |
| 查看详细工具文档                      | → [tools.md](./tools.md)                                   |

# 核心架构

本文档介绍了为 VTJ 低代码平台提供支持的基本架构组件，包括 Engine 编排层、Provider 服务系统、数据模型和代码生成管道。有关 UI 组件库和 widget 系统的信息，请参阅 UI 组件库 。有关特定于平台的实施，请参阅平台实施 。

## 引擎、提供商和服务层

VTJ 架构围绕三个主要编排组件构建：用于设计时管理的 `Engine`、用于运行时服务的 `Provider` 和用于基于 iframe 的渲染的 `Simulator`。

### 设计时引擎架构

![](../svg/2/1.png)

类 `Engine` 充当设计时环境的中央业务流程协调程序。它通过几个关键职责来管理整个生命周期：

- **项目管理** ：通过 `Service` 界面协调 `ProjectModel` 实例和文件操作
- **模拟器控制** ：管理模拟器以进行基于 iframe 的组件渲染和预览
- **Asset Management**：通过 `Assets` 类处理材质加载和组件注册
- **事件协调** ：绑定到模型事件以实现实时更新和持久性

### Provider 服务架构

![](../svg/2/2.png)

`Provider` 类跨不同执行模式（`ContextMode.Design`、`ContextMode.Runtime`、`ContextMode.Raw`）管理运行时服务和资源加载。关键架构模式包括：

- **资源加载** ：根据项目配置异步加载依赖项、材料和组件
- **API 管理** ：通过 `createSchemaApis` 创建和管理基于 schema 的 API
- **组件注册** ：动态组件解析和 Vue 插件安装
- **DSL 渲染** ：用于创建将 BlockSchema 转换为 Vue 组件的渲染器的工厂方法

## 项目模型和块模型

数据层以反应式模型为中心，这些模型通过事件驱动架构管理项目状态和组件定义。

### 模型层次结构和事件

![](../svg/2/3.png)

`ProjectModel` 管理完整的项目状态，包括页面、块、依赖项和配置。它实现了几个关键模式：

- **文件管理** ：`PageFile` 和 `BlockFile` 的 CRUD 操作，包括验证和事件发出
- **依存关系管理** ：外部库和材料的动态加载和版本管理
- **状态同步** ：事件驱动的更新，通过 `Service` 层触发持久性
- **平台适配**：支持不同目标平台（`web`、`h5`、`uniapp`）

关键作包括用于文件管理的 `createPage（）`、`createBlock（）`、`setDeps（）` 和 `active（）`， 每个作都会触发相应的事件以进行 UI 同步。

### 块模型和节点层次结构

![](../svg/2/4.png)

`BlockModel` 将单个组件或页面表示为 `NodeModel` 实例的树。该架构支持：

- **层次结构** ：基于插槽的内容组织的父子关系
- **组件集成** ：通过 MaterialDescription 和 NodeFrom 配置动态加载组件
- **状态管理** ：具有锁定、可见性和验证状态的响应式属性
- **序列化**：运行时模型和可序列化 BlockSchema/NodeSchema 之间的双向转换

## 代码生成和解析管道

VTJ 通过复杂的解析和代码生成管道实现 Vue 单文件组件 （SFC） 和低代码 DSL 之间的双向转换。

### DSL 到组件渲染管道

![](../svg/2/5.png)

渲染管道通过几个阶段将 `BlockSchema` 定义转换为可执行的 Vue 组件：

- **DSL 加载** ：createLoader 函数创建一个递归解析组件依赖关系的 BlockLoader
- **组件解析** ：NodeFrom 配置指定如何加载组件（`Schema`、`UrlSchema`、`Plugin` 类型）
- **异步组件创建** ：Vue 的 `defineAsyncComponent` 支持通过 **loaders** 进行缓存的延迟加载组件
- 上下文集成 ：`CreateRendererOptions` 提供包括 Vue 实例、组件库和 API 在内的运行时上下文

### Vue SFC 解析和代码生成

![](../svg/2/6.png)

双向转换系统支持视觉设计和代码之间的无缝过渡：

- **解析器集成**：`@vtj/parser`将 Vue SFC 转换为 `BlockSchema` 以进行可视化编辑
- **代码生成** ：`@vtj/coder` 包从 `BlockSchema` 定义生成完整的 Vue 项目
- **服务层** ：通过 `Service.saveFile（）` 和 `Service.getFile（）` 进行的文件作保持同步
- **AI 集成** ：`Engine.applyAI（）` 方法使 AI 生成的 DSL 能够集成到设计工作流程中

`Engine.genSource（）` 方法编排完整的代码生成过程，而 `createRawPage（）` 支持具有可视化组件和基于代码的组件的混合工作流。

## 运行时架构和上下文管理

运行时系统通过分层上下文架构管理不同模式和平台上的组件执行

### 上下文和模式管理

![](../svg/2/7.png)

运行时体系结构根据 `ContextMode` 调整行为：

- **设计模式** ：完整的设计时功能，带有热重载和可视化编辑工具
- **运行时模式** ：针对生产部署优化组件执行
- **Raw 模式**：直接执行 Vue 组件，无低代码开销

`模拟器`会创建一个隔离的 iframe 环境 （`contentWindow`），其中包含自己的 `SimulatorEnv`：

- **组件注册表**：从 Materials 和 dependencies 解析的组件
- **API 层** ：具有模拟数据支持的基于 Schema 的 API
- **平台适配器** ：`Web` 与 `uniapp` 平台的不同应用程序创建策略

### 多平台运行时适配

![](../svg/2/8.png)

特定于平台的运行时创建可处理不同的执行环境：

- **Web 平台** ：带有 Vue 路由器和 DOM 安装的标准 Vue 应用程序
- **UniApp 平台** ：使用 `setupUniApp（）` 和 `UniH5` 运行时集成进行专门设置
- **插件安装** ：根据依赖项配置自动安装库插件
- **路由器配置**：具有不同历史模式的平台适当路由设置

`Provider.install（）` 方法管理跨平台的插件安装和全局属性设置。

:::info 提示
内容由AI翻译，可能会出现错漏或过时信息，请查阅原文：https://deepwiki.com/ChenXiaohui99/vtj/2-core-architecture
:::

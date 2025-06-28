# 项目设置与脚手架

本文档提供了使用内置脚手架系统创建新 VTJ 项目的详细说明，涵盖 `create-vtj` 脚手架工具、项目模板、开发环境设置和生成的项目结构。关于将 VTJ 集成到现有 Vue 项目中的信息，请参阅**集成指南**文档。

## 开发环境要求

VTJ 使用最新的 Vue 3 生态系统，对开发环境有特定要求：

- **Node.js**：版本 20+（推荐使用 nvm 进行 Node 版本管理）
- **包管理器**：lerna 和 pnpm

使用以下命令安装所需的全局软件包：

```shell
npm install -g lerna@latest pnpm@latest --registry=https://registry.npmmirror.com
```

## create-vtj 脚手架系统

VTJ 提供了 `create-vtj` 脚手架工具，可从预定义模板生成新项目。该工具作为独立包实现，处理项目初始化、依赖项管理和模板处理。

### 可用项目模板

| 模板类型        | 命令参数    | 目标平台           | 描述                 |
| --------------- | ----------- | ------------------ | -------------------- |
| Web 应用程序    | -t app      | PC 桌面应用        | Vue 3 + Element Plus |
| H5 移动应用程序 | -t h5       | 移动 Web 应用      | Vue 3 + Vant UI      |
| Uni-App 跨平台  | -t uniapp   | iOS/Android/小程序 | Uni-App 框架         |
| 物料库          | -t material | 组件开发           | 自定义组件库         |

### 脚手架工具架构

![](../svg/17/1.png)

create-vtj 包使用 cross-spawn、kolorist、minimist 和 prompts 进行交互式项目创建和进程管理。

## 脚手架流程与模板系统

### create-vtj CLI 实现

`create-vtj` 包实现了一个交互式 CLI，引导用户完成项目创建过程：

![](../svg/17/2.png)

### 模板到应用的映射

脚手架系统将模板映射到 monorepo 中的实际应用示例：

| 模板     | 源应用        | 关键依赖项                         |
| -------- | ------------- | ---------------------------------- |
| app      | apps/app      | @vtj/web、element-plus、vue-router |
| h5       | apps/h5       | @vtj/h5、vant、vue-router          |
| uniapp   | apps/uniapp   | @vtj/uni-app、@dcloudio/uni-app    |
| material | apps/material | @vtj/core、element-plus            |

### 脚手架后初始化

复制模板后，VTJ 系统执行运行时初始化：

- **LocalService**：从 @vtj/local 包创建 LocalService 实例
- **ProjectModel**：使用 @vtj/core 数据结构初始化项目架构
- **MaterialManager**：从 @vtj/materials 加载组件库
- **DevTools 集成**：从 @vtj/pro/vite 设置 Vite 插件
- **资源管道**：将物料复制到 public/@vtj/ 目录

## 项目结构

### 标准项目结构

![](../svg/17/3.png)

### VTJ 项目目录结构

![](../svg/17/4.png)

### 主要目录功能

- **src/pages/**：包含使用 @vtj/coder 包从 DSL 生成的 Vue SFC
- **public/@vtj/materials/**：@vtj/materials 包中的运行时资源
- **.vtj/files/**：表示低代码组件的 BlockSchema JSON 文件
- **.vtj/projects/**：由 @vtj/core 管理的 ProjectModel 配置
- **.vtj/histories/**：由设计器维护的版本历史记录

### .gitignore 配置

建议从版本控制中排除某些 VTJ 目录，避免仓库膨胀：

```
# VTJ
.vtj/histories
```

## 配置

### package.json 中的基础配置

package.json 中的 vtj 部分提供 VTJ 项目的基础配置：

```json
{
  "vtj": {
    "id": "your-project-id",
    "name": "Your Project Name",
    "description": "Project description",
    "platform": "web", // 或 "h5", "uniapp"
    "history": "hash", // 或 "web"
    "base": "/",
    "pageRouteName": "page", // uniapp 中为 "pages"
    "plugins": [] // 额外插件
  }
}
```

### VTJ 配置架构

脚手架系统在 package.json 中生成包含 vtj 配置的项目：

```json
{
  "vtj": {
    "id": "project-id",
    "name": "Project Name",
    "description": "Project description",
    "platform": "web", // "h5" | "uniapp"
    "history": "hash", // "web"
    "base": "/",
    "pageRouteName": "page", // uniapp 中为 "pages"
    "remote": "https://lcdp.vtj.pro",
    "checkVersion": true
  }
}
```

### 配置处理管道

![](../svg/17/5.png)

LocalService 类处理配置，并根据平台设置创建适当的平台适配器。

### 配置流程

![](../svg/17/6.png)

## VTJ CLI 与构建系统

### @vtj/cli 包架构

@vtj/cli 包提供核心构建工具和开发工具：

![](../svg/17/7.png)

### 生成的 Vite 配置

脚手架使用 VTJ DevTools 插件创建 vite.config.ts：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createDevTools } from '@vtj/pro/vite';

export default defineConfig({
  plugins: [
    vue(),
    createDevTools() // VTJ 开发工具
  ]
});
```

### CLI 包依赖项

@vtj/cli 包包含全面的构建工具：

| 依赖项类别   | 关键包                                     |
| ------------ | ------------------------------------------ |
| 构建工具     | vite、typescript、vue-tsc、sass            |
| Vue 生态系统 | @vitejs/plugin-vue、@vitejs/plugin-vue-jsx |
| 测试         | vitest、@vitest/coverage-v8、jsdom         |
| 代码处理     | @babel/core、terser、rollup                |
| VTJ 集成     | @vtj/node、serve-static、body-parser       |

## 依赖项管理

### 平台特定依赖项矩阵

脚手架系统根据目标平台配置不同的依赖项集：

| 平台         | 核心 VTJ 包                           | UI 框架          | 其他依赖项                       |
| ------------ | ------------------------------------- | ---------------- | -------------------------------- |
| Web 应用程序 | @vtj/web、@vtj/core、@vtj/renderer    | element-plus     | @vtj/charts、@vtj/icons、@vtj/ui |
| H5 移动版    | @vtj/h5、@vtj/core、@vtj/renderer     | vant             | @vtj/utils                       |
| UniApp       | @vtj/uni-app、@vtj/renderer、@vtj/uni | @dcloudio/uni-ui | @dcloudio/uni-\* 平台包          |
| 物料库       | @vtj/core、@vtj/pro、@vtj/web         | element-plus     | @vueuse/core                     |

### 物料资源管道

![](../svg/17/8.png)

### Monorepo 包依赖项

脚手架项目使用 pnpm-lock.yaml 中的 workspace:~ 协议引用工作区包：

```yaml
dependencies:
  '@vtj/web':
    specifier: workspace:~
    version: link:../../platforms/web
  '@vtj/renderer':
    specifier: workspace:~
    version: link:../../packages/renderer
```

这支持本地开发，并在整个 monorepo 中实现即时包更新。

### 添加自定义依赖项

您可以通过设计器界面添加自定义依赖项，这将更新项目架构。依赖项在运行时从物料目录加载。

## 运行时配置

### 引擎与提供者配置

VTJ 系统初始化两个主要组件：

- **引擎**：支持设计时体验（可视化编辑器）
- **提供者**：管理运行时组件和依赖项

![](../svg/17/9.png)

## 静态资产管理

VTJ 管理 public/@vtj 目录中的静态资产：

- **materials/**：包含组件库和 UI 物料资源
- **plugins/**：包含从 node_modules 加载的插件资源
- **extension/**：包含自定义扩展

系统自动从以下位置复制资产：

1. @vtj/materials 包
2. 自定义物料目录
3. 与配置前缀匹配的插件包

## 开发工作流程

### 启动脚手架项目

使用 create-vtj 创建项目后，典型的开发工作流程：

```shell
cd your-project-name
npm install
npm run dev
```

### VTJ 开发服务器架构

![](../svg/17/10.png)

### 代码生成工作流程

VTJ 设计器使用 @vtj/coder 包生成 Vue SFC：

1. **设计阶段**：使用可视化设计器创建组件
2. **架构存储**：将 BlockSchema DSL 保存到 .vtj/files/
3. **代码生成**：使用 "Publish" 通过 @vtj/coder 生成 Vue SFC
4. **集成**：在 src/pages/ 中生成的组件自动路由

### 开发工具集成

脚手架项目包含 Vue DevTools 集成和通过 @vtj/pro 平台包提供的调试支持。

## 故障排除

### 常见问题

- **缺少物料**：确保已安装 @vtj/materials，且开发服务器配置正确
- **插件加载错误**：检查插件是否遵循所需格式并正确安装
- **静态资源未找到**：验证 staticBase 配置及资源是否正确复制
- **设计器未加载**：检查浏览器控制台错误，验证 API 服务器是否正常运行

您可以检查 .vtj/logs 目录中的日志获取详细的错误信息。

## 后续步骤

成功设置 VTJ 项目后，您可以：

1. 探索设计器界面创建 UI 组件
2. 了解如何创建自定义组件物料
3. 学习用于高级自定义的 DSL 架构格式
4. 将 VTJ 集成到现有项目中（请参阅**集成指南**文档）

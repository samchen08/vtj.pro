# 开始

本文档提供了在开发工作流程中设置、配置和使用 VTJ 的实用指南。它涵盖了使用基架工具创建初始项目、环境设置和基本集成模式。

有关核心体系结构和引擎组件的详细信息，请参阅**核心体系结构** 。有关特定于平台的部署指南，请参**阅平台实施** 。有关高级开发和插件创建的信息，请参阅**开发人员工具和可扩展性** 。

## 先决条件和系统要求

VTJ 需要特定的开发环境配置才能正常运行：

- **Node.js**：版本 20.0.0 或更高版本（建议使用以实现最佳兼容性）
- **包管理器** ：pnpm（推荐）和 lerna，用于 monorepo 开发
- **Vue.js**：支持 TypeScript 的 3.5.5+ 版本
- **构建工具** ：用于构建过程的 Vite

```shell
# Install required global dependencies
npm install -g lerna@latest pnpm@latest --registry=https://registry.npmmirror.com
```

## 使用 Scaffolding 创建项目

VTJ 通过 create-vtj 提供了一个全面的脚手架系统，该系统可以生成特定于平台的项目模板：

### 基架命令结构

![](../svg/16/1.png)

### 可用模板

| 模板类型     | 命令        | 目标平台     | UI 框架         |
| ------------ | ----------- | ------------ | --------------- |
| Web 应用程序 | -t app      | 桌面/PC 网页 | Element Plus    |
| H5 移动版    | -t h5       | 移动网页     | Vant            |
| UniApp       | -t uniapp   | 跨平台       | Uni-UI 用户界面 |
| 材料库       | -t material | 组件开发     | Configurable    |

### 创建项目

```shell
# Web application (PC desktop)
npm create vtj@latest --registry=https://registry.npmmirror.com -- -t app

# H5 mobile application
npm create vtj@latest --registry=https://registry.npmmirror.com -- -t h5

# Cross-platform uni-app
npm create vtj@latest --registry=https://registry.npmmirror.com -- -t uniapp

# Material/component library
npm create vtj@latest --registry=https://registry.npmmirror.com -- -t material
```

## 开发环境设置

### 本地开发设置

要参与 VTJ 或深度定制，请设置完整的开发环境：

```shell
# Clone the repository
git clone https://gitee.com/newgateway/vtj.git
cd vtj

# Initialize and build
npm run setup && npm run build && npm run app:dev
```

### 开发环境架构

![](../svg/16/2.png)

### 开发命令

| 命令            | 目的           | 用法         |
| --------------- | -------------- | ------------ |
| npm run setup   | 初始化依赖项   | 首次设置     |
| npm run build   | 构建所有软件包 | 设置或更改后 |
| npm run app:dev | 启动开发服务器 | 开发工作流程 |
| npm run clean   | 清理构建工件   | 重置环境     |

## 集成模式

### 平台集成架构

![](../svg/16/3.png)

### 基本项目结构

生成的 VTJ 项目遵循以下结构：

```
project-root/
├── src/
│   ├── main.ts              # Application entry point
│   ├── App.vue              # Root component
│   └── components/          # Custom components
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Build configuration
└── vtj.config.js            # VTJ-specific configuration
```

### 生成项目中的核心依赖项

| 包            | 目的           | 集成点       |
| ------------- | -------------- | ------------ |
| @vtj/web      | Web 平台运行时 | 主要应用     |
| @vtj/renderer | 组件渲染       | 模板引擎     |
| @vtj/ui       | UI 组件库      | 设计系统     |
| @vtj/icons    | 图标库         | 视觉元素     |
| @vtj/utils    | 效用函数       | 帮助程序方法 |

## 配置和定制

VTJ 平台支持通过 `package.json` 中的 `vtj` 字段进行配置：

```json
{
  "vtj": {
    "name": "VTJ.PRO",
    "platform": "web",
    "remote": "https://lcdp.vtj.pro"
  }
}
```

### 环境变量

| 变量       | 目的         | 违约  |
| ---------- | ------------ | ----- |
| ENV_TYPE   | 环境类型     | local |
| UMD        | UMD 构建标志 | false |
| BUILD_TYPE | 构建目标     | -     |

### 开发工作流程

1. **项目创建** ：将 create-vtj 与适当的模板一起使用
1. **开发** ：为本地开发服务器运行 npm run dev
1. **构建** ：使用 npm run build 进行生产构建
1. **集成** ：导入 VTJ 组件并使用设计器/渲染器

## 后续步骤

设置 VTJ 项目后：

1. **探索 Designer**：访问可视化设计器界面以进行拖放式开发
1. **组件库** ：浏览可用的 UI 组件和材料
1. **AI 功能**：利用 AI 驱动的代码生成功能
1. **平台部署** ：为目标部署平台进行配置

有关项目设置和基架的详细指南，请参阅**项目设置和基架** 。有关与现有项目的集成，请参阅 **集成指南**

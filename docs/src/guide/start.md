# VTJ.PRO 快速上手指南

## 创建 VTJ 应用

VTJ.PRO 提供开箱即用的项目脚手架，可快速创建基于 VTJ 低代码的开发工程，预置最佳实践配置，特别适合新项目开发。

:::tip 前提条件

- **命令行基础**：熟悉终端基本操作
- **Node.js 环境**：已安装 v20 或更高版本（推荐使用 [LTS 版本](https://nodejs.org/)）
  :::

### 通过脚手架创建项目

执行以下命令创建项目（根据网络情况选择命令）：

```sh
# 标准创建（推荐网络畅通时使用）
npm create vtj@latest -- -t app

# 国内用户加速方案（使用淘宝镜像）
npm create vtj@latest --registry=https://registry.npmmirror.com -- -t app
```

### 初始化与启动项目

创建完成后按提示操作：

```sh
# 进入项目目录（目录名根据提示输入）
cd your-project-name

# 安装依赖（首次执行可能需 1-3 分钟）
npm run setup

# 启动开发服务器
npm run dev
```

成功启动后，终端将显示本地访问地址（通常为 `http://localhost:5173`），浏览器访问该地址看到如下界面即表示运行成功：

![启动页面](../assets/startup.png)

> **低代码开发提示**：此时可打开设计器开始可视化开发，设计器入口通常为 `http://localhost:5173/__vtj__/`

---

### 项目类型选择

根据目标平台选择创建命令：

| 平台类型            | 命令                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Web应用** (PC端)  | `npm create vtj@latest -- -t app` <br> 或镜像加速版：<br> `npm create vtj@latest --registry=https://registry.npmmirror.com -- -t app` |
| **H5应用** (移动端) | `npm create vtj@latest -- -t h5` <br> 或镜像加速版：<br> `npm create vtj@latest --registry=https://registry.npmmirror.com -- -t h5`   |

---

### 项目工程资源

- **配置文档**：[项目工程模板详解](./base/project-template.md)
  - 包含目录结构说明、环境配置、构建部署等核心配置
- **示例代码库**：[https://gitee.com/newgateway/examples-vtj/tree/master/packages/app](https://gitee.com/newgateway/examples-vtj/tree/master/packages/app)

---

### 设计器使用

- **设计器手册**：[低代码设计器完全指南](./base/designer.md)
  - 组件拖拽配置 · 数据绑定 · 事件联动 · 主题定制

---

### 常见问题排查

1. **依赖安装失败**：
   - 尝试删除 `node_modules` 后重新执行 `npm run setup`
   - 检查网络代理设置或切换 npm 镜像源
2. **端口冲突**：

   - 修改 `vite.config.js` 中的 `server.port` 配置项

3. **设计器加载异常**：
   - 确保使用 Chrome/Edge 等现代浏览器
   - 清除浏览器缓存后重试

> 获取实时支持：加入 [VTJ 开发者社区](https://gitee.com/newgateway/vtj) 或提交 Issue

---

**下一步建议**：  
完成创建后，建议优先阅读 [设计器使用手册](./base/designer.md) 掌握核心开发工作流，再参考示例工程进行模块化开发。

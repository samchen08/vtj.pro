# 设计器

- 新建页面或区块时校验和自动格式组件名称
- 样式设置面板
- 属性设置器支持多级对象/数组
- API管理支持请求设置配置

# UI组件库

- XDialogForm 弹窗表单
- XChart 数据图表
- XUpload 上传组件
- XTabs 选项卡
- XToolbar 工具条
- XTable 表格组件
- XList 数据列表
- XDataItem 数据项
- XDataPicker 数据选择器
- XOrgPicker 组织架构/人员选择器
- XLogin 登录组件（支持账号密码、短信验证码、扫码）登录

# Docs

- 组件预览

# Assets

- 支持 Ant Design Vue

# Adapter

- 适配业务请求
- 适配登录

# 分包重构规划

## 脚手架

- create-vtj 独立

## 基础工具库

- @vtj/base 基础工具库，支持 node 和 浏览器环境
- @vtj/node 仅支持Node环境公共工具库。依赖：@vtj/base
- @vtj/electron 仅支持electron环境公共工具库。依赖：@vtj/node
- @vtj/utils 仅支持浏览器环境公共工具库。依赖：@vtj/base
- @vtj/icons 图标库，依赖：@vtj/cli

## 脚手架配置工具

- @vtj/cli 项目脚手架。依赖：@vtj/node

## web项目组件库

- @vtj/ui 组件库，依赖：@vtj/cli、 @vtj/utils、@vtj/icons

## 移动端组件库

- @vtj/mui， 依赖：@vtj/cli、 @vtj/utils、@vtj/icons

## 协议定义

- @vtj/types 基础类型定义

## 低代码

- @vtj/assets 资产。依赖：@vtj/cli、@vtj/types
- @vtj/core 低代码核心库，依赖：@vtj/base、@vtj/types
- @vtj/coder 代码生成器。依赖：@vtj/types、@vtj/core
- @vtj/serve 本地开发服务：依赖：@vtj/coder
- @vtj/designer 低代码设计器。依赖：@vtj/cli、@vtj/core、@vtj/utils、@vtj/icons、@vtj/ui、 @vtj/renderer
- @vtj/renderer 低代码渲染器。依赖： @vtj/types
- @vtj/runtime 项目运行时。依赖：@vtj/cli、@vtj/renderer
- @vtj/ide 项目ide载体。依赖：：@vtj/cli、@vtj/assets、@vtj/designer、@vtj/serve、@vtj/runtime
- @vtj/lcdp 低代码平台，依赖：@vtj/ui、@vtj/serve、@vtj/runtime、@vtj/ide

## 项目工程模板

- projects/node 依赖：@vtj/cli、@vtj/node
- projects/web 依赖：@vtj/cli、@vtj/utils、@vtj/icons、@vtj/ui
- projects/uniapp 依赖：@vtj/cli、@vtj/utils、@vtj/icons、@vtj/mui
- projects/electron 依赖：@vtj/cli、@vtj/electron

## 开发调试

- dev

## 业务库

- @newpearl/vtj 依赖 @vtj/utils、@vtj/icons、@vtj/ui

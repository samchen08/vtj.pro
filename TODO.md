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
- XCard 卡片组件
- XList 数据列表
- XDataItem 数据项
- XDataCard 数据卡片
- XDataPicker 数据选择器
- XLogin 登录组件（支持账号密码、短信验证码、扫码）登录

# Docs

- 组件预览

# Assets

- 支持 Ant Design Vue

# Adapter

- 适配业务请求
- 适配登录

# 分包重构规划

- create-vtj 独立
- @vtj/types 基础类型定义
- @vtj/base 基础工具库，支持 node 和 浏览器环境
- @vtj/utils 仅支持浏览器环境公共工具库。依赖：@vtj/base
- @vtj/cli 项目脚手架。依赖：@vtj/base
- @vtj/assets 资产。依赖：@vtj/cli、@vtj/types
- @vtj/icons 图标库，依赖：@vtj/cli
- @vtj/ui 组件库，依赖：@vtj/cli、 @vtj/utils、@vtj/icons
- @vtj/core 低代码核心库，依赖：@vtj/base、@vtj/types
- @vtj/editor 代码编辑器组件。依赖：@vtj/cli
- @vtj/formatter 代码格式化工具库。依赖：@vtj/cli
- @vtj/coder 代码生成器。依赖：@vtj/types、@vtj/core、@vtj/formatter
- @vtj/serve 本地开发服务：依赖：@vtj/base、@vtj/coder
- @vtj/designer 低代码设计器。依赖：@vtj/cli、@vtj/core、@vtj/utils、@vtj/icons、@vtj/editor
- @vtj/runtime 项目运行时。依赖：@vtj/cli、@vtj/core
- @vtj/ide 项目ide载体。依赖：：@vtj/cli、@vtj/assets、@vtj/designer、@vtj/serve、@vtj/runtime
- @vtj/boot 项目测试工程。依赖 @vtj/cli、@vtj/serve、@vtj/runtime、@vtj/ide、@vtj/utils、@vtj/icons、@vtj/ui

- @vtj/deps 依赖包汇总引用，依赖：@vtj/cli、 @vtj/serve、@vtj/runtime、@vtj/ide、@vtj/utils、@vtj/icons、@vtj/ui

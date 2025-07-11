# Todo

## 需求池

### ~~AI助手支持解析Sketch/Figma/蓝湖/MasterGo元数据生成页面~~

- Sketch/Figma 实现方式

  1. 开发Sketch插件，导出设计稿图层json格式数据
  1. AI助手支持上传json文件和文本录入json内容
  1. 解析和压缩json数据
  1. 调用 Claude 4 生成提示词
  1. 对接回现有的DeepSeek生成代码API

### AI识别图生代码时自动生成相似装饰图片

- 技术调研

### 历史记录支持手动和自动模式

- 实现需求

  1. 历史记录面板增加一个 自动/手动 开关 和 手动触发保存记录的按钮
  1. 手动触发的保存需要填写备注信息， 最近的50份记录排除手动的（即手动保存的记录不会自动删除）
  1. 历史项目支持打标记，打了标记的项即转为手动记录

### 可配置化的JSON设置器

- 组件有的属性是 Object/Array 类型，不了解内部数据结构时，用户难设置。需要对数据进行schema描述提示，用表格形式显示，需要支持数类型：键值对、基础类型数组、对象的数组。

### 设计视图区支持打开多个文件

- 工作区的Tab改为记录最近打开的页面、区块，设计视图、源码视图、DSL视图改为到当前激活的Tab项内切换。

### 增加AI Agent，支持自然语言操作页面、区块、数据源等

- 验证可行性

### 扩展物料库

- 独立代码仓库构建扩展物料库

### 静态文件资源管理器

- 支持本地文件和oss文件资源管理

### 设计器支持应用级的全局功能和样式配置

- 自定义增强应用全局代码，全局样式

### 芋道深度集成案例

### 自建平台项目示例工程

### 设计器优化

- 页面、区块支持自动生成名称
- 大纲树显示节点class名
  ~~- 节点样式设置支持 flex-grow、flex-shrink设置~~
- XIcon组件迁移到 @vtj/icons 依赖，调整AI提示词
- AI元数据支持文本输入，支持 MasterGo
- 依赖物料组件支持配置是否显示在组件库面板
- 页面路由支持嵌套，增加RouterView
- 区块定义属性支持指定属性设置器
- 区块定义支持设置组件暴露
- 支持自定义路由和文件名，文件保存位置
- ~~页面中的区块支持快捷方式打开~~

### 视频教程

### 在线LCDP

- 应用支持权限设置： 公开（无需任何身份验证即可访问），内部公开（任何登录的用户都可以访问），非公开（仅限自己访问）
- 用户列表支持注册时间排序

### 重构DevTool模块

### bugs

- ~~页面另存为区块时，css样式没有带过去~~
- ~~页面mounted拿不到$refs~~
- ~~区块第一次拖进页面后，无法再拖到，需要刷新才可以~~
- ~~vue代码 v-if v-for template标签内无子标签或多个子标签，parser异常~~
- pro engine 处理跳转链接需要适配 设置了 pageRouteName 的情况

## 版本规划

### v0.13.0

- AI Agent 应用级智能体
- AI助手元数据支持文本录入，支持MasterGo导出的json
- 页面、区块支持自定义文件名、页面路由，支持RouterView
- 应用全局功能配置，包括：css、store、request
- 变量设置器左侧增加当前项目可用页面tab
- 区块定义支持设置组件暴露
- 配置化JSON设置器
- 资源文件管理器
- 设计视图支持打开多个文件
- 历史记录支持手动保存，支持自定义标记

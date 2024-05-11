# Todo

- ~~create-vtj 模板增加 .gitighore 文件~~
- ~~项目增加启始页~~
- ~~docs支持嵌套iframe页面~~
- ~~开发环境检测运行json和源码文件版本不一致时提示~~
- ~~源码模式页面用name作id~~
- 主题切换动画效果
- 整站发布显示结果详情
- UI物料
- 设置器： 样式、数据、变量颜色
- 设计器帮助中心支持刷新和主页功能
- 设计器错误日志模块
- 设计器模板应用
- 设计器资源管理器应用
- 设计器大纲树支持清空子组件功能
- ~~设计器大纲树显示插槽名称~~
- 演示样例模板
- Mask pro风格主题
- ~~uniapp工程支持cli环境配置~~
- 支持配置源码文件生成位置
- ~~Api支持mock设置~~
- ~~内置组件增加 html 和 路由相关元素~~
- 设计器属性设置，禁用已绑定了双向绑定的属性设置器
- 设计视图禁用组件鼠标事件
- 画布支持组件拖拽
- ~~ssh发布阿里云~~
- 依赖管理增加重置内置依赖项功能
- ~~文件上传设置器~~
- ~~local 支持文件上传~~
- ~~区块支持远程schema 和 远程高代码组件~~
- ~~element-plus 国际化~~
- 设计器定义组件属性列表显示属性的数据类型
- 设计器区块定义属性支持设置 setter
- 设计器区块定义事件、插槽支持设置参数
- ~~出码$props 改为 props~~
- 文件选择器支持目录
- ~~低代码引擎支持动态加载扩展~~
- 支持项目内置区块插件配置，在 package.json 配置
- 接口测试用例支持 成功 和 失败内容展示
- ~~变量绑定高级列表支持方法和数据类型展示~~

# 定制版

- Meta数据源
- Adapter适配
- 用户体系
- 物料市场

# Bug

- ~~编辑属性导致selected丢失~~
- ~~历史记录需要回写block dsl~~
- 高度满屏，宽度小的情况下，设计器helper显示异常
- 源码生成格式模板标签增加换行
- ~~源码生成引用 $libs.VtjUtils 没有被替换前缀~~
- ~~更改依赖后组件库分组没有刷新~~
- ~~绑定作用域加可选符报错 如：this.context?.~~
- ~~绑定事件没刷新设置面板~~
- ~~绑定事件 简写箭头函数出码报错 e => this.methodName(e)~~
- ~~运行时自定义区块组件默认插槽内容异常不显示~~
- ~~自定义区块自定义事件失效~~
- ~~大纲树中拖拽子节点放置到根节点，dsl没有更新~~
- ~~插槽内容节点为template时,出码生成重复template~~
- ~~定义事件的事件名称不支持 update:modelValue 格式，无法增加双向绑定~~
- ~~出码state 初始值不能指定props~~
- ~~出码作用域插槽没传递出来~~
- ~~编译后不应该调service.init~~
- 设计和预览模式双向绑定的输入框会刷新失去焦点，无法连续输入（待重现）
- ~~设计画布拖拽组件需要判断，不能有无限递归~~
- XField组件options更新没有触发UI渲染（待重现）
- 设计器生命周期函数加 async 出码报错（待重现）

# UI

- XQrcode 二维码 https://github.com/rx-ts/vue/blob/master/packages/vue-qrcode/index.ts
- XImageCodeInput 图形验证码输入框
- XSmsCodeInput 短信验证码输入框
- XAttachment 附件管理（upload/viewer）
- XCondition 查询条件表单
- XFilterBar 筛选栏
- XToolbar 工具栏
- XTable 高级表格
- XDataPicker 数据选择器
- XLogin 登录
- XLockscreen 锁屏
- XPrint
- XOrgPicker 组织架构
- XConfigPage 配置化页面

# 路线图

- v0.8 远程区块、资源管理
- v0.9 物料市场、配套后端服务。支持按模板创建页面、上传模板、安装区块
- v1.0 完善UI、模板、区块、文档、发布社区正式版本
- v1.1 用户体系
- v1.2 团队协作
- v1.3 vscode插件
- v1.4 支持uni-app
- v1.5 支持Electron
- v1.6 AI助手

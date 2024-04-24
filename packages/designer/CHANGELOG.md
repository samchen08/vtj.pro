# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.5](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.8.4...@vtj/designer@0.8.5) (2024-04-24)


### Bug Fixes

* 🐛 更新项目信息不能正常渲染插件 ([a8ddf43](https://gitee.com/newgateway/vtj/commits/a8ddf4356dc03e1b430ebeba4195c1af88c20827))
* 🐛 加载插件css文件环境错误 ([43dface](https://gitee.com/newgateway/vtj/commits/43dface3f7d0c5c3ed78a8586567f06392be7040))





## [0.8.4](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.8.3...@vtj/designer@0.8.4) (2024-04-24)


### Bug Fixes

* 🐛 设计画布拖拽组件需要判断，不能有无限递归 ([6f0d412](https://gitee.com/newgateway/vtj/commits/6f0d412fe45cfc9428ea88c6b84cf4074177ac5c))






## [0.8.3](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.8.2...@vtj/designer@0.8.3) (2024-04-23)


### Bug Fixes

* 🐛 大纲树中拖拽子节点放置到根节点，dsl没有更新 ([c6a020b](https://gitee.com/newgateway/vtj/commits/c6a020b8b5f5fdec9b5e58a87fb750589f2d5668))
* 🐛 历史记录需要回写block dsl ([5002912](https://gitee.com/newgateway/vtj/commits/500291222323f57ee5846a382a63821c51a7d8b1))


### Features

* ✨ 设计画布支持拖拽 ([a4e8866](https://gitee.com/newgateway/vtj/commits/a4e8866a4e0bf118fcfca37cd98aa81bb1029059))






## [0.8.2](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.8.1...@vtj/designer@0.8.2) (2024-04-22)


### Bug Fixes

* 🐛 编译后不应该调service.init; 出码$props 改为 props ([b3ab003](https://gitee.com/newgateway/vtj/commits/b3ab003c59df81225da8b0a43593f2b28f7bf53b))
* 🐛 出码作用域插槽没传递出来 ([bfdcf63](https://gitee.com/newgateway/vtj/commits/bfdcf630d5a67d4e7d6e60cb23537da9a89ae224))
* 🐛 定义事件的事件名称不支持 update:modelValue 格式，无法增加双向绑定 ([3cba3c7](https://gitee.com/newgateway/vtj/commits/3cba3c76687f2e3a0842ae6957f69266c0fd92fe))





## [0.8.1](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.8.0...@vtj/designer@0.8.1) (2024-04-22)


### Bug Fixes

* 🐛 cli template ([911c3a0](https://gitee.com/newgateway/vtj/commits/911c3a0e2bb60548affe5dcf5a496577809d63b8))






# [0.8.0](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.7.34...@vtj/designer@0.8.0) (2024-04-22)


### Bug Fixes

* 🐛 修复组件渲染根节点是text类型时无法选中设置属性 ([4bce89e](https://gitee.com/newgateway/vtj/commits/4bce89e21608d1eabeb89de4f451ee2abb556feb))


### Features

* ✨ 依赖支持语言包设置 ([362190e](https://gitee.com/newgateway/vtj/commits/362190e66d663412d2d07261bc29b9ef439af8ed))
* ✨ 支持 UrlSchema ([edae2c5](https://gitee.com/newgateway/vtj/commits/edae2c52ce88ad72a4a7c31844385dc083249e72))
* ✨ 支持区块插件 ([88b5028](https://gitee.com/newgateway/vtj/commits/88b5028cdb142dd9f5642c51ecb9f978333858ce))
* ✨ add FileSetter ([8467349](https://gitee.com/newgateway/vtj/commits/8467349162e8694808fd3fdcd2354d8bb6de086f))


### Performance Improvements

* ⚡ 代码优化 ([8d5e2d3](https://gitee.com/newgateway/vtj/commits/8d5e2d366876cd1c91eb8e4c7b30237e65dd33b5))






## [0.7.34](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.7.33...@vtj/designer@0.7.34) (2024-04-10)


### Bug Fixes

* 🐛 designer about ([0c17f56](https://gitee.com/newgateway/vtj/commits/0c17f56644bbf9f3af974b838917ae5d82881bcd))






## [0.7.33](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.7.32...@vtj/designer@0.7.33) (2024-04-08)


### Bug Fixes

* 🐛 ant-design-vue reset.css path error ([add106d](https://gitee.com/newgateway/vtj/commits/add106dfb13ddb57b3247bbd2683e862c48aecd1))
* 🐛 deps merge ([8c5670b](https://gitee.com/newgateway/vtj/commits/8c5670b2caa4a2c594a7af0e25c0ece9fafb16e6))


### Features

* ✨ 设计器支持ckeditor ([5225869](https://gitee.com/newgateway/vtj/commits/522586927c1ef13ff7e1c02b5df962092805f4a0))






## [0.7.32](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.7.31...@vtj/designer@0.7.32) (2024-04-03)


### Bug Fixes

* 🐛 大纲树default插槽不显示 ([67e7266](https://gitee.com/newgateway/vtj/commits/67e7266c1e92073b95262a1b69caf038a0d00692))






## [0.7.31](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.7.30...@vtj/designer@0.7.31) (2024-04-03)


### chore

* 🚀 格式化提交信息 ([fede392](https://gitee.com/newgateway/vtj/commits/fede3924392a8297d2b2fe37565fd975116b8bf2))


### Features

* ✨ api mock ([df7400f](https://gitee.com/newgateway/vtj/commits/df7400f1c2f7aa20f24e5217b177a38877de5cdd))


### BREAKING CHANGES

* 🧨 no






## [0.7.31](https://gitee.com/newgateway/vtj/compare/@vtj/designer@0.7.30...@vtj/designer@0.7.31) (2024-04-03)


### chore

* 🚀 格式化提交信息 ([fede392](https://gitee.com/newgateway/vtj/commits/fede3924392a8297d2b2fe37565fd975116b8bf2))


### Features

* ✨ api mock ([df7400f](https://gitee.com/newgateway/vtj/commits/df7400f1c2f7aa20f24e5217b177a38877de5cdd))


### BREAKING CHANGES

* 🧨 no

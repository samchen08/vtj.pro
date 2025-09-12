export default [
  {
    text: '开始',
    base: '/guide',
    items: [
      { text: '简介', link: '/' },
      { text: '快速上手', link: '/start' },
      { text: '项目集成', link: '/integration' }
      // {
      //   text: '打造专属低代码平台(案例)',
      //   link: '/newpearl'
      // }
      // { text: '开发示例', link: '/newpearl' }
    ]
  },
  {
    text: '基础',
    base: '/guide',
    items: [
      { text: '创建一个低代码应用（ Todo ）', link: '/base/todo' },
      {
        text: '设计器入门教程',
        collapsed: true,
        items: [
          { text: '概念', link: '/base/concept' },
          { text: '项目工程搭建和配置', link: '/designer/01' },
          { text: '可视化设计器功能概述', link: '/designer/02' },
          { text: '页面管理', link: '/designer/03' },
          { text: '物料和依赖管理', link: '/designer/04' },
          { text: '工作区和画布操作', link: '/designer/05' },
          { text: '节点大纲树', link: '/designer/06' },
          { text: '历史记录', link: '/designer/07' },
          { text: '页面设置', link: '/designer/08' },
          { text: '节点设置', link: '/designer/09' },
          { text: '设置器和绑定器', link: '/designer/10' },
          { text: 'API管理和数据源', link: '/designer/11' },
          { text: '区块管理', link: '/designer/12' },
          { text: '预览、调试和发布', link: '/designer/13' }
        ]
      },
      { text: '设计器接入指南', link: '/base/integrate' },
      { text: '物料制作指南', link: '/base/materials' },
      { text: '应用增强', link: '/base/enhance' },
      { text: '网络请求', link: '/base/request' },
      { text: '权限控制', link: '/base/access' },
      { text: '应用全局设置', link: '/base/globals' }
    ]
  },
  {
    text: '进阶',
    items: [
      { text: '设计器引擎', link: '/guide/extras/engine' },
      { text: '核心提供者', link: '/guide/extras/provider' },
      {
        text: '核心三件套',
        collapsed: true,
        items: [
          { text: 'DSL渲染器', link: '/guide/extras/renderer' },
          { text: '代码生成器', link: '/guide/extras/generator' },
          { text: '代码解析器', link: '/guide/extras/parser' }
        ]
      },
      {
        text: '设计器扩展',
        link: '/guide/extension',
        collapsed: true,
        items: [
          {
            text: '依赖管理器',
            link: '/guide/extras/deps-manager'
          },
          {
            text: '器件管理器',
            link: '/guide/extras/widget-manager'
          },
          {
            text: '属性设置器管理器',
            link: '/guide/extras/setter-manager'
          }
        ]
      }
      // { text: '低代码物料制作', link: '/material' },
      // { text: '依赖管理', link: '/deps' },
      // { text: '自定义服务', link: '/service' },
      // { text: '设计器扩展', link: '/extension' }
    ]
  },
  {
    text: '高级',
    items: [
      { text: '🔥 打造专属在线开发平台', link: '/service/intro' },
      {
        text: '🧩 集成 RuoYi-Vue3',
        link: 'https://gitee.com/newgateway/VTJ-RuoYi-Vue3'
      }
    ]
  }
];

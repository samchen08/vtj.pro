export default [
  {
    text: '开始',
    base: '/guide',
    items: [
      { text: '简介', link: '/' },
      { text: '快速上手', link: '/start' }
    ]
  },
  {
    text: '基础功能',
    base: '/guide/base',
    items: [
      { text: '设计器界面模块', link: '/designer' },
      { text: '页面管理', link: '/page' },
      { text: '区块管理', link: '/block' }
    ]
  },
  {
    text: '进阶主题',
    base: '/guide/extras',
    items: [
      { text: '低代码物料制作', link: '/material' },
      { text: '依赖管理', link: '/deps' },
      { text: '自定义服务', link: '/service' },
      { text: '设计器扩展', link: '/extension' }
    ]
  }
];

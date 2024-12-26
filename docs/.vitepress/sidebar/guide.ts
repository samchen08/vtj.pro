export default [
  {
    text: '开始',
    base: '/guide',
    items: [
      { text: '简介', link: '/' },
      { text: '快速上手', link: '/start' },
      { text: '项目集成', link: '/integration' },
      { text: '功能扩展', link: '/extension' },
      {
        text: '打造专属低代码平台',
        link: '/lcdp'
      }
      // { text: '开发示例', link: '/newpearl' }
    ]
  },
  {
    text: '基础',
    base: '/guide/base',
    items: [
      { text: '创建一个低代码应用（ Todo ）', link: '/todo' },
      { text: '项目工程模板', link: '/project-template' },
      { text: '设计器使用手册', link: '/designer' }
    ]
  },
  {
    text: '进阶',
    base: '/guide/extras',
    items: [
      { text: '低代码物料制作', link: '/material' },
      { text: '依赖管理', link: '/deps' },
      { text: '自定义服务', link: '/service' },
      { text: '设计器扩展', link: '/extension' }
    ]
  }
];

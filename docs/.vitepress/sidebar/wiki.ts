export default [
  {
    text: '技术揭秘',
    base: '/wiki',
    items: [
      { text: '概述', link: '/' },
      {
        text: '核心架构',
        base: '/wiki/core',
        link: '/',
        items: [
          {
            text: '引擎、提供程序和服务',
            link: '/engine-provider-and-service'
          },
          { text: '项目模型和块模型', link: '/project-and-block-models' },
          {
            text: '代码生成和解析管道',
            link: '/code-generation-and-parsing-pipeline'
          }
        ]
      },
      {
        text: '包结构和 monorepo',
        base: '/wiki/package',
        link: '/',
        items: [
          { text: '设计器和渲染器', link: '/designer-and-renderer' },
          { text: 'UI 组件库', link: '/ui-component-library' },
          { text: '图表和可视化', link: '/charts-and-visualization' },
          { text: '平台实施', link: '/platform-implementations' }
        ]
      },
      {
        text: 'AI 集成',
        base: '/wiki/ai',
        link: '/'
      },
      {
        text: '开发人员工具和可扩展性',
        base: '/wiki/dev',
        link: '/',
        items: [
          { text: 'CLI 和构建系统', link: '/cli-and-build-system' },
          { text: '插件系统', link: '/plugin-system' },
          { text: 'Uni-App 集成', link: '/uni-app-integration' }
        ]
      },
      {
        text: '开始',
        base: '/wiki/started',
        link: '/',
        items: [
          { text: '项目设置和基架', link: '/project-setup-and-scaffolding' },
          { text: '集成指南', link: '/integration-guide' }
        ]
      }
    ]
  }
];

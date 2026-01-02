export default [
  {
    text: '高级服务',
    base: '/service',
    items: [
      {
        text: '📦 专属 VTJ.PRO 应用开发平台',
        link: '/',
        items: [
          {
            text: '私有化部署',
            link: '/info/',
            collapsed: false,
            items: [
              {
                text: '项目初始化指南',
                link: '/info/init'
              },
              {
                text: '部署和运维',
                link: '/info/deploy'
              },
              {
                text: '商业授权协议',
                link: '/info/license'
              }
            ]
          },
          {
            text: '平台概述',
            link: '/wiki/',
            collapsed: true,
            items: [
              {
                text: '项目结构',
                link: '/wiki/1.1'
              },
              {
                text: '多平台构建系统',
                link: '/wiki/1.2'
              }
            ]
          },
          {
            text: '架构概述',
            link: '/wiki/2'
          },
          {
            text: '竞品分析',
            link: '/wiki/analysis'
          },
          {
            text: '商业伙伴',
            link: '/cooperative'
          }
        ]
      }
    ]
  }
];

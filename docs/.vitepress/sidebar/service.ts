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
            text: '项目源码揭秘',
            link: '/wiki/',
            items: [
              {
                text: '平台概述',
                link: '/wiki/1'
              },
              {
                text: '架构设计',
                link: '/wiki/2',
                collapsed: true,
                items: [
                  {
                    text: '前端架构',
                    link: '/wiki/2.1'
                  },
                  {
                    text: '后端模块系统',
                    link: '/wiki/2.2'
                  },
                  {
                    text: '运行时系统',
                    link: '/wiki/2.3'
                  }
                ]
              }
            ]
          },

          {
            text: '竞品分析',
            link: '/analysis'
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

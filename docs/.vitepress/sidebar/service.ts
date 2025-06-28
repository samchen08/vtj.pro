export default [
  {
    text: '高级服务',
    base: '/service',
    items: [
      {
        text: '📦 在线版低代码平台源码',
        link: '/',
        items: [
          {
            text: '源码说明',
            link: '/intro'
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
          }
        ]
      }
    ]
  }
];

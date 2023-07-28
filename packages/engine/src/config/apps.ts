import { Widget } from '../core';
export const apps: Array<Widget> = [
  {
    name: 'pages',
    type: 'Pages',
    region: 'apps',
    order: 1,
    trigger: {
      icon: 'vtj-icon-document',
      label: '页面',
      type: 'panel'
    }
  },
  {
    name: 'blocks',
    type: 'Blocks',
    region: 'apps',
    order: 2,
    trigger: {
      icon: 'vtj-icon-components',
      label: '区块',
      type: 'panel'
    }
  },
  {
    name: 'components',
    type: 'Components',
    region: 'apps',
    order: 3,
    trigger: {
      icon: 'vtj-icon-block',
      label: '组件库',
      type: 'panel'
    },
    props: {
      title: '组件库'
    }
  },
  {
    name: 'outline',
    type: 'Outline',
    region: 'apps',
    order: 4,
    trigger: {
      icon: 'vtj-icon-outline',
      label: '大纲树',
      type: 'panel'
    }
  },
  {
    name: 'history',
    type: 'History',
    region: 'apps',
    order: 4,
    trigger: {
      icon: 'vtj-icon-history',
      label: '历史记录',
      type: 'panel'
    }
  },

  {
    name: 'api',
    type: 'Apis',
    region: 'apps',
    order: 4,
    trigger: {
      icon: 'vtj-icon-api',
      label: 'Api管理',
      type: 'panel'
    }
  },

  {
    name: 'packages',
    type: 'Dependencies',
    region: 'apps',
    order: 6,
    trigger: {
      icon: 'vtj-icon-category',
      label: '依赖管理',
      type: 'panel'
    }
  },
  {
    name: 'about',
    type: 'About',
    region: 'apps',
    props: {
      title: '关于',
      width: '500px',
      height: '300px'
    },
    trigger: {
      icon: 'vtj-icon-info',
      label: '关于',
      type: 'dialog'
    }
  }
];

import { Dependencie } from '../core';

export const dependencies: Dependencie[] = [
  {
    package: 'vue',
    version: '3.3.4',
    library: 'Vue',
    urls: ['./libs/vue.global.js'],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: 'element-plus',
    version: 'latest',
    library: 'ElementPlus',
    urls: ['./libs/element-plus.index.css', './libs/element-plus.full.min.js'],
    assetsUrl: './libs/element-plus-assets.js',
    assetsLibrary: 'ElementPlusAssets',
    required: false,
    official: true,
    enabled: true
  },
  {
    package: '@element-plus/icons-vue',
    version: 'latest',
    library: 'ElementPlusIconsVue',
    urls: ['./libs/element-plus-icons-vue.js'],
    required: false,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/utils',
    version: 'latest',
    library: 'VtjUtils',
    urls: ['./libs/vtj-utils.js'],
    required: false,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/icons',
    version: 'latest',
    library: 'VtjIcons',
    urls: ['./libs/vtj-icons.css', './libs/vtj-icons.js'],
    required: false,
    official: true,
    enabled: true
  },
  // {
  //   package: '@vtj/ui',
  //   version: 'latest',
  //   library: 'VtjUI',
  //   urls: ['/libs/vtj-ui.css', '/libs/vtj-ui.js'],
  //   assetsUrl: '/libs/vtj-ui-assets.js',
  //   assetsLibrary: 'VtjUIAssets',
  //   required: false,
  //   official: true,
  //   enabled: true
  // },
  {
    package: 'lodash-es',
    version: 'latest',
    library: '_',
    urls: ['./libs/lodash.min.js'],
    required: false,
    official: true,
    enabled: false
  },
  {
    package: '@vueuse/core',
    version: 'latest',
    library: 'VueUse',
    urls: [
      './libs/vueuse.shared.iife.min.js',
      './libs/vueuse.core.iife.min.js'
    ],
    required: false,
    official: true,
    enabled: false
  }
  // {
  //   package: 'xe-utils',
  //   version: 'latest',
  //   library: 'XEUtils',
  //   urls: ['./libs/xe-utils.min.js'],
  //   required: false,
  //   official: true,
  //   enabled: false
  // },
  // {
  //   package: 'vxe-table',
  //   version: 'latest',
  //   library: 'VXETable',
  //   urls: [
  //     './libs/vxe-table.css',
  //     // '/libs/vxe-table-pro.css',
  //     './libs/vxe-table.min.js'
  //     // '/libs/vxe-table-pro.min.js'
  //   ],
  //   required: false,
  //   official: true,
  //   enabled: false
  // }
  // {
  //   package: 'echarts',
  //   version: 'latest',
  //   library: 'echarts',
  //   urls: ['/libs/echarts.min.js'],
  //   required: false,
  //   official: true,
  //   enabled: false
  // }
];

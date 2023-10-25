import { Dependencie } from '../core';

export const dependencies: Dependencie[] = [
  {
    package: 'vue',
    version: 'latest',
    library: 'Vue',
    urls: ['./libs/vue.global.js'],
    required: true,
    official: true,
    enabled: true
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
    package: 'echarts',
    version: 'latest',
    library: 'echarts',
    urls: ['./libs/echarts.min.js'],
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
  {
    package: '@vtj/ui',
    version: 'latest',
    library: 'VtjUI',
    urls: ['./libs/vtj-ui.css', './libs/vtj-ui.js'],
    assetsUrl: './libs/vtj-ui-assets.js',
    assetsLibrary: 'VtjUIAssets',
    required: false,
    official: true,
    enabled: true
  },
  {
    package: 'ant-design-vue',
    version: 'latest',
    library: 'antd',
    urls: [
      './libs/antd.css',
      './libs/dayjs/dayjs.min.js',
      './libs/dayjs/plugin/customParseFormat.js',
      './libs/dayjs/plugin/weekday.js',
      './libs/dayjs/plugin/localeData.js',
      './libs/dayjs/plugin/weekOfYear.js',
      './libs/dayjs/plugin/weekYear.js',
      './libs/dayjs/plugin/advancedFormat.js',
      './libs/dayjs/plugin/quarterOfYear.js',
      './libs/antd.min.js'
    ],
    assetsUrl: './libs/ant-design-vue-assets.js',
    assetsLibrary: 'AntDesignVueAssets',
    required: false,
    official: true,
    enabled: true
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

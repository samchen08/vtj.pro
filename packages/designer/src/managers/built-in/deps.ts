import { type Dependencie, BUILT_IN_VUE, BUILT_IN_VUE_ROUTER } from '@vtj/core';

export const builtInDeps: Dependencie[] = [
  {
    package: 'vue',
    version: 'latest',
    library: 'Vue',
    urls: ['@vtj/materials/deps/vue/vue.global.prod.js'],
    assetsLibrary: BUILT_IN_VUE,
    required: true,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: 'vue',
    version: 'latest',
    library: 'Vue',
    urls: ['@vtj/materials/deps/uni-h5-vue/index.umd.js'],
    assetsLibrary: BUILT_IN_VUE,
    required: true,
    official: true,
    enabled: true,
    platform: 'uniapp'
  },
  {
    package: 'vue-router',
    version: 'latest',
    library: 'VueRouter',
    urls: ['@vtj/materials/deps/vue-router/vue-router.global.prod.js'],
    assetsLibrary: BUILT_IN_VUE_ROUTER,
    required: true,
    official: true,
    enabled: true
  },
  {
    package: 'uni-app',
    version: 'latest',
    library: 'UniApp',
    urls: ['@vtj/materials/deps/uni-app/index.umd.js'],
    required: true,
    official: true,
    enabled: true,
    platform: 'uniapp'
  },
  {
    package: 'uni-h5',
    version: 'latest',
    library: 'UniH5',
    urls: [
      '@vtj/materials/deps/uni-h5/style.css',
      '@vtj/materials/deps/uni-h5/index.umd.js'
    ],
    required: true,
    official: true,
    enabled: true,
    assetsUrl: '@vtj/materials/assets/uni-h5/index.umd.js',
    assetsLibrary: 'UniH5Material',
    platform: 'uniapp'
  },
  // {
  //   package: 'uni-ui',
  //   version: 'latest',
  //   library: 'UniUI',
  //   urls: [
  //     '@vtj/materials/deps/uni-ui/style.css',
  //     '@vtj/materials/deps/uni-ui/index.umd.js'
  //   ],
  //   required: true,
  //   official: true,
  //   enabled: true,
  //   assetsUrl: '@vtj/materials/assets/uni-ui/index.umd.js',
  //   assetsLibrary: 'UniUIMaterial',
  //   platform: 'uniapp'
  // },
  {
    package: '@vtj/utils',
    version: 'latest',
    library: 'VtjUtils',
    urls: ['@vtj/materials/deps/@vtj/utils/index.umd.js'],
    required: false,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/icons',
    version: 'latest',
    library: 'VtjIcons',
    urls: [
      '@vtj/materials/deps/@vtj/icons/style.css',
      '@vtj/materials/deps/@vtj/icons/index.umd.js'
    ],
    required: false,
    official: true,
    enabled: true,
    assetsUrl: '@vtj/materials/assets/icons/index.umd.js',
    assetsLibrary: 'VtjIconsMaterial',
    platform: ['web', 'h5']
  },
  {
    package: '@vueuse/core',
    version: 'latest',
    library: 'VueUse',
    urls: [
      '@vtj/materials/deps/@vueuse/shared/index.iife.min.js',
      '@vtj/materials/deps/@vueuse/core/index.iife.min.js'
    ],
    required: false,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: 'element-plus',
    version: 'latest',
    library: 'ElementPlus',
    localeLibrary: 'ElementPlusLocaleZhCn',
    urls: [
      '@vtj/materials/deps/element-plus/dark/css-vars.css',
      '@vtj/materials/deps/element-plus/index.css',
      '@vtj/materials/deps/element-plus/zh-cn.js',
      '@vtj/materials/deps/element-plus/index.full.min.js'
    ],
    assetsUrl: '@vtj/materials/assets/element/index.umd.js',
    assetsLibrary: 'ElementPlusMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: 'web'
  },
  {
    package: '@vtj/ui',
    version: 'latest',
    library: 'VtjUI',
    urls: [
      '@vtj/materials/deps/vxe-table/style.min.css',
      '@vtj/materials/deps/@vtj/ui/style.css',
      '@vtj/materials/deps/xe-utils/xe-utils.umd.min.js',
      '@vtj/materials/deps/vxe-table/index.umd.min.js',
      '@vtj/materials/deps/@vtj/ui/index.umd.js'
    ],
    assetsUrl: '@vtj/materials/assets/ui/index.umd.js',
    assetsLibrary: 'VtjUIMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: 'web'
  },
  {
    package: 'ant-design-vue',
    version: 'latest',
    library: 'antd',
    urls: [
      '@vtj/materials/deps/ant-design-vue/reset.css',
      '@vtj/materials/deps/ant-design-vue/dayjs/dayjs.min.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/customParseFormat.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/weekday.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/localeData.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/weekOfYear.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/weekYear.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/advancedFormat.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/quarterOfYear.js',
      '@vtj/materials/deps/ant-design-vue/antd.min.js'
    ],
    assetsUrl: '@vtj/materials/assets/antdv/index.umd.js',
    assetsLibrary: 'AntdvMaterial',
    required: false,
    official: true,
    enabled: false,
    platform: ['web']
  },
  {
    package: 'vant',
    version: 'latest',
    library: 'vant',
    urls: [
      '@vtj/materials/deps/vant/index.css',
      '@vtj/materials/deps/vant/vant.min.js'
    ],
    assetsUrl: '@vtj/materials/assets/vant/index.umd.js',
    assetsLibrary: 'VantMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: ['h5']
  },
  {
    package: '@vtj/charts',
    version: 'latest',
    library: 'VtjCharts',
    urls: [
      '@vtj/materials/deps/echarts/echarts.min.js',
      '@vtj/materials/deps/@vtj/charts/index.umd.js'
    ],
    assetsUrl: '@vtj/materials/assets/charts/index.umd.js',
    assetsLibrary: 'VtjChartsMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: 'mockjs',
    version: 'latest',
    library: 'Mock',
    urls: ['@vtj/materials/deps/mockjs/mock-min.js'],
    required: false,
    official: true,
    enabled: true
  }
];

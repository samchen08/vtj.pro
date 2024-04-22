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
    enabled: true
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
    package: '@vtj/utils',
    version: 'latest',
    library: 'VtjUtils',
    urls: ['@vtj/materials/deps/@vtj/utils/index.umd.js'],
    required: true,
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
    required: true,
    official: true,
    enabled: true
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
    enabled: true
  },
  // {
  //   package: 'echarts',
  //   version: 'latest',
  //   library: 'echarts',
  //   urls: ['@vtj/materials/deps/echarts/echarts.min.js'],
  //   required: false,
  //   official: true,
  //   enabled: true
  // },
  {
    package: '@vtj/ui',
    version: 'latest',
    library: 'VtjUI',
    urls: [
      '@vtj/materials/deps/echarts/echarts.min.js',
      '@vtj/materials/deps/@ckeditor/ckeditor5-build-classic/ckeditor.js',
      '@vtj/materials/deps/@ckeditor/ckeditor5-build-classic/zh-cn.js',
      '@vtj/materials/deps/@ckeditor/ckeditor5-vue/ckeditor.js',
      '@vtj/materials/deps/@vtj/ui/style.css',
      '@vtj/materials/deps/@vtj/ui/index.umd.js'
    ],
    assetsUrl: '@vtj/materials/assets/ui/index.umd.js',
    assetsLibrary: 'VtjUIMaterial',
    required: false,
    official: true,
    enabled: true
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
    enabled: false
  }
];

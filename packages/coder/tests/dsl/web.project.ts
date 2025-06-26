export const webProject = {
  __VTJ_PROJECT__: true,
  id: '@vtj/pro',
  platform: 'web',
  name: 'VTJ.PRO',
  homepage: '',
  description:
    'VTJ 是一款基于 Vue3 + Typescript 的低代码页面可视化设计器。内置低代码引擎、渲染器和代码生成器，面向前端开发者，开箱即用。 无缝嵌入本地开发工程，不改变前端开发流程和编码习惯。',
  dependencies: [
    {
      package: 'vue',
      version: 'latest',
      library: 'Vue',
      urls: ['@vtj/materials/deps/vue/vue.global.prod.js'],
      assetsLibrary: 'VueMaterial',
      required: true,
      official: true,
      enabled: true,
      platform: ['web', 'h5']
    },
    {
      package: 'vue-router',
      version: 'latest',
      library: 'VueRouter',
      urls: ['@vtj/materials/deps/vue-router/vue-router.global.prod.js'],
      assetsLibrary: 'VueRouterMaterial',
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
      enabled: true,
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
  ],
  pages: [
    {
      dir: false,
      name: 'Index',
      title: 'Index',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: true,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: 'lvw0jl2df',
      type: 'page'
    },
    {
      dir: false,
      name: 'Bbb',
      title: 'bb',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '13dbje0g',
      type: 'page',
      market: {
        id: '6db70b89-b197-433a-bd62-20ccce104b93'
      }
    },
    {
      dir: false,
      name: 'Aaa',
      title: 'aaa',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '13xz8ugy',
      type: 'page'
    },
    {
      dir: false,
      name: 'Cccc',
      title: 'dcc',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: true,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '13zy1t4z',
      type: 'page'
    },
    {
      dir: false,
      name: 'Land',
      title: 'Land',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: true,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '145ml8z1',
      type: 'page'
    },
    {
      dir: false,
      name: 'Ddd',
      title: 'dddd',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: true,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '34bdeatx',
      type: 'page'
    },
    {
      dir: false,
      name: 'Eee',
      title: 'eee',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '14fd3iep',
      type: 'page',
      market: {
        id: '0290db4d-f64e-4119-b62d-1e0b56193d6f'
      }
    },
    {
      dir: false,
      name: 'Fff',
      title: 'ff',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '14k5bykc',
      type: 'page'
    },
    {
      dir: false,
      name: 'Gg',
      title: 'ggg',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '14nqx0tn',
      type: 'page'
    },
    {
      dir: false,
      name: 'Hhh',
      title: 'hhh',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '14ofju0v',
      type: 'page'
    },
    {
      dir: false,
      name: 'Iii',
      title: 'iii',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '14og3371',
      type: 'page'
    },
    {
      dir: false,
      name: 'Jjjj',
      title: 'jjjj',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: false,
      meta: '',
      cache: false,
      needLogin: false,
      style: null,
      id: '14ogyxdj',
      type: 'page'
    }
  ],
  blocks: [
    {
      fromType: 'Schema',
      name: 'TestBlock',
      title: '测试',
      urls: '',
      library: '',
      type: 'block',
      id: '45ubyiaai'
    }
  ],
  apis: [
    {
      id: '23ju3bbp',
      method: 'post',
      name: 'test',
      label: '测试',
      url: '/api/test',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form'
      },
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      jsonpOptions: {},
      mock: false,
      mockTemplate: {
        type: 'JSFunction',
        value:
          '(req) => {\n    return {\n      code: 0,\n      data: null\n    }\n  }'
      }
    },
    {
      id: '13ufb9v3',
      method: 'get',
      name: 'getdd',
      label: 'test',
      url: '/api/tes',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form'
      },
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      jsonpOptions: {},
      mock: false,
      mockTemplate: {
        type: 'JSFunction',
        value:
          '(req) => {\n    return {\n      code: 0,\n      data: null\n    }\n  }'
      },
      category: 'Test'
    },
    {
      id: '13ufch13',
      method: 'get',
      name: 'aa',
      label: 'aa',
      url: '/api/aa',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form'
      },
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      jsonpOptions: {},
      mock: false,
      mockTemplate: {
        type: 'JSFunction',
        value:
          '(req) => {\n    return {\n      code: 0,\n      data: null\n    }\n  }'
      },
      category: 'Test'
    },
    {
      id: '13ufho4k',
      method: 'get',
      name: 'bb',
      label: 'bb',
      url: 'bb',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form'
      },
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      jsonpOptions: {},
      mock: false,
      mockTemplate: {
        type: 'JSFunction',
        value:
          '(req) => {\n    return {\n      code: 0,\n      data: null\n    }\n  }'
      },
      category: '默认分组'
    },
    {
      id: '13ufjnb3',
      method: 'get',
      name: 'ccc',
      label: 'ccc',
      url: 'cc',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form'
      },
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      jsonpOptions: {},
      mock: false,
      mockTemplate: {
        type: 'JSFunction',
        value:
          '(req) => {\n    return {\n      code: 0,\n      data: null\n    }\n  }'
      },
      category: 'Test'
    }
  ],
  meta: [],
  config: {
    title: '',
    themeSwitchable: true
  },
  uniConfig: {},
  __BASE_PATH__: '/',
  __UID__: '8d1d97d2-b6ff-4b0d-bcb7-22bc5ef6e259'
};

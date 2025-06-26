export const project: any = {
  __VTJ_PROJECT__: true,
  id: 'vtj-lcdp-web',
  platform: 'web',
  name: 'VTJ.PRO',
  homepage: '137emdzg39x',
  description: 'VTJ.PRO',
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
      enabled: false
    }
  ],
  pages: [
    {
      dir: false,
      name: 'Databoard',
      title: '工作台',
      icon: '',
      mask: true,
      hidden: true,
      raw: false,
      prue: false,
      meta: '',
      id: '137emdzg39x',
      type: 'page',
      pure: false,
      market: {
        id: '01b5fc97-271f-4dec-9577-5b4a1bb05950'
      },
      cache: true
    },
    {
      dir: true,
      name: 'System',
      title: '平台管理',
      icon: 'VtjIconSetting',
      hidden: false,
      prue: false,
      id: '2k6gg9nssk0',
      type: 'page',
      children: [
        {
          dir: false,
          name: 'Settings',
          title: '系统配置',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          pure: true,
          meta: '',
          cache: false,
          needLogin: false,
          style: null,
          id: '123u1wxa3',
          type: 'page'
        },
        {
          dir: false,
          name: 'Cache',
          title: '缓存管理',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '1pcyq4a4ife',
          type: 'page',
          pure: false
        },
        {
          dir: false,
          name: 'Report',
          title: '报告管理',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '13cxyj9i',
          type: 'page',
          pure: false
        },
        {
          dir: false,
          name: 'Dicts',
          title: '数据字典',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '1dn57qtrqwn',
          type: 'page',
          pure: false
        },
        {
          dir: false,
          name: 'Access',
          title: '权限管理',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          pure: false,
          id: 'c12g0itytr',
          type: 'page'
        },
        {
          dir: false,
          name: 'Apps',
          title: '应用管理',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '1tzkd91whpk',
          type: 'page',
          pure: false
        },
        {
          dir: false,
          name: 'Roles',
          title: '用户角色',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '17ca7u5amv1',
          type: 'page',
          pure: false
        },
        {
          dir: false,
          name: 'User',
          title: '用户管理',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '14dxxwkjcgq',
          type: 'page',
          pure: false
        }
      ]
    },
    {
      dir: true,
      name: 'OrderMgr',
      title: '订单管理',
      icon: 'List',
      hidden: false,
      needLogin: false,
      style: null,
      id: '23wu1utt',
      type: 'page',
      children: [
        {
          dir: false,
          name: 'Orders',
          title: '订单列表',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          pure: false,
          meta: '',
          cache: false,
          needLogin: false,
          style: null,
          id: '173u4ioii',
          type: 'page'
        },
        {
          dir: false,
          name: 'PendingOrder',
          title: '待支付订单',
          icon: '',
          mask: true,
          hidden: true,
          raw: false,
          pure: true,
          meta: {},
          cache: false,
          needLogin: false,
          style: null,
          id: 'a3wwnb20',
          type: 'page'
        }
      ]
    },
    {
      dir: true,
      name: 'TopicMgr',
      title: '对话管理',
      icon: 'Aim',
      hidden: false,
      needLogin: false,
      style: null,
      id: '123x0av4z',
      type: 'page',
      children: [
        {
          dir: false,
          name: 'Topics',
          title: '话题列表',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          pure: false,
          meta: '',
          cache: false,
          needLogin: false,
          style: null,
          id: '163u4hzuk',
          type: 'page'
        },
        {
          dir: false,
          name: 'Chats',
          title: '对话记录',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          pure: false,
          meta: '',
          cache: false,
          needLogin: false,
          style: null,
          id: '133x0dx4t',
          type: 'page'
        }
      ]
    },
    {
      dir: true,
      name: 'Market',
      title: '物料市场',
      icon: 'ShoppingTrolley',
      hidden: false,
      prue: false,
      id: '21v54dw7txu',
      type: 'page',
      children: [
        {
          dir: false,
          name: 'Templates',
          title: '模版管理',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '2aq5yoeys4u',
          type: 'page',
          pure: false
        },
        {
          dir: false,
          name: 'TemplateDsl',
          title: '模版版本',
          icon: '',
          mask: true,
          hidden: true,
          raw: false,
          prue: false,
          meta: '',
          id: 'btz8dcn4r9',
          type: 'page',
          pure: false
        }
      ]
    },
    {
      dir: true,
      name: 'CustomApps',
      title: '应用管理',
      icon: 'Grid',
      hidden: false,
      prue: false,
      id: '14l15wg5dqj',
      type: 'page',
      children: [
        {
          dir: false,
          name: 'MyApps',
          title: '我的应用',
          icon: '',
          mask: true,
          hidden: false,
          raw: false,
          prue: false,
          meta: '',
          id: '92q671qifm',
          type: 'page',
          cache: false
        }
      ]
    },
    {
      dir: true,
      name: 'ElementPlus',
      title: '组件示例',
      icon: 'ElemeFilled',
      hidden: false,
      prue: false,
      id: '1zi2jaoxnte',
      type: 'page',
      children: [
        {
          dir: true,
          name: 'Basic',
          title: 'Basic 基础组件',
          icon: '',
          hidden: false,
          prue: false,
          id: '45rs30vd0',
          type: 'page',
          children: [
            {
              dir: false,
              name: 'Button',
              title: 'Button 按钮',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2lr68yphcwg',
              type: 'page'
            },
            {
              dir: false,
              name: 'Container',
              title: 'Container 布局容器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1rtl0bfknf5',
              type: 'page'
            },
            {
              dir: false,
              name: 'Layout',
              title: 'Layout 布局',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2doia8od1wm',
              type: 'page'
            },
            {
              dir: false,
              name: 'Link',
              title: 'Link 链接',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '9gwnbutdl7',
              type: 'page'
            },
            {
              dir: false,
              name: 'Text',
              title: 'Text 文本',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2lnmn3srw90',
              type: 'page'
            },
            {
              dir: false,
              name: 'Scrollbar',
              title: 'Scrollbar 滚动条',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2nx5nnc3raa',
              type: 'page'
            },
            {
              dir: false,
              name: 'Space',
              title: 'Space 间距',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1bvcamh4lna',
              type: 'page'
            }
          ]
        },
        {
          dir: true,
          name: 'FormComponent',
          title: 'Form 表单组件',
          icon: '',
          hidden: false,
          prue: false,
          id: 'b8zniqdsj',
          type: 'page',
          children: [
            {
              dir: false,
              name: 'Autocomplete',
              title: 'Autocomplete 自动补全输入框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1wxwp25gjtk',
              type: 'page'
            },
            {
              dir: false,
              name: 'Cascader',
              title: 'Cascader 级联选择器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2q6oo82dh34',
              type: 'page'
            },
            {
              dir: false,
              name: 'Checkbox',
              title: 'Checkbox 多选框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '20dz0u8s6nb',
              type: 'page'
            },
            {
              dir: false,
              name: 'DatePicker',
              title: 'DatePicker 日期选择器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2ev1lk2ez7n',
              type: 'page'
            },
            {
              dir: false,
              name: 'DateTimePicker',
              title: 'DateTimePicker 日期时间选择器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '175gudxmy5',
              type: 'page'
            },
            {
              dir: false,
              name: 'Form',
              title: 'Form 表单',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1ap2s3sbvw',
              type: 'page'
            },
            {
              dir: false,
              name: 'Input',
              title: 'Input 输入框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1e8optmxyd',
              type: 'page'
            },
            {
              dir: false,
              name: 'InputNumber',
              title: 'InputNumber 数字输入框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 're1jzbvldp',
              type: 'page'
            },
            {
              dir: false,
              name: 'InputTag',
              title: 'inputTag 标签输入框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'rhl5x1qes4',
              type: 'page'
            },
            {
              dir: false,
              name: 'Mention',
              title: 'Mention 提及',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'rl4rurkqb7',
              type: 'page'
            },
            {
              dir: false,
              name: 'Radio',
              title: 'Radio 单选框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'ealif2oltn',
              type: 'page'
            },
            {
              dir: false,
              name: 'Rate',
              title: 'Rate 评分',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'ee54csi757',
              type: 'page'
            },
            {
              dir: false,
              name: 'Select',
              title: 'Select 选择器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'ehoqaibroj',
              type: 'page'
            },
            {
              dir: false,
              name: 'VirtualizedSelect',
              title: 'Virtualized Select 虚拟化选择器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1ap2thr07x',
              type: 'page'
            },
            {
              dir: false,
              name: 'Slider',
              title: 'Slider 滑块',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1e8or7kjfh',
              type: 'page'
            },
            {
              dir: false,
              name: 'Switch',
              title: 'Switch 开关',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1hsaoxe5il',
              type: 'page'
            },
            {
              dir: false,
              name: 'TimePicker',
              title: 'TimePicker 时间选择器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '9nzvfqxs5f',
              type: 'page'
            },
            {
              dir: false,
              name: 'TimeSelect',
              title: 'TimeSelect 时间选择',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '9rjhdgrw41',
              type: 'page'
            },
            {
              dir: false,
              name: 'Transfer',
              title: 'Transfer 穿梭框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '3yej49l575',
              type: 'page'
            },
            {
              dir: false,
              name: 'TreeSelect',
              title: 'TreeSelect 树形选择',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '41y51zfe2x',
              type: 'page'
            },
            {
              dir: false,
              name: 'Upload',
              title: 'Upload 上传',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '45hqzpa0qw',
              type: 'page'
            }
          ]
        },
        {
          dir: true,
          name: 'Data',
          title: 'Data 数据展示',
          icon: '',
          hidden: false,
          prue: false,
          id: 'esll8kz5n',
          type: 'page',
          children: [
            {
              dir: false,
              name: 'Avatar',
              title: 'Avatar 头像',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '45hr28mjet',
              type: 'page'
            },
            {
              dir: false,
              name: 'Badge',
              title: 'Badge 徽章',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '491czyg051',
              type: 'page'
            },
            {
              dir: false,
              name: 'Calendar',
              title: 'Calendar 日历',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '4ckyxo9gjh',
              type: 'page'
            },
            {
              dir: false,
              name: 'Card',
              title: 'Card 卡片',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '45rnv052z',
              type: 'page'
            },
            {
              dir: false,
              name: 'Carousel',
              title: 'Carousel 走马灯',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'fkofpm4199',
              type: 'page'
            },
            {
              dir: false,
              name: 'Collapse',
              title: 'Collapse 折叠面板',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'fo81nbxjeb',
              type: 'page'
            },
            {
              dir: false,
              name: 'Descriptions',
              title: 'Descriptions 描述列表',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'frrnl1qz9n',
              type: 'page'
            },
            {
              dir: false,
              name: 'Empty',
              title: 'Empty 空状态',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'itnjme8pr5',
              type: 'page'
            },
            {
              dir: false,
              name: 'Image',
              title: 'Image 图片',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'ix75k429cg',
              type: 'page'
            },
            {
              dir: false,
              name: 'Pagination',
              title: 'Pagination 分页',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'un0o0g389r',
              type: 'page'
            },
            {
              dir: false,
              name: 'Progress',
              title: 'Progress 进度条',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'uqk9y6luy4',
              type: 'page'
            },
            {
              dir: false,
              name: 'Result',
              title: 'Result 结果',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'uu3vvwgapp',
              type: 'page'
            },
            {
              dir: false,
              name: 'Skeleton',
              title: 'Skeleton 骨架屏',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'yrw9gh1t8p',
              type: 'page'
            },
            {
              dir: false,
              name: 'Table',
              title: 'Table 表格',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'yvfve6vbmx',
              type: 'page'
            },
            {
              dir: false,
              name: 'TableV2',
              title: 'Virtualized Table 虚拟化表格',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'yyzhbwp281',
              type: 'page'
            },
            {
              dir: false,
              name: 'Tag',
              title: 'Tag 标签',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '7pdq2p0f5',
              type: 'page'
            },
            {
              dir: false,
              name: 'Timeline',
              title: 'Timeline 时间线',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'b8znsiixz',
              type: 'page'
            },
            {
              dir: false,
              name: 'Tour',
              title: 'Tour 漫游式引导',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'eslliccyv',
              type: 'page'
            },
            {
              dir: false,
              name: 'Tree',
              title: 'Tree 树形控件',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '8l06c406q0',
              type: 'page'
            },
            {
              dir: false,
              name: 'TreeV2',
              title: 'Tree V2 虚拟化树形控件',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '8ojs9ttse6',
              type: 'page'
            },
            {
              dir: false,
              name: 'Statistic',
              title: 'Statistic 统计组件',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '8s3e7jnc0m',
              type: 'page'
            },
            {
              dir: false,
              name: 'Segmented',
              title: 'Segmented 分段控制器',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '8vn059h55a',
              type: 'page'
            }
          ]
        },
        {
          dir: true,
          name: 'Navigation',
          title: 'Navigation 导航',
          icon: '',
          hidden: false,
          prue: false,
          id: 'sz1dhpajc',
          type: 'page',
          children: [
            {
              dir: false,
              name: 'Affix',
              title: 'Affix 固钉',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: 'winb7itjz',
              type: 'page'
            },
            {
              dir: false,
              name: 'Anchor',
              title: 'Anchor 锚点',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '10298xc8dt',
              type: 'page'
            },
            {
              dir: false,
              name: 'Backtop',
              title: 'Backtop 回到顶部',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '13lv6n5nv3',
              type: 'page'
            },
            {
              dir: false,
              name: 'Breadcrumb',
              title: 'Breadcrumb 面包屑',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '26lkhjp0q6',
              type: 'page'
            },
            {
              dir: false,
              name: 'Dropdown',
              title: 'Dropdown 下拉菜单',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2a56f9ij85',
              type: 'page'
            },
            {
              dir: false,
              name: 'Menu',
              title: 'Menu 菜单',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '2dosczc2b3',
              type: 'page'
            },
            {
              dir: false,
              name: 'PageHeader',
              title: 'Page Header 页头',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1yf2ujgmajz',
              type: 'page'
            },
            {
              dir: false,
              name: 'Steps',
              title: 'Steps 步骤条',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1yimgh6fqts',
              type: 'page'
            },
            {
              dir: false,
              name: 'Tabs',
              title: 'Tabs 标签页',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '1ym62ew9c8v',
              type: 'page'
            }
          ]
        },
        {
          dir: true,
          name: 'Feedback',
          title: 'Feedback 反馈组件',
          icon: '',
          hidden: false,
          prue: false,
          id: '37pn5de3wyq',
          type: 'page',
          children: [
            {
              dir: false,
              name: 'Dialog',
              title: 'Dialog 对话框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '37t6rb3xex4',
              type: 'page'
            },
            {
              dir: false,
              name: 'Drawer',
              title: 'Drawer 抽屉',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '37wqd8tr2ow',
              type: 'page'
            },
            {
              dir: false,
              name: 'Popconfirm',
              title: 'Popconfirm 气泡确认框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '4en4tq1i3xc',
              type: 'page'
            },
            {
              dir: false,
              name: 'Popover',
              title: 'Popover 弹出框',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '4eqofnrbrdo',
              type: 'page'
            },
            {
              dir: false,
              name: 'Tooltip',
              title: 'Tooltip 文字提示',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '4eu81lh5c5s',
              type: 'page'
            }
          ]
        },
        {
          dir: true,
          name: 'Others',
          title: 'Others 其他',
          icon: '',
          hidden: false,
          prue: false,
          id: '5mnwa2amda',
          type: 'page',
          children: [
            {
              dir: false,
              name: 'Divider',
              title: 'Divider 分割线',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '5q7i7s41vp',
              type: 'page'
            },
            {
              dir: false,
              name: 'Watermark',
              title: 'Watermark 水印',
              icon: '',
              mask: true,
              hidden: false,
              raw: false,
              prue: false,
              meta: '',
              cache: false,
              id: '5tr45hxidg',
              type: 'page'
            }
          ]
        }
      ]
    }
  ],
  blocks: [
    {
      type: 'block',
      fromType: 'Plugin',
      preset: true,
      id: '@vtj/plugin-ckeditor',
      name: 'XCkeditor',
      title: '富文本编辑器',
      library: 'VtjPluginCkeditor',
      urls: '/@vtj/plugins/@vtj__plugin-ckeditor.css,/@vtj/plugins/@vtj__plugin-ckeditor.json,/@vtj/plugins/@vtj__plugin-ckeditor.umd.js',
      category: '插件区块'
    },
    {
      fromType: 'Schema',
      name: 'DictDialogForm',
      title: '字典组弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '字典管理',
      id: '2ds1ugz4nn7'
    },
    {
      fromType: 'Schema',
      name: 'RoleDialogForm',
      title: '角色弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '角色管理',
      id: '5j486tebce'
    },
    {
      fromType: 'Schema',
      name: 'AccessDialogForm',
      title: '应用弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '权限管理',
      id: '21v547sxzzk'
    },
    {
      fromType: 'Schema',
      name: 'AppDialogForm',
      title: '应用弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '应用管理',
      id: '2i0h1s4ws08'
    },
    {
      fromType: 'Schema',
      name: 'MyAppDialogForm',
      title: '我的应用弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '应用管理',
      id: '1qceube5uon'
    },
    {
      fromType: 'Schema',
      name: 'UserDialogForm',
      title: '用户弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '用户管理',
      id: '1l4jj4gp0jh'
    },
    {
      fromType: 'Schema',
      name: 'TemplateDialogForm',
      title: '模版弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '模版管理',
      id: '21yoqclrurr'
    },
    {
      fromType: 'Schema',
      name: 'TemplateDslForm',
      title: '模版版本发布',
      urls: '',
      library: '',
      type: 'block',
      category: '模版管理',
      id: '2mxpiuix5wy'
    },
    {
      fromType: 'Schema',
      name: 'TemplateDetailForm',
      title: '模版详情表单',
      urls: '',
      library: '',
      type: 'block',
      category: '模版管理',
      id: '20olt6cavpa'
    },
    {
      fromType: 'Schema',
      name: 'DictDialogGrid',
      title: '字典项弹窗表格',
      urls: '',
      library: '',
      type: 'block',
      category: '字典管理',
      id: '203c5adslro'
    },
    {
      fromType: 'Schema',
      name: 'ApiDialogGrid',
      title: '接口弹窗表格',
      urls: '',
      library: '',
      type: 'block',
      category: '权限管理',
      id: 'zrcarmttyo'
    },
    {
      fromType: 'Schema',
      name: 'AccessSettings',
      title: '权限配置弹窗表单',
      urls: '',
      library: '',
      type: 'block',
      category: '权限管理',
      id: '15ynorvijia'
    },
    {
      fromType: 'Schema',
      name: 'AppCard',
      title: '应用卡片',
      urls: '',
      library: '',
      type: 'block',
      category: '应用管理',
      id: '2i0h2vuip08'
    },
    {
      fromType: 'Schema',
      name: 'QueryTable',
      title: '简单查询表格',
      urls: '',
      library: '',
      type: 'block',
      category: '模版页面',
      id: 'ix74u08kzw'
    }
  ],
  apis: [
    {
      id: '2ax96atv3a3',
      method: 'get',
      name: 'findCache',
      label: '查询缓存',
      url: '/api/cache',
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
      category: 'Cache'
    },
    {
      id: '29cjfbmk2f7',
      method: 'delete',
      name: 'deleteCache',
      label: '删除缓存',
      url: '/api/cache',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Cache'
    },
    {
      id: 'mkcn6nf9jx',
      method: 'delete',
      name: 'clearCache',
      label: '清空缓存',
      url: '/api/cache/clear',
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
      category: 'Cache'
    },
    {
      id: '8s3c2bpvxg',
      method: 'post',
      name: 'saveDict',
      label: '保存字典',
      url: '/api/dicts',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Dicts'
    },
    {
      id: '2edbi3874kd',
      method: 'get',
      name: 'findDicts',
      label: '查询字典组',
      url: '/api/dicts',
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
      category: 'Dicts'
    },
    {
      id: '2jhn6si8rqu',
      method: 'get',
      name: 'getDicts',
      label: '获取多个字典项集合',
      url: '/api/dicts/items',
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
      category: 'Dicts'
    },
    {
      id: 'p4ihjbxrg6',
      method: 'get',
      name: 'getDict',
      label: '获取单个字典项集合',
      url: '/api/dicts/items/:group',
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
      category: 'Dicts'
    },
    {
      id: '2fy192pa5fc',
      method: 'post',
      name: 'saveDictOptions',
      label: '更新字典项',
      url: '/api/dicts/:group',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Dicts'
    },
    {
      id: 'u1qyd6f3cv',
      method: 'delete',
      name: 'deleteDicts',
      label: '删除字典组',
      url: '/api/dicts',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Dicts'
    },
    {
      id: '8l047zv459',
      method: 'post',
      name: 'saveRole',
      label: '保存角色',
      url: '/api/roles',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Roles'
    },
    {
      id: '12poktd18fv',
      method: 'get',
      name: 'findRoles',
      label: '查询角色',
      url: '/api/roles',
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
      category: 'Roles'
    },
    {
      id: 'ujh02v0v83',
      method: 'delete',
      name: 'deleteRoles',
      label: '删除角色',
      url: '/api/roles',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Roles'
    },
    {
      id: '1vd6wcz557i',
      method: 'post',
      name: 'defaultRole',
      label: '设置默认角色',
      url: '/api/roles/default/:id',
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
      category: 'Roles'
    },
    {
      id: '2czoz0kjudw',
      method: 'post',
      name: 'saveApp',
      label: '保存应用',
      url: '/api/apps',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Apps'
    },
    {
      id: '2kry3jkj7p',
      method: 'get',
      name: 'findApps',
      label: '查询应用',
      url: '/api/apps',
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
      category: 'Apps'
    },
    {
      id: 'g5y1ch1vgh',
      method: 'delete',
      name: 'deleteApp',
      label: '删除应用',
      url: '/api/apps/:id',
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
      category: 'Apps'
    },
    {
      id: '2p05ba1stnm',
      method: 'post',
      name: 'upload',
      label: '上传文件',
      url: '/api/oss/upload',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'data'
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
      category: 'OSS'
    },
    {
      id: '19pcubqce8i',
      method: 'post',
      name: 'saveAccess',
      label: '保存权限',
      url: '/api/access',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Access'
    },
    {
      id: '1okluqzdw4e',
      method: 'get',
      name: 'getAccessApps',
      label: '权限应用列表',
      url: '/api/access/apps',
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
      category: 'Access'
    },
    {
      id: '2c7c3j19y8s',
      method: 'get',
      name: 'getAccessByApp',
      label: '应用权限',
      url: '/api/access/apps/:code',
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
      category: 'Access'
    },
    {
      id: '1ex84yqcsps',
      method: 'post',
      name: 'saveAccessApis',
      label: '保存接口权限',
      url: '/api/access/apis/:id',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Access'
    },
    {
      id: '1dg1zwza7mw',
      method: 'get',
      name: 'getAccessById',
      label: '权限详情',
      url: '/api/access/detail/:id',
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
      category: 'Access'
    },
    {
      id: 'otvnrrewtd',
      method: 'delete',
      name: 'deleteAccess',
      label: '删除权限',
      url: '/api/access/',
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
      category: 'Access'
    },
    {
      id: '2gxhcmpoe4c',
      method: 'get',
      name: 'getAccessByRoleId',
      label: '获取角色权限',
      url: '/api/roles/access/:id',
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
      category: 'Roles'
    },
    {
      id: '2ntm06wrpdc',
      method: 'post',
      name: 'saveRoleAccess',
      label: '保存角色权限',
      url: '/api/roles/access/:id',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Roles'
    },
    {
      id: '1hs8yeml7i',
      method: 'post',
      name: 'saveUser',
      label: '保存用户',
      url: '/api/users',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Users'
    },
    {
      id: 'tcxp0a9t58',
      method: 'delete',
      name: 'deleteUsers',
      label: '删除用户',
      url: '/api/users',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Users'
    },
    {
      id: '1y0wctcvb13',
      method: 'get',
      name: 'findUsers',
      label: '查询用户',
      url: '/api/users',
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
      category: 'Users'
    },
    {
      id: '10clyi6p3hc',
      method: 'post',
      name: 'resetPassword',
      label: '重置密码',
      url: '/api/users/resetPassword',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Users'
    },
    {
      id: 'ty7co64exe',
      method: 'post',
      name: 'saveTemplate',
      label: '保存模版',
      url: '/api/templates',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Templates'
    },
    {
      id: '12pol0z1ysa',
      method: 'delete',
      name: 'deleteTemplates',
      label: '删除模版',
      url: '/api/templates',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Templates'
    },
    {
      id: '25wh3saissj',
      method: 'get',
      name: 'findTemplates',
      label: '查询模版',
      url: '/api/templates',
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
      category: 'Templates'
    },
    {
      id: 'n5mb1pjb5e',
      method: 'post',
      name: 'saveTemplateDsl',
      label: '保存模版DSL',
      url: '/api/templates/dsl',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Templates'
    },
    {
      id: '7w6uvle80r',
      method: 'get',
      name: 'findTemplateDsl',
      label: '查询模版DSL',
      url: '/api/templates/dsl/versions/:templateId',
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
      category: 'Templates'
    },
    {
      id: '21o1wigyt30',
      method: 'get',
      name: 'getLatestDsl',
      label: '获取最新DSL',
      url: '/api/templates/dsl/latest/:templateId',
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
      category: 'Templates'
    },
    {
      id: '2afj5dndzb4',
      method: 'get',
      name: 'findMyApps',
      label: '查询我的应用',
      url: '/api/apps/action/find-my-apps',
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
      category: 'Apps'
    },
    {
      id: '93cye0vy',
      method: 'get',
      name: 'findReport',
      label: '查询报告',
      url: '/api/report',
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
      category: 'Report'
    },
    {
      id: 'g3cykzs5',
      method: 'delete',
      name: 'deleteReport',
      label: '删除报告',
      url: '/api/report',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Report'
    },
    {
      id: '183u7eu82',
      method: 'post',
      name: 'saveSettings',
      label: '保存配置',
      url: '/api/settings',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Settings'
    },
    {
      id: '193u7g7yv',
      method: 'get',
      name: 'getSettings',
      label: '获取配置',
      url: '/api/settings',
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
      category: 'Settings'
    },
    {
      id: '63wnfg7k',
      method: 'get',
      name: 'findOrders',
      label: '查询订单',
      url: '/api/orders',
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
      category: 'Orders'
    },
    {
      id: '73wngub2',
      method: 'post',
      name: 'quickOrder',
      label: '快速下单',
      url: '/api/orders/quick',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Orders'
    },
    {
      id: '83wnio80',
      method: 'post',
      name: 'updateOrderStatus',
      label: '更新订单状态',
      url: '/api/orders/status/:id',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Orders'
    },
    {
      id: '93wnjnqd',
      method: 'delete',
      name: 'deleteOrders',
      label: '删除订单',
      url: '/api/orders',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Orders'
    },
    {
      id: '1o3wxgegl',
      method: 'get',
      name: 'getOrder',
      label: '获取订单详情',
      url: '/api/orders/:id',
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
      category: 'Orders'
    },
    {
      id: '349pjipj',
      method: 'get',
      name: 'findTopics',
      label: '查询话题',
      url: '/api/topics',
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
      category: 'Topics'
    },
    {
      id: '149qxwyp',
      method: 'delete',
      name: 'deleteTopics',
      label: '删除话题',
      url: '/api/topics',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Topics'
    },
    {
      id: 'a49rrcue',
      method: 'get',
      name: 'updateHotTopic',
      label: '更新热门话题',
      url: '/api/topics/hot/:id',
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
      category: 'Topics'
    },
    {
      id: '1f49tvf33',
      method: 'get',
      name: 'findChats',
      label: '查询对话',
      url: '/api/topics/chats',
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
      category: 'Topics'
    },
    {
      id: '1g49twn5t',
      method: 'delete',
      name: 'deleteChats',
      label: '删除对话',
      url: '/api/topics/chats',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'json'
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
      category: 'Topics'
    }
  ],
  meta: [],
  config: {
    title: '',
    themeSwitchable: true
  },
  uniConfig: {},
  __BASE_PATH__: '/',
  __UID__: '8f0bac24-54de-42e1-8c0d-1414d4511fb2'
};

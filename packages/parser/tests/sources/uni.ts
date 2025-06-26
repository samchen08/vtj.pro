export const uniProject = {
  id: 'vuni',
  apis: [
    {
      id: 'ic99u81ey',
      url: '/api/user',
      mock: true,
      name: 'getUser',
      label: '获取用户',
      method: 'get',
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      settings: {
        type: 'form',
        loading: true,
        failMessage: true,
        validSuccess: true,
        injectHeaders: false,
        originResponse: false
      },
      jsonpOptions: {},
      mockTemplate: {
        type: 'JSFunction',
        value:
          "(req) => {\n  return {\n    code: 0,\n    data: {\n      id: '@guid'\n    }\n  }\n}"
      }
    }
  ],
  meta: [],
  name: '测试uniapp',
  pages: [
    {
      id: '45thy13m3',
      dir: false,
      raw: false,
      icon: '',
      mask: true,
      meta: null,
      name: 'Homepage',
      pure: true,
      type: 'page',
      cache: false,
      style: '',
      title: '主页',
      hidden: false,
      needLogin: false
    },
    {
      id: '14kt3gux',
      dir: false,
      raw: false,
      icon: '',
      mask: true,
      meta: null,
      name: 'Aaa',
      pure: true,
      type: 'page',
      cache: false,
      style: '',
      title: 'aaa',
      hidden: false,
      needLogin: false
    },
    {
      id: '34kt78rl',
      dir: false,
      raw: false,
      icon: '',
      mask: true,
      meta: null,
      name: 'Bbb',
      pure: true,
      type: 'page',
      cache: false,
      style: '',
      title: 'bbb',
      hidden: false,
      needLogin: false
    }
  ],
  blocks: [],
  config: {
    title: '测试uniapp'
  },
  __UID__: '02c3c880-b1f2-4b1c-8779-19f571ec06cc',
  homepage: '',
  platform: 'uniapp',
  uniConfig: {
    css: 'body {}',
    pagesJson: {
      pages: [],
      tabBar: {
        list: [
          {
            text: '组件',
            pagePath: 'pages/vuni/45thy13m3'
          }
        ],
        color: '#7A7E83',
        borderStyle: 'black',
        selectedColor: '#3cc51f',
        backgroundColor: '#ffffff'
      },
      easycom: {
        custom: {
          '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue'
        },
        autoscan: true
      },
      globalStyle: {
        backgroundColor: '#F8F8F8',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: 'uni-app',
        navigationBarBackgroundColor: '#F8F8F8'
      }
    },
    manifestJson: {
      name: 'VTJ',
      appid: '__UNI__1FC118B',
      'app-plus': {
        modules: {},
        distribute: {
          ios: {},
          icons: {
            android: {
              hdpi: 'src/static/logo.png',
              xhdpi: 'src/static/logo.png',
              xxhdpi: 'src/static/logo.png',
              xxxhdpi: 'src/static/logo.png'
            }
          },
          android: {
            permissions: [
              '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
              '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
              '<uses-permission android:name="android.permission.VIBRATE"/>',
              '<uses-permission android:name="android.permission.READ_LOGS"/>',
              '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
              '<uses-feature android:name="android.hardware.camera.autofocus"/>',
              '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
              '<uses-permission android:name="android.permission.CAMERA"/>',
              '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
              '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
              '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
              '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
              '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
              '<uses-feature android:name="android.hardware.camera"/>',
              '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>'
            ]
          },
          sdkConfigs: {}
        },
        splashscreen: {
          delay: 0,
          waiting: true,
          autoclose: true,
          alwaysShowBeforeRender: true
        },
        compilerVersion: 3,
        usingComponents: true,
        nvueStyleCompiler: 'uni-app'
      },
      'mp-baidu': {
        usingComponents: true
      },
      quickapp: {},
      'mp-alipay': {
        usingComponents: true
      },
      'mp-weixin': {
        appid: '',
        setting: {
          urlCheck: false
        },
        usingComponents: true
      },
      'mp-toutiao': {
        usingComponents: true
      },
      vueVersion: '3',
      description: 'VTJ移动跨端项目',
      transformPx: false,
      versionCode: '100',
      versionName: '1.0.0',
      uniStatistics: {
        enable: false
      }
    }
  },
  description: '',
  dependencies: [
    {
      urls: ['@vtj/materials/deps/uni-h5-vue/index.umd.js'],
      enabled: true,
      library: 'Vue',
      package: 'vue',
      version: 'latest',
      official: true,
      platform: 'uniapp',
      required: true,
      assetsLibrary: 'VueMaterial'
    },
    {
      urls: ['@vtj/materials/deps/vue-router/vue-router.global.prod.js'],
      enabled: true,
      library: 'VueRouter',
      package: 'vue-router',
      version: 'latest',
      official: true,
      required: true,
      assetsLibrary: 'VueRouterMaterial'
    },
    {
      urls: ['@vtj/materials/deps/uni-app/index.umd.js'],
      enabled: true,
      library: 'UniApp',
      package: 'uni-app',
      version: 'latest',
      official: true,
      platform: 'uniapp',
      required: true
    },
    {
      urls: [
        '@vtj/materials/deps/uni-h5/style.css',
        '@vtj/materials/deps/uni-h5/index.umd.js'
      ],
      enabled: true,
      library: 'UniH5',
      package: 'uni-h5',
      version: 'latest',
      official: true,
      platform: 'uniapp',
      required: true,
      assetsUrl: '@vtj/materials/assets/uni-h5/index.umd.js',
      assetsLibrary: 'UniH5Material'
    },
    {
      urls: ['@vtj/materials/deps/@vtj/utils/index.umd.js'],
      enabled: true,
      library: 'VtjUtils',
      package: '@vtj/utils',
      version: 'latest',
      official: true,
      required: true
    },
    {
      urls: ['@vtj/materials/deps/mockjs/mock-min.js'],
      enabled: true,
      library: 'Mock',
      package: 'mockjs',
      version: 'latest',
      official: true,
      required: false
    }
  ],
  __BASE_PATH__: '/',
  __VTJ_PROJECT__: true
};

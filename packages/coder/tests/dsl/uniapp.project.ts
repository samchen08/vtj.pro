export const uniappProject = {
  __VTJ_PROJECT__: true,
  id: 'vtj-project-uniapp',
  platform: 'uniapp',
  name: 'VtjProjectUniapp',
  homepage: '45u0kfarj',
  description: '',
  dependencies: [
    {
      package: 'vue',
      version: 'latest',
      library: 'Vue',
      urls: ['@vtj/materials/deps/uni-h5-vue/index.umd.js'],
      assetsLibrary: 'VueMaterial',
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
      assetsLibrary: 'VueRouterMaterial',
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
      name: 'Test',
      title: 'test',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: true,
      meta: null,
      cache: false,
      needLogin: false,
      style: '',
      id: '45u0kfarj',
      type: 'page'
    },
    {
      dir: false,
      name: 'Bbb',
      title: 'bbb',
      icon: '',
      mask: true,
      hidden: false,
      raw: false,
      pure: true,
      meta: null,
      cache: false,
      needLogin: false,
      style: '',
      id: '14ktqdut',
      type: 'page'
    }
  ],
  blocks: [],
  apis: [],
  meta: [],
  config: {
    title: ''
  },
  uniConfig: {
    css: '\n  body {\n    background-color: #fff;\n  }\n',
    onLaunch: {
      type: 'JSFunction',
      value: "() => {\n  console.log('App Launch22');\n}"
    },
    onShow: {
      type: 'JSFunction',
      value: "() => {\n  console.log('App Show2');\n}"
    },
    onHide: {
      type: 'JSFunction',
      value: "() => {\n  console.log('App Hide');\n}"
    },
    manifestJson: {
      name: 'VtjProjectUniapp',
      appid: '__UNI__VTJPROJECTUNIAPP',
      description: '',
      versionName: '1.0.0',
      versionCode: '100',
      transformPx: false,
      'app-plus': {
        usingComponents: true,
        nvueStyleCompiler: 'uni-app',
        compilerVersion: 3,
        splashscreen: {
          alwaysShowBeforeRender: true,
          waiting: true,
          autoclose: true,
          delay: 0
        },
        modules: {},
        distribute: {
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
          ios: {},
          sdkConfigs: {},
          icons: {
            android: {
              hdpi: 'src/static/logo.png',
              xhdpi: 'src/static/logo.png',
              xxhdpi: 'src/static/logo.png',
              xxxhdpi: 'src/static/logo.png'
            }
          }
        }
      },
      quickapp: {},
      'mp-weixin': {
        appid: '',
        setting: {
          urlCheck: false
        },
        usingComponents: true
      },
      'mp-alipay': {
        usingComponents: true
      },
      'mp-baidu': {
        usingComponents: true
      },
      'mp-toutiao': {
        usingComponents: true
      },
      uniStatistics: {
        enable: false
      },
      vueVersion: '3'
    },
    pagesJson: {
      pages: [
        {
          path: 'pages/45u0kfarj',
          style: {
            navigationBarTitleText: 'test'
          },
          needLogin: false,
          vtj: true
        },
        {
          path: 'pages/14ktqdut',
          style: {
            navigationBarTitleText: 'bbb'
          },
          needLogin: false,
          vtj: true
        },
        {
          path: 'pages/startup'
        }
      ],
      globalStyle: {
        navigationBarTextStyle: 'black',
        navigationBarTitleText: 'uni-app',
        navigationBarBackgroundColor: '#F8F8F8',
        backgroundColor: '#ffffff'
      },
      easycom: {
        autoscan: true,
        custom: {
          '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue'
        }
      }
    }
  },
  __BASE_PATH__: '/',
  __UID__: '2267db6b-fb29-4922-a8ac-823348cd5f30'
};

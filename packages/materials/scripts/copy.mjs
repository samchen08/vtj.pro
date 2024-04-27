import { copy } from '@vtj/cli';

const modules = '../../node_modules/';
const packages = '../';
const dist = 'dist/';
const files = [
  [packages + 'utils/dist/index.umd.js', 'deps/@vtj/utils/index.umd.js'],
  [packages + 'icons/dist/index.umd.js', 'deps/@vtj/icons/index.umd.js'],
  [packages + 'icons/dist/style.css', 'deps/@vtj/icons/style.css'],
  [packages + 'ui/dist/index.umd.js', 'deps/@vtj/ui/index.umd.js'],
  [packages + 'ui/dist/style.css', 'deps/@vtj/ui/style.css'],
  [packages + 'charts/dist/index.umd.js', 'deps/@vtj/charts/index.umd.js'],

  [modules + 'vue/dist/vue.global.prod.js', 'deps/vue/vue.global.prod.js'],
  [
    modules + 'vue-router/dist/vue-router.global.prod.js',
    'deps/vue-router/vue-router.global.prod.js'
  ],
  [
    modules + 'element-plus/dist/index.full.min.js',
    'deps/element-plus/index.full.min.js'
  ],
  [modules + 'element-plus/dist/locale/zh-cn.js', 'deps/element-plus/zh-cn.js'],
  [
    modules + 'element-plus/theme-chalk/dark/css-vars.css',
    'deps/element-plus/dark/css-vars.css'
  ],
  [modules + 'element-plus/dist/index.css', 'deps/element-plus/index.css'],
  [modules + 'echarts/dist/echarts.min.js', 'deps/echarts/echarts.min.js'],
  [
    modules + '@vueuse/shared/index.iife.min.js',
    'deps/@vueuse/shared/index.iife.min.js'
  ],
  [
    modules + '@vueuse/core/index.iife.min.js',
    'deps/@vueuse/core/index.iife.min.js'
  ],
  [
    modules + 'ant-design-vue/dist/antd.min.js',
    'deps/ant-design-vue/antd.min.js'
  ],
  [modules + 'ant-design-vue/dist/reset.css', 'deps/ant-design-vue/reset.css'],
  [modules + 'dayjs/dayjs.min.js', 'deps/ant-design-vue/dayjs/dayjs.min.js'],
  [
    modules + 'dayjs/plugin/customParseFormat.js',
    'deps/ant-design-vue/dayjs/plugin/customParseFormat.js'
  ],
  [
    modules + 'dayjs/plugin/weekday.js',
    'deps/ant-design-vue/dayjs/plugin/weekday.js'
  ],
  [
    modules + 'dayjs/plugin/localeData.js',
    'deps/ant-design-vue/dayjs/plugin/localeData.js'
  ],
  [
    modules + 'dayjs/plugin/weekOfYear.js',
    'deps/ant-design-vue/dayjs/plugin/weekOfYear.js'
  ],
  [
    modules + 'dayjs/plugin/weekYear.js',
    'deps/ant-design-vue/dayjs/plugin/weekYear.js'
  ],
  [
    modules + 'dayjs/plugin/advancedFormat.js',
    'deps/ant-design-vue/dayjs/plugin/advancedFormat.js'
  ],
  [
    modules + 'dayjs/plugin/quarterOfYear.js',
    'deps/ant-design-vue/dayjs/plugin/quarterOfYear.js'
  ],
  [
    modules + '@ckeditor/ckeditor5-build-classic/build/ckeditor.js',
    'deps/@ckeditor/ckeditor5-build-classic/ckeditor.js'
  ],
  [
    modules + '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js',
    'deps/@ckeditor/ckeditor5-build-classic/zh-cn.js'
  ],
  [
    modules + '@ckeditor/ckeditor5-vue/dist/ckeditor.js',
    'deps/@ckeditor/ckeditor5-vue/ckeditor.js'
  ]
];

function doCopy() {
  for (const item of files) {
    copy(item[0], dist + item[1]);
  }
}

doCopy();

import { transform, fs } from '@vtj/cli';

const files = [
  {
    input: '../../node_modules/@vueuse/core/index.iife.js',
    output: 'lib/vueuse.core.iife.min.js'
  },
  {
    input: '../../node_modules/@vueuse/shared/index.iife.js',
    output: 'lib/vueuse.shared.iife.min.js'
  },
  {
    input: '../../node_modules/vue/dist/vue.global.prod.js',
    output: 'lib/vue.global.js'
  },
  {
    input: '../../node_modules/vue-router/dist/vue-router.global.prod.js',
    output: 'lib/vue-router.global.js'
  },
  {
    input: '../../node_modules/element-plus/dist/index.full.min.js',
    output: 'lib/element-plus.full.min.js'
  },
  {
    input: '../../node_modules/ant-design-vue/dist/antd.min.js',
    output: 'lib/antd.min.js'
  }
  // {
  //   input: '../../node_modules/vxe-table-pro/vxe-table-pro.umd.js',
  //   output: 'lib/vxe-table-pro.min.js'
  // }
];

const copyFiles = [
  {
    input: '../../node_modules/xe-utils/dist/xe-utils.umd.min.js',
    output: 'lib/xe-utils.min.js'
  },
  {
    input: '../../node_modules/vxe-table/lib/index.umd.min.js',
    output: 'lib/vxe-table.min.js'
  },
  {
    input: '../../node_modules/vxe-table/lib/style.min.css',
    output: 'lib/vxe-table.css'
  },
  // {
  //   input: '../../node_modules/vxe-table-pro/vxe-table-pro.min.css',
  //   output: 'lib/vxe-table-pro.css'
  // },
  {
    input: '../../node_modules/@element-plus/icons-vue/dist/index.iife.min.js',
    output: 'lib/element-plus-icons-vue.js'
  },
  // {
  //   input: '../../node_modules/element-plus/dist/index.full.min.js',
  //   output: 'lib/element-plus.full.min.js'
  // },
  {
    input: '../../node_modules/element-plus/dist/index.full.min.js.map',
    output: 'lib/index.full.min.js.map'
  },
  {
    input: '../../node_modules/element-plus/dist/index.css',
    output: 'lib/element-plus.index.css'
  },
  // {
  //   input: '../../node_modules/ant-design-vue/dist/antd.min.js',
  //   output: 'lib/antd.min.js'
  // },
  {
    input: '../../node_modules/ant-design-vue/dist/reset.css',
    output: 'lib/antd.css'
  },
  {
    input: '../../node_modules/dayjs/dayjs.min.js',
    output: 'lib/dayjs/dayjs.min.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/customParseFormat.js',
    output: 'lib/dayjs/plugin/customParseFormat.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/weekday.js',
    output: 'lib/dayjs/plugin/weekday.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/localeData.js',
    output: 'lib/dayjs/plugin/localeData.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/weekOfYear.js',
    output: 'lib/dayjs/plugin/weekOfYear.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/weekYear.js',
    output: 'lib/dayjs/plugin/weekYear.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/advancedFormat.js',
    output: 'lib/dayjs/plugin/advancedFormat.js'
  },
  {
    input: '../../node_modules/dayjs/plugin/quarterOfYear.js',
    output: 'lib/dayjs/plugin/quarterOfYear.js'
  },
  {
    input: '../../node_modules/echarts/dist/echarts.min.js',
    output: 'lib/echarts.min.js'
  }
];

files.forEach(async ({ input, output }) => {
  await transform(input, output, { minify: true, modules: false }).catch(
    (e) => {
      console.log('error', e);
    }
  );
});

copyFiles.forEach(async ({ input, output }) => {
  // fs.copySync
  fs.copySync(input, output);
});

console.log('babel transform done!');

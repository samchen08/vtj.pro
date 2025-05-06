import { createViteConfig } from '@vtj/cli';
import fs from 'fs-extra';
import { kebabCase } from 'lodash-es';
const BUILD_TYPE = process.env.BUILD_TYPE || '';

const materials = {
  ui: {
    entry: 'src/ui/index.ts',
    library: 'VtjUIMaterial',
    outDir: 'dist/assets/ui'
  },
  icons: {
    entry: 'src/icons/index.ts',
    library: 'VtjIconsMaterial',
    outDir: 'dist/assets/icons'
  },
  element: {
    entry: 'src/element/index.ts',
    library: 'ElementPlusMaterial',
    outDir: 'dist/assets/element'
  },
  antdv: {
    entry: 'src/antdv/index.ts',
    library: 'AntdvMaterial',
    outDir: 'dist/assets/antdv'
  },
  charts: {
    entry: 'src/charts/index.ts',
    library: 'VtjChartsMaterial',
    outDir: 'dist/assets/charts'
  },
  vant: {
    entry: 'src/vant/index.ts',
    library: 'VantMaterial',
    outDir: 'dist/assets/vant'
  },
  uniApp: {
    entry: 'src/uni-app/index.ts',
    library: 'UniApp',
    outDir: 'dist/deps/uni-app'
  },
  uniH5: {
    entry: 'src/uni-h5/index.ts',
    library: 'UniH5',
    outDir: 'dist/deps/uni-h5'
  },
  uniH5Vue: {
    entry: 'src/uni-h5-vue/index.ts',
    library: 'Vue',
    outDir: 'dist/deps/uni-h5-vue'
  },
  uniH5C: {
    entry: 'src/uni-h5/components/index.ts',
    library: 'UniH5Material',
    outDir: 'dist/assets/uni-h5'
  },
  uniUI: {
    entry: 'src/uni-ui/index.ts',
    library: 'UniUI',
    outDir: 'dist/deps/uni-ui'
  },
  uniUIC: {
    entry: 'src/uni-ui/components/index.ts',
    library: 'UniUIMaterial',
    outDir: 'dist/assets/uni-ui'
  }
};

const UniComponents = [
  'View',
  'ScrollView',
  'Swiper',
  'MovableArea',
  'MovableView',
  'CoverView',
  'CoverImage',
  'Icon',
  'Text',
  'RichText',
  'Progress',
  'Button',
  'CheckboxGroup',
  'Checkbox',
  'Editor',
  'Form',
  'Input',
  'Label',
  'Picker',
  'PickerView',
  'RadioGroup',
  'Radio',
  'Slider',
  'Switch',
  'Textarea',
  'Navigator',
  'Image',
  'Video',
  'Map',
  'Canvas',
  'WebView',
  'PickerViewColumn',
  'ResizeSensor',
  'SwiperItem'
];

const UniComponentsKebabCase = UniComponents.map((n) => {
  return {
    name: n,
    value: kebabCase(n)
  };
});

const UinUI = {
  name: 'uni-ui-loader',
  load(id: string) {
    if (
      id.includes('/materials/src/uni-ui/lib') ||
      id.includes('@dcloudio/uni-ui')
    ) {
      let content = fs.readFileSync(id, 'utf-8');
      for (const { name, value } of UniComponentsKebabCase) {
        content = content
          .replace(new RegExp(`<${value}`, 'g'), `<${name}`)
          .replace(new RegExp(`</${value}`, 'g'), `</${name}`);
      }

      return content;
    }
  }
};

function createConfig(name: string) {
  const { entry, library, outDir } = materials[name];
  return createViteConfig({
    library,
    entry,
    outDir,
    lib: true,
    dts: false,
    version: true,
    formats: ['umd'],
    buildTarget: 'es2015',
    external: ['vue', 'vue-router', '@vtj/base', '@vtj/core'],
    externalGlobals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      '@vtj/base': 'VtjBase',
      '@vtj/core': 'VtjCore'
    },
    defineConfig(cfg) {
      cfg.css = {
        preprocessorOptions: {
          scss: {
            additionalData: `
/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color: #333; // 基本色
$uni-text-color-inverse: #fff; // 反色
$uni-text-color-grey: #999; // 辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable: #c0c0c0;

/* 背景颜色 */
$uni-bg-color: #fff;
$uni-bg-color-grey: #f8f8f8;
$uni-bg-color-hover: #f1f1f1; // 点击状态颜色
$uni-bg-color-mask: rgba(0, 0, 0, 0.4); // 遮罩颜色

/* 边框颜色 */
$uni-border-color: #c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm: 12px;
$uni-font-size-base: 14px;
$uni-font-size-lg: 16;

/* 图片尺寸 */
$uni-img-size-sm: 20px;
$uni-img-size-base: 26px;
$uni-img-size-lg: 40px;

/* Border Radius */
$uni-border-radius-sm: 2px;
$uni-border-radius-base: 3px;
$uni-border-radius-lg: 6px;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 5px;
$uni-spacing-row-base: 10px;
$uni-spacing-row-lg: 15px;

/* 垂直间距 */
$uni-spacing-col-sm: 4px;
$uni-spacing-col-base: 8px;
$uni-spacing-col-lg: 12px;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2c405a; // 文章标题颜色
$uni-font-size-title: 20px;
$uni-color-subtitle: #555; // 二级标题颜色
$uni-font-size-subtitle: 18px;
$uni-color-paragraph: #3f536e; // 文章段落颜色
$uni-font-size-paragraph: 15px;

            `
          }
        }
      };
      return cfg;
    },
    plugins: [UinUI]
  });
}

export default createConfig(BUILD_TYPE);

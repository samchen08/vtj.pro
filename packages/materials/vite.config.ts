import { createViteConfig } from '@vtj/cli';
import { defineConfig } from 'vite';
import { kebabCase } from 'lodash-es';
import uni from '@dcloudio/vite-plugin-uni';

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

function createConfig(name: string) {
  const { entry, library, outDir } = materials[name];

  if (name === 'uniUI') {
    return defineConfig({
      plugins: [(uni as any).default({}) as any],

      build: {
        emptyOutDir: false,
        lib: {
          entry: entry,
          name: library,
          fileName: (format) => `deps/uni-ui/index.${format}.js`,
          cssFileName: 'deps/uni-ui/style',
          formats: ['umd']
        },
        rollupOptions: {
          external: ['vue', 'vue-router'],
          output: {
            globals: {
              vue: 'Vue',
              'vue-router': 'VueRouter'
            }
          }
        }
      }
    });
  }

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
    }
  });
}

export default createConfig(BUILD_TYPE);

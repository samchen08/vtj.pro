# VTJ低代码设计器集成过程

本文档记录了将VTJ低代码设计器集成到Vue3项目中的详细过程，包括每个步骤的修改内容和代码片段。

## 一、添加依赖

### 1. 添加@vtj/web到生产依赖

```json
// package.json
"dependencies": {
  "@element-plus/icons-vue": "^2.1.0",
  "@form-create/designer": "^3.2.6",
  "@form-create/element-ui": "^3.2.11",
  "@iconify/iconify": "^3.1.1",
  "@microsoft/fetch-event-source": "^2.0.1",
  "@videojs-player/vue": "^1.0.0",
  "@vtj/web": "latest", // [低代码集成] 添加VTJ Web依赖，用于低代码运行时支持
  "@vueuse/core": "^10.9.0",
  "@wangeditor/editor": "^5.1.23",
  "@wangeditor/editor-for-vue": "^5.1.10",
  "@zxcvbn-ts/core": "^3.0.4",
  // ...其他依赖
}
```

### 2. 添加@vtj/cli、@vtj/pro和@vtj/materials到开发依赖

```json
// package.json
"devDependencies": {
  "@commitlint/cli": "^19.0.1",
  "@commitlint/config-conventional": "^19.0.0",
  "@iconify/json": "^2.2.187",
  "@intlify/unplugin-vue-i18n": "^2.0.0",
  "@purge-icons/generated": "^0.9.0",
  "@vtj/cli": "latest", // [低代码集成] 添加VTJ CLI依赖，用于低代码命令行工具
  "@vtj/pro": "latest", // [低代码集成] 添加VTJ Pro依赖，提供开发工具插件
  "@vtj/materials": "latest", // [低代码集成] 添加VTJ Materials依赖，提供物料资源
  // ...其他依赖
}
```

### 3. 安装依赖

```bash
pnpm i
```

如果遇到物料资源加载问题，可以单独安装@vtj/materials：

```bash
pnpm install @vtj/materials
```

## 二、添加插件

由于@vtj/pro/vite是ESM模块，我们需要使用动态导入的方式处理。

### 1. 修改build/vite/index.ts

```typescript
// build/vite/index.ts
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import progress from 'vite-plugin-progress'
import EslintPlugin from 'vite-plugin-eslint'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import topLevelAwait from 'vite-plugin-top-level-await'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
// [低代码集成] 动态导入ESM模块，解决VTJ插件的ESM兼容性问题
const createDevTools = async () => {
  const module = await import('@vtj/pro/vite')
  return module.createDevTools()
}

export function createVitePlugins() {
  const root = process.cwd()

  // 路径查找
  function pathResolve(dir: string) {
    return resolve(root, '.', dir)
  }

  return [
    Vue(),
    VueJsx(),
    UnoCSS(),
    progress(),
    PurgeIcons(),
    ElementPlus({}),
    // 注释掉直接调用，稍后我们会在vite.config.ts中处理
    // createDevTools(), // 添加VTJ开发工具插件
    // ...其他插件
  ]
}
```

### 2. 修改vite.config.ts

```typescript
// vite.config.ts
import {resolve} from 'path'
import type {ConfigEnv, UserConfig, Plugin} from 'vite'
import {loadEnv} from 'vite'
import {createVitePlugins} from './build/vite'
import {exclude, include} from "./build/vite/optimize"
// 当前执行node命令时文件夹的地址(工作目录)
const root = process.cwd()

// 路径查找
function pathResolve(dir: string) {
    return resolve(root, '.', dir)
}

// [低代码集成] 动态导入VTJ开发工具插件，处理ESM模块兼容性
async function createVTJDevTools(): Promise<Plugin | Plugin[]> {
    try {
        const { createDevTools } = await import('@vtj/pro/vite')
        return createDevTools()
    } catch (error) {
        console.error('Failed to load VTJ DevTools:', error)
        return {
            name: 'vtj-devtools-fallback',
            // 返回一个空插件作为降级处理
        } as Plugin
    }
}

export default async ({command, mode}: ConfigEnv): Promise<UserConfig> => {
    let env = {} as any
    const isBuild = command === 'build'
    if (!isBuild) {
        env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
    } else {
        env = loadEnv(mode, root)
    }
    
    // [低代码集成] 加载VTJ开发工具插件，提供设计器功能
    const vtjDevTools = await createVTJDevTools()
    
    return {
        base: env.VITE_BASE_PATH,
        root: root,
        // 服务端渲染
        server: {
            port: env.VITE_PORT, // 端口号
            host: "0.0.0.0",
            open: env.VITE_OPEN === 'true',
            // 本地跨域代理. 目前注释的原因：暂时没有用途，server 端已经支持跨域
            // proxy: {
            //   ['/admin-api']: {
            //     target: env.VITE_BASE_URL,
            //     ws: false,
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(new RegExp(`^/admin-api`), ''),
            //   },
            // },
        },
        // 项目使用的vite插件。 单独提取到build/vite/plugin中管理
        plugins: [
            ...createVitePlugins(),
            vtjDevTools // [低代码集成] 添加VTJ开发工具插件
        ],
        // ...其他配置
    }
}
```

## 三、改造入口程序

### 修改src/main.ts

```typescript
// src/main.ts
// 引入unocss css
import '@/plugins/unocss'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入 element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入 form-create
import { setupFormCreate } from '@/plugins/formCreate'

// 引入全局样式
import '@/styles/index.scss'

// 引入动画
import '@/plugins/animate.css'

// 路由
import router, { setupRouter } from '@/router'

// 指令
import { setupAuth, setupMountedFocus } from '@/directives'

import { createApp, reactive } from 'vue' // [低代码集成] 导入reactive API，用于低代码组件

import App from './App.vue'

import './permission'

import '@/plugins/tongji' // 百度统计
import Logger from '@/utils/Logger'

import VueDOMPurifyHTML from 'vue-dompurify-html' // 解决v-html 的安全隐患

// [低代码集成] 1、引入 VTJ 相关功能
import { createProvider, LocalService, createModules } from '@vtj/web'
// [低代码集成] 2、引用组件样式
import '@vtj/web/src/index.scss'

// 创建实例
const setupAll = async () => {
  // [低代码集成] 3、实例化低代码服务类
  const service = new LocalService()
  
  // [低代码集成] 4、创建低代码提供者实例
  const { provider, onReady } = createProvider({
    nodeEnv: import.meta.env.MODE, // 使用环境变量的MODE值
    modules: createModules({
      // [低代码集成] 提供Vue响应式API，解决reactive未定义问题
      vue: { reactive },
      // [低代码集成] 配置物料路径，确保能正确加载charts等模块
      materialOptions: {
        basePath: '/',
        // [低代码集成] 使用本地物料，避免网络请求404
        useLocal: true
      }
    }),
    service,
    router,
    materialPath: '/' // [低代码集成] 设置物料路径，解决History模式下404问题
  })
  
  // [低代码集成] 5、低代码提供者初始化完成后注册
  onReady(async () => {
    const app = createApp(App)

    await setupI18n(app)

    setupStore(app)

    setupGlobCom(app)

    setupElementPlus(app)

    setupFormCreate(app)

    setupRouter(app)

    // directives 指令
    setupAuth(app)
    setupMountedFocus(app)

    await router.isReady()

    app.use(VueDOMPurifyHTML)
    app.use(router)
    app.use(provider) // [低代码集成] 注册VTJ提供者
    
    app.mount('#app')
  })
}

setupAll()

Logger.prettyPrimary(`欢迎使用`, import.meta.env.VITE_APP_TITLE)
```

## 四、添加异步依赖

### 修改src/App.vue

```vue
<script lang="ts" setup>
import { isDark } from '@/utils/is'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import routerSearch from '@/components/RouterSearch/index.vue'
import { Suspense } from 'vue' // [低代码集成] 导入Suspense组件，支持异步组件

defineOptions({ name: 'APP' })

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('app')
const appStore = useAppStore()
const currentSize = computed(() => appStore.getCurrentSize)
const greyMode = computed(() => appStore.getGreyMode)
const { wsCache } = useCache()

// 根据浏览器当前主题设置系统主题色
const setDefaultTheme = () => {
  let isDarkTheme = wsCache.get(CACHE_KEY.IS_DARK)
  if (isDarkTheme === null) {
    isDarkTheme = isDark()
  }
  appStore.setIsDark(isDarkTheme)
}
setDefaultTheme()
</script>
<template>
  <ConfigGlobal :size="currentSize">
    <Suspense> <!-- [低代码集成] 添加Suspense组件，支持异步加载低代码页面 -->
      <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
    </Suspense>
    <routerSearch />
  </ConfigGlobal>
</template>
```

## 五、修改tsconfig.json

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...其他配置
  },
  "include": [
    "src",
    "types/**/*.d.ts",
    "src/types/auto-imports.d.ts",
    "src/types/auto-components.d.ts"
  ],
  "exclude": ["dist", "target", "node_modules", ".vtj"] // [低代码集成] 排除.vtj文件夹，避免TypeScript检查生成的低代码文件
}
```

## 六、遇到的问题及解决方案

### 1. ESM模块兼容性问题

**问题描述**：
在运行项目时遇到了错误：`"@vtj/pro/vite" resolved to an ESM file. ESM file cannot be loaded by require`。这是因为@vtj/pro/vite是一个ESM模块，但项目尝试使用CommonJS的require方式加载它。

**解决方案**：
1. 在build/vite/index.ts中使用动态导入方式处理@vtj/pro/vite
2. 在vite.config.ts中实现了异步配置和插件加载

### 2. TypeScript类型错误

**问题描述**：
在修改vite.config.ts文件时，遇到了TypeScript错误：`类型 "Plugin<any>[]" 中缺少属性 "name"，但类型 "Plugin<any>" 中需要该属性`。

**解决方案**：
调整createVTJDevTools函数的返回类型为`Promise<Plugin | Plugin[]>`，以支持返回单个插件或插件数组。

### 3. 组件拖拽问题

**问题描述**：
设计器可以打开，但无法拖拽组件到页面上，控制台报错：
1. `GET http://localhost/@vtj/materials/assets/charts/index.umd.js?v=0.11.12 net::ERR_ABORTED 404 (Not Found)`
2. `Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'reactive')`

**解决方案**：
1. 导入Vue的响应式API：`import { createApp, reactive } from 'vue'`
2. 在createModules函数中添加配置：
   ```javascript
   createModules({
     // 提供Vue响应式API
     vue: { reactive },
     // 配置物料路径
     materialOptions: {
       basePath: '/',
       useLocal: true // 使用本地物料
     }
   })
   ```

### 4. 物料资源加载问题

**问题描述**：
设计器打开后，加载物料资源时报错：
`GET http://localhost/@vtj/materials/deps/element-plus/zh-cn.js?v=0.11.12 net::ERR_ABORTED 404 (Not Found)`

**解决方案**：
安装@vtj/materials依赖，提供物料资源：
```bash
pnpm install @vtj/materials
```

## 七、运行项目

```bash
npm run dev
```

成功启动项目后，可以在页面右下角看到低代码设计器的入口。

## 八、注意事项

1. **路由模式配置**：
   - 由于本项目使用的是createWebHistory路由模式（History模式），必须在createProvider时设置materialPath参数为'/'
   - 如果不设置此参数，会导致通过设计器入口打开的低代码页面出现404错误
   - 这是因为History模式下，浏览器会将URL解析为真实的路径，需要正确设置物料路径

2. **版本兼容性**：
   - 如果后续升级VTJ版本，可能需要重新检查兼容性
   - 特别注意ESM模块的处理方式可能随版本变化

3. **文件管理**：
   - 低代码设计器生成的文件会存储在.vtj文件夹中
   - 已在tsconfig.json中排除.vtj文件夹，避免TypeScript检查生成的低代码文件


 **命令:**
  # 安装 pnpm，提升依赖的安装速度
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
# 安装依赖
pnpm install

# 运行前端
npm run dev

#打包前端
npm run build:dev

清理:
npm cache clean --force
pnpm store prune
rm -rf node_modules
rm pnpm-lock.yaml
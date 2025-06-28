# createRenderer 函数详解

`createRenderer` 是 VTJ 渲染系统的核心函数，用于根据 DSL (Domain Specific Language) 创建 Vue 组件渲染器。

## 作用

1. **组件渲染器创建**：基于 DSL 配置生成可复用的 Vue 组件
2. **上下文管理**：创建并维护组件运行时上下文(Context)
3. **响应式系统集成**：处理状态(state)、计算属性(computed)和方法(methods)
4. **生命周期管理**：集成 DSL 定义的生命周期钩子
5. **跨框架支持**：通过抽象层支持不同版本的 Vue

## 工作原理

### 输入参数 (`CreateRendererOptions`)

```typescript
interface CreateRendererOptions {
  Vue?: any; // Vue 实例 (默认为全局 Vue)
  mode?: ContextMode; // 上下文模式 (默认 Runtime)
  dsl?: BlockSchema; // 块定义 DSL
  components?: Record<string, any>; // 可用组件
  libs?: Record<string, any>; // 第三方库
  apis?: Record<string, any>; // API 集合
  loader?: BlockLoader; // 块加载器
  window?: Window; // 目标窗口对象
}
```

### 核心工作流程

1. **初始化上下文**：

   ```typescript
   const context = new Context({
     mode,
     dsl: dsl.value,
     attrs: { $components, $libs, $apis }
   });
   ```

2. **创建 Vue 组件**：

   - 使用 `Vue.defineComponent` 定义组件
   - 处理 props、setup、render 等核心选项

3. **响应式系统集成**：

   ```typescript
   context.state = createState(Vue, dsl.value.state, context);
   const computed = createComputed(Vue, dsl.value.computed, context);
   const methods = createMethods(dsl.value.methods, context);
   ```

4. **依赖注入处理**：

   ```typescript
   const injects = createInject(Vue, dsl.value.inject, context);
   ```

5. **数据源初始化**：

   ```typescript
   const dataSources = createDataSources(dsl.value.dataSources, context);
   ```

6. **生命周期管理**：

   ```typescript
   ...createLifeCycles(dsl.value.lifeCycles, context)
   ```

7. **渲染逻辑**：
   ```typescript
   render() {
     const nodes: NodeSchema[] = dsl.value.nodes || [];
     // 单节点渲染
     if (nodes.length === 1) return nodeRender(nodes[0], context, Vue, loader, nodes);
     // 多节点渲染
     return nodes.map(child => nodeRender(child, context, Vue, loader, nodes));
   }
   ```

### 关键辅助函数

1. **`createProps()`** - 处理组件 props

   - 支持字符串和对象形式定义
   - 自动解析 JS 表达式默认值

   ```typescript
   const propsDef = createProps(dsl.value.props, context);
   ```

2. **`createState()`** - 创建响应式状态

   - 使用 `Vue.reactive` 创建响应式对象
   - 自动解析 JS 表达式和函数

3. **`createComputed()`** - 创建计算属性

   - 使用 `Vue.computed` 包装计算逻辑

4. **`createDataSources()`** - 初始化数据源

   - 支持 mock 和 API 两种类型
   - 自动处理数据转换

5. **`setWatches()`** - 设置侦听器
   ```typescript
   Vue.watch(
     context.__parseExpression(n.source),
     context.__parseFunction(n.handler),
     { deep, immediate }
   );
   ```

## 使用方法

### 基本使用

```typescript
import { createRenderer } from '@vtj/renderer';

const { renderer, context } = createRenderer({
  Vue, // 可选 Vue 实例
  dsl: blockSchema, // 块定义 DSL
  components: { Button, Input }, // 注册组件
  apis: { fetchData } // 注册 API
});

// 在 Vue 应用中作为组件使用
app.component('BlockRenderer', renderer);
```

### DSL 配置示例

```json
{
  "id": "my-block",
  "name": "MyBlock",
  "props": [{ "name": "title", "type": "string", "required": true }],
  "state": {
    "count": 0,
    "message": "Hello VTJ"
  },
  "methods": {
    "increment": {
      "type": "JSFunction",
      "value": "function() { this.count++ }"
    }
  },
  "nodes": [
    {
      "type": "element",
      "tag": "div",
      "children": [
        { "type": "text", "value": "{{ title }}" },
        {
          "type": "element",
          "tag": "button",
          "events": { "click": "increment" }
        }
      ]
    }
  ]
}
```

### 高级功能

1. **依赖注入**：

   ```json
   "inject": [
     { "name": "theme", "from": "THEME_PROVIDER", "default": "light" }
   ]
   ```

2. **数据源配置**：

   ```json
   "dataSources": {
     "userData": {
       "type": "api",
       "ref": "getUserInfo",
       "transform": {
         "type": "JSFunction",
         "value": "function(data) { return data.user }"
       }
     }
   }
   ```

3. **生命周期钩子**：
   ```json
   "lifeCycles": {
     "mounted": {
       "type": "JSFunction",
       "value": "function() { console.log('组件挂载') }"
     }
   }
   ```

## 最佳实践

1. **组件拆分**：复杂 UI 拆分为多个 block
2. **状态管理**：优先使用块级 state，复杂场景考虑外部状态管理
3. **性能优化**：
   - 使用 `Vue.markRaw` 避免不必要的响应式转换
   - 合理使用计算属性缓存复杂运算
4. **样式隔离**：利用 `adoptedStyleSheets` 实现 CSS 隔离
5. **错误处理**：在数据源中添加错误处理逻辑

## 注意事项

1. 确保 DSL 中的 JS 表达式/函数可安全执行
2. 跨窗口渲染时提供正确的 window 对象
3. 生产环境移除调试用的 mock 数据源
4. 避免在 render 函数中进行复杂计算

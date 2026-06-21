# VTJ 区块管理 — AI 配置与使用指南

> 本文档帮助 AI 理解区块（Block）的三种来源类型、在页面中的使用方式、以及如何通过工具方法管理区块。

---

## 一、区块数据流全貌

```
设计器区块面板                   项目数据                        渲染引擎      →    代码生成
blocks/index.vue              project.blocks                   loader.ts         coder
  ├── 新增 Schema ──→ BlockFile ──→ getDsl(id) ──→ AsyncComponent ──→ import BlockName from './id.vue'
  ├── 新增 UrlSchema ──→           ──→ getDslByUrl(url) ──→ AsyncComponent ──→ provider.defineUrlSchemaComponent()
  ├── 新增 Plugin ──→              ──→ loadScriptUrl(scripts) ──→ AsyncComponent ──→ provider.definePluginComponent()
  ├── 编辑 → updateBlock()
  ├── 删除 → removeBlock()
  └── 克隆 → cloneBlock()

页面使用区块：
  DSL node.from = { type: 'Schema', id: 'blockId' }
                         │
                         ▼
              BlockLoader(id, name, from) → 加载并渲染区块
```

**核心概念：** 区块是可复用的独立组件单元，有三种来源类型。在页面 DSL 中，通过 `node.from` 引用区块。区块可以独立编辑，也可以被拖拽到任意页面使用。

---

## 二、区块三种来源类型

| 类型                 | `fromType`    | 说明                                         | 存储方式     |
| -------------------- | ------------- | -------------------------------------------- | ------------ |
| **设计** (Schema)    | `'Schema'`    | 在设计器中用低代码方式编辑的区块，有独立 DSL | 项目内置 DSL |
| **引用** (UrlSchema) | `'UrlSchema'` | 引用远程 JSON 文件作为 DSL                   | 远程 URL     |
| **插件** (Plugin)    | `'Plugin'`    | 动态加载 JS/CSS 插件作为组件                 | 远程资源 URL |

**类型决策：**

- 需要就地编辑的 → **Schema**
- 多个项目共享同一组件 → **UrlSchema**（中央管理 JSON）
- 需要动态加载第三方或自定义组件 → **Plugin**（上传 JS/CSS 文件）

---

## 三、BlockFile 完整字段

```typescript
interface BlockFile {
  type: 'block'; // 固定为 'block'
  id: string; // 唯一标识（自动生成）
  name: string; // 文件名，驼峰格式，如 UserCard
  title: string; // 显示名称，如 "用户卡片"
  category?: string; // 分组，如 "数据展示"、"表单"
  fromType?: 'Schema' | 'UrlSchema' | 'Plugin'; // 来源类型，默认 'Schema'
  urls?: string; // 资源文件路径（Plugin/UrlSchema 使用，多个用逗号分隔）
  library?: string; // 插件库名（Plugin 类型使用）
  dsl?: BlockSchema; // 区块 DSL 内容（Schema 类型使用）
  preset?: boolean; // 是否为预设区块（不可编辑删除）
  market?: MarketInstallInfo; // 物料市场安装信息
}
```

---

## 四、区块工具方法

### 4.1 `getBlocks` — 获取全部区块

**参数：** 无

**返回：** 简化的区块列表，每项含 `id`、`name`、`title`、`category`

---

### 4.2 `createBlock` — 新建区块

**参数：**

| 参数             | 类型   | 必填 | 说明                                  |
| ---------------- | ------ | ---- | ------------------------------------- |
| `block.name`     | string | ✅   | 区块名称，驼峰格式，如 `UserCard`     |
| `block.title`    | string | ✅   | 区块标题，如 `用户卡片`               |
| `block.category` | string | ❌   | 分组名称，如 `数据展示`。可为新分组名 |

**创建后自动激活** 该区块进入编辑模式。

**示例：**

```json
{
  "action": "createBlock",
  "parameters": [
    {
      "name": "UserCard",
      "title": "用户卡片",
      "category": "数据展示"
    }
  ]
}
```

---

### 4.3 `updateBlock` — 编辑区块元信息

**参数：**

| 参数             | 类型   | 必填 | 说明     |
| ---------------- | ------ | ---- | -------- |
| `block.id`       | string | ✅   | 区块 ID  |
| `block.name`     | string | ❌   | 区块名称 |
| `block.title`    | string | ❌   | 区块标题 |
| `block.category` | string | ❌   | 分组名称 |

---

### 4.4 `removeBlock` — 删除区块

**参数：** `id: string` — 区块 ID

---

## 五、区块在页面中的使用

### 5.1 使用方式

区块被拖拽到页面后，在 DSL 中表现为一个带有 `from` 引用的节点：

```json
{
  "name": "UserCard",
  "from": {
    "type": "Schema",
    "id": "abc123def456"
  },
  "props": {
    "title": "团队成员"
  }
}
```

三种 `from` 格式：

| 类型      | `from` 格式                                           | 加载方式                    |
| --------- | ----------------------------------------------------- | --------------------------- |
| Schema    | `{ type: 'Schema', id: 'blockId' }`                   | 按 id 获取 DSL → 创建渲染器 |
| UrlSchema | `{ type: 'UrlSchema', url: 'https://...' }`           | 按 URL 获取 JSON DSL        |
| Plugin    | `{ type: 'Plugin', urls: [...], library: 'libName' }` | 动态加载 JS/CSS 文件        |

### 5.2 页面保存为区块

将某个页面保存为区块，供其他页面复用：

```
pages/index.vue → 右键 "保存到区块" → project.saveToBlock(page)
```

---

## 六、代码生成规则

### 6.1 Schema 区块

生成独立 `.vue` 文件 + `import` 语句：

```javascript
// 生成在 script setup 顶部
import UserCard from './abc123def456.vue';
```

### 6.2 UrlSchema 区块

生成异步组件定义：

```javascript
const UserCard = __provider.defineUrlSchemaComponent(
  'https://example.com/block.json'
);
```

### 6.3 Plugin 区块

生成插件组件定义：

```javascript
const UserCard = __provider.definePluginComponent({
  type: 'Plugin',
  urls: ['https://example.com/plugin.js', 'https://example.com/plugin.css'],
  library: 'UserCard'
});
```

### 6.4 模板中的使用

三种类型的区块在模板中使用方式相同：

```html
<template>
  <div>
    <UserCard title="团队成员" />
  </div>
</template>
```

---

## 七、区块 vs 页面

| 维度     | 区块 (Block)                | 页面 (Page)                     |
| -------- | --------------------------- | ------------------------------- |
| 用途     | 可复用组件单元              | 独立路由页面                    |
| 路由     | 无独立路由                  | 有独立路由                      |
| 复用     | 可被多个页面引用            | 作为路由终点                    |
| 类型     | Schema / UrlSchema / Plugin | page / dir / layout             |
| 文件类型 | `type: 'block'`             | `type: 'page'`                  |
| 编辑     | 独立编辑区                  | 独立编辑区                      |
| 嵌套     | 通过 `from` 引用            | 通过 children + RouterView 嵌套 |

**典型关系：**

- 页面内部可以嵌入多个区块（通过拖拽）
- 一个区块可以被多个页面同时引用
- 页面可以保存为区块供其他地方复用
- 区块也可以引用其他区块（通过 `from.type = 'Schema'`）

---

## 八、注意事项

1. **Schema 区块可编辑：** 只有 `fromType: 'Schema'` 的区块可以在设计器中打开编辑，UrlSchema 和 Plugin 类型不能在线编辑
2. **预设区块不可删改：** `preset: true` 的区块只能使用，不能编辑和删除
3. **名称自动格式化：** `name` 自动转为大驼峰（`UpperCamelCase`）
4. **名称不可重复：** 区块和页面共享同一个命名空间，`name` 全局不可重复
5. **资源文件格式限制：**
   - UrlSchema 的 `urls` 只接受一个 `.json` 文件
   - Plugin 的 `urls` 可接受多个 `.js`、`.css`、`.json` 文件
6. **Plugin 必须指定 library：** `fromType: 'Plugin'` 时必须填写 `library` 字段，用于查找插件组件
7. **Schema 区块缓存：** 运行时按 `blockId + instanceId` 缓存组件实例，相同区块多实例共享 DSL 但各自独立渲染
8. **双向复用：** 页面可以保存为区块，区块也可以通过拖拽加入页面，两者可互相转换

# VTJ 页面管理 — AI 配置与使用指南

> 本文档帮助 AI 理解页面的三种类型、路由体系、以及如何通过工具方法管理页面。

---

## 一、页面数据流全貌

```
设计器页面树                   项目数据                         渲染引擎
pages/index.vue             project.pages                    routes.ts + page.ts
  ├── 新增 → createPage() ──→ PageFile[] ──→ createStaticRoutes() → RouteRecordRaw[]
  ├── 编辑 → updatePage()                     │
  ├── 删除 → removePage()                     ├──→ createMenus() → 侧边菜单
  ├── 拖拽 → update()                          │
  ├── 主页 → setHomepage()                     └──→ getHomepage() / getPage()
  └── 克隆 → clonePage()
```

**核心概念：** 页面是项目结构的基础单元，页面树即路由树。三种类型决定了路由行为和嵌套关系。

---

## 二、页面类型

| 类型              | `dir`   | `layout` | 说明                                                     |
| ----------------- | ------- | -------- | -------------------------------------------------------- |
| **页面** (page)   | `false` | `false`  | 标准页面，拥有 DSL 及独立路由                            |
| **目录** (dir)    | `true`  | —        | 纯容器节点，无 DSL 无路由，只用于组织子页面              |
| **布局** (layout) | —       | `true`   | 布局壳页面，拥有 DSL 及路由，子页面嵌入其 `<RouterView>` |

**类型决策：**

- 需要嵌套路由时使用**目录**：用户看到的 URL 是子页面路径
- 需要共享外壳（侧边栏、顶栏等）时使用**布局**：子页面路由挂载在布局路由的 `children` 下
- UniApp 平台**不支持**目录和布局类型

---

## 三、PageFile 完整字段

```typescript
interface PageFile extends BlockFile {
  dir?: boolean; // 是否目录
  layout?: boolean; // 是否布局页面
  icon?: string; // 菜单图标（ElementPlus 图标 或 @vtj/icons 名称）
  children?: PageFile[]; // 子页面（目录/布局的子级）
  mask?: boolean; // 内嵌母版，仅 Web 平台
  hidden?: boolean; // 隐藏菜单，仅 Web 平台
  raw?: boolean; // 源码模式（非低代码页面，不可在线编辑）
  pure?: boolean; // 纯净页面（默认 true）
  cache?: boolean; // 开启 KeepAlive 缓存，仅 Web 平台
  meta?: Record<string, any>; // 路由元信息（JSON 对象）
  needLogin?: boolean; // 需要登录，UniApp 专用
  style?: Record<string, any>; // 页面窗口表现，UniApp 专用
}

// 继承自 BlockFile
interface BlockFile {
  type: 'page' | 'block'; // 文件类型
  id: string; // 唯一标识（自动生成）
  name: string; // 文件名（驼峰格式，如 Dashboard）
  title: string; // 页面标题（显示名）
  category?: string; // 分组
  dsl?: BlockSchema; // 页面 DSL 内容（目录类型无此字段）
}
```

---

## 四、页面工具方法

### 4.1 `getPages` — 获取全部页面

**参数：** 无

**返回：** 简化的页面列表，每项含 `id`、`name`、`title`、`layout`、`dir`、`icon`

---

### 4.2 `createPage` — 新建页面

**参数：**

| 参数          | 类型    | 必填 | 说明                              |
| ------------- | ------- | ---- | --------------------------------- |
| `page.name`   | string  | ✅   | 页面名称，驼峰格式，如 `UserList` |
| `page.title`  | string  | ✅   | 页面标题，如 `用户列表`           |
| `page.icon`   | string  | ❌   | 图标名，如 `User`（ElementPlus）  |
| `page.dir`    | boolean | ❌   | 是否目录（默认 false）            |
| `page.layout` | boolean | ❌   | 是否布局（默认 false）            |
| `parentId`    | string  | ❌   | 父页面 ID，用于嵌套               |

**注意事项：**

- 创建嵌套页面时，必须先创建父级（目录或布局），再以 `parentId` 创建子页面
- UniApp 平台强制 `dir = false`、`layout = false`
- 创建非目录页面后自动激活该页面
- 返回 `{ id, name, title, layout, dir }`

**示例：**

```json
{
  "action": "createPage",
  "parameters": [
    { "name": "Dashboard", "title": "仪表盘", "icon": "DataAnalysis" }
  ]
}
```

创建目录及子页面：

```json
// 先创建目录
{ "action": "createPage", "parameters": [{ "name": "System", "title": "系统管理", "dir": true }] }
// 再创建子页面（需用返回的 parentId）
{ "action": "createPage", "parameters": [{ "name": "UserList", "title": "用户列表" }, "DIR_ID"] }
```

---

### 4.3 `updatePage` — 编辑页面元信息

**参数：**

| 参数         | 类型   | 必填 | 说明     |
| ------------ | ------ | ---- | -------- |
| `page.id`    | string | ✅   | 页面 ID  |
| `page.name`  | string | ✅   | 页面名称 |
| `page.title` | string | ✅   | 页面标题 |
| `page.icon`  | string | ❌   | 图标名   |

**限制：** 仅支持修改 `id`、`name`、`title`、`icon` 四个字段，不支持修改 `dir`/`layout` 等类型字段。

---

### 4.4 `removePage` — 删除页面

**参数：** `id: string` — 页面 ID

**限制：** 目录或布局类型的页面需先删除所有子级页面。

---

### 4.5 `setHomepage` — 设置主页

**参数：** `id: string` — 页面 ID

主页即应用的根路由（`/`），访问应用时首先展示的页面。

---

## 五、路由体系

### 5.1 路由生成规则

| 页面类型 | 路由 path                 | 路由 name      | 说明                               |
| -------- | ------------------------- | -------------- | ---------------------------------- |
| 页面     | `/${pageRouteName}/${id}` | `id`           | 标准页面路由                       |
| 目录     | 无路由                    | —              | 仅作为 children 的容器             |
| 布局     | `${prefix}`               | `layout_${id}` | 布局路由的 children 包含子页面路由 |
| 主页     | `/`                       | `home_${id}`   | 根路径路由                         |

**路由元信息合并：**

```typescript
route.meta = {
  title, // 页面标题
  ...routeMeta, // 全局路由元信息配置
  ...page.meta, // 页面自定义 meta（JSON）
  __vtj__: id // 内部标识，用于 getPage(id)
};
```

### 5.2 页面渲染流程

```
URL 访问 /page/userList
  → vue-router 匹配 RouteRecordRaw
  → PageContainer.setup()
  → route.meta.__vtj__ 或 route.params.id 获取 id
  → provider.getPage(id) 获取 PageFile
  → provider.getRenderComponent(file.id)
      ├── 普通模式: getDsl(id) → createDslRenderer(dsl)
      └── 源码模式: modules[`${vtjRawDir}/${id}.vue`]
  → h(component, { ...query, key: sid }) 渲染
```

**关键点：**

- 路由 `params.id` 即页面的 `id` 字段
- 源码模式（`raw = true`）直接导入 `.vue` 文件，跳过 DSL 渲染

### 5.3 菜单生成

菜单从 `project.pages` 树直接生成：

- `layout` 类型：不生成菜单项，递归处理其 children
- 非 `layout` 类型：生成菜单项，`url = ${menuPathPrefix}/${pageRouteName}/${id}`
- `hidden = true` 的菜单项仍生成但标记为隐藏
- 菜单可配合 `access` 进行权限过滤

---

## 六、特殊页面属性

### 6.1 `mask`（内嵌母版）

仅 Web 平台有效。页面显示在父级布局的内部，而不是作为独立路由页面。

**与路由的关系：** mask 页面不影响路由结构，由前端框架的母版机制处理。

### 6.2 `cache`（KeepAlive）

仅 Web 平台有效。开启后页面组件被 `<keep-alive>` 缓存，切换时不销毁。

**代码影响：** 无，由框架自动处理。

### 6.3 `hidden`（隐藏菜单）

仅 Web 平台有效，菜单中不显示该项，但路由仍然存在可访问。

### 6.4 `raw`（源码模式）

页面使用原生 Vue 单文件组件，存储为 `.vue` 文件而非 DSL。**不可在设计器中在线编辑。**

**代码影响：** 自己编写完整 `.vue` 文件，通过 `__provider` 等全局实例访问环境变量、API 等。

### 6.5 `meta`（路由元信息）

JSON 对象，合并到 `route.meta`，用于携带自定义路由数据：

```json
{
  "roles": ["admin"],
  "keepAlive": true,
  "order": 1
}
```

组件中通过 `useRoute().meta` 读取。

### 6.6 UniApp 专属字段

| 字段        | 说明                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| `needLogin` | 页面是否需要登录才能访问                                                                                     |
| `style`     | 页面窗口表现配置，参考 [uni-app pages.json style](https://uniapp.dcloud.net.cn/collocation/pages.html#style) |

---

## 七、典型操作场景

### 7.1 创建标准页面结构

```
Dashboard (page)                        — 仪表盘主页
System (dir)                            — 系统管理目录
  ├── UserList (page)                   — 用户列表
  └── RoleManage (page)                 — 角色管理
```

操作顺序：

1. `createPage({ name: "Dashboard", title: "仪表盘", icon: "Odometer" })`
2. `createPage({ name: "System", title: "系统管理", dir: true, icon: "Setting" })`
3. `createPage({ name: "UserList", title: "用户列表" }, "System的ID")`
4. `createPage({ name: "RoleManage", title: "角色管理" }, "System的ID")`
5. `setHomepage("Dashboard的ID")`

### 7.2 创建布局套子页面

```
AdminLayout (layout)                    — 管理布局（侧边栏+顶栏外壳）
  ├── Profile (page)                    — 个人中心
  └── Settings (page)                   — 系统设置
```

**前提：** AI 需要在 `AdminLayout` 的 DSL 中使用 `<RouterView>` 才能显示子页面。

---

## 八、注意事项

1. **创建顺序：** 必须先创建父级（目录/布局），再创建子页面。子页面的 `parentId` 必须为已存在的目录或布局 ID
2. **删除顺序：** 删除目录/布局前，必须先删除所有子级页面，否则操作失败
3. **名称唯一：** 页面 `name` 在同级中不可重复
4. **名称自动格式化：** `name` 自动转为大驼峰（`UpperCamelCase`）
5. **UniApp 限制：** UniApp 平台不支持 `dir` 和 `layout` 类型，所有页面均为扁平 page 类型
6. **布局 + RouterView：** 布局页面的 DSL 中必须包含 `<RouterView>` 组件，否则子页面不会显示
7. **`updatePage` 限制：** 只能修改 `name`、`title`、`icon`，无法修改类型（dir/layout）等结构字段
8. **源码模式路径：** `raw = true` 的页面，Vue 文件路径为 `{vtjRawDir}/{id}.vue`，其中 `vtjRawDir` 默认为 `.vtj/vue`

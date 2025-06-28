# 项目模型和区块模型

本文档涵盖了 VTJ 低代码平台的核心数据层，重点介绍了管理项目结构、文件组织和状态管理的 `ProjectModel` 和 `BlockModel` 类。这些模型作为所有设计时操作的中央数据存储，并为可视化设计器的文件管理功能提供基础支撑。

有关运行时渲染和执行这些模型的信息，请参阅 Engine、Provider 和 Service Layer 文档。有关代码生成的实现细节，请参阅代码生成和解析管道文档。

## 数据模型架构

项目(Project)和区块(Block)模型构成分层数据结构，完整表示低代码项目的状态：

![](../svg/4/1.png)

## ProjectModel 类结构

`ProjectModel` 类是管理项目状态的主要接口，提供对所有项目实体执行 CRUD 操作的方法：

### 核心属性

| 属性           | 类型                 | 描述                            |
| -------------- | -------------------- | ------------------------------- |
| `id`           | `string`             | 唯一项目标识符                  |
| `name`         | `string`             | 项目名称                        |
| `platform`     | `PlatformType`       | 目标平台（'web'/'h5'/'uniapp'） |
| `pages`        | `PageFile[]`         | 项目页面和目录结构              |
| `blocks`       | `BlockFile[]`        | 可复用区块组件列表              |
| `currentFile`  | `PageFile/BlockFile` | 当前活动文件                    |
| `dependencies` | `Dependency`         | 外部包依赖项                    |
| `apis`         | `ApiSchema`          | API 定义集合                    |
| `meta`         | `MetaSchema[]`       | 元数据配置项                    |

### 文件管理操作

ProjectModel 提供全面的文件管理功能：

![](../svg/4/2.png)

## 事件驱动架构

ProjectModel 实现了完整的事件系统用于状态变更通知：

### 事件类型

| 事件常量                      | 触发条件          | 目的                 |
| ----------------------------- | ----------------- | -------------------- |
| `EVENT_PROJECT_CHANGE`        | 任何项目属性变更  | 通知全局项目更新     |
| `EVENT_PROJECT_ACTIVED`       | 文件打开/关闭操作 | 活动文件状态变更通知 |
| `EVENT_PROJECT_PAGES_CHANGE`  | 页面增删改操作    | 页面结构更新通知     |
| `EVENT_PROJECT_BLOCKS_CHANGE` | 区块增删改操作    | 区块列表更新通知     |
| `EVENT_PROJECT_DEPS_CHANGE`   | 依赖项变更        | 依赖关系更新通知     |
| `EVENT_PROJECT_PUBLISH`       | 项目发布操作      | 触发发布流程         |
| `EVENT_PROJECT_GEN_SOURCE`    | 代码生成操作      | 源代码生成事件通知   |

### 事件流模式

![](../svg/4/3.png)

## 文件类型系统

VTJ 管理两种具有不同特性的主要文件类型：

### PageFile 结构

页面表示可导航的应用程序界面，支持分层组织：

```ts
interface PageFile {
  id: string; // 唯一标识符
  name: string; // 组件名（帕斯卡命名法）
  title: string; // 显示标题
  type: 'page'; // 文件类型标记
  dir?: boolean; // 目录标识
  children?: PageFile[]; // 子页面（目录结构）
  dsl?: BlockSchema; // 设计架构（目录为空）
  raw?: boolean; // 源码模式标记
  cache?: boolean; // 页面缓存配置
  hidden?: boolean; // 是否隐藏于导航
  pure?: boolean; // 纯组件模式
}
```

### BlockFile 结构

区块是可复用的组件单元，支持多种创建方式：

```ts
interface BlockFile {
  id: string; // 唯一标识符
  name: string; // 区块名称
  title: string; // 显示标题
  type: 'block'; // 文件类型标记
  fromType: 'Schema' | 'UrlSchema' | 'Plugin'; // 创建方式
  dsl?: BlockSchema; // 设计架构
  category?: string; // 分类标识
  library?: string; // 插件库名称
  urls?: string; // 外部资源URL
}
```

`fromType` 属性决定区块的处理方式：

- **Schema**：通过可视化设计器创建
- **UrlSchema**：从外部 JSON 架构导入
- **Plugin**：从外部 JavaScript/CSS 资源加载

## 与设计器(Designer)集成

项目模型通过响应式钩子和组件与设计器界面深度集成：

### UI 组件集成架构

![](../svg/4/4.png)

### 文件操作接口

设计器小部件提供用户友好的文件操作界面：

### 页面管理操作

```ts
// 页面管理操作处理
const onAction = async (action: any) => {
  const { name, modelValue } = action;
  const { data } = modelValue;

  switch (name) {
    case 'add': // 创建新页面/目录
      project.value?.createPage(pageData, parentId);
      break;
    case 'edit': // 更新现有页面
      project.value?.updatePage(pageData);
      break;
    case 'remove': // 删除页面
      project.value?.removePage(data.id);
      break;
    case 'copy': // 克隆页面
      project.value?.clonePage(data, parentId);
      break;
    case 'saveToBlock': // 转换为可复用区块
      await project.value?.saveToBlock(data);
      break;
  }
};
```

### 区块管理界面

区块小部件提供分类组织和拖放功能：

![](../svg/4/5.png)

## 数据持久化与序列化

ProjectModel 提供序列化功能用于持久化存储：

### DSL 导出格式

```ts
toDsl(_version?: string): ProjectSchema {
  // 提取可序列化属性
  const attrs = ProjectModel.attrs.reduce((result, current) => {
    result[current] = (this as any)[current];
    return result;
  }, {} as Record<string, any>);

  // 清理序列化数据
  if (attrs.pages) {
    attrs.pages = attrs.pages.map((page: PageFile) => ({
      ...page,
      dsl: undefined // 移除设计架构
    }));
  }

  return {
    __VTJ_PROJECT__: true, // 项目标识
    id: this.id,
    ...attrs
  } as ProjectSchema;
}
```

此序列化格式适用于：

- 项目文件存储
- 版本控制系统
- 模板发布
- 代码生成输入

### 状态管理生命周期

![](../svg/4/6.png)

## 协作编辑锁系统

ProjectModel 通过锁定机制支持协作编辑：

```ts
// 锁定项目
lock(id: string) {
  this.locked = id;
  // 触发变更事件
}

// 解锁项目
unlock(id: string) {
  if (id !== this.locked) return;
  this.locked = '';
  // 触发变更事件
}
```

该系统防止协作环境中的并发修改，并与认证系统集成确保仅授权用户可修改锁定的项目。

:::info 说明
本文档由AI辅助翻译，可能存在术语差异或时效性问题，请查阅原文确认：https://deepwiki.com/ChenXiaohui99/vtj/2.2-project-and-block-models
:::

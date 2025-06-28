# DepsManager 依赖管理器

## 概述

`DepsManager` 是一个用于管理项目依赖项的实用工具类，主要功能包括依赖项的合并、过滤、添加和删除。它特别适用于需要处理多平台依赖或合并内置依赖与项目自定义依赖的场景。

## 核心功能

### 1. 依赖管理

- 内置默认依赖项（`builtInDeps`）
- 支持动态添加/删除依赖项
- 依赖项合并时智能处理覆盖逻辑

### 2. 平台适配

- 根据平台类型（`PlatformType`）过滤依赖项
- 支持依赖项的多平台配置（通过`platform`属性）

### 3. 依赖合并

- 智能合并项目依赖与内置依赖
- 保留项目依赖的启用状态（`enabled`属性）
- 自动处理依赖项冲突（项目依赖优先）

## 使用方法

### 初始化

```typescript
import { depsManager } from '@vtj/designer';

// 获取当前所有内置依赖
const allDeps = depsManager.get();

// 重置内置依赖
depsManager.set(customDeps);
```

### 添加依赖

```typescript
depsManager.add({
  package: 'lodash',
  version: '^4.17.0',
  platform: ['web', 'h5'] // 可选平台配置
});
```

### 合并依赖

```typescript
const mergedDeps = depsManager.merge(projectDeps, 'web');
```

### 删除依赖

```typescript
depsManager.remove('lodash');
```

## API 说明

### `matchDeps(platform?: PlatformType)`

- **作用**：根据平台过滤依赖项
- **参数**：
  - `platform`：平台类型（可选）
- **返回**：匹配平台的依赖项数组

### `get()`

- **作用**：获取所有内置依赖
- **返回**：依赖项数组

### `set(deps: Dependencie[])`

- **作用**：重置内置依赖
- **参数**：
  - `deps`：新的依赖项数组

### `add(dep: Dependencie)`

- **作用**：添加或更新依赖项
- **参数**：
  - `dep`：要添加的依赖项对象
- **注意**：如果依赖已存在，则执行合并更新

### `merge(projectDeps: Dependencie[], platform?: PlatformType)`

- **作用**：合并项目依赖与内置依赖
- **参数**：
  - `projectDeps`：项目自定义依赖
  - `platform`：平台类型（可选）
- **返回**：合并后的依赖项数组
- **合并规则**：
  1. 相同依赖：项目依赖覆盖内置依赖，但保留`enabled`状态
  2. 独有依赖：直接保留

### `remove(name: string)`

- **作用**：删除指定依赖
- **参数**：
  - `name`：依赖包名称

## 类型定义

```typescript
type PlatformType = 'web' | 'h5' | 'uni-app'; // 示例平台类型

interface Dependencie {
  package: string;
  version: string;
  enabled?: boolean;
  platform?: PlatformType | PlatformType[];
}
```

## 使用场景示例

### 跨平台项目依赖管理

```typescript
// 获取web平台专用依赖
const webDeps = depsManager.merge(projectDeps, 'web');

// 获取uni-app平台专用依赖
const uniDeps = depsManager.merge(projectDeps, 'uni-app');
```

### 自定义依赖扩展

```typescript
// 添加私有库依赖
depsManager.add({
  package: '@internal/utils',
  version: '1.0.0',
  platform: ['web']
});

// 合并到当前项目
const finalDeps = depsManager.merge(projectDeps);
```

## 注意事项

1. 内置依赖默认存储在`builtInDeps`中
2. 合并操作不会修改原始依赖，而是返回新数组
3. 当依赖项冲突时，项目依赖的`enabled`状态优先级最高
4. 平台过滤采用包含式逻辑（依赖无平台配置时默认包含）

# WidgetManager 器件管理器

## 概述

WidgetManager 是设计器框架中的核心管理类，负责统一管理所有器件(Widget)的注册、获取、修改和删除。它维护一个器件注册表，为设计器提供器件资源的中央化管理能力。

## 核心功能

### 1. 器件注册

```typescript
register(widget: Widget): void
```

注册一个新器件到管理器。如果同名器件已存在，将被覆盖。

参数：

- `widget`: 完整的器件配置对象，需包含`name`属性作为唯一标识

### 2. 器件获取

```typescript
get(name: string): Widget | undefined
```

根据器件名称获取器件配置。

参数：

- `name`: 目标器件名称

### 3. 器件修改

```typescript
set(name: string, widget: Partial<Widget>): void
```

修改已注册器件的配置属性。

参数：

- `name`: 目标器件名称
- `widget`: 需要更新的部分配置对象
  - 支持深层合并(merge)
  - 特殊处理`component`属性（直接替换）

### 4. 器件删除

```typescript
unregister(name: string): void
```

从管理器移除指定器件。

参数：

- `name`: 目标器件名称

### 5. 区域器件获取

```typescript
getWidgets(region?: RegionType, group?: string): Widget[]
```

获取指定区域和分组的器件列表（自动排序）。

参数：

- `region`: 区域类型（可选）
- `group`: 分组名称（可选）

返回：

- 按`order`属性排序的器件数组

### 6. 远程器件处理

```typescript
getRemoteWidgets(): Widget[]
```

获取所有标记为远程的器件（`remote: true`）。

```typescript
removeRemoteWidgets(): void
```

移除所有远程器件（通常用于清理场景）。

## 使用示例

### 基本使用

```typescript
import { widgetManager, RegionType } from '@vtj/designer';

// 注册新器件
widgetManager.register({
  name: 'custom-button',
  component: ButtonComponent,
  region: RegionType.Actions,
  group: 'basic',
  order: 1
});

// 获取器件配置
const buttonWidget = widgetManager.get('custom-button');

// 修改器件属性
widgetManager.set('custom-button', {
  group: 'advanced',
  order: 5
});

// 删除器件
widgetManager.unregister('custom-button');
```

### 获取区域器件

```typescript
// 获取左侧区域所有基础分组器件
const leftWidgets = widgetManager.getWidgets(RegionType.Left, 'basic');
```

### 远程器件管理

```typescript
// 获取所有远程器件
const remotes = widgetManager.getRemoteWidgets();

// 清除所有远程器件
widgetManager.removeRemoteWidgets();
```

## 注意事项

1. **初始化内置器件**：构造函数会自动注册`builtInWidgets`中的器件
2. **名称唯一性**：器件`name`是唯一标识，重复注册会覆盖
3. **排序机制**：
   - 未指定`order`的器件按添加顺序自动编号
   - `getWidgets()`返回结果总是按`order`升序排列
4. **错误处理**：
   - 修改不存在的器件会输出警告
   - 获取不存在的器件返回`undefined`
5. **远程器件**：通过`remote: true`标记远程器件，可用专用方法管理

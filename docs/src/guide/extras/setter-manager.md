# SetterManager 属性设置器管理器

`setterManager` 是设计器框架中用于管理属性设置器(Setter)的核心工具，提供设置器的注册、获取和动态修改能力。通过集中管理所有属性设置器，它实现了设计器属性面板的灵活扩展和定制。

## 核心作用

1. **统一管理**：维护所有可用设置器的注册表
2. **动态扩展**：支持运行时注册新的属性设置器
3. **智能匹配**：根据数据类型自动匹配适用的设置器
4. **默认支持**：提供兜底默认设置器防止匹配失败

## 基本用法

### 1. 获取 setterManager 实例

```typescript
import { setterManager } from '@vtj/designer';

// 获取单例实例
const manager = setterManager;
```

### 2. 注册新设置器

```typescript
manager.register({
  name: 'color-picker', // 设置器唯一标识
  type: 'Color', // 关联的数据类型
  component: ColorPickerComponent // 对应的UI组件
});
```

### 3. 获取设置器

```typescript
// 按名称获取
const setter = manager.get('text-input');

// 按数据类型获取(返回匹配的设置器名称数组)
const numberSetters = manager.getByType('Number');
// 返回: ['number-input', 'slider-input']
```

### 4. 修改设置器配置

```typescript
// 更新现有设置器配置
manager.set('text-input', {
  label: '文本输入框', // 更新显示标签
  component: EnhancedTextInput // 替换组件
});
```

## 核心API详解

### `register(setter: Setter)`

注册新设置器到管理器

**参数**：

- `setter`: 设置器配置对象，包含：
  - `name`: 设置器唯一名称（必填）
  - `type`: 关联的数据类型（如'String','Number'等）
  - `component`: 渲染用的UI组件（必填）
  - 其他自定义元数据

**示例**：

```typescript
setterManager.register({
  name: 'image-uploader',
  type: 'File',
  component: ImageUploadComponent,
  accept: 'image/*' // 自定义参数
});
```

### `get(name: string): Setter | undefined`

按名称获取设置器实例

**参数**：

- `name`: 设置器名称

**返回值**：

- 匹配的设置器对象，未找到时返回undefined

**示例**：

```typescript
const setter = setterManager.get('date-picker');
if (setter) {
  console.log(setter.component);
}
```

### `set(name: string, setter: Partial<Setter>)`

修改已注册的设置器配置

**参数**：

- `name`: 目标设置器名称
- `setter`: 要合并的配置对象（支持部分更新）

**特性**：

- 支持合并配置（使用`merge`工具）
- 特殊处理`component`字段的直接替换
- 未找到设置器时输出警告

**示例**：

```typescript
// 只更新标签
setterManager.set('number-input', {
  label: '数字输入'
});

// 替换组件实现
setterManager.set('color-picker', {
  component: NewColorPicker
});
```

### `getByType(type: BlockPropDataType): string[]`

获取匹配指定数据类型的设置器名称列表

**参数**：

- `type`: 数据类型（如'String','Boolean'等）

**返回值**：

- 匹配的设置器名称数组（可能包含多个）

**匹配规则**：

- 不区分大小写（'STRING'和'string'视为相同）
- 返回所有匹配类型的设置器名称

**示例**：

```typescript
const booleanSetters = setterManager.getByType('Boolean');
// 可能返回: ['switch', 'checkbox']
```

## 使用场景

### 场景1：扩展设计器属性编辑能力

当需要新增特殊属性的编辑支持时：

```typescript
// 注册JSON编辑器
setterManager.register({
  name: 'json-editor',
  type: 'Object',
  component: JSONEditorComponent
});
```

### 场景2：替换默认设置器实现

```typescript
// 增强文本输入框
setterManager.set('text', {
  component: TextInputWithAI,
  features: ['AI辅助']
});
```

### 场景3：根据数据类型动态选择设置器

```typescript
const propType = 'Color';
const availableSetters = setterManager.getByType(propType);

// 渲染设置器选择器
return (
  <Select options={availableSetters.map(name => ({
    label: name,
    value: name
  }))} />
);
```

## 内置支持

- **默认设置器**：`defaultSetter` 作为兜底设置器
- **内置设置器集合**：包含常见数据类型的编辑组件
  - 文本输入、数字输入、布尔开关
  - 颜色选择器、日期选择器等

> 提示：通过`setterManager.get('default')`可获取默认设置器实现

## 注意事项

1. 修改设置器时需确保名称已存在，否则会触发警告
2. 相同名称的多次注册会覆盖之前的设置器
3. 按类型匹配时返回的是设置器名称而非组件
4. 默认设置器适用于无法匹配具体类型的场景

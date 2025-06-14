# UI 组件库

`vtj/ui` 包提供了 Vue 3 组件的全面集合，这些组件构成了 VTJ 低代码平台用户界面的基础。该库包括表单控件、数据网格、对话框、布局组件和专用交互式元素，旨在在 VTJ 生态系统中无缝工作。

有关如何将这些组件集成到可视化设计器中的信息，请参阅**设计器和渲染器** 。有关图表特定组件的详细信息，请参阅**图表和可视化** 。

## 包体系结构

UI 组件库组织为一个模块化系统，其中组件可以独立工作或相互集成以创建复杂的用户界面。该包遵循 Vue 3 组合式 API 模式，并始终提供 TypeScript 支持。

**UI 组件包结构**

![](../svg/8/1.png)

## 核心组件类别

### 表单和输入组件

该库提供了一组丰富的表单组件，这些组件使用 VTJ 特定的功能扩展了 Element Plus。`XPicker` 组件通过将多个 UI 元素组合到一个复杂的数据选择界面中来举例说明这种方法。

**XPicker 组件架构**

![](../svg/8/2.png)

`XPicker` 演示了关键的 UI 库模式：

| 模式       | 实现                                           | 位置                                       |
| ---------- | ---------------------------------------------- | ------------------------------------------ |
| 组合式 API | 使用 useOptions、useGridColumns、useModel 钩子 | packages/ui/src/components/picker/hooks.ts |
| 类型 安全  | 全面的 TypeScript 接口                         | packages/ui/src/components/picker/types.ts |
| 事件系统   | 具有有效负载类型的结构化发出定义               | packages/ui/src/components/picker/types.ts |
| Prop 验证  | 类型的详细 prop 定义                           | packages/ui/src/components/picker/props.ts |

### 数据显示组件

`XGrid` 组件用作主要数据显示组件，与 VXE 表集成以提供高级网格功能，包括虚拟滚动、编辑、筛选和分页。

**与 UI 组件的网格集成**

![](../svg/8/3.png)

### 对话框和模态组件

`XDialog` 组件提供了整个 UI 库中使用的模态基础，具有一致的样式和行为模式。

## 组件集成模式

### 数据加载模式

`XPicker` 和 `XGrid` 等组件使用加载器函数实现标准化的数据加载模式：

```ts
// Loader function interface from types
type PickerLoader = (params: PickerState) => Promise<{
  list: any[];
  total: number;
}>;
```

**数据加载流程**

![](../svg/8/4.png)

### 事件系统模式

组件使用具有类型化有效负载的一致事件发出模式：

| 元件       | 重要事件               | 负载类型                |
| ---------- | ---------------------- | ----------------------- |
| XPicker    | 更改 ， 选取           | [value: any, data: any] |
| XGrid      | 已加载 ，cell-dblclick | 特定于网格的事件类型    |
| XQueryForm | submit                 | 表单模型数据            |

### 样式和主题

组件使用带有 BEM 方法的 SCSS 和 CSS 自定义属性进行主题设置：

```css
@include b(picker) {
  .el-select__popper {
    display: none !important;
  }
  .x-picker__tigger {
    background: var(--el-fill-color);
    border-radius: 4px;
    // ... responsive sizing
  }
}
```

## 材料集成

UI 组件与 VTJ 材质系统集成，以便在可视化设计器中使用。每个组件都有相应的材质描述，用于定义其属性、事件和配置选项。

**组件材料结构**

![](../svg/8/5.png)

Material System 允许从组件调色板中拖动组件，并在设计器中直观地进行配置。

## 使用示例

### 基本 XPicker 实现

```vue
<XPicker
  v-model="selectedValue"
  :columns="gridColumns"
  :fields="searchFields"
  :loader="dataLoader"
  value-key="id"
  label-key="name"
  query-key="name"
  @picked="onDataPicked"
  @change="onValueChange" />
```

### 使用格式设置的高级多选

```vue
<XPicker
  v-model="multipleValues"
  multiple
  append
  raw
  :formatter="valueParser"
  :value-formatter="valueSerializer"
  :columns="columns"
  :fields="fields"
  :loader="asyncLoader" />
```

UI 组件库为在 VTJ 生态系统中构建复杂的用户界面提供了强大的基础，并为数据处理、事件管理和可视化集成提供了一致的模式。

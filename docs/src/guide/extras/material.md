# VTJ低代码物料开发指南

VTJ是一款基于 Vue3 + Typescript 的低代码页面可视化设计器，支持Web、H5、UniApp应用开发。面向前端开发者，开箱即用。 无缝嵌入本地开发工程，不改变前端开发流程和编码习惯。

本指南旨在系统化指导开发者高效构建可复用的低代码物料。

## 物料简介

低代码物料是低代码开发中预先构建的、可复用的功能模块或组件，旨在通过“搭积木”的方式快速构建应用，避免重复开发。

### 核心定义

- **低代码物料** 是低代码平台生态中的标准化功能单元，类似于“乐高积木”，开发者可通过拖拽、配置直接使用，无需从零开发。
- **核心目标：** 提升开发效率、降低技术门槛、统一产品设计规范。

### 主要类型

VTJ的低代码物料有以下类型：

| 类型     | 描述                               |
| -------- | ---------------------------------- |
| UI组件   | 可视化界面元素，支持配置样式、交互 |
| 工具函数 | 常用的工具函数                     |
| API      | 系统应用的接口请求函数             |
| 区块组件 | 可复用的页面部件                   |
| 页面模版 | 可复用、可修改的页面组件           |

## 基础概念

设计器是根据组件的物料描述识别该组件拥有哪些属性、事件、插槽，以及应该用哪些设置器。 因此UI组件在设计器上使用必须要带有物料描述。

### 组件描述

UI组件描述协议在 `@vtj/core` 定义。

```ts
export interface MaterialDescription {
  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件别名，即组件库导出的原始名称 如 import { Button } from 'ant-design-vue'
   */
  alias?: string;

  /**
   * 组件库导出的名称 如 import { Button } from 'ant-design-vue'
   * parent: Button
   * alias: Group
   * name: AButtonGroup
   * const AButtonGroup = Button.Group;
   * 当 parent 有值时 alias 可以设置多级，如 Group.Item
   *
   */
  parent?: string;

  /**
   * 组件预览图标
   */
  icon?: string;

  /**
   * 组件中文名称描述
   */
  label?: string;

  /**
   * 组件文档Url
   */
  doc?: string;

  /**
   * 分类Id
   */
  categoryId?: number | string;

  /**
   * 组件支持属性，待定义
   */
  props?: MaterialProp[];

  /**
   * 组件支持事件
   */
  events?: Array<string | MaterialEvent>;

  /**
   * 组件支持的插槽
   */
  slots?: Array<string | MaterialSlot>;

  /**
   * 初始化时的低代码片段
   */
  snippet?: Partial<NodeSchema>;

  /**
   * 只能放置在哪些组件内， 如果不设置，则表示可以放置在任何组件内, false表示不能放置在任何组件内
   */
  parentIncludes?: boolean | string[];

  /**
   * 只能允许哪些子组件， 如果不设置，则表示可以放置任何子组件, false表示不能放置在任何子组件
   */
  childIncludes?: boolean | string[];

  /**
   * 不显示在组件面板
   */
  hidden?: boolean;

  /**
   * 组件来源
   */
  from?: NodeFrom;

  /**
   * Block Id
   */
  id?: string;

  /**
   * 所属包名
   */
  package?: string;
}

/**
 * 组件支持的属性
 */
export interface MaterialProp {
  /**
   * 属性名称
   */
  name: string;

  /**
   * 属性名称 中文
   */
  label?: string;

  /**
   * 提示说明
   */
  title?: string;

  /**
   * 默认值
   */
  defaultValue?: JSONValue;
  /**
   * 设置器
   */
  setters?: string | MaterialSetter | Array<string | MaterialSetter>;

  /**
   * 值可选项
   */
  options?: string[] | { label: string; value: JSONValue }[];

  /**
   * 数据类型
   */
  type?: DataType[];
}

/**
 * 属性设置器
 */
export interface MaterialSetter {
  /**
   * 设置器名称标识
   */
  name: string;

  /**
   * 实现组件
   */
  component?: any;

  /**
   * 显示描述文本
   */
  label?: string;

  /**
   * 组件配置参数
   */
  props?: Record<string, any>;
}

/**
 * 组件支持的事件
 */
export interface MaterialEvent {
  /**
   * 事件名称
   */
  name: string;

  /**
   * 事件回调参数名
   */
  params?: string[];
}

/**
 * 组件支持的插槽
 */
export interface MaterialSlot {
  /**
   * 插槽名称
   */
  name: string;

  /**
   * 插槽回传的参数名
   */
  params?: string[];
}
```

## 准备工作

## 物料开发流程

## 测试与发布

## 实际应用案例

## 进阶技巧

## 资源推荐

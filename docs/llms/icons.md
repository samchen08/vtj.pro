# @vtj/icons 图标库 — AI 使用指南

> 本文档帮助 AI 理解 `@vtj/icons` 图标库的构成、导入方式和在 Vue 组件中的使用规范。

---

## 一、图标库构成

`@vtj/icons` 包含四类图标来源：

| 来源                                                 | 说明                                   | 组件类型                     |
| ---------------------------------------------------- | -------------------------------------- | ---------------------------- |
| **SVG 组件**（`./components`）                       | 内置 SVG 图标，Vue 组件形式            | Vue 组件，支持 `colors` 属性 |
| **Iconfont 图标**（`./icons`）                       | 自定义 CSS 图标字体，`VtjIconXxx` 命名 | Vue 组件（CSS 类实现）       |
| **Element Plus 图标**（re-export from `@vtj/icons`） | 全量 re-exported Element Plus 图标     | Vue 组件                     |
| **Assets 图标**（`./assets`）                        | SVG 资源文件导入，`IconXxx` 命名       | SVG 字符串/路径资源          |

所有图标均可作为 Vue 组件使用。全局注册后可在模板中直接使用标签名；按需导入时需配合 `XIcon` 组件（来自 `@vtj/ui`）使用。

---

## 二、安装与注册

### 2.1 安装依赖

```json
{
  "dependencies": {
    "@vtj/icons": "workspace:~"
  }
}
```

### 2.2 全局注册（推荐）

```typescript
import { createApp } from 'vue';
import { IconsPlugin } from '@vtj/icons';
import '@vtj/icons/dist/style.css';

const app = createApp(App);
app.use(IconsPlugin); // 注册所有图标为全局组件
```

或使用独立 `install` 方法：

```typescript
import { install } from '@vtj/icons/install';
import '@vtj/icons/dist/style.css';

install(app);
```

### 2.3 按需导入

按需导入时，图标需通过 `XIcon` 组件渲染。`XIcon` 的 `icon` 属性接收图标组件引用，通过 `:icon="IconName"` 传递：

```vue
<template>
  <XIcon :icon="Edit" :size="20" color="#666666" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { Edit } from '@vtj/icons';
</script>
```

---

## 三、SVG 组件图标

### 3.1 图标列表

以下图标位于 `@vtj/icons` 的 SVG 组件目录，直接按名称导入：

| 组件名           | 说明       |
| ---------------- | ---------- |
| `Fullscreen`     | 全屏       |
| `ExitFullscreen` | 退出全屏   |
| `Fixed`          | 固定       |
| `UnFixed`        | 取消固定   |
| `Visible`        | 可见       |
| `Invisible`      | 不可见     |
| `Maximize`       | 最大化     |
| `Minimize`       | 最小化     |
| `Popup`          | 弹出       |
| `LineHeight`     | 行高       |
| `Rows`           | 行布局     |
| `Skin`           | 皮肤       |
| `QrCodeLogin`    | 二维码登录 |
| `RawClose`       | 原始关闭   |
| `RawLock`        | 原始锁定   |
| `RawUnLock`      | 原始解锁   |
| `UserLogin`      | 用户登录   |

### 3.2 用法

SVG 组件支持 `colors` 属性传递颜色数组，按 path 顺序着色。按需导入时需通过 `XIcon` 渲染：

```vue
<template>
  <!-- 按需导入：通过 XIcon 渲染 -->
  <XIcon :icon="Fullscreen" />
  <XIcon :icon="Fullscreen" :size="24" color="#409EFF" />
  <XIcon :icon="UserLogin" :size="30" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { Fullscreen, UserLogin } from '@vtj/icons';
</script>
```

> **全局注册后**也可直接使用标签名：`<Fullscreen />`、`<UserLogin :colors="['#333', '#409EFF']" />`。

---

## 四、Iconfont 图标

### 4.1 命名规则

所有 iconfont 图标以 `VtjIcon` 为前缀，驼峰命名。相互对应 CSS class 以 `vtj-icon-` 为前缀，短横线命名：

| 组件名              | CSS Class              |
| ------------------- | ---------------------- |
| `VtjIconSetting`    | `vtj-icon-setting`     |
| `VtjIconArrowRight` | `vtj-icon-arrow-right` |
| `VtjIconAi`         | `vtj-icon-ai`          |
| `VtjIconUser`       | `vtj-icon-user`        |
| `VtjIconSave`       | `vtj-icon-save`        |

### 4.2 完整图标列表

#### 通用操作类

| 组件名             | 说明     |
| ------------------ | -------- |
| `VtjIconAdd`       | 添加     |
| `VtjIconRemove`    | 移除     |
| `VtjIconDelete`    | 删除     |
| `VtjIconEdit`      | 编辑     |
| `VtjIconCopy`      | 复制     |
| `VtjIconSave`      | 保存     |
| `VtjIconSearch`    | 搜索     |
| `VtjIconRefresh`   | 刷新     |
| `VtjIconClose`     | 关闭     |
| `VtjIconCheck`     | 勾选     |
| `VtjIconHelp`      | 帮助     |
| `VtjIconInfo`      | 信息     |
| `VtjIconMore`      | 更多     |
| `VtjIconShare`     | 分享     |
| `VtjIconLock`      | 锁定     |
| `VtjIconUnlock`    | 解锁     |
| `VtjIconExport`    | 导出     |
| `VtjIconImport`    | 导入     |
| `VtjIconUpload`    | 上传     |
| `VtjIconDownload`  | 下载     |
| `VtjIconPreview`   | 预览     |
| `VtjIconPublish`   | 发布     |
| `VtjIconSwitch`    | 切换     |
| `VtjIconFixed`     | 固定     |
| `VtjIconUnfixed`   | 取消固定 |
| `VtjIconVisible`   | 可见     |
| `VtjIconInvisible` | 不可见   |

#### 方向箭头类

| 组件名              | 说明   |
| ------------------- | ------ |
| `VtjIconArrowRight` | 箭头右 |
| `VtjIconArrowLeft`  | 箭头左 |
| `VtjIconArrowDown`  | 箭头下 |
| `VtjIconArrowUp`    | 箭头上 |
| `VtjIconGreater`    | 大于号 |
| `VtjIconSmaller`    | 小于号 |
| `VtjIconBack`       | 返回   |
| `VtjIconExpand`     | 展开   |
| `VtjIconCollapsed`  | 收起   |
| `VtjIconRedo`       | 重做   |
| `VtjIconUndo`       | 撤销   |

#### 导航与布局类

| 组件名               | 说明     |
| -------------------- | -------- |
| `VtjIconHome`        | 首页     |
| `VtjIconMenu`        | 菜单     |
| `VtjIconCategory`    | 分类     |
| `VtjIconProject`     | 项目     |
| `VtjIconTemplate`    | 模板     |
| `VtjIconComponents`  | 组件     |
| `VtjIconBlock`       | 区块     |
| `VtjIconPageSetting` | 页面设置 |
| `VtjIconLayers`      | 图层     |
| `VtjIconOutline`     | 大纲     |
| `VtjIconDeps`        | 依赖     |
| `VtjIconData`        | 数据     |
| `VtjIconFile`        | 文件     |
| `VtjIconFolder`      | 文件夹   |
| `VtjIconDocument`    | 文档     |
| `VtjIconHistory`     | 历史     |
| `VtjIconNotice`      | 通知     |
| `VtjIconFav`         | 收藏     |

#### 设备与窗口类

| 组件名                  | 说明       |
| ----------------------- | ---------- |
| `VtjIconPc`             | PC 设备    |
| `VtjIconPhone`          | 手机设备   |
| `VtjIconPad`            | 平板设备   |
| `VtjIconUniapp`         | UniApp     |
| `VtjIconFullscreen`     | 全屏       |
| `VtjIconExitFullscreen` | 退出全屏   |
| `VtjIconWindowMax`      | 窗口最大化 |
| `VtjIconWindowMin`      | 窗口最小化 |
| `VtjIconWindowClose`    | 窗口关闭   |
| `VtjIconWindowNormal`   | 窗口还原   |
| `VtjIconWindowDown`     | 窗口下移   |
| `VtjIconWindowUp`       | 窗口上移   |

#### AI 与工具类

| 组件名              | 说明       |
| ------------------- | ---------- |
| `VtjIconAi`         | AI         |
| `VtjIconNewChat`    | 新建对话   |
| `VtjIconChatRecord` | 对话记录   |
| `VtjIconEnv`        | 环境变量   |
| `VtjIconConfig`     | 配置       |
| `VtjIconLang`       | 语言       |
| `VtjIconGlobal`     | 全局       |
| `VtjIconApi`        | API        |
| `VtjIconOpenapi`    | OpenAPI    |
| `VtjIconSwagger`    | Swagger    |
| `VtjIconDevTools`   | 开发者工具 |
| `VtjIconDiff`       | 差异对比   |
| `VtjIconMaster`     | 主控       |
| `VtjIconConsole`    | 控制台     |
| `VtjIconTeam`       | 团队       |
| `VtjIconBug`        | Bug        |
| `VtjIconVars`       | 变量       |
| `VtjIconJs`         | JS         |
| `VtjIconDatabase`   | 数据库     |

#### 面板定位类

| 组件名               | 说明     |
| -------------------- | -------- |
| `VtjIconTopPanel`    | 顶部面板 |
| `VtjIconBottomPanel` | 底部面板 |
| `VtjIconLeftPanel`   | 左侧面板 |
| `VtjIconRightPanel`  | 右侧面板 |

#### 业务操作类（Np 前缀）

| 组件名               | 说明     |
| -------------------- | -------- |
| `VtjIconNpAdd`       | 新增     |
| `VtjIconNpAddRow`    | 新增行   |
| `VtjIconNpRemove`    | 移除     |
| `VtjIconNpRemoveRow` | 移除行   |
| `VtjIconNpDelete`    | 删除     |
| `VtjIconNpEdit`      | 编辑     |
| `VtjIconNpSave`      | 保存     |
| `VtjIconNpCancel`    | 取消     |
| `VtjIconNpConfirm`   | 确认     |
| `VtjIconNpSubmit`    | 提交     |
| `VtjIconNpReset`     | 重置     |
| `VtjIconNpSearch`    | 搜索     |
| `VtjIconNpSelect`    | 选择     |
| `VtjIconNpExport`    | 导出     |
| `VtjIconNpImport`    | 导入     |
| `VtjIconNpList`      | 列表     |
| `VtjIconNpPrint`     | 打印     |
| `VtjIconNpShare`     | 分享     |
| `VtjIconNpFile`      | 文件     |
| `VtjIconNpRefresh`   | 刷新     |
| `VtjIconNpReturn`    | 返回     |
| `VtjIconNpReturnAll` | 全部返回 |
| `VtjIconNpExit`      | 退出     |
| `VtjIconNpClose`     | 关闭     |
| `VtjIconNpExtend`    | 扩展     |

### 4.3 用法

按需导入时通过 `XIcon` 渲染 Iconfont 图标：

```vue
<template>
  <XIcon :icon="VtjIconSetting" :size="20" />
  <XIcon :icon="VtjIconArrowRight" :size="18" color="#409EFF" />
  <XIcon :icon="VtjIconUser" :size="24" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { VtjIconSetting, VtjIconArrowRight, VtjIconUser } from '@vtj/icons';
</script>
```

> **全局注册后**也可直接使用标签名：`<VtjIconSetting />`。

Iconfont 图标本质是 `<i>` 元素，可通过 CSS 控制大小和颜色：

```css
.vtj-icon-setting {
  font-size: 18px;
  color: var(--el-text-color-primary);
}
```

```css
.vtj-icon-setting {
  font-size: 18px;
  color: var(--el-text-color-primary);
}
```

---

## 五、Element Plus 图标

`@vtj/icons` 全量 re-export Element Plus 的所有图标，直接按 Element Plus 官方名称导入使用。

按需导入时通过 `XIcon` 渲染：

```vue
<template>
  <XIcon :icon="Edit" :size="18" />
  <XIcon :icon="Delete" :size="18" color="#F56C6C" />
  <XIcon :icon="Plus" :size="18" />
  <XIcon :icon="Search" :size="18" />
  <XIcon :icon="ArrowDown" :size="14" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { Edit, Delete, Plus, Search, ArrowDown } from '@vtj/icons';
</script>
```

全量图标列表参见 [Element Plus Icons 文档](https://element-plus.org/zh-CN/component/icon.html)。

---

## 六、Assets 图标

Assets 图标是 SVG 资源导入，以 `Icon` 为前缀命名。它们本质是 SVG 文件路径，适用于非组件场景（如设计器面板预览图、占位图等）。

```typescript
import {
  IconButton,
  IconTable,
  IconForm,
  IconInput,
  IconImage,
  IconMenu,
  IconPage,
  IconSetting
} from '@vtj/icons';
```

Assets 图标数量约 300+，涵盖以下类别：

- **组件类：** `IconButton`、`IconInput`、`IconTable`、`IconForm`、`IconSelect`、`IconRadio`、`IconCheckbox`、`IconDatepick`、`IconTabs`、`IconTag`、`IconCarousel`、`IconSwiper` 等
- **布局类：** `IconRow`、`IconCol`、`IconGrid`、`IconDisplayFlex`、`IconDisplayBlock`、`IconHr`、`IconDivider`（对应 `IconLine`）等
- **样式类：** `IconBorderAll`、`IconMargin`、`IconPadding`、`IconBackgroundColor`、`IconBackgroundImage`、`IconTextAlignCenter`、`IconFontStyleItalic` 等
- **光标类：** `IconCursorPointer`、`IconCursorMove`、`IconCursorGrab`、`IconCursorText`、`IconCursorZoomIn` 等
- **状态类：** `IconEmpty`、`IconEmptyData`、`IconEmptyAction`、`IconLoading`、`IconSuccess`（对应 `IconFlowSuccess`）、`IconError`、`IconWarning`、`IconAlert` 等
- **操作类：** `IconAdd`、`IconDelete`、`IconEdit`、`IconCopy`、`IconSave`、`IconSearch`、`IconRefresh`、`IconPreview`、`IconReturn`、`IconClose`、`IconClear` 等
- **Flow 类：** `IconFlowAdd`、`IconFlowDelete`、`IconFlowEdit`、`IconFlowCheckmark`、`IconFlowCross`、`IconFlowSuccess`、`IconFlowFailure` 等
- **插件类：** `IconPluginIconData`、`IconPluginIconJs`、`IconPluginIconPage`、`IconPluginIconTree`、`IconPluginIconRobot` 等
- **其他：** `IconPage`、`IconHome`、`IconUserLocked`、`IconLocation`、`IconLanguage`、`IconTinyLogo` 等

---

## 七、模板中使用规范

### 7.1 全局注册后使用（推荐）

全局注册后，所有图标均为全局组件，模板中直接使用标签名：

```html
<template>
  <div class="page">
    <!-- SVG 组件图标 -->
    <Fullscreen @click="onFullscreen" />

    <!-- Iconfont 图标 -->
    <VtjIconSetting class="icon" />
    <VtjIconArrowRight style="font-size: 14px;" />

    <!-- Element Plus 图标 -->
    <el-icon :size="18">
      <Edit />
    </el-icon>
  </div>
</template>
```

### 7.2 按需导入使用（推荐）

按需导入时，通过 `XIcon` 组件渲染图标，并可自由控制大小和颜色：

```vue
<template>
  <XIcon :icon="Edit" :size="18" />
  <XIcon :icon="Delete" :size="20" color="#F56C6C" />
  <XIcon
    :icon="VtjIconSetting"
    :size="22"
    color="var(--el-text-color-primary)" />

  <!-- 带点击事件 -->
  <XIcon :icon="Refresh" :size="18" class="action-icon" @click="onRefresh" />

  <!-- SVG 组件传递 colors 属性需先处理 -->
  <XIcon :icon="UserLogin" :size="24" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { Edit, Delete, VtjIconSetting, Refresh } from '@vtj/icons';

  const onRefresh = () => {};
</script>
```

### 7.3 动态图标

```vue
<template>
  <XIcon :icon="currentIcon" :size="24" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { VtjIconSetting, VtjIconUser } from '@vtj/icons';

  let currentIcon = VtjIconSetting;
  const toggleIcon = () => {
    currentIcon = currentIcon === VtjIconSetting ? VtjIconUser : VtjIconSetting;
  };
</script>
```

> 注意：动态切换时，`XIcon` 的 `:icon="variable"` 中 `variable` 应始终持有图标的 Vue 组件引用（即 `import` 后的变量名），而不是字符串。

### 7.4 Assets 图标通过 `src` 属性使用

Assets 图标本质是 SVG 文件路径，通过 `XIcon` 的 `src` 属性渲染：

```vue
<template>
  <XIcon :src="IconButton" :size="40" />
  <XIcon :src="IconTable" :size="40" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { IconButton, IconTable } from '@vtj/icons';
</script>
```

---

## 八、VTJ Composition API 完整示例

以下示例展示按需导入模式，使用 `XIcon` 渲染各类图标：

```vue
<template>
  <div class="page">
    <div class="toolbar">
      <!-- Element Plus 图标 -->
      <XIcon :icon="Plus" :size="18" />
      <XIcon :icon="Edit" :size="18" />
      <XIcon :icon="Delete" :size="18" color="#F56C6C" />

      <!-- VTJ Iconfont 图标 -->
      <XIcon :icon="VtjIconSetting" :size="18" @click="onSetting" />
      <XIcon :icon="VtjIconRefresh" :size="18" @click="onRefresh" />
      <XIcon :icon="VtjIconSearch" :size="18" />

      <!-- SVG 内置图标 -->
      <XIcon :icon="Fullscreen" :size="20" />
      <XIcon :icon="Popup" :size="20" />

      <!-- Assets 图标（通过 src 属性） -->
      <XIcon :src="IconPage" :size="40" />
      <XIcon :src="IconTable" :size="40" />
    </div>

    <el-button type="primary" @click="onSubmit">
      <template #icon>
        <XIcon :icon="Plus" :size="14" />
      </template>
      {{ __i18n.t('common.submit') }}
    </el-button>

    <el-input v-model="keyword" :placeholder="__i18n.t('common.search')">
      <template #prefix>
        <XIcon :icon="Search" :size="14" />
      </template>
    </el-input>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { XIcon } from '@vtj/ui';
  import {
    Plus,
    Edit,
    Delete,
    Search,
    VtjIconSetting,
    VtjIconRefresh,
    VtjIconSearch,
    Fullscreen,
    Popup
  } from '@vtj/icons';
  import { IconPage, IconTable } from '@vtj/icons';

  const keyword = ref('');
  const onSetting = () => {};
  const onRefresh = () => {};
  const onSubmit = () => {};
</script>
```

> 全局注册后则无需 `import { XIcon }` 和图标组件，直接在模板中使用标签名即可。

---

## 九、注意事项

1. **全局注册后可直接使用：** 使用 `IconsPlugin` 或 `install` 全局注册后，所有图标在模板中直接使用标签名，无需手动 import
2. **按需导入需配合 XIcon：** 未全局注册时，需从 `@vtj/ui` 导入 `XIcon`，通过 `:icon="IconName"` 传递图标组件引用
3. **`icon` 属性传递组件引用：** `XIcon` 的 `:icon` 接收 Vue 组件对象（即 `import` 后的变量名），并非字符串路径
4. **Assets 图标用 `src` 属性：** Assets 图标（`IconXxx`）通过 `XIcon` 的 `:src="IconName"` 属性渲染，不是 `:icon`
5. **XIcon 支持 `size` 和 `color`：** `:size` 可传数字或 `'small'`/`'default'`/`'large'`/`'inherit'`，`color` 传 CSS 色值字符串
6. **Iconfont 图标默认颜色：** `VtjIconXxx` 通过 `XIcon` 渲染时，`color` 属性控制颜色；全局注册直接使用时通过 CSS `color` 控制
7. **SVG 组件 `colors` 属性：** SVG 组件支持 `colors` 数组按 path 顺序着色，但需通过 `<component :is="IconName">` 或全局注册后直接标签使用
8. **样式文件：** 需要导入 `@vtj/icons/dist/style.css` 以确保 iconfont 字体和 SVG 组件样式生效
9. **无需耗时搜索图标名称：** 上述列表已覆盖所有图标，直接从列表中选取即可

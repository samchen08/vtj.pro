# @vtj/ui 组件库 — AI 使用指南

> 本文档帮助 AI 理解 `@vtj/ui` 组件库的构成、导入方式和在 Vue 组件中的使用规范。

---

## 一、组件库概览

`@vtj/ui` 是 VTJ 平台的企业级 UI 组件库，基于 Vue 3 + TypeScript 构建，底层依赖 Element Plus 和 VXE Table。提供以下核心模块：

| 模块         | 功能说明                                     | 导入方式                                              |
| ------------ | -------------------------------------------- | ----------------------------------------------------- |
| **组件**     | 30+ 业务组件（Grid、Form、Dialog、Field 等） | `import { XGrid, XForm } from '@vtj/ui'`              |
| **Hooks**    | 可复用的 Composition API 钩子                | `import { useIcon, useLoader } from '@vtj/ui'`        |
| **指令**     | 拖拽、缩放等自定义指令                       | `import { vDraggable, vResizable } from '@vtj/ui'`    |
| **Adapter**  | 适配器系统（上传、字段编辑器、VXE 配置等）   | `import { useAdapter, AdapterPlugin } from '@vtj/ui'` |
| **工具方法** | 通用工具函数                                 | `import { parseSize } from '@vtj/ui/utils'`           |
| **常量**     | 全局常量定义                                 | `import { ... } from '@vtj/ui/constants'`             |

### 1.1 技术栈依赖

```json
{
  "dependencies": {
    "@vtj/icons": "latest",
    "@vtj/utils": "latest",
    "@vueuse/core": "~14.1.0",
    "element-plus": "~2.13.0",
    "sortablejs": "~1.15.6",
    "vxe-table": "~4.6.17",
    "vxe-table-plugin-menus": "~4.0.3"
  }
}
```

### 1.2 组件命名规范

- 所有组件均以 `X` 前缀命名，如 `XGrid`、`XForm`、`XDialog`
- 组件类型定义以 `Props`、`Emits`、`Instance` 结尾，如 `GridProps`、`GridEmits`、`GridInstance`

---

## 二、安装与注册

### 2.1 安装依赖

```json
{
  "dependencies": {
    "@vtj/ui": "latest"
  }
}
```

### 2.2 全局注册

```typescript
import { createApp } from 'vue';
import { AdapterPlugin } from '@vtj/ui';
import '@vtj/ui/dist/style.css';

const app = createApp(App);

// 注册适配器插件（会自动注册 Element Plus 的消息组件）
app.use(AdapterPlugin, {
  uploader: async (file: File) => {
    // 自定义上传逻辑
    return { url: '...', name: file.name };
  },
  fieldEditors: {
    // 自定义字段编辑器
  }
});
```

---

## 三、核心组件使用

### 3.1 XGrid 数据表格

`XGrid` 是基于 VXE Table 封装的高级数据表格组件，支持数据加载、排序、过滤、行/列拖拽排序、单元格编辑等功能。

#### 基本用法

```vue
<template>
  <XGrid
    :columns="columns"
    :loader="loadData"
    :pager="true"
    :row-sortable="true"
    @rowSort="onRowSort"
    @loaded="onLoaded">
    <template #action="{ row }">
      <XAction label="编辑" mode="text" type="primary" @click="onEdit(row)" />
      <XAction label="删除" mode="text" type="danger" @click="onDelete(row)" />
    </template>
  </XGrid>
</template>

<script setup>
  import { ref } from 'vue';
  import { XGrid, XAction } from '@vtj/ui';

  const columns = ref([
    { field: 'name', title: '名称', width: 200 },
    { field: 'status', title: '状态', width: 120 },
    { field: 'action', title: '操作', width: 150, slots: { default: 'action' } }
  ]);

  const loadData = async (state) => {
    const { page, pageSize } = state;
    const res = await request({
      url: '/api/data',
      method: 'get',
      query: { page, pageSize }
    });
    return {
      list: res.list,
      total: res.total
    };
  };

  const onRowSort = (e) => {
    console.log('行排序:', e.oldIndex, '->', e.newIndex);
  };

  const onLoaded = (rows) => {
    console.log('数据加载完成:', rows.length);
  };
</script>
```

#### 列渲染器

```vue
<script setup>
  import { ref } from 'vue';

  const columns = ref([
    // 文本渲染
    { field: 'name', title: '名称' },

    // 日期渲染
    { field: 'date', title: '日期', cellRender: { name: 'Date' } },

    // 数字渲染
    { field: 'amount', title: '金额', cellRender: { name: 'Number' } },

    // 图片渲染
    { field: 'avatar', title: '头像', cellRender: { name: 'Image' } },

    // 链接渲染
    { field: 'url', title: '链接', cellRender: { name: 'Link' } },

    // 标签渲染
    {
      field: 'status',
      title: '状态',
      cellRender: {
        name: 'Tag',
        props: {
          options: [
            { label: '启用', value: 1, type: 'success' },
            { label: '禁用', value: 0, type: 'danger' }
          ]
        }
      }
    },

    // 单元格编辑
    {
      field: 'name',
      title: '名称',
      editRender: { name: 'Input' }
    },

    // 下拉编辑
    {
      field: 'status',
      title: '状态',
      editRender: {
        name: 'Select',
        props: {
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      }
    }
  ]);
</script>
```

#### 高级特性

```vue
<template>
  <XGrid
    ref="gridRef"
    :columns="columns"
    :loader="loadData"
    :customable="true"
    :filter="true"
    :sort="true"
    :edit-config="{ trigger: 'click', mode: 'row' }"
    @editChange="onEditChange"
    @cellSelected="onCellSelected">
  </XGrid>
</template>

<script setup>
  import { ref } from 'vue';
  import { XGrid } from '@vtj/ui';

  const gridRef = ref(null);

  // 获取选中行
  const getSelectedRows = () => {
    return gridRef.value?.getSelectedRows() || [];
  };

  // 刷新数据
  const refresh = () => {
    gridRef.value?.reload();
  };

  const onEditChange = (data) => {
    console.log('编辑数据变化:', data);
  };

  const onCellSelected = (params) => {
    console.log('单元格选中:', params);
  };
</script>
```

---

### 3.2 XForm 表单

`XForm` 是基于 Element Plus Form 封装的表单组件，支持 inline 模式、自动提交/重置、sticky 底部按钮等特性。

#### 基本用法

```vue
<template>
  <XForm
    ref="formRef"
    v-model="formModel"
    :submit-method="onSubmit"
    submit-text="提交"
    reset-text="重置"
    :enter-submit="true"
    :sticky="false"
    footer-align="left"
    @submit="onSubmit"
    @reset="onReset"
    @change="onChange">
    <XField
      name="username"
      label="用户名"
      editor="text"
      :rules="[{ required: true, message: '请输入用户名' }]" />
    <XField name="email" label="邮箱" editor="text" />
    <XField
      name="status"
      label="状态"
      editor="select"
      :options="statusOptions" />
  </XForm>
</template>

<script setup>
  import { ref } from 'vue';
  import { XForm, XField } from '@vtj/ui';

  const formRef = ref(null);
  const formModel = ref({
    username: '',
    email: '',
    status: 1
  });

  const statusOptions = [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ];

  const onSubmit = async (model) => {
    console.log('提交表单:', model);
    await request({
      url: '/api/user',
      method: 'post',
      data: model
    });
  };

  const onReset = () => {
    console.log('表单重置');
  };

  const onChange = (model) => {
    console.log('表单数据变化:', model);
  };
</script>
```

#### Inline 模式

```vue
<template>
  <XForm inline :inline-columns="3" v-model="queryModel" :footer="false">
    <XField name="keyword" label="关键词" editor="text" />
    <XField
      name="status"
      label="状态"
      editor="select"
      :options="statusOptions" />
    <XField name="date" label="日期" editor="date" />
  </XForm>
</template>
```

---

### 3.3 XField 字段组件

`XField` 是统一的表单字段组件，支持多种编辑器类型、动态选项加载、级联刷新、可见性控制等。

#### 内置编辑器

| 编辑器类型 | 说明       | 适用场景     |
| ---------- | ---------- | ------------ |
| `text`     | 文本输入框 | 单行文本     |
| `textarea` | 多行文本框 | 多行文本     |
| `number`   | 数字输入框 | 数值输入     |
| `select`   | 下拉选择   | 单选/多选    |
| `radio`    | 单选框     | 少量选项单选 |
| `checkbox` | 复选框     | 少量选项多选 |
| `date`     | 日期选择   | 日期/时间    |
| `switch`   | 开关       | 布尔值       |

#### 基本用法

```vue
<template>
  <!-- 文本字段 -->
  <XField name="name" label="姓名" editor="text" placeholder="请输入姓名" />

  <!-- 下拉选择 -->
  <XField
    name="status"
    label="状态"
    editor="select"
    :options="statusOptions"
    placeholder="请选择状态" />

  <!-- 动态选项加载 -->
  <XField
    name="department"
    label="部门"
    editor="select"
    :options="loadDepartments" />

  <!-- 级联字段 -->
  <XField
    name="city"
    label="城市"
    editor="select"
    :options="loadCities"
    cascader="province" />

  <!-- 可见性控制 -->
  <XField
    name="detail"
    label="详情"
    editor="textarea"
    :visible="formModel.showDetail" />

  <!-- 禁用/只读 -->
  <XField name="code" label="编码" editor="text" disabled />
  <XField name="createTime" label="创建时间" editor="text" readonly />
</template>

<script setup>
  import { ref } from 'vue';
  import { XField } from '@vtj/ui';

  const formModel = ref({
    showDetail: false
  });

  const statusOptions = [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ];

  const loadDepartments = async () => {
    const res = await request({ url: '/api/departments' });
    return res.map((item) => ({ label: item.name, value: item.id }));
  };

  const loadCities = (model) => {
    // model 包含表单数据，可根据 province 字段值过滤城市
    return request({
      url: '/api/cities',
      query: { province: model.province }
    });
  };
</script>
```

---

### 3.4 XDialog 对话框

`XDialog` 是增强型对话框组件，支持拖拽、缩放、最大化/最小化、多实例管理等。

#### 基本用法

```vue
<template>
  <XDialog
    v-model="visible"
    title="编辑用户"
    size="default"
    :width="'60%'"
    :height="'70%'"
    :draggable="true"
    :resizable="true"
    :maximizable="true"
    :minimizable="false"
    :modal="true"
    :closable="true"
    :body-padding="true"
    @open="onOpen"
    @close="onClose"
    @submit="onSubmit"
    @cancel="onCancel">
    <XForm v-model="userForm" :footer="false">
      <XField name="name" label="姓名" editor="text" />
      <XField name="email" label="邮箱" editor="text" />
    </XForm>
  </XDialog>
</template>

<script setup>
  import { ref } from 'vue';
  import { XDialog, XForm, XField } from '@vtj/ui';

  const visible = ref(false);
  const userForm = ref({});

  const open = () => {
    visible.value = true;
  };

  const onOpen = (instance) => {
    console.log('对话框打开:', instance);
  };

  const onClose = () => {
    console.log('对话框关闭');
  };

  const onSubmit = () => {
    console.log('提交:', userForm.value);
    visible.value = false;
  };

  const onCancel = () => {
    visible.value = false;
  };

  defineExpose({ open });
</script>
---

### 3.5 XActionBar 操作栏

`XActionBar` 用于统一的操作按钮区域，支持按钮、文本、图标模式，下拉菜单等。

```vue
<template>
  <XActionBar
    :items="actions"
    mode="button"
    type="primary"
    size="default"
    @click="onActionClick"
    @command="onActionCommand" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XActionBar, Add, Edit, Delete } from '@vtj/ui';

  const actions = ref([
    { name: 'add', label: '新增', icon: Add },
    {
      name: 'edit',
      label: '编辑',
      icon: Edit,
      disabled: () => !selectedRow.value
    },
    '|', // 分隔符
    {
      name: 'more',
      label: '更多',
      menus: [
        { command: 'export', label: '导出' },
        { command: 'import', label: '导入' },
        { command: 'delete', label: '批量删除', icon: Delete }
      ]
    }
  ]);

  const onActionClick = (action) => {
    console.log('点击操作:', action.name);
    if (action.name === 'add') {
      // 新增逻辑
    }
  };

  const onActionCommand = (item, command) => {
    console.log('菜单命令:', command.command);
  };
</script>
```

---

### 3.6 XQueryForm 查询表单

`XQueryForm` 是专门用于数据查询的表单组件，支持折叠展开、自动布局等。

```vue
<template>
  <XQueryForm
    :items="queryItems"
    v-model="queryModel"
    :inline-columns="4"
    :disabled="loading"
    @submit="onQuery"
    @reset="onReset">
  </XQueryForm>
</template>

<script setup>
  import { ref } from 'vue';
  import { XQueryForm } from '@vtj/ui';

  const queryModel = ref({});
  const loading = ref(false);

  const queryItems = ref([
    { name: 'keyword', label: '关键词', editor: 'text' },
    { name: 'status', label: '状态', editor: 'select', options: statusOptions },
    { name: 'date', label: '日期范围', editor: 'date' }
  ]);

  const onQuery = () => {
    console.log('查询条件:', queryModel.value);
    // 触发数据加载
  };

  const onReset = () => {
    queryModel.value = {};
  };
</script>
```

---

### 3.7 XContainer 布局容器

`XContainer` 是基于 Flex 布局的容器组件，提供丰富的布局控制属性。

```vue
<template>
  <XContainer direction="column" :gap="true" :padding="true">
    <XContainer direction="row" justify="space-between" align="center">
      <span>标题</span>
      <XActionBar :items="actions" />
    </XContainer>

    <XContainer :grow="true" :overflow="'auto'">
      <XGrid :columns="columns" :loader="loadData" />
    </XContainer>
  </XContainer>
</template>

<script setup>
  import { XContainer, XActionBar, XGrid } from '@vtj/ui';
</script>
```

---

### 3.8 其他常用组件

#### XAction 操作按钮

```vue
<template>
  <XAction
    label="新增"
    mode="button"
    type="primary"
    :icon="Add"
    @click="onAdd" />
  <XAction
    label="编辑"
    mode="text"
    type="primary"
    :icon="Edit"
    @click="onEdit" />
  <XAction
    label="删除"
    mode="icon"
    type="danger"
    :icon="Delete"
    @click="onDelete" />
</template>
```

#### XIcon 图标组件

```vue
<template>
  <XIcon :icon="Add" :size="20" color="#409EFF" />
</template>

<script setup>
  import { XIcon } from '@vtj/ui';
  import { Add } from '@vtj/icons';
</script>
```

#### XTabs 标签页

```vue
<template>
  <XTabs v-model="activeTab" :tabs="tabList">
    <template #tab1>
      <p>标签页1内容</p>
    </template>
    <template #tab2>
      <p>标签页2内容</p>
    </template>
  </XTabs>
</template>

<script setup>
  import { ref } from 'vue';
  import { XTabs } from '@vtj/ui';

  const activeTab = ref('tab1');
  const tabList = [
    { name: 'tab1', label: '基本信息' },
    { name: 'tab2', label: '高级设置' }
  ];
</script>
```

#### XAttachment 附件上传

```vue
<template>
  <XAttachment
    v-model="fileList"
    :limit="5"
    :accept="'.jpg,.png,.pdf'"
    :multiple="true"
    @change="onChange"
    @remove="onRemove" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XAttachment } from '@vtj/ui';

  const fileList = ref([]);

  const onChange = (files) => {
    console.log('文件列表变化:', files);
  };

  const onRemove = (file) => {
    console.log('移除文件:', file);
  };
</script>
```

#### XHeader 页头

```vue
<template>
  <XHeader
    title="用户管理"
    subtitle="管理系统用户信息"
    :breadcrumb="breadcrumb">
    <template #extra>
      <XActionBar :items="actions" />
    </template>
  </XHeader>
</template>

<script setup>
  import { XHeader, XActionBar } from '@vtj/ui';

  const breadcrumb = [
    { label: '首页', path: '/' },
    { label: '系统管理' },
    { label: '用户管理' }
  ];
</script>
```

#### XMask 遮罩布局

```vue
<template>
  <XMask>
    <template #menu>
      <XMenu :items="menuItems" />
    </template>

    <template #header>
      <XHeader title="后台管理系统" />
    </template>

    <template #tabs>
      <XTabs v-model="activeTab" :tabs="tabList" />
    </template>

    <router-view />
  </XMask>
</template>
```

---

## 四、Hooks 工具

### 4.1 useIcon 图标钩子

```typescript
import { useIcon } from '@vtj/ui';

const { IconComponent } = useIcon('Add');
```

### 4.2 useLoader 加载器钩子

```typescript
import { useLoader } from '@vtj/ui';

const { data, loading, error, reload } = useLoader(async () => {
  return await request({ url: '/api/data' });
});
```

### 4.3 useDisabled 禁用状态钩子

```typescript
import { useDisabled } from '@vtj/ui';

const disabled = useDisabled(props.disabled, actionItem);
```

### 4.4 useDefer 延迟渲染钩子

```typescript
import { useDefer } from '@vtj/ui';

const defer = useDefer(100); // 延迟 100ms
```

---

## 五、Adapter 适配器系统

### 5.1 使用适配器

```vue
<script setup>
  import { useAdapter } from '@vtj/ui';

  const adapter = useAdapter();

  // 使用上传功能
  const uploadFile = async (file) => {
    if (adapter.uploader) {
      const result = await adapter.uploader(file);
      console.log('上传结果:', result);
    }
  };
</script>
```

### 5.2 配置适配器

```typescript
import { AdapterPlugin } from '@vtj/ui';

app.use(AdapterPlugin, {
  // 自定义上传
  uploader: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await request({
      url: '/api/upload',
      method: 'post',
      data: formData
    });
    return { url: res.url, name: file.name };
  },

  // 自定义字段编辑器
  fieldEditors: {
    customEditor: {
      component: CustomEditorComponent,
      defaultValue: ''
    }
  },

  // VXE Table 配置
  vxeConfig: {
    // ...
  },

  // Grid 自定义配置持久化
  getCustom: async (id) => {
    return await request({ url: `/api/grid-config/${id}` });
  },
  saveCustom: async (info) => {
    await request({
      url: '/api/grid-config',
      method: 'post',
      data: info
    });
  }
});
```

---

## 六、VTJ 代码规范

### 6.1 Composition API 强制规范

所有组件必须使用 `<script setup>` 语法，禁止使用 Options API：

```vue
<!-- ✅ 正确 -->
<script setup>
  import { ref } from 'vue';
  import { XGrid } from '@vtj/ui';

  const columns = ref([]);
</script>

<!-- ❌ 错误 -->
<script>
  export default {
    data() {
      return { columns: [] };
    }
  };
</script>
```

### 6.2 组件导入规范

从 `@vtj/ui` 按需导入组件，不要全局导入：

```vue
<script setup>
  // ✅ 正确：按需导入
  import { XGrid, XForm, XField, XDialog } from '@vtj/ui';

  // ❌ 错误：不要使用全局导入
  import Vue from 'vue';
  Vue.use(UiLibrary);
</script>
```

### 6.3 变量命名规范

- 使用 `ref` 或 `reactive` 声明响应式变量
- 变量名使用 camelCase
- 组件 ref 使用 `xxRef` 命名

```vue
<script setup>
  import { ref } from 'vue';

  // ✅ 正确
  const formData = ref({});
  const gridRef = ref(null);
  const dialogVisible = ref(false);

  // ❌ 错误
  const FormData = ref({});
  const grid_ref = ref(null);
</script>
```

### 6.4 类型定义规范

使用 TypeScript 类型定义：

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import type { GridProps, FormProps } from '@vtj/ui';

  const gridProps = ref<Partial<GridProps>>({
    pager: true,
    :customable="true"
  });
</script>
```

### 6.5 事件处理规范

事件处理函数使用 `on` 前缀：

```vue
<script setup>
  const onSubmit = () => {
    /* ... */
  };
  const onRowClick = (row) => {
    /* ... */
  };
  const onDialogClose = () => {
    /* ... */
  };
</script>
```

---

## 七、完整示例

### 7.1 标准 CRUD 页面

```vue
<template>
  <XContainer direction="column" :gap="true" :padding="true" :fit="true">
    <!-- 页头 -->
    <XHeader title="用户管理">
      <template #extra>
        <XActionBar :items="actions" @click="onActionClick" />
      </template>
    </XHeader>

    <!-- 查询表单 -->
    <XQueryForm
      :items="queryItems"
      v-model="queryModel"
      :inline-columns="4"
      @submit="loadData"
      @reset="onResetQuery" />

    <!-- 数据表格 -->
    <XContainer :grow="true" :overflow="'auto'">
      <XGrid
        ref="gridRef"
        :columns="columns"
        :loader="loadData"
        :pager="true"
        :row-sortable="false"
        @cellSelected="onCellSelected">
        <template #status="{ row }">
          <ElTag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </XGrid>
    </XContainer>

    <!-- 编辑对话框 -->
    <XDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      size="default"
      @submit="onSubmitForm">
      <XForm ref="formRef" v-model="formModel" :footer="false">
        <XField
          name="name"
          label="姓名"
          editor="text"
          :rules="[{ required: true, message: '请输入姓名' }]" />
        <XField name="email" label="邮箱" editor="text" />
        <XField
          name="status"
          label="状态"
          editor="select"
          :options="statusOptions" />
      </XForm>
    </XDialog>
  </XContainer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessage, ElTag } from 'element-plus';
  import {
    XContainer,
    XHeader,
    XActionBar,
    XQueryForm,
    XGrid,
    XDialog,
    XForm,
    XField,
    type GridInstance
  } from '@vtj/ui';
  import { Add, Edit, Delete } from '@vtj/icons';
  import { request } from '@vtj/utils';

  // 状态定义
  const gridRef = ref<GridInstance>(null);
  const formRef = ref(null);
  const dialogVisible = ref(false);
  const dialogTitle = ref('');
  const queryModel = ref({});
  const formModel = ref({});
  const selectedRow = ref(null);

  // 操作栏配置
  const actions = ref([
    { name: 'add', label: '新增', icon: Add, type: 'primary' },
    {
      name: 'edit',
      label: '编辑',
      icon: Edit,
      disabled: () => !selectedRow.value
    },
    {
      name: 'delete',
      label: '删除',
      icon: Delete,
      disabled: () => !selectedRow.value
    }
  ]);

  // 查询配置
  const queryItems = ref([
    { name: 'keyword', label: '关键词', editor: 'text' },
    {
      name: 'status',
      label: '状态',
      editor: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]);

  // 表格列配置
  const columns = ref([
    { field: 'name', title: '姓名', width: 150 },
    { field: 'email', title: '邮箱', width: 200 },
    { field: 'status', title: '状态', width: 100, slots: { default: 'status' } }
  ]);

  // 选项数据
  const statusOptions = [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ];

  // 数据加载
  const loadData = async (state) => {
    const res = await request({
      url: '/api/users',
      method: 'get',
      query: { ...queryModel.value, ...state }
    });
    return { list: res.list, total: res.total };
  };

  // 操作处理
  const onActionClick = (action) => {
    if (action.name === 'add') {
      dialogTitle.value = '新增用户';
      formModel.value = {};
      dialogVisible.value = true;
    } else if (action.name === 'edit') {
      dialogTitle.value = '编辑用户';
      formModel.value = { ...selectedRow.value };
      dialogVisible.value = true;
    } else if (action.name === 'delete') {
      ElMessage.success('删除成功');
    }
  };

  // 表单提交
  const onSubmitForm = async () => {
    await request({
      url: '/api/user',
      method: 'post',
      data: formModel.value
    });
    ElMessage.success('保存成功');
    dialogVisible.value = false;
    gridRef.value?.reload();
  };

  // 查询重置
  const onResetQuery = () => {
    queryModel.value = {};
    loadData();
  };

  // 单元格选中
  const onCellSelected = (params) => {
    selectedRow.value = params.row;
  };
</script>
```

---

## 八、常见问题

### 8.1 如何自定义 Grid 列渲染？

使用 `slots` 配置：

```vue
<XGrid :columns="columns" :loader="loadData">
  <template #customRender="{ row }">
    <span>{{ row.name }} - {{ row.status }}</span>
  </template>
</XGrid>

<script setup>
  const columns = [
    { field: 'name', title: '名称', slots: { default: 'customRender' } }
  ];
</script>
```

### 8.2 如何在 Field 中使用自定义编辑器？

通过 Adapter 注册：

```typescript
app.use(AdapterPlugin, {
  fieldEditors: {
    customEditor: {
      component: CustomEditor,
      defaultValue: ''
    }
  }
});
```

```vue
<XField name="custom" label="自定义" editor="customEditor" />
```

### 8.3 Dialog 如何获取内部组件实例？

通过 `componentInstance` 属性：

```vue
<XDialog
  v-model="visible"
  :content="DialogContent"
  :component-instance="dialogInstance" />

<script setup>
  const dialogInstance = ref(null);
</script>
```

---

## 九、总结

`@vtj/ui` 提供了一套完整的企业级业务组件库，核心特点：

1. **组件前缀统一**：所有组件以 `X` 开头，避免命名冲突
2. **基于成熟生态**：底层使用 Element Plus 和 VXE Table
3. **TypeScript 友好**：完整的类型定义支持
4. **适配器模式**：灵活的扩展机制
5. **Composition API**：全面支持 Vue 3 组合式 API

在编写代码时，请遵循 VTJ 代码规范，使用 Composition API 模式，按需导入组件，合理使用 Hooks 和 Adapter 系统。

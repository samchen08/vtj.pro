# @vtj/renderer 全局 API 使用指南

> 本文档描述 `@vtj/renderer` 提供的全局变量在 Vue 组件中的使用方式，供 AI 大模型生成代码时参考。

---

## 重要约定

这些全局变量由 `@vtj/renderer` 提供，AI 生成代码时可选择以下任一方式使用：

- **直接使用变量名**（推荐）：在方法体内直接使用 `__store`、`__apis` 等变量，无需手动声明或导入，框架会在生成的 `<script setup>` 中自动添加对应的 import 和声明语句
- **从 `@vtj/renderer` 导入**：也可通过 `import { useStore, useApis, ... } from '@vtj/renderer'` 显式导入，再调用对应的 composable 函数获取实例

---

## 一、`__store` — 全局 Pinia Store

### 功能说明

`__store` 是通过 `useStore()` 获取的全局 Pinia store 实例，对应 `this.$store`。用于访问全局共享状态（如用户信息、应用配置等）。

> **前置条件：** `__store` 仅在 VTJ 应用设置中配置了「应用状态 Pinia」后才会生成，未配置时该变量不可用。AI 在生成代码前需先确认项目是否已启用此功能。

### 使用方式

```js
// 读取 store 中的状态
const user = __store.state.user;
const token = __store.state.token;

// 调用 store 中的 action
__store.logout();
__store.setUser({ name: '张三', role: 'admin' });
```

### 典型场景

```js
// 获取当前登录用户信息
const getUser = () => {
  return __store.state.user;
};

// 在 onMounted 中读取用户权限
onMounted(() => {
  const permissions = __store.state.permissions;
  __state.canEdit = permissions.includes('edit');
});

// 登录后存储用户信息（调用 action）
const handleLogin = async () => {
  const res = await __apis['login']({
    username: __state.username,
    password: __state.password
  });
  __store.setUser(res.data);
};
```

---

## 二、`__pinia` — Pinia 实例

### 功能说明

`__pinia` 是通过 `usePinia()` 获取的 Pinia 实例本身，对应 `this.$pinia`。通常用于在组件内动态注册或访问其他 store 模块。

### 使用方式

```js
import { defineStore } from 'pinia';

// 使用 pinia 实例动态访问其他 store
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    }
  }
});

const counterStore = useCounterStore(__pinia);
counterStore.increment();
```

### 典型场景

```js
// 在方法中动态获取某个 store 的状态
const getCounterValue = () => {
  const useCounterStore = defineStore('counter', {
    state: () => ({ count: 0 })
  });
  const store = useCounterStore(__pinia);
  return store.count;
};
```

> 注意：`__pinia` 主要用于需要 pinia 实例参数的高级场景，普通 store 访问请优先使用 `__store`。

---

## 三、`__request` — HTTP 请求实例

### 功能说明

`__request` 是通过 `useRequest()` 获取的 HTTP 请求实例，对应 `this.$request`。用于直接发送 HTTP 请求，或注册请求/响应拦截器。

### 使用方式

#### 发送请求

```js
// GET 请求
const fetchData = async () => {
  const res = await __request.send({
    url: '/api/users',
    method: 'get'
  });
  __state.list = res.data;
};

// POST 请求（带参数）
const submitForm = async () => {
  const res = await __request.send({
    url: '/api/users',
    method: 'post',
    data: {
      name: __state.name,
      email: __state.email
    }
  });
  return res.data;
};

// 带查询参数的 GET
const searchUsers = async (keyword) => {
  const res = await __request.send({
    url: '/api/users/search',
    method: 'get',
    data: { keyword, page: __state.page }
  });
  return res.data;
};
```

#### 注册请求拦截器

```js
// 添加请求头
__request.useRequest((config) => {
  config.headers['X-Custom-Header'] = 'value';
  return config;
});

// 注册响应拦截器
__request.useResponse((res) => {
  return res;
});
```

### 典型场景

```js
// 直接调用接口（不走数据源）
const loadUserDetail = async (id) => {
  __state.loading = true;
  try {
    const res = await __request.send({
      url: `/api/users/${id}`,
      method: 'get'
    });
    __state.user = res.data;
  } finally {
    __state.loading = false;
  }
};
```

> 注意：通常推荐使用 `__apis` 调用在项目中预配置的接口，`__request` 适用于临时或动态构建 URL 的场景。

---

## 四、`__libs` — 第三方库集合

### 功能说明

`__libs` 是通过 `useLibs()` 获取的第三方库对象集合，对应 `this.$libs`。包含项目所有注册的 UI 库和工具库（如 `ElementPlus`、`AntDesignVue`、`VueUse`、`Vant` 等）。

### 结构说明

```
__libs
├── ElementPlus      ← Element Plus 库（如果项目使用）
├── AntDesignVue     ← Ant Design Vue 库（如果项目使用）
├── VueUse           ← VueUse 工具库（如果项目使用）
├── Vant             ← Vant 移动端组件库（如果项目使用）
└── ...              ← 其他注册的第三方库
```

### 使用方式

```js
// 调用 Element Plus 的弹窗
__libs.ElementPlus.ElMessage.success('操作成功');
__libs.ElementPlus.ElNotification({
  title: '提示',
  message: '内容',
  type: 'info'
});

// 调用 Ant Design Vue 的消息提示
__libs.AntDesignVue.message.success('保存成功');
__libs.AntDesignVue.Modal.confirm({
  title: '确认删除？',
  onOk: () => handleDelete()
});

// 使用 VueUse 工具函数
const { useDark } = __libs.VueUse;
const isDark = useDark();

// 调用 Vant 的 Toast
__libs.Vant.showToast('加载中...');
```

### 典型场景

```js
// 动态获取组件或工具（当不确定库名时）
const showMessage = (msg) => {
  if (__libs.ElementPlus) {
    __libs.ElementPlus.ElMessage.success(msg);
  } else if (__libs.AntDesignVue) {
    __libs.AntDesignVue.message.success(msg);
  }
};

// 在事件处理中使用
const handleExport = () => {
  __libs.ElementPlus.ElMessage({ message: '导出中，请稍候...', type: 'info' });
  // ... 导出逻辑
};
```

> 注意：库名（如 `ElementPlus`）是项目配置时指定的 library 名称，需与项目依赖配置中的 `library` 字段一致。

---

## 五、`__apis` — 项目接口集合

### 功能说明

`__apis` 是通过 `useApis()` 获取的项目接口函数集合，对应 `this.$apis`。包含所有在 VTJ 项目中配置的接口（API），每个接口可通过接口 ID 或接口名称调用。

### 使用方式

```js
// 通过接口 ID 调用（推荐，ID 不会随改名变化）
const res = await __apis['api_id_001']({ page: 1, size: 20 });

// 通过接口名称调用
const res = await __apis['getUserList']({ page: 1, size: 20 });

// 带路径参数的接口（URL 形如 /api/users/:id）
// 路径参数通过第二个参数的 params 字段传入
const res = await __apis['getUserById']({}, { params: { id: userId } });

// POST 接口
const res = await __apis['createUser']({
  name: __state.name,
  email: __state.email,
  role: __state.role
});
```

### 典型场景

```js
// 列表查询
const loadList = async () => {
  __state.loading = true;
  try {
    const res = await __apis['getUserList']({
      page: __state.page,
      size: __state.pageSize,
      keyword: __state.keyword
    });
    __state.list = res.data.list;
    __state.total = res.data.total;
  } finally {
    __state.loading = false;
  }
};

// 表单提交
const handleSubmit = async () => {
  const res = await __apis['saveUser'](__state.form);
  if (res.code === 200) {
    __libs.ElementPlus.ElMessage.success('保存成功');
    loadList();
  }
};

// 删除操作（带确认）
const handleDelete = async (id) => {
  await __libs.ElementPlus.ElMessageBox.confirm('确认删除？', '提示');
  await __apis['deleteUser']({ id });
  __libs.ElementPlus.ElMessage.success('删除成功');
  loadList();
};
```

> 注意：`__apis` 中的接口由项目 API 配置决定，接口 ID 和名称需与项目中定义的一致。

---

## 六、`__access` — 权限控制实例

### 功能说明

`__access` 是通过 `useAccess()` 获取的权限控制实例，对应 `this.$access`。提供登录状态管理、权限判断、登录/登出等功能。

> **前置条件：** `__access` 仅在 VTJ 应用设置中配置了「权限控制 Access」后才会生成，未配置时该变量不可用。AI 在生成代码前需先确认项目是否已启用此功能。

### 主要方法

| 方法                   | 说明                         | 返回值                |
| ---------------------- | ---------------------------- | --------------------- |
| `__access.isLogined()` | 判断是否已登录               | `boolean`             |
| `__access.getToken()`  | 获取当前 token               | `string \| undefined` |
| `__access.getData()`   | 获取完整的登录数据（含权限） | `AccessData \| null`  |
| `__access.can(code)`   | 判断是否拥有某权限码（所有） | `boolean`             |
| `__access.some(code)`  | 判断是否拥有某权限码（任一） | `boolean`             |
| `__access.login(data)` | 登录（存储 token 和权限）    | `void`                |
| `__access.logout()`    | 登出（清除数据并跳转登录页） | `void`                |
| `__access.clear()`     | 仅清除本地存储（不跳转）     | `void`                |
| `__access.toLogin()`   | 跳转到登录页                 | `void`                |

### 使用方式

```js
// 判断是否登录
const checkLogin = () => {
  if (!__access.isLogined()) {
    __access.toLogin();
    return;
  }
  loadData();
};

// 获取 token（用于自定义请求头）
const getAuthHeader = () => {
  return `Bearer ${__access.getToken()}`;
};

// 权限判断
const canEdit = __access.can('user:edit');
const canView = __access.can(['user:view', 'admin']); // 需要所有权限
const hasAnyPerm = __access.some(['user:edit', 'admin']); // 任一权限即可

// 登录成功后存储数据
const handleLoginSuccess = (res) => {
  __access.login({
    token: res.data.token,
    permissions: res.data.permissions,
    userInfo: res.data.userInfo
  });
  __router.push('/');
};

// 登出
const handleLogout = () => {
  __access.logout(); // 清除数据并跳转登录页
};
```

### 典型场景

```js
// 页面加载时校验登录态
onMounted(() => {
  if (!__access.isLogined()) {
    __access.toLogin();
    return;
  }
  loadPageData();
});

// 根据权限显示/隐藏按钮（配合响应式状态）
onMounted(() => {
  __state.canDelete = __access.can('record:delete');
  __state.canExport = __access.some(['data:export', 'admin']);
});

// 登录页面提交
const submitLogin = async () => {
  const res = await __apis['login']({
    username: __state.username,
    password: __state.password
  });
  __access.login({
    token: res.data.token,
    permissions: res.data.permissions || {}
  });
  __router.replace('/');
};
```

### 路由页面权限控制

VTJ 低代码平台的动态页面访问受路由权限控制，页面跳转前路由守卫会检查当前用户是否有权访问目标页面。权限检查规则如下：

| 场景                        | 检查的权限码         | 说明                                                                   |
| --------------------------- | -------------------- | ---------------------------------------------------------------------- |
| VTJ 动态页面                | `to.params.id`       | 路由名为 `VtjPage` 的页面，需将页面 ID 记录到 `permissions` 中才能访问 |
| 带 `__vtj__` meta 的路由    | `to.meta.__vtj__`    | 路由 meta 中声明的 `__vtj__` 字段值                                    |
| 带 `permission` meta 的路由 | `to.meta.permission` | 路由 meta 中声明的 `permission` 字段值                                 |

**重要：** 若使用 VTJ 低代码动态页面，登录时必须将用户有权限访问的页面 ID 写入 `permissions`，否则路由守卫会拦截跳转。`permissions` 支持对象键或数组元素两种形式：

```js
// permissions 为对象形式（键为页面 ID，值为 true）
__access.login({
  token: res.data.token,
  permissions: {
    page_123: true,
    page_456: true,
    'user:edit': true
  }
});

// permissions 为数组形式（元素为页面 ID 或权限码）
__access.login({
  token: res.data.token,
  permissions: ['page_123', 'page_456', 'user:edit']
});
```

---

## 七、综合使用示例

以下示例展示多个全局 API 协同工作的场景：

```vue
<template>
  <div class="user-manage">
    <div class="header">
      <span>欢迎，{{ __state.userName }}</span>
      <ElButton @click="handleLogout">退出登录</ElButton>
    </div>
    <ElTable :data="__state.list" v-loading="__state.loading">
      <ElTableColumn prop="name" label="姓名" />
      <ElTableColumn prop="email" label="邮箱" />
      <ElTableColumn label="操作">
        <template #default="{ row }">
          <ElButton v-if="__state.canEdit" size="small" @click="handleEdit(row)"
            >编辑</ElButton
          >
          <ElButton
            v-if="__state.canDelete"
            size="small"
            type="danger"
            @click="handleDelete(row.id)"
            >删除</ElButton
          >
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue';
  import { ElButton, ElTable, ElTableColumn } from 'element-plus';

  const __state = reactive({
    loading: false,
    list: [],
    total: 0,
    userName: '',
    canEdit: false,
    canDelete: false
  });

  const loadList = async () => {
    __state.loading = true;
    try {
      const res = await __apis['getUserList']({ page: 1, size: 20 });
      __state.list = res.data.list || [];
      __state.total = res.data.total || 0;
    } finally {
      __state.loading = false;
    }
  };

  const handleEdit = (row) => {
    __router.push(`/user/edit/${row.id}`);
  };

  const handleDelete = async (id) => {
    await __libs.ElementPlus.ElMessageBox.confirm('确认删除该用户？', '提示', {
      type: 'warning'
    });
    await __apis['deleteUser']({ id });
    __libs.ElementPlus.ElMessage.success('删除成功');
    loadList();
  };

  const handleLogout = () => {
    __access.logout();
  };

  onMounted(() => {
    // 从全局 store 获取用户信息
    __state.userName = __store.state.user?.name || '未知用户';

    // 权限控制
    __state.canEdit = __access.can('user:edit');
    __state.canDelete = __access.can('user:delete');

    loadList();
  });
</script>
```

# Access 权限管理插件

## 概述

Access 是一个强大的 Vue 权限管理插件，提供完整的用户认证和权限控制解决方案。主要功能包括：

- 用户登录/注销管理
- 细粒度权限验证
- 路由访问控制
- 请求自动拦截
- 本地存储管理

## 安装与配置

### 基本配置

```typescript
import { Access } from '@vtj/renderer';

const access = new Access({
  session: false, // 是否使用会话模式
  authKey: 'Authorization', // 认证头字段名
  storageKey: 'ACCESS_STORAGE', // 本地存储key
  storagePrefix: '__VTJ_', // 存储前缀
  whiteList: ['/public'], // 路由白名单
  unauthorized: '/unauthorized', // 未授权跳转路径
  auth: '/login', // 登录页面路径
  unauthorizedCode: 401, // 未授权状态码
  appName: 'myApp' // 应用名称
});
```

### 集成到 Vue 应用

```typescript
// main.ts
import { createApp } from 'vue';
import { request } from '@vtj/utils';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(access); // 安装插件
access.connect({ router, request }); // 连接路由和请求

app.mount('#app');
```

## 核心 API

### 登录

```typescript
access.login({
  token: 'user_token',
  permissions: {
    'user.create': true,
    'user.delete': false
  }
});
```

### 注销

```typescript
access.logout();
```

### 权限验证

```typescript
// 检查是否拥有所有指定权限
const canCreate = access.can('user.create');

// 检查是否拥有任一指定权限
const canEdit = access.some(['user.edit', 'user.update']);

// 函数式检查
const hasPermission = access.can((permissions) => {
  return permissions['admin.*'];
});
```

### 获取用户数据

```typescript
const userData = access.getData();
const token = access.getToken();
```

## 路由守卫配置

### 基本配置

```typescript
access.connect({
  router, // Vue Router 实例
  mode: ContextMode.Raw // 运行模式
});
```

### 白名单配置

```typescript
// 数组形式
whiteList: ['/public', '/about'];

// 函数形式
whiteList: (to) => to.path.startsWith('/public');
```

### 自定义未授权处理

```typescript
unauthorized: () => {
  // 自定义处理逻辑
};
```

## 请求拦截

### 集成请求库

```typescript
import axios from 'axios';

access.connect({
  request: axios // 支持任何符合规范的请求库
});
```

### 请求自动注入 Token

插件会自动在请求头中添加认证信息：

```http
Authorization: Bearer user_token
```

### 响应拦截

当接口返回 401 状态码时，自动跳转到登录页面

## 在组件中使用

### 选项式 API

```vue
<script>
  export default {
    methods: {
      createUser() {
        if (this.$access.can('user.create')) {
          // 执行创建操作
        }
      }
    }
  };
</script>
```

### 组合式 API

```vue
<script setup>
  import { useAccess } from '@vtj/renderer';

  const access = useAccess();

  const canEdit = computed(() => access.can('user.edit'));
</script>
```

## 高级功能

### RSA 加密支持

```typescript
new Access({
  privateKey: '-----BEGIN PRIVATE KEY-----...'
});
```

### 自定义提示方法

```typescript
alert: (message) => {
  return ElMessageBox.alert(message, '提示', {
    type: 'warning'
  });
};
```

### 临时禁用拦截

```typescript
access.disableIntercept(); // 禁用拦截
// 执行特殊请求
access.enableIntercept(); // 重新启用
```

## 注意事项

1. 确保在路由守卫生效前完成用户状态初始化
2. 生产环境建议开启 RSA 加密增强安全性
3. 权限标识符建议使用统一的命名规范（如：模块.操作）

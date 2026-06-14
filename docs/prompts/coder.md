# VTJ Vue 代码编写约定

> 本文档描述 AI 大模型生成 Vue 组件代码时必须遵循的约定，确保输出内容能被 `@vtj/parser` 无损解析为 DSL。

---

## 一、基础结构约定

### 1.1 强制使用 `<script setup>`

所有组件**必须**使用 `<script setup>` 语法，**禁止**使用 Options API（`export default defineComponent({...})`）。

```vue
<!-- ✅ 正确 -->
<script setup>
  // 组件逻辑
</script>

<!-- ❌ 错误 -->
<script>
  export default defineComponent({
    setup() {}
  });
</script>
```

### 1.2 SFC 文件结构顺序

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
  // 脚本逻辑
</script>

<style scoped>
  /* 样式 */
</style>
```

---

## 二、`<script setup>` 内部约定

### 2.1 响应式状态声明

**主状态对象**必须命名为 `__state`，使用 `reactive()` 声明：

```js
// ✅ 正确：主状态对象固定命名为 __state
const __state = reactive({
  count: 0,
  name: '',
  list: []
});

// ✅ 正确：独立 ref 变量（非 __state 的补充）
const visible = ref(false);
const inputValue = ref('');

// ✅ 正确：其他 reactive 对象（非 __state）
const formData = reactive({ title: '', desc: '' });

// ❌ 错误：不得将主状态命名为其他名称
const state = reactive({ count: 0 }); // 错误，必须用 __state
const data = reactive({ count: 0 }); // 错误
```

### 2.2 Props 声明

必须使用 `defineProps()` 声明，**接收变量必须命名为 `__props`**：

```js
// ✅ 正确（运行时声明）
const __props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 }
});

// ✅ 正确（数组声明）
const __props = defineProps(['title', 'count']);

// ❌ 错误：变量名不得使用 props
const props = defineProps({ title: String });
```

### 2.3 Emits 声明

必须使用 `defineEmits()`，**接收变量必须命名为 `__emit`**：

```js
// ✅ 正确
const __emit = defineEmits(['update', 'close']);

// 调用示例
__emit('update', newValue);

// ❌ 错误：变量名不得使用 emit
const emit = defineEmits(['update']);
```

### 2.4 Expose 声明

使用 `defineExpose()` 暴露组件方法或属性：

```js
// ✅ 正确
defineExpose({
  open,
  close,
  getData
});
```

### 2.5 Computed 声明

使用顶层 `const xxx = computed(...)` 声明：

```js
// ✅ 正确
const fullName = computed(() => `${__state.firstName} ${__state.lastName}`);
const isValid = computed(() => __state.list.length > 0);
```

### 2.6 方法声明

使用箭头函数表达式或 `function` 关键字声明，**必须放在顶层**：

```js
// ✅ 正确（箭头函数）
const handleClick = () => {
  __state.count++;
};

const fetchData = async () => {
  const res = await __apis['getList']();
  __state.list = res.data;
};

// ✅ 正确（function 声明）
function handleSubmit() {
  __emit('submit', __state.formData);
}

// ❌ 错误：不得在方法内嵌套定义其他核心方法
```

### 2.7 Watch 声明

使用顶层 `watch(...)` 调用：

```js
// ✅ 正确
watch(
  () => __state.count,
  (newVal, oldVal) => {
    console.log('count changed', newVal);
  }
);

watch(
  () => __props.title,
  (newVal) => {
    __state.localTitle = newVal;
  },
  { immediate: true }
);
```

### 2.8 生命周期钩子

使用标准 Composition API 生命周期钩子，**直接顶层调用**：

```js
// ✅ 正确
onMounted(() => {
  fetchData();
});

onBeforeUnmount(() => {
  cleanup();
});

onUpdated(() => {
  // 更新后逻辑
});
```

**支持的生命周期钩子列表：**

| 钩子名称          | 说明            |
| ----------------- | --------------- |
| `onBeforeMount`   | 挂载前          |
| `onMounted`       | 挂载后          |
| `onBeforeUpdate`  | 更新前          |
| `onUpdated`       | 更新后          |
| `onBeforeUnmount` | 卸载前          |
| `onUnmounted`     | 卸载后          |
| `onErrorCaptured` | 错误捕获        |
| `onActivated`     | keep-alive 激活 |
| `onDeactivated`   | keep-alive 停用 |

### 2.9 Inject / Provide

```js
// inject
const theme = inject('theme', 'light');
const config = inject('config');

// provide
provide('myValue', __state.count);
provide('getList', () => __state.list);
```

### 2.10 自定义 Composables

自定义 composable 函数必须满足 `/^use[A-Z]/` 命名规范（以 `use` 开头，后跟大写字母）：

```js
// ✅ 正确：从第三方库引入
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();

// ✅ 正确：从本地文件引入
import { useTable } from '../composables/useTable';
const { tableData, loading, fetchTable } = useTable();

// ❌ 错误：命名不符合规范
const myHook = myCustomHook(); // 不以 use 开头
```

---

## 三、全局 API 使用约定

`@vtj/parser` 内置了一套全局 API 映射机制，以下 API 在 Composition 模式下**有固定的写法**，不得随意命名。

### 3.1 全局 API 变量命名表

以下全局变量为**系统保留变量**，固定由框架自动生成，**AI 生成代码时不得自行声明**，可以直接在方法和表达式中使用：

| DSL 中的引用        | Composition 代码中的变量        | 来源                                |
| ------------------- | ------------------------------- | ----------------------------------- |
| `this.state`        | `__state`                       | 系统保留（reactive对象）            |
| `this.$props`       | `__props`                       | `defineProps()` 接收变量            |
| `this.$emit`        | `__emit`                        | `defineEmits()` 接收变量            |
| `this.$attrs`       | `__attrs`                       | `const __attrs = useAttrs()`        |
| `this.$slots`       | `__slots`                       | `const __slots = useSlots()`        |
| `this.$nextTick`    | `nextTick`                      | 从 `vue` 导入                       |
| `this.$watch`       | `watch`                         | 从 `vue` 导入                       |
| `this.$refs`        | `__instance.proxy.$refs`        | `getCurrentInstance()`              |
| `this.$el`          | `__instance.proxy.$el`          | `getCurrentInstance()`              |
| `this.$parent`      | `__instance.proxy.$parent`      | `getCurrentInstance()`              |
| `this.$root`        | `__instance.proxy.$root`        | `getCurrentInstance()`              |
| `this.$options`     | `__instance.proxy.$options`     | `getCurrentInstance()`              |
| `this.$forceUpdate` | `__instance.proxy.$forceUpdate` | `getCurrentInstance()`              |
| `this.$router`      | `__router`                      | `const __router = useRouter()`      |
| `this.$route`       | `__route`                       | `const __route = useRoute()`        |
| `this.$i18n`        | `__i18n`                        | `const __i18n = useI18n()`          |
| `this.$t`           | `__i18n.t`                      | `const __i18n = useI18n()`          |
| `this.$n`           | `__i18n.n`                      | `const __i18n = useI18n()`          |
| `this.$d`           | `__i18n.d`                      | `const __i18n = useI18n()`          |
| `this.$store`       | `__store`                       | `useStore()` from `@vtj/renderer`   |
| `this.$pinia`       | `__pinia`                       | `usePinia()` from `@vtj/renderer`   |
| `this.$request`     | `__request`                     | `useRequest()` from `@vtj/renderer` |
| `this.$libs`        | `__libs`                        | `useLibs()` from `@vtj/renderer`    |
| `this.$access`      | `__access`                      | `useAccess()` from `@vtj/renderer`  |
| `this.$apis`        | `__apis`                        | `useApis()` from `@vtj/renderer`    |

### 3.2 Element Plus UI 库 API

使用 Element Plus 时，以下 API 有固定写法：

| DSL 中的引用       | Composition 代码写法        |
| ------------------ | --------------------------- |
| `this.$message`    | `ElMessage(...)`            |
| `this.$notify`     | `ElNotification(...)`       |
| `this.$messageBox` | `ElMessageBox(...)`         |
| `this.$confirm`    | `ElMessageBox.confirm(...)` |
| `this.$prompt`     | `ElMessageBox.prompt(...)`  |
| `this.$loading`    | `ElLoading.service(...)`    |

### 3.3 Ant Design Vue UI 库 API

使用 Ant Design Vue 时：

| DSL 中的引用         | Composition 代码写法   |
| -------------------- | ---------------------- |
| `this.$message`      | `message(...)`         |
| `this.$confirm`      | `Modal.confirm(...)`   |
| `this.$notification` | `notification(...)`    |
| `this.$info`         | `message.info(...)`    |
| `this.$success`      | `message.success(...)` |
| `this.$warning`      | `message.warning(...)` |
| `this.$error`        | `message.error(...)`   |

### 3.4 禁止使用的系统内部变量

以下以 `__` 开头的变量为系统内部保留变量，**AI 生成的代码不得声明或使用**（框架会自动处理）：

- `__instance`（`getCurrentInstance()` 结果）
- `__provider`（内部数据源 provider）
- 任何以 `__` 开头且不在上述全局 API 表中列出的变量

---

## 四、数据源约定

数据源方法（API 调用）必须通过 `__provider.apis` 或 `__provider.createMock` 调用，parser 会识别这种模式并提取为 DSL 的 `dataSources` 字段：

### 4.1 API 数据源

通过 `__provider.apis` 调用已注册的 API 接口：

```ts
// ✅ 正确：API 数据源
const getUserList = async () => {
  return __provider.apis['getUserList']().then((res: any) => {
    return res.data;
  });
};

// ✅ 正确：带参数的 API 调用
const getUserById = async (id: string) => {
  return __provider.apis['getUserById']({ id }).then((res: any) => {
    return res.data;
  });
};
```

### 4.2 Mock 数据源

通过 `__provider.createMock` 创建模拟数据源，支持传入 mockTemplate 函数：

#### 方法签名

```ts
__provider.createMock(mockTemplate?: (params?: any) => Promise<any> | any): Promise<any>
```

**参数说明：**

- `mockTemplate`（可选）：mock 数据模板函数，返回 mock.js 格式的模板对象
- 返回值：返回 Promise，resolve 后得到 mock 生成的数据

#### 使用示例

```ts
// ✅ 正确：无参数的 Mock 数据源
const getMockData = async () => {
  return __provider.createMock().then((res: any) => {
    return res;
  });
};

// ✅ 正确：带 mockTemplate 的 Mock 数据源
const getUserMockData = async () => {
  return __provider
    .createMock((params) => ({
      'id|1-100': 1,
      name: '@cname',
      email: '@email',
      'age|18-60': 18
    }))
    .then((res: any) => {
      return res;
    });
};

// ✅ 正确：根据参数动态生成 mock 数据
const getListMockData = async (count: number = 10) => {
  return __provider
    .createMock((params) => ({
      'list|10': [
        {
          'id|+1': 1,
          title: '@ctitle(5, 10)',
          'status|1': ['pending', 'active', 'completed']
        }
      ]
    }))
    .then((res: any) => {
      return res.list;
    });
};

// ✅ 正确：异步 mockTemplate
const getAsyncMockData = async () => {
  return __provider
    .createMock(async (params) => {
      // 可以在这里执行异步逻辑
      const template = {
        timestamp: () => Date.now(),
        'data|5': [
          {
            id: '@id',
            value: '@integer(100, 1000)'
          }
        ]
      };
      return template;
    })
    .then((res: any) => {
      return res;
    });
};
```

#### Mock 模板语法

`mockTemplate` 函数返回的对象遵循 [mock.js](https://github.com/nuysoft/Mock) 语法规范：

- `'key|min-max': value` - 生成 min 到 max 个重复项
- `'key|count': value` - 生成 count 个重复项
- `'key|+1': value` - 自动递增
- `'@cname'` - 生成中文姓名
- `'@email'` - 生成邮箱
- `'@ctitle(5, 10)'` - 生成 5-10 个中文字符的标题
- `'@integer(100, 1000)'` - 生成 100-1000 的整数
- 更多语法参考 [mock.js 文档](https://github.com/nuysoft/Mock/wiki)

#### 注意事项

1. **必须使用 `__provider.createMock`**，不得直接调用 `Mock.mock()`
2. **mockTemplate 必须返回对象**，不得返回其他类型
3. **异步处理**：如果 mockTemplate 是异步函数，必须使用 `async/await` 或返回 Promise
4. **错误处理**：mockTemplate 执行异常会被捕获并输出警告，不会影响主流程
5. **数据转换**：建议在 `.then()` 中对 mock 数据进行二次处理（如提取特定字段）

---

## 五、模板约定

### 5.1 组件标签命名

- **自定义组件**必须使用 **PascalCase**（大驼峰）：`<MyComponent />`、`<ElButton />`
- **HTML 原生标签**必须使用**小写**：`<div>`、`<span>`、`<input />`
- **不得**将 HTML 标签写成大驼峰或小驼峰

```vue
<!-- ✅ 正确 -->
<template>
  <div class="container">
    <ElButton @click="handleClick">点击</ElButton>
    <MyForm :data="__state.formData" />
  </div>
</template>

<!-- ❌ 错误 -->
<template>
  <Div class="container">
    <!-- HTML 标签不能大写 -->
    <el-button @click="handleClick"> <!-- 组件建议用 PascalCase --> </el-button>
  </Div>
</template>
```

### 5.2 指令使用规范

**v-if / v-else-if / v-else：**

- `v-if` 与 `v-else`/`v-else-if` 的兄弟节点必须保持连续，中间不得插入其他节点
- `v-if` 与 `v-for` 不建议用在同一个节点上，优先使用 `v-for` 的外层包裹

**v-for：**

- 必须提供 `:key` 属性
- 当 `v-for` 的直接子节点只有一个 ELEMENT 时，直接写在该元素上；多子节点则需要用 `<span>` 或 `<div>` 包裹

```vue
<!-- ✅ 正确 -->
<ul>
  <li v-for="item in __state.list" :key="item.id">{{ item.name }}</li>
</ul>

<!-- ✅ 正确（多子节点使用包裹元素） -->
<template>
  <span v-for="item in __state.list" :key="item.id">
    <span>{{ item.name }}</span>
    <span>{{ item.value }}</span>
  </span>
</template>
```

### 5.3 事件绑定

事件处理函数直接引用方法名或内联箭头函数：

```vue
<!-- ✅ 正确 -->
<button @click="handleClick">点击</button>
<input @input="(e) => (__state.value = e.target.value)" />

<!-- ✅ 正确（带参数） -->
<li
  v-for="item in __state.list"
  :key="item.id"
  @click="handleItemClick(item)"></li>
```

### 5.4 动态绑定

```vue
<!-- ✅ 正确：绑定响应式数据 -->
<div :class="__state.className">
<input :value="__state.inputVal" />
<MyComp :title="__props.title" :count="fullName" />

<!-- ✅ 正确：绑定 ref -->
<div :style="{ color: isDark.value ? 'white' : 'black' }">
```

### 5.5 Slot 插槽

```vue
<!-- 父组件：传入插槽 -->
<template>
  <MyDialog>
    <template #header>
      <h2>标题</h2>
    </template>
    <template #default="{ row }">
      <span>{{ row.name }}</span>
    </template>
  </MyDialog>
</template>

<!-- 子组件：定义插槽 -->
<template>
  <div>
    <slot name="header" />
    <slot :row="currentRow" />
  </div>
</template>
```

---

## 六、Import 导入约定

### 6.1 Vue 核心 API 导入

```js
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  inject,
  provide,
  nextTick
} from 'vue';
```

### 6.2 Vue Router 导入

```js
import { useRouter, useRoute } from 'vue-router';
const __router = useRouter();
const __route = useRoute();
```

### 6.3 vue-i18n 导入

```js
import { useI18n } from 'vue-i18n';
const __i18n = useI18n();
// 使用：__i18n.t('key')
```

### 6.4 组件导入命名

- 导入组件时，使用与 UI 库文档一致的 **PascalCase** 名称
- 如需别名（如 UI 库命名冲突），使用 `as` 语法：`import { Button as AButton } from 'ant-design-vue'`
- parser 会自动识别 `as` 别名，将本地名作为组件标签名

```js
// ✅ 正确
import { ElButton, ElForm, ElTable } from 'element-plus';
import { Button as AButton, Table as ATable } from 'ant-design-vue';

// 模板中使用本地名
// <AButton> 而非 <Button>
```

### 6.5 UI 组件 parent 子组件声明

当使用 UI 组件的子组件（如 `AButton.Group`）时，必须显式声明：

```js
import { Button as AButton } from 'ant-design-vue';
const AButtonGroup = AButton.Group; // ✅ 派生声明，parser 会识别并跳过
```

---

## 七、CSS / Style 约定

### 7.1 scoped 样式

优先使用 `<style scoped>` 避免样式污染：

```vue
<style scoped>
  .container {
    padding: 16px;
  }
  .title {
    font-size: 18px;
    color: #333;
  }
</style>
```

### 7.2 动态 class

```vue
<!-- ✅ 字符串表达式 -->
<div :class="__state.isActive ? 'active' : ''">

<!-- ✅ 对象语法 -->
<div :class="{ active: __state.isActive, disabled: !__state.enabled }">

<!-- ✅ 数组语法 -->
<div :class="[__state.baseClass, __state.extraClass]">
```

---

## 八、禁止事项汇总

以下行为会导致 parser 无法正确解析，**严格禁止**：

1. **禁止使用 Options API**，不得出现 `export default { data(), methods:{}, ...}` 结构
2. **禁止手动声明系统内部变量**（`__instance`、`__provider` 等双下划线保留变量）
3. **禁止将 `defineProps` 的接收变量命名为非 `__props`**（如 `props`、`myProps`）
4. **禁止将 `defineEmits` 的接收变量命名为非 `__emit`**（如 `emit`、`emits`）
5. **禁止将主状态 `reactive` 对象命名为非 `__state`**（如 `state`、`data`）
6. **禁止编写"游离顶层语句"**（无法归类到 ref/reactive/computed/method/watch/lifecycle 的顶层语句），如需初始化逻辑，请放在 `onMounted` 中或在声明时赋初值
7. **禁止在 `<script setup>` 顶层使用 `await`**（会生成 setupStatements）
8. **禁止自行调用全局 composable**（`useRouter`、`useI18n`、`useStore`、`useApis` 等），这些由框架根据 DSL 自动生成
9. **禁止 HTML 原生标签使用 PascalCase**（如 `<Div>`、`<Span>`）

---

## 九、完整示例

```vue
<template>
  <div class="user-list">
    <h2>{{ __state.title }}</h2>
    <ElButton @click="loadData" :loading="__state.loading">刷新</ElButton>
    <ul>
      <li
        v-for="user in __state.users"
        :key="user.id"
        @click="handleUserClick(user)">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    <ElDialog v-model="dialogVisible" :title="__state.dialogTitle">
      <p>{{ __state.selectedUser?.name }}</p>
    </ElDialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { ElButton, ElDialog } from 'element-plus';

  // Props
  const __props = defineProps({
    pageSize: Number
  });

  // Emits
  const __emit = defineEmits(['select']);

  // 主状态
  const __state = reactive({
    title: '用户列表',
    loading: false,
    users: [],
    selectedUser: null,
    dialogTitle: ''
  });

  // 独立 ref
  const dialogVisible = ref(false);

  // Computed
  const hasUsers = computed(() => __state.users.length > 0);

  // 方法
  const loadData = async () => {
    __state.loading = true;
    try {
      const res = await __apis['getUserList']({
        pageSize: __props.pageSize || 10
      });
      __state.users = res.data || [];
    } finally {
      __state.loading = false;
    }
  };

  const handleUserClick = (user) => {
    __state.selectedUser = user;
    __state.dialogTitle = `用户：${user.name}`;
    dialogVisible.value = true;
    __emit('select', user);
  };

  // 生命周期
  onMounted(() => {
    loadData();
  });
</script>

<style scoped>
  .user-list {
    padding: 16px;
  }
</style>
```

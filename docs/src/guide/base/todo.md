# 创建一个低代码应用（ Todo ）

## 先导

在实现 Todo 待办事项这个功能之前, 先对页面布局信息进行个大概的了解。页面分为`四个区域`，从左到右分别为`应用栏（1）`，`应用管理栏（2）`，`设计视图（3）`和`配置栏（4）`。
在页面上面的5号区域是页面的`视图转换`，可以切换页面成PC/H5/IPad。而6号区域是`页面的配置`。分别是页面的预览、刷新、设置和发布。
![页面了解](../../assets/todo/know.png)。

### 应用栏

页面最左边的应用栏。从上到下分别是 `页面管理`、`区块管理`、`组件库`、`大纲树`、`历史记录`、`API管理`、`依赖管理`、`项目配置`。

- `页面管理` 相当于 Views， 新建页面也就是相当于 在 Views 创建一个 .vue 文件
- `区块管理` 相当于 Components 和公共组件库一样。
- `大纲树` 可以看到页面的 布局结构。
- `历史记录` 记录着 所有页面的记录，可以进行回退。可以看作 git
- `API管理` 配置请求的处理。
- `依赖管理` 在应用开发中所需的依赖
- `项目管理` 管理着应用的信息

### 配置栏

配置栏 中 的展示分为 两种。

1. 页面的配置
2. 组件的配置

#### 页面配置

页面的配置 分为四个标签页 设置、CSS、数据源、定义。

![页面配置](../../assets/todo/pageConfig.png)

- _设置页_ 是进行页面的数据管理。
  1. `状态数据（state）`相当于 vue2 中 的 `data`；
  2. `计算属性`，相当于 vue2 中 `computed`；
  3. `组件方法`相当于 `methods`；
  4. `侦听器` 相当于 `watch`；
  5. `生命周期` 相当于 vue 中的生命周期。
- _CSS_ 相当于 style
  ```vue
  <style lang="css" scoped></style>
  ```
- _数据源_ 就是请求接口返回来的数据。
- _定义_
  1.  定义属性
  2.  定义事件
  3.  定义插槽
  4.  注入 `inject` 数据

> 定义属性、定义事件 常用于 `区块`。 类似下面的代码。

```vue
<template>
  <component :item="itemData" @update="onUpdate"></component>
</template>
```

> 在 区块中 定义属性`item` 就是把 `itemData`数据 传到 区块的`item属性`中，在区块的`页面配置`的可以使用到。定义事件也是一样。

#### 组件配置

组件是指 在 组件库中的所有组件。

组件的配置 也分为四个标签页：属性、样式、事件以及指令

- 属性 组件自身的属性或者可以自定义属性
- 样式 只对当前组件作用
- 组件 组件自身的事件或鼠标事件以及键盘事件
- 指令 和 vue 中的指令一致。

![组件配置](../../assets/todo/componentConfig.png)

## 实现效果展示

实现 如下图效果
![页面](../../assets/todo/todo.png)

`TodoList` 分为三部分： 头部的输入框, 中间主体的列表以及底部。

## 页面的创建

在 `页面管理` 区域 点击右边加号按钮，出现弹窗。选择新增页面或新增目录，相当于在 Vue 项目中的 pages 创建页面。
![新建页面](../../assets/todo/newPage.png)

创建完成后,效果如下：

> 点击 中间的最大的区域 **设计视图** 可以在右边区域看到 `TodoList` 这个页面的所有配置
> 或者 可以直接点击页面的`设置按钮` 也可以看到页面的配置

![新建页面完成](../../assets/todo/newPageDone.png)

`TodoList` 分为三个部分,待办头部、待办项、待办底部。这三个部分分成三个区块进行开发。
首先完成待办头部的部分

## 待办头部区块

### 待办头部区块的创建

在左边的应用栏找到 `区块管理` 点击, 进入区块管理界面，在数据管理栏点击 `+` 按钮，打开新增区块弹窗。填写信息，创建区块。
![新建头部区块](../../assets/todo/newHeader.png)

头部区块创建完成后可以看到下面的效果。

> 注意 在开发的时候，记得注意 第二步 所指的信息。 它展现的名称代表着现在在哪个页面或者区块 进行开发

![新建头部区块完成](../../assets/todo/newHeaderDone.png)

### 待办头部组件

待办头部 由一个输入框和一个按钮组成。

首页在 `组件库` 中 拖拽 组件到 `待办区块` 的`设计视图`中

![新建头部区块拖拽](../../assets/todo/newHeaderInput.png)

在大纲树中查看 待办头部区块 的布局信息

![新建头部区块拖拽完成](../../assets/todo/newHeaderInputDone.png)

#### 拖拽显示异常处理

![新建头部区块拖拽异常](../../assets/todo/newHeaderError.png)

如果看到的是上面的效果，可以在`大纲树`中 直接 拖拽 组件 实现布局。

![新建头部区块拖拽异常处理](../../assets/todo/newHeaderCorrect.png)

### 待办头部数据

待办头部 实现的功能是 用户输入数据，点击创建按钮或回车 将数据提交到列表中

#### 创建数据

所有 在 `待办头部` 的区块中 设置 `title` 属性

![新建头部区块State](../../assets/todo/newHeaderState.png)

#### 数据 与 组件 绑定

将 `title` 属性 和 区块中 的 `ElInput`组件的 `value` 进行双向绑定

![新建头部区块StateModel](../../assets/todo/newHeaderStateModel.png)

#### 提交方法

在 `待办头部` 的`数据配置`中 创建 `submit` 方法

![新建头部区块Methos](../../assets/todo/newHeaderMethod.png)

#### 组件定义事件

在 submit 提交方法中 我们 `触发` 自定义事件

```js
this.$emit('submit');
```

在头部完成后 要在 `Todo` 页面 实现 自定义事件的处理 。代码类似于下面

```vue
// Todo 页面
<template>
  // 待办头部区块
  <todo-header @submit="addTodo"></todo-header>
</template>
```

![头部自定义事件](../../assets/todo/newHeaderCustomMethod.png)

#### 回车提交事件

当用户在 ElInput 输入框输入数据后 回车 执行 submit 方法

![回车操作](../../assets/todo/newHeaderKeypress.png)

#### 按钮点击事件

在 `待办头部` 的 `ElButton` 的 `数据配置`中 实现 `click` 方法

![回车操作](../../assets/todo/newHeaderBtnClick.png)

### 待办头部完成

[提交方法](#提交方法)成功后再 列表中 增加一条数据。在[提交方法](#提交方法)中 我们触发了 `自定义事件 submit`。 接下来回到 `Todo 待办事项页面` 实现 `submit 的自定义事件`、

**把 待办头部组件 todoHeader 从 区块管理中 拖拽到 Todo 待办事项页面**

在 大纲树 中 可以看到 todoHeader 区块已经拖进 Todo 页面了。
![头部组件进页面](../../assets/todo/newHeaderInPage.png)

### Todo 页面 处理 自定义事件

在 待办头部 todoHeader 区块中，我们触发了 `自定义事件 submit`。 接下来在 `Todo 待办事项页面` 实现 `submit 的自定义事件`。

![todoHeader组件submit](../../assets/todo/newPageSubmit.png)

> 中间黑色代码区域实现的就是下方 addTodo 的方法

```vue
// Todo 页面
<template>
  // 待办头部区块
  <todo-header @submit="addTodo"></todo-header>
</template>
```

#### 实现addTodo

把 自定义事件 submit 传过来的 title, 在 todo 的数据列表 list 中 增加

##### Todo定义数据

![Todo定义数据 ](../../assets/todo/newPageState.png)

##### addTodo

![addTodo ](../../assets/todo/newPageAddTodo.png)

#### 方法与自定义事件绑定

Todo 页面的 方法addTodo 与 待办头部 自定义事件绑定submit 绑定

![addTodo ](../../assets/todo/newPageAddTodoBind.png)

### 待办项区块

在 区块管理中 **创建** `TodoItem 待办项` 区块，待办项 实现的是 列表的遍历渲染。
![newTodoItem](../../assets/todo/newTodoItem.png)

#### 待办事项页面布局-样式

待办项 分为两个部分 左边 待办事项(列表中的title), 右边的 switch是否完成 和删除按钮
待办项的布局结构如下：
![newTodoItemDone](../../assets/todo/newTodoItemDone.png)

#### 列表遍历

将 待办项 区块 拖到 Todo 待办事项 页面中

在 Todo 页面 实现 对 TodoHeader区块的遍历
![遍历List](../../assets/todo/newPageVFor.png)

> 由于 Todo 页面 配置的 list 数据 默认 是 [] 空数组，TodoHeader区块 会消失
> 可以 在 Page 页面 增加测试数据 使TodoHeader区块 出现

#### 遍历数据与组件绑定

```vue
<template v-for="item in list">
  <todo-item :item="item" :key="item.id"></todo-item>
</template>
```

在 vue 项目中 实现 v-for 的效果可以这么写。

**同样，在这个的开发中也是这个实现的**

1. 在 todo-item 区块 设置 item 属性
   在 待办项 区块 中 的页面配置 中 创建 item 属性 实现了`:item`
   ![自定义item绑定数据](../../assets/todo/newPageCustomState.png)
2. 将 `组件的item` 属性 与 遍历的 item 进行绑定 `:item='item'` ==> 组件item `:item` 等于 遍历的item `item`
   ![自定义item绑定数据](../../assets/todo/newPageCustomStateDone.png)

#### key 绑定

![key](../../assets/todo/newItemKeyBind.png)

#### item 数据 与 组件信息绑定

待办项 区块 左边标题 和 item的 `title` 绑定

![title绑定](../../assets/todo/newItemTitleBind.png)

待办项 区块 右边滑块 和 item的 `done` 绑定。
![model绑定](../../assets/todo/newItemDoneModel.png)

#### title样式

当 滑块 Switch 状态变成 true 已完成 title 展示效果中间加横线
![class绑定](../../assets/todo/newItemClassBind.png)
在 组件中填 css
![style](../../assets/todo/newItemStyle.png)

#### 注意

滑块的value与 item.done直接进行绑定,这种做法是**错误**的。在 Vue 中 props 中的数据是不能直接修改的。此时的item.done 传进来的方式相当于 props

![done绑定错误](../../assets/todo/newItemDoneBindError.png)

要把 数据 保存下来先, 再进行修改。

![done绑定](../../assets/todo/newItemDoneBind.png)

滑块的value与 item.done直接进行双向绑定
![model绑定](../../assets/todo/newItemDoneModel.png)

> **注意： 双向绑定是赋值,`不能`用 `?.` 可选链的方式。**

#### 滑块状态改变

滑块改变时,待办项是否已完成状态也需要修改。switch 滑块状态`change`时, 触发 `update` 方法

在 待办项 区块中 设置 组件方法 update。 然后再 switch 的事件中 设置 change 事件

```vue
<template>
  <el-switch v-model="done" @change="update"></el-switch>
</template>

<script>
  export default {
    data() {
      return {
        done: ''
      };
    },
    methods: {
      update() {}
    }
  };
</script>
```

设置 组件方法 update, 触发了**自定义事件**。emit('change')
![update](../../assets/todo/newItemMethodUpdate.png)

switch 的事件中 设置 change 事件, change， 执行 update 方法
![change](../../assets/todo/newItemMethodChange.png)

#### 滑块change自定义事件

```vue
<template>
  <todo-item @change="updateTodo"></todo-item>
</template>
```

**组件内部 （待办项区块） 中 switch 状态改变 触发 emit('change')了。**
接下来 在组件（待办项区块）上 监听 `change` 事件

![change自定义](../../assets/todo/newItemCustomMethodChange.png)

回到 `Todo` 待办事项 页面 中 点击` todoItem待办项` 查看 这个区块的组件配置。在事件中 有个 `组件事件`，这里展示的就是组件的自定义事件。

![changePage自定义](../../assets/todo/newPageItemChange.png)

监听 组件 `change` 改变, 执行 updateTodo 方法。

`Todo 页面` 创建 updateTodo 方法
![updateTodo](../../assets/todo/newPageItemChange.png)

组件自定义事件 与 updateTodo 绑定

![newPageCustomChangeBind](../../assets/todo/newPageCustomChangeBind.png)

#### 删除按钮点击

**删除按钮点击 触发自定义事件 remove**
![newItemCustomMethodClick](../../assets/todo/newItemCustomMethodClick.png)

##### 1.第一步

在 组件（区块）上 定义 remove 方法

![newItemCustomMethodRemove](../../assets/todo/newItemCustomMethodRemove.png)

##### 2.第二步

在 父组件 （页面） 上 找到该 组件（区块）， 在组件（区块）的事件上 创建 页面的方法

![newPageRemoveMethod](../../assets/todo/newPageRemoveMethod.png)

将页面 方法和 组件 Remove 事件绑定

![newPageCustomRemoveBind](../../assets/todo/newPageCustomRemoveBind.png)

```js
  <todo-item @remove="removeTodo"></todo-item>
  // 第一步 实现的是 @remove
  // 第二部 实现的是 创建removeTodo方法 和 @remove="removeTodo" 绑定
```

### 区块底部

创建`待办底部区块`然后在`组件库`中拖拽自己想要的组件，这里用了 `内置组件div`，最后把待办底部区块拖拽到 `Todo` 页面上。

实现底部展示 需要计算出总共有多少项，有多少项是待办的。

首页要知道 待办列表的长度。那么把 Todo 中的 list 数据传给 `todoFooter` 待办底部。 类似于 props

1. 在 `todoFooter` 待办底部 创建自定义属性 `items` 用来接收 `Todo` 页面传进来的 `list` 数据
   ![newFooterCustomState](../../assets/todo/newFooterCustomState.png)
2. 在 `Todo` 页面 中 把 `list` 数据 传给 `todoFooter` 待办底部的自定义属性 `items`
   ![newPageItems](../../assets/todo/newPageItems.png)

#### 计算

计算出总共有多少项
![newFooterTotal](../../assets/todo/newFooterTotal.png)
有多少项是待办的
![newFooterDone](../../assets/todo/newFooterDone.png)
合并展示出来
![newFooterSummary](../../assets/todo/newFooterSummary.png)

最后将和并展示的数据绑定

![newFooterBind](../../assets/todo/newFooterBind.png)

#### 展示效果

当 待办项 为空时，可以用 el-empty 展示空白数据，拖动 el-empty 组件到页面上，当待办项 长度为0时出现

![newPageEmpty](../../assets/todo/newPageEmpty.png)

Todo 功能基本实现了， 为了更好的展示效果，样式之类的自己修改。

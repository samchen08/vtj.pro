# XList 列表


## 示例

### 基础用法



:::preview
demo-preview=../examples/ui/list/base.vue
:::


## API

### 属性

| 属性名         | 说明                                | 类型                 | 默认值 |
| -------------- | ----------------------------------- | -------------------- | ------ |
| data           | 要在表中渲染的数据对象              | `object \| function` | []     |
| itemHeight     | 设置 itemHeight 即自动开启虚拟滚动  | `number \| function` | -      |
| width          | 表格的宽度                          | `string \| number`   | '100%' |
| height         | 表格的高度                          | `string \| number`   | '100%' |
| pager          | 开启分页                            | `boolean \| object`  | -      |
| page           | 初始页码                            | `number`             | 1      |
| pageSize       | 初始每页显示条目个数                | `number`             | 50     |
| dataKey        | 数据的 Key，用来优化 Table 的渲染； | `string`             | -      |
| infiniteScroll | 滚动到底部时，加载更多数据          | `boolean \| object`  | -      |


属性 data: {
  list: `any[]`,
  total?: `number`,
  pageSize: `number`,
  page: `number`,
}


属性 infiniteScroll: {
  disabled?: `boolean`;
  delay?: `number`;
  distance?: `number`;
  immediate?: `boolean`;
}



### 事件

| 名称 | 说明     | 参数               |
| ---- | -------- | ------------------ |
| load | 加载数据 | (state: ListState) |




### 插槽

| 插槽名  | 说明           | 类型 |
| ------- | -------------- | ---- |
| loading | 加载中         | -    |
| nomore  | 没有更多数据了 | -    |




### 暴露

| 名称       | 说明              | 类型     |
| ---------- | ----------------- | -------- |
| list       | 列表数据中的data  | -        |
| wrapperRef | -                 | -        |
| loading    | 加载状态          | -        |
| state      | page,pageSize     | -        |
| pageCount  | 当前页数          | -        |
| nomore     | 没有更多数据      | -        |
| data       | 列表数据          | -        |
| getKey     | 获取列表数据的key | function |
| scrollTo   | 滑动到            | function |

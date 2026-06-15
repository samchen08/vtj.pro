# @vtj/charts 图表库 — AI 使用指南

> 本文档帮助 AI 理解 `@vtj/charts` 图表库的构成、组件属性和在 Vue 组件中的使用规范。

---

## 一、库概述

`@vtj/charts` 是基于 ECharts 5.x 封装的 Vue 3 图表组件库，提供开箱即用的图表组件和组合式 API。

| 内容       | 说明                                          |
| ---------- | --------------------------------------------- |
| 基础依赖   | `echarts` `~5.6.0`                            |
| 核心组件   | `XChart`（通用图表）、`XMapChart`（地图图表） |
| 组合式 API | `useChart`、`useMapChart`                     |
| 自动特性   | 响应式 option、自动 resize、事件代理          |

---

## 二、安装与注册

### 2.1 安装依赖

```json
{
  "dependencies": {
    "@vtj/charts": "latest"
  }
}
```

### 2.2 全局注册（推荐）

```typescript
import { createApp } from 'vue';
import Charts from '@vtj/charts';

const app = createApp(App);
app.use(Charts); // 注册 XChart、XMapChart 为全局组件
```

全局注册后，模板中可直接使用 `<XChart>` 和 `<XMapChart>` 标签。

### 2.3 按需导入

```vue
<template>
  <XChart :option="chartOption" height="300px" />
</template>

<script setup>
  import { XChart } from '@vtj/charts';
  import type { ChartOption } from '@vtj/charts';

  const chartOption: ChartOption = {
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [10, 20, 30] }]
  };
</script>
```

---

## 三、XChart 通用图表组件

### 3.1 Props

| 属性     | 类型            | 默认值      | 说明                       |
| -------- | --------------- | ----------- | -------------------------- |
| `width`  | `string`        | `'100%'`    | 图表容器宽度               |
| `height` | `string`        | `'400px'`   | 图表容器高度               |
| `option` | `EChartsOption` | `undefined` | ECharts 配置项，响应式更新 |

### 3.2 Exposed 属性

通过模板 ref 可访问以下属性：

| 名称        | 类型                         | 说明                  |
| ----------- | ---------------------------- | --------------------- |
| `elRef`     | `HTMLElement`                | 图表容器 DOM 引用     |
| `option`    | `EChartsOption`              | 当前 option           |
| `instance`  | `Ref<ECharts \| undefined>`  | ECharts 实例引用      |
| `getEChart` | `() => ECharts \| undefined` | 获取 ECharts 实例方法 |

### 3.3 事件

组件接收 ECharts 事件监听器，通过 Vue 的 `v-on` 或属性传递，支持以下格式：

- **kebab-case 事件名：** `:on-click="handler"`、`:on-dblclick="handler"`
- 引擎自动转换 kebab-case 事件名为 camelCase 后注册到 ECharts 实例

### 3.4 基础用法

```vue
<template>
  <XChart :option="chartOption" height="400px" :on-click="handleClick" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XChart } from '@vtj/charts';

  const chartOption = ref({
    tooltip: { trigger: 'axis' },
    legend: { data: ['销量'] },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [120, 200, 150, 80, 70]
      }
    ]
  });

  const handleClick = (params) => {
    console.log('点击了', params.name, params.value);
  };
</script>
```

### 3.5 动态更新 Option

`option` 是响应式属性，变更后图表自动更新：

```vue
<template>
  <div>
    <el-button @click="switchData">切换数据</el-button>
    <XChart :option="chartOption" height="400px" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { XChart } from '@vtj/charts';

  const dataA = [120, 200, 150, 80, 70];
  const dataB = [80, 150, 200, 120, 100];

  const chartOption = ref({
    xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月', '五月'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: dataA }]
  });

  const switchData = () => {
    chartOption.value.series[0].data =
      chartOption.value.series[0].data === dataA ? dataB : dataA;
  };
</script>
```

### 3.6 通过 ref 访问 ECharts 实例

```vue
<template>
  <XChart ref="chartRef" :option="chartOption" height="400px" />
  <el-button @click="showLoading">显示加载中</el-button>
</template>

<script setup>
  import { ref } from 'vue';
  import { XChart } from '@vtj/charts';

  const chartRef = ref();
  const chartOption = ref({
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [10, 20, 15] }]
  });

  const showLoading = async () => {
    const chart = chartRef.value?.getEChart();
    if (chart) {
      chart.showLoading();
      await new Promise((r) => setTimeout(r, 2000));
      chart.hideLoading();
    }
  };
</script>
```

---

## 四、XMapChart 地图图表组件

### 4.1 Props

| 属性      | 类型               | 默认值                                                            | 说明                                 |
| --------- | ------------------ | ----------------------------------------------------------------- | ------------------------------------ |
| `geoJson` | `string \| object` | `'https://unpkg.com/vtj-geojson@0.1.3/geo/100000/100000.geoJson'` | GeoJSON 数据或 URL，默认中国省级地图 |
| `name`    | `string`           | `'china'`                                                         | 地图注册名称                         |

其余 ECharts option 通过 `v-bind="$attrs"` 透传，需在 option 中配置地图相关的 series 或 geo。

### 4.2 Emits

| 事件名  | 参数      | 说明                   |
| ------- | --------- | ---------------------- |
| `ready` | `geoJSON` | 地图数据加载完成后触发 |

### 4.3 Exposed 属性

| 名称          | 类型                                | 说明                     |
| ------------- | ----------------------------------- | ------------------------ |
| `chartRef`    | `XChart 实例`                       | 内部 XChart 组件引用     |
| `instance`    | `ComputedRef<ECharts \| undefined>` | 计算属性，ECharts 实例   |
| `option`      | `Ref<any>`                          | 当前 option              |
| `getEChart`   | `() => ECharts \| undefined`        | 获取 ECharts 实例方法    |
| `getChartRef` | `() => XChart 实例`                 | 获取内部 XChart 组件引用 |
| `geoJSON`     | `ShallowRef<any>`                   | 已加载的 GeoJSON 数据    |

### 4.4 基础用法

提供 `geoJson` 数据源后，组件自动注册地图并通过 `v-bind="$attrs"` 透传的 option 渲染：

```vue
<template>
  <XMapChart
    :option="mapOption"
    name="china"
    height="500px"
    @ready="onMapReady" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XMapChart } from '@vtj/charts';

  const mapOption = ref({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    visualMap: {
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      inRange: { color: ['#e0ffff', '#006edd'] }
    },
    series: [
      {
        type: 'map',
        map: 'china',
        roam: true,
        label: { show: true },
        data: [
          { name: '广东省', value: 800 },
          { name: '浙江省', value: 600 },
          { name: '北京市', value: 900 },
          { name: '上海市', value: 950 },
          { name: '江苏省', value: 700 }
        ]
      }
    ]
  });

  const onMapReady = (geoJSON) => {
    console.log('地图数据加载完成', geoJSON);
  };
</script>
```

### 4.5 使用自定义 GeoJSON

```vue
<template>
  <XMapChart
    :geo-json="myGeoJson"
    name="myCity"
    :option="mapOption"
    height="500px" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XMapChart } from '@vtj/charts';

  const myGeoJson = ref({
    // 自定义 GeoJSON 对象
  });

  const mapOption = ref({
    series: [
      {
        type: 'map',
        map: 'myCity',
        data: [
          { name: '区域A', value: 100 },
          { name: '区域B', value: 200 }
        ]
      }
    ]
  });
</script>
```

### 4.6 使用 geo 组件而非 series-map

若配置 `option.geo` 而非 `series-map`，组件会自动将 `option.geo.map` 设为当前 `name`：

```vue
<template>
  <XMapChart :option="geoOption" name="china" height="500px" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XMapChart } from '@vtj/charts';

  const geoOption = ref({
    geo: {
      map: 'china',
      roam: true,
      label: { show: true },
      itemStyle: {
        areaColor: '#f3f3f3',
        borderColor: '#999'
      }
    },
    series: []
  });
</script>
```

---

## 五、组合式 API

### 5.1 useChart

用于在非组件场景下创建 ECharts 图表实例：

```typescript
import { ref, onMounted } from 'vue';
import { useChart } from '@vtj/charts';
import type { ChartOption } from '@vtj/charts';

// 模板中：<div ref="chartContainer" style="width:100%;height:400px;"></div>
const chartContainer = ref<HTMLElement>();
const chartOption = ref<ChartOption>({
  xAxis: { type: 'category', data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [10, 20, 15] }]
});

const { instance, getEChart } = useChart(chartContainer, chartOption, {});

onMounted(() => {
  console.log('ECharts 实例:', getEChart());
});
```

**参数说明：**

| 参数     | 类型                              | 说明                               |
| -------- | --------------------------------- | ---------------------------------- |
| `el`     | `MaybeRef<HTMLElement>`           | 图表容器元素引用                   |
| `option` | `Ref<EChartsOption \| undefined>` | ECharts option 响应式引用          |
| `attrs`  | `Record<string, any>`             | 事件监听器（如 `{ onClick: fn }`） |

**返回值：**

| 名称        | 类型                         | 说明                    |
| ----------- | ---------------------------- | ----------------------- |
| `instance`  | `Ref<ECharts \| undefined>`  | ECharts 实例            |
| `getEChart` | `() => ECharts \| undefined` | 获取 ECharts 实例的方法 |

**自动能力：**

- `onMounted` 时初始化 ECharts 实例并注册事件和 option
- `option` 变化时自动 `setOption`
- `useResizeObserver` 自动 resize（防抖 150ms）
- `onUnmounted` 时自动 dispose 实例

### 5.2 useMapChart

用于自定义地图场景：

```typescript
import { ref } from 'vue';
import { useMapChart } from '@vtj/charts';

const mapName = ref('china');
const geoJson = ref('https://unpkg.com/vtj-geojson@0.1.3/geo/100000/100000.geoJson');

const { chartRef, geoJSON, option } = useMapChart(mapName, geoJson, {
  option: {
    series: [{ type: 'map', map: 'china', data: [...] }]
  }
});
```

**参数说明：**

| 参数      | 类型                  | 说明                     |
| --------- | --------------------- | ------------------------ |
| `name`    | `Ref<string>`         | 地图注册名称             |
| `geoJson` | `Ref<any>`            | GeoJSON 数据或 URL       |
| `attrs`   | `Record<string, any>` | 透传属性（含 option 等） |

**返回值：**

| 名称       | 类型               | 说明                  |
| ---------- | ------------------ | --------------------- |
| `chartRef` | `Ref<XChart 实例>` | 内部 XChart 组件引用  |
| `geoJSON`  | `ShallowRef<any>`  | 已加载的 GeoJSON 数据 |
| `option`   | `Ref<any>`         | 合并后的 option       |

**自动能力：**

- name / geoJson 变化时自动重新加载和注册地图
- 加载过程中自动显示 / 隐藏 ECharts loading 状态
- 自动将 option 中的 series-map 和 geo.map 设为当前 name

---

## 六、VTJ Composition API 完整示例

### 6.1 通用图表 - 柱状图 + 折线图混合

```vue
<template>
  <div class="page">
    <div class="chart-header">
      <h3>{{ __i18n.t('chart.salesTitle') }}</h3>
      <el-radio-group v-model="chartType" @change="onTypeChange">
        <el-radio value="bar">柱状图</el-radio>
        <el-radio value="line">折线图</el-radio>
      </el-radio-group>
    </div>
    <XChart
      ref="chartRef"
      :option="chartOption"
      height="350px"
      :on-click="onChartClick" />
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { XChart } from '@vtj/charts';

  const chartRef = ref();
  const chartType = ref('bar');
  const categories = ['一月', '二月', '三月', '四月', '五月'];
  const chartData = [120, 200, 150, 80, 70];

  const chartOption = computed(() => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['销量'] },
    xAxis: { type: 'category', data: categories },
    yAxis: { type: 'value' },
    series: [
      {
        name: '销量',
        type: chartType.value,
        data: chartData,
        smooth: chartType.value === 'line',
        barWidth: '40%'
      }
    ]
  }));

  const onTypeChange = () => {
    // computed 自动响应，无需手动触发
  };

  const onChartClick = (params) => {
    console.log('点击图表:', params.name, params.value);
  };
</script>
```

### 6.2 饼图

```vue
<template>
  <XChart :option="pieOption" height="400px" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XChart } from '@vtj/charts';

  const pieOption = ref({
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold' }
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ]
      }
    ]
  });
</script>
```

### 6.3 地图图表

```vue
<template>
  <XMapChart :option="mapOption" name="china" height="500px" @ready="onReady" />
</template>

<script setup>
  import { ref } from 'vue';
  import { XMapChart } from '@vtj/charts';

  const mapOption = ref({
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    visualMap: {
      min: 0,
      max: 1000,
      text: ['高', '低'],
      inRange: { color: ['#f5f5f5', '#006edd'] }
    },
    series: [
      {
        type: 'map',
        map: 'china',
        roam: true,
        selectedMode: 'single',
        label: { show: true },
        data: [
          { name: '广东省', value: 800, selected: true },
          { name: '浙江省', value: 600 },
          { name: '北京市', value: 900 }
        ]
      }
    ]
  });

  const onReady = (geoJSON) => {
    console.log('地图已加载');
  };
</script>
```

### 6.4 异步数据加载

```vue
<template>
  <XChart :option="chartOption" height="400px" v-loading="loading" />
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { XChart } from '@vtj/charts';

  const loading = ref(true);
  const chartOption = ref({});

  const fetchData = async () => {
    loading.value = true;
    // 模拟异步请求
    const data = await new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            categories: ['产品A', '产品B', '产品C', '产品D'],
            values: [320, 480, 200, 560]
          }),
        1000
      )
    );
    chartOption.value = {
      xAxis: { type: 'category', data: data.categories },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: data.values }]
    };
    loading.value = false;
  };

  onMounted(() => {
    fetchData();
  });
</script>
```

---

## 七、图表类型快速参考

以下列出 ECharts 支持的常用图表配置模式，可直接在 `option.series` 中使用：

### 7.1 折线图

```typescript
{ type: 'line', data: [10, 20, 15], smooth: true, areaStyle: {} }
```

### 7.2 柱状图

```typescript
{ type: 'bar', data: [10, 20, 15], barWidth: '40%' }
```

### 7.3 饼图

```typescript
{ type: 'pie', data: [{ value: 100, name: 'A' }], radius: '50%' }
```

### 7.4 散点图

```typescript
{ type: 'scatter', data: [[10, 20], [15, 25], [20, 15]] }
```

### 7.5 雷达图

```typescript
{
  type: 'radar',
  data: [{ value: [80, 90, 70, 85], name: '预算分配' }]
}
// 需配合 radar 组件：
// radar: { indicator: [{ name: '销售额', max: 100 }, ...] }
```

### 7.6 地图

```typescript
{
  type: 'map',
  map: 'china',
  data: [{ name: '广东省', value: 800 }]
}
```

---

## 八、注意事项

1. **option 必须为响应式：** 推荐使用 `ref` 包裹 option 对象，使其变更时自动触发图表更新
2. **option 深度监听：** 引擎内部对 option 进行了 `{ deep: true }` 的 watch，修改深层属性也会触发更新
3. **高度设默认值：** `XChart` 默认高度 `400px`，务必根据需要显式设置 `height`
4. **地图需 GeoJSON：** `XMapChart` 内置默认中国省级地图 GeoJSON URL，使用其他地图需提供自定义 GeoJSON
5. **事件名 kebab-case：** 事件属性以 `:on-` 开头、kebab-case 命名，如 `:on-click="handler"`、`:on-dblclick="handler"`
6. **自动 resize：** 组件内部已集成 `ResizeObserver`，容器尺寸变化时图表自动 resize
7. **生命周期管理：** 组件卸载时自动 dispose ECharts 实例，无需手动清理
8. **类型导入：** 需要 ECharts 类型时可从 `@vtj/charts` 导入 `ChartOption` 和 `EChartsInstance`
9. **无需直接操作 echarts 实例：** 大多数场景通过 `:option` 响应式更新即可，避免直接调用 `setOption`
10. **无需耗时搜索 ECharts 配置：** ECharts 的 option 配置语法遵循官方的 ECharts Option 规范，上述示例覆盖了最常用的图表类型和模式

---

## 九、VTJ 设计器 Composition API 规范示例

> 以下示例展示在 VTJ 设计器中使用 Composition API（`<script setup>`）集成图表组件的完整写法。

### 9.1 通用图表 + 地图图表完整示例

- `XChart` 组件可实现折线图、柱状图、饼图等除地图之外的所有 ECharts 图表
- `XMapChart` 组件实现 GeoJSON 地图图表
- `echarts` 原始对象可直接从 `@vtj/charts` 导入使用
- 通过 `useProvider` 接入 VTJ 渲染引擎 Provider 上下文

```vue
<template>
  <div class="charts-page">
    <XChart
      width="100%"
      height="400px"
      :option="{
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: { type: 'value' },
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }]
      }" />
    <XMapChart
      name="100000"
      geo-json="https://unpkg.com/vtj-geojson@0.1.3/geo/100000.geoJson"
      width="100%"
      height="400px"
      :option="{
        series: [{ data: [{ name: '广东省', value: 100 }], type: 'map' }],
        visualMap: {}
      }" />
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { XChart, XMapChart, echarts } from '@vtj/charts';

  const provider = useProvider({ id: 'charts', version: '' });
  const state = reactive({});

  // echarts 原始对象可从 @vtj/charts 导入，用于高级自定义操作
  console.log(echarts);
</script>
```

### 9.2 GeoJSON 地图层级路径说明

`XMapChart` 的 `geo-json` 属性支持按行政区划编码逐级获取 GeoJSON 数据，当更换 `geo-json` 路径时需同步更新 `name` 属性：

| 层级     | 示例 GeoJSON URL                                                          | `name` 值  | 说明             |
| -------- | ------------------------------------------------------------------------- | ---------- | ---------------- |
| 全国     | `https://unpkg.com/vtj-geojson@0.1.3/geo/100000.geoJson`                  | `'100000'` | 中国全国地图     |
| 省级     | `https://unpkg.com/vtj-geojson@0.1.3/geo/100000/440000.geoJson`           | `'440000'` | 广东省地图       |
| 市级     | `https://unpkg.com/vtj-geojson@0.1.3/geo/100000/440000/440100.geoJson`    | `'440100'` | 广州市地图       |
| 省级含子 | `https://unpkg.com/vtj-geojson@0.1.3/geo/100000/100000.geoJson`（默认值） | `'china'`  | 中国省级区划地图 |

```vue
<template>
  <div class="map-page">
    <!-- 全国地图 -->
    <XMapChart
      name="100000"
      geo-json="https://unpkg.com/vtj-geojson@0.1.3/geo/100000.geoJson"
      height="500px"
      :option="mapOption" />

    <!-- 广东省地图 -->
    <XMapChart
      name="440000"
      geo-json="https://unpkg.com/vtj-geojson@0.1.3/geo/100000/440000.geoJson"
      height="500px"
      :option="mapOption" />

    <!-- 广州市地图 -->
    <XMapChart
      name="440100"
      geo-json="https://unpkg.com/vtj-geojson@0.1.3/geo/100000/440000/440100.geoJson"
      height="500px"
      :option="mapOption" />
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { XMapChart } from '@vtj/charts';

  const provider = useProvider({ id: 'mapDemo', version: '' });

  const mapOption = {
    series: [
      {
        type: 'map',
        data: [
          { name: '广东省', value: 100 },
          { name: '浙江省', value: 200 },
          { name: '北京市', value: 300 }
        ]
      }
    ],
    visualMap: {
      min: 0,
      max: 300,
      text: ['高', '低'],
      inRange: { color: ['#e0ffff', '#006edd'] }
    }
  };
</script>
```

> **注意：** 以上示例中的 `state` 和 `provider` 为 VTJ 设计器组件的标准模板代码，请保留。echarts 原始对象按需导入使用。

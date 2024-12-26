<template>
  <table border="1" style="width: 100%" align="center">
    <caption>
      {{
        props.title
      }}
    </caption>
    <thead>
      <tr>
        <th scope="col">函数名</th>
        <th scope="col" style="text-align: center">例子</th>
        <th scope="col" style="text-align: center">返回值</th>
      </tr>
    </thead>
    <tbody align="center">
      <tr v-for="(item, index) in props.list" :key="index">
        <th scope="row" :rowspan="item.rowspan" v-if="item.name">
          {{ item.name }}
        </th>
        <td class="code">{{ item.example }}</td>
        <td>{{ item.return }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String,
    list: Array as any
  });
</script>

<style scoped>
  table {
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 14px;
  }

  caption {
    caption-side: top;
    padding: 10px;
    font-weight: bold;
    font-size: 22px;
  }

  thead,
  tfoot {
    background-color: rgb(228 240 245);
  }

  th {
    border: 1px solid rgb(160 160 160);
    padding: 4px;
  }
  td {
    border: 1px solid rgb(160 160 160);
    padding: 4px;
  }

  td:last-of-type {
    text-align: center;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .code {
    letter-spacing: 1px;
    font-size: 16px;
    font-style: italic;
  }
</style>

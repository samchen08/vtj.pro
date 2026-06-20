<template>
  <div class="container-demo">
    <h3>基础容器（默认 flex 行排列）</h3>
    <div class="demo-section">
      <XContainer flex direction="row" gap>
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
      </XContainer>
    </div>

    <h3>列方向排列</h3>
    <div class="demo-section">
      <XContainer flex direction="column" gap>
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
      </XContainer>
    </div>

    <h3>对齐方式</h3>
    <div class="demo-section">
      <p>justify: center, align: center</p>
      <XContainer flex justify="center" align="center" :height="80" gap class="bg-light">
        <div class="box small">A</div>
        <div class="box small">B</div>
        <div class="box small">C</div>
      </XContainer>
      <p>justify: space-between</p>
      <XContainer flex justify="space-between" gap class="bg-light">
        <div class="box small">左</div>
        <div class="box small">中</div>
        <div class="box small">右</div>
      </XContainer>
    </div>

    <h3>grow 自适应填充</h3>
    <div class="demo-section">
      <XContainer flex gap class="bg-light">
        <div class="box small">固定</div>
        <XContainer flex grow class="box primary">grow 自适应</XContainer>
        <div class="box small">固定</div>
      </XContainer>
    </div>

    <h3>inline-flex</h3>
    <div class="demo-section">
      <XContainer flex inline gap>
        <div class="box small">内联</div>
        <div class="box small">弹性</div>
      </XContainer>
    </div>

    <h3>fit 自适应 + padding</h3>
    <div class="demo-section">
      <XContainer fit padding class="bg-light" style="height: 80px">
        fit 自适应容器（带内边距）
      </XContainer>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
</script>
<style lang="scss" scoped>
  .container-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-section {
      margin-bottom: 16px;
      p {
        margin: 4px 0;
        font-size: 13px;
        color: #666;
      }
    }
    .bg-light {
      background: #f5f7fa;
      border-radius: 4px;
      padding: 8px;
    }
    .box {
      padding: 8px 16px;
      background: #ecf5ff;
      border: 1px solid #b3d8ff;
      border-radius: 4px;
      color: #409eff;
      text-align: center;
      &.small {
        font-size: 13px;
        padding: 4px 12px;
      }
      &.primary {
        background: #409eff;
        color: #fff;
        border-color: #409eff;
      }
    }
  }
</style>

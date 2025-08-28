<template>
  <div class="wrapper">
    <Card type="standard" title="标准版" price="299" tokens="100万">
      <template #desc>
        <div>
          <div>全功能前端项目源码，已对接了公有云服务</div>
          <div>可在线部署，开箱即用</div>
        </div>
      </template>
    </Card>
    <Card type="plus" title="增强版" price="499" tokens="300万">
      <template #desc>
        <div>
          <div>标准版项目源码</div>
          <div class="plus-version">
            <strong>+</strong>
            <span>『后端实现参考代码、AI系统提示词、出码项目模版』</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import Card from './Card.vue';
</script>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: stretch;
    margin-top: 30px;
  }
  .plus-version {
    display: flex;
    strong {
      font-size: 30px;
      color: var(--vp-c-brand-1);
    }
  }
</style>

<template>
  <div class="wrapper">
    <Card
      type="standard"
      title="公有云服务版"
      price="499"
      original="999"
      tokens="300万"
      :expiryTime="standardExpiryTime">
      <template #desc>
        <div>
          <div>
            全功能<span class="mark">前端项目</span>源码，已对接了公有云服务
          </div>
          <div>可在线部署，开箱即用</div>
        </div>
      </template>
      <template #rows>
        <div class="row">
          <span class="label">
            赠送AI助手 <strong>300万</strong> Token额度
          </span>
        </div>
      </template>
    </Card>
    <Card
      type="plus"
      title="私有化部署版"
      price="1999"
      original="3999"
      tokens="300万"
      :expiryTime="standardExpiryTime"
      :showDays="true">
      <template #desc>
        <div>
          <div>全功能私有化部署</div>
          <div class="plus-version">
            <span>
              『<span class="mark">前后端一体源码</span
              >、AI系统提示词、出码项目模版』
            </span>
          </div>
        </div>
      </template>
      <template #rows>
        <div class="row">
          <span class="label">
            私有化部署，数据本地留存，前后端一体源码交付
          </span>
        </div>
      </template>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import Card from './Card.vue';

  const standardExpiryTime = new Date('2026/3/10');
  // standardExpiryTime.setDate(standardExpiryTime.getDate() + 30);
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
  .mark {
    font-weight: bold;
    color: var(--vp-c-indigo-2);
  }
</style>

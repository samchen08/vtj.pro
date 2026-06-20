<template>
  <div class="panel-demo">
    <h3>基础面板</h3>
    <XPanel header="基础面板" width="100%" height="120px">
      <div>面板内容区域</div>
    </XPanel>

    <h3>卡片模式</h3>
    <XPanel header="卡片面板" card width="100%" height="120px">
      <div>卡片风格内容</div>
    </XPanel>

    <h3>带图标标题</h3>
    <XPanel :header="{ content: '用户管理', icon: VtjIconUser }" width="100%" height="120px">
      <div>管理用户信息</div>
    </XPanel>

    <h3>带底部栏</h3>
    <XPanel header="带底部" width="100%" height="160px">
      <div>正文区域</div>
      <template #footer>
        <span>底部内容</span>
      </template>
    </XPanel>

    <h3>不同尺寸</h3>
    <div class="demo-row">
      <XPanel header="小尺寸" size="small" width="30%" height="100px">
        <div>小面板</div>
      </XPanel>
      <XPanel header="默认尺寸" width="30%" height="100px">
        <div>默认面板</div>
      </XPanel>
      <XPanel header="大尺寸" size="large" width="30%" height="100px">
        <div>大面板</div>
      </XPanel>
    </div>

    <h3>无边框 + 自定义阴影</h3>
    <XPanel header="无边框" :border="false" shadow="hover" width="100%" height="120px">
      <div>悬停时显示阴影</div>
    </XPanel>

    <h3>Badge 标记</h3>
    <XPanel
      header="消息通知"
      width="100%"
      height="120px"
      :badge="{ type: 'danger', text: '99+' }">
      <div>消息内容</div>
    </XPanel>
  </div>
</template>
<script lang="ts" setup>
  import { XPanel } from '@vtj/ui';
  import { VtjIconUser } from '@vtj/icons';
</script>
<style lang="scss" scoped>
  .panel-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      display: flex;
      gap: 12px;
    }
    .x-panel {
      margin-bottom: 12px;
    }
    :deep(.x-panel__body) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

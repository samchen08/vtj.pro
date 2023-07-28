<template>
  <div class="vtj-apps">
    <div class="vtj-apps__header">
      <div class="vtj-apps__top">
        <Icon
          v-for="panel in panelApps"
          :key="`trigger-${panel.name}`"
          :icon="panel.trigger?.icon"
          :label="panel.trigger?.label"
          :active="active === panel"
          :open="open === panel"
          @click="handleClickItem(panel)"></Icon>
      </div>
      <div class="vtj-apps__bottom">
        <Icon
          v-for="panel in otherApps"
          :key="`trigger-${panel.name}`"
          :icon="panel.trigger?.icon"
          :label="panel.trigger?.label"
          @click="handleClickOtherItem(panel)"></Icon>
      </div>
    </div>
    <div class="vtj-apps__panels" v-show="!!open">
      <template v-for="item in panelApps" :key="item.name">
        <KeepAlive>
          <WidgetRenderer
            v-if="active === item"
            v-bind="{ ...item }"></WidgetRenderer>
        </KeepAlive>
      </template>
    </div>
    <Dialog
      v-if="dialogComponent"
      v-bind="dialogProps"
      v-model="dialogProps.visible">
      <component :is="dialogComponent" v-bind="dialogProps"></component>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, watch, KeepAlive, markRaw } from 'vue';
  import {
    Widget,
    emitter,
    EVENT_SKELETON_LEFT_COLLAPSED_CHANGE
  } from '../../core';
  import { useCore } from '../../hooks';
  import { WidgetRenderer } from '../renderers';
  import Icon from '../shared/Icon.vue';
  import Dialog from '../shared/Dialog.vue';
  import { buildInWidgets } from '../widgets';
  const { regions, config } = useCore();

  const apps = computed(() => regions.value.apps);
  const active = ref<Widget | null>(null);
  const open = ref<Widget | null>(null);

  const dialogComponent = ref();
  const dialogProps = ref();
  // 有panel的放上面
  const panelApps = computed(() => {
    return apps.value.filter(
      (item: Widget) => !item.disabled && item.trigger?.type === 'panel'
    );
  });

  // 无panel的放下面
  const otherApps = computed(() => {
    return apps.value.filter(
      (item: Widget) => !item.disabled && item.trigger?.type !== 'panel'
    );
  });

  function setCurrentWidget(name: string) {
    const widget = apps.value.find((item: Widget) => item.name === name);
    if (widget) {
      active.value = widget;
      open.value = widget;
    }
  }

  const handleClickItem = (item: Widget) => {
    active.value = item;
    open.value = open.value === item ? null : item;
  };

  const handleClickOtherItem = (item: Widget) => {
    if (item.trigger?.type === 'link') {
      window.open(item.props?.url);
      return;
    }
    if (item.trigger?.type === 'dialog') {
      dialogComponent.value = markRaw(
        buildInWidgets[item.type as keyof typeof buildInWidgets] ||
          buildInWidgets.Empty
      );
      dialogProps.value = {
        ...item.trigger,
        ...item.props,
        visible: true
      };
    }
  };

  watch(open, (v) => {
    emitter.emit(EVENT_SKELETON_LEFT_COLLAPSED_CHANGE, !!v);
  });

  if (config.activeApp) {
    setCurrentWidget(config.activeApp);
  }

  defineExpose({
    setCurrentWidget
  });
</script>

<style lang="scss">
  @use '../../style/vars' as *;

  .vtj-apps {
    display: flex;
    height: 100%;

    &__header {
      width: 50px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-right: 1px solid $vtj-border-color;
      text-align: center;
      color: $vtj-color;
      flex-shrink: 0;
    }

    &__panels {
      flex-grow: 1;
      overflow: hidden;

      > .vtj-panel > .vtj-panel__body {
        height: 1px;
      }
    }

    .vtj-icon {
      padding: 8px 0;
      cursor: pointer;
      font-size: 20px;
      border-left: 2px solid transparent;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      &:first-child {
        border-top: 1px solid transparent;
      }
      i {
        margin-left: -2px;
      }
      &:hover {
        color: $vtj-primary-color;
      }
      &.is-active {
        color: $vtj-primary-color;
      }
      &.is-open {
        border-left: 2px solid $vtj-primary-color;
        background-color: #fff;
        margin-right: -1px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        &:first-child {
          border-top: 1px solid transparent;
        }

        i {
          margin-left: -3px;
        }
      }
    }
  }
</style>

<template>
  <XContainer
    class="v-style-widget__wrapper"
    direction="column"
    fit
    overflow="auto">
    <JsonMode v-if="props.isStyleCodeMode"></JsonMode>
    <XContainer
      v-else
      :key="`widget-style-${node?.id}`"
      class="v-style-widget"
      direction="column"
      fit>
      <Layout
        :key="`Layout${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Layout>
      <Spacing
        :key="`Spacing${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Spacing>
      <Sizing
        :key="`Sizing${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Sizing>
      <Positioning
        :key="`Positioning${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Positioning>
      <Texting
        :key="`Texting${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Texting>
      <Backgound
        :key="`Backgound${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Backgound>
      <Border
        :key="`Border${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Border>
      <Effect
        :key="`Effect${node?.id}`"
        :style-json="styleJson"
        :setStyle="setStyle"></Effect>
    </XContainer>
    <div v-if="isExpStyle" class="v-style-widget__mask">
      <ElAlert
        type="warning"
        title="样式已绑定了变量，需解除绑定才能编辑"
        show-icon
        :closable="false"></ElAlert>
    </div>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { isBlock } from '@vtj/core';
  import { XContainer } from '@vtj/ui';
  import { ElAlert } from 'element-plus';
  import { isJSExpression } from '@vtj/renderer';
  import { useSelected } from '../../hooks';
  import Layout from './layout.vue';
  import JsonMode from './JsonMode.vue';
  import Spacing from './spacing.vue';
  import Sizing from './sizing.vue';
  import Positioning from './positioning.vue';
  import Texting from './texting.vue';
  import Backgound from './backgound.vue';
  import Border from './border.vue';
  import Effect from './effect.vue';
  import { normalizedStyle } from '../../../utils';

  export interface Props {
    isStyleCodeMode: boolean;
  }

  const props = defineProps<Props>();
  const { selected } = useSelected();

  const node = computed(() => {
    const model = selected.value?.model || null;
    return isBlock(model) ? null : model;
  });

  const oStyle = computed(() => {
    return (node.value?.getPropValue('style') as any) || {};
  });

  const styleJson = computed(() => normalizedStyle(oStyle.value));

  const isExpStyle = computed(() => isJSExpression(oStyle.value));

  const setStyle = (name: string, value?: any) => {
    const style = (node.value?.getPropValue('style') || {}) as Record<
      string,
      any
    >;
    if (value !== undefined && value !== '') {
      style[name] = value;
    } else {
      delete style[name];
    }
    node.value?.setProp('style', style);
  };

  defineOptions({
    name: 'StyleWidget'
  });
</script>

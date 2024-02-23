<template>
  <Panel title="定位" class="v-sub-panel" size="small" :fit="false" collapsable>
    <div class="v-style-widget__positioning">
      <ElForm label-width="60px" size="small">
        <SetterWrapper
          name="position"
          label="定位"
          :setters="{ name: 'SelectSetter' }"
          :options="positionOptions"
          :variable="false"
          :value="props.styleJson.position"
          @change="props.setStyle"></SetterWrapper>
        <SetterWrapper
          name="inset"
          label=" "
          :setters="{ name: 'TagSetter' }"
          :options="insetOptions"
          :variable="false"
          :value="props.styleJson.inset"
          @change="props.setStyle"></SetterWrapper>
        <ElFormItem label=" ">
          <div class="spacing-wrap">
            <div ref="inner" class="spacing-min-icon">
              <svg
                v-if="innerWidth && innerWidth"
                xmlns="http://www.w3.org/2000/svg"
                :width="innerWidth"
                :height="innerHeight"
                style="grid-area: 1 / 1 / -1 / -1">
                <g>
                  <g>
                    <path
                      mode="delta"
                      fill="currentColor"
                      :d="`
              m1,1
              h${innerWidth - 1}
              l-${borderWidth},${borderHeight}
              h-${innerWidth - 2 * borderWidth}
              l-${borderWidth},-${borderHeight}z`"
                      data-automation-id="padding-top-button"
                      aria-label="Padding top button"
                      class="tb-path-color"
                      @click="showInput('top')"></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      mode="delta"
                      fill="currentColor"
                      :d="`
              m${innerWidth - 1},1
              v${innerHeight - 1}
              l-${borderWidth},-${borderHeight}
              v-${innerHeight - 2 * borderHeight}
              l${borderWidth},-${borderHeight}z`"
                      data-automation-id="padding-right-button"
                      aria-label="Padding right button"
                      class="lr-path-color"
                      @click="showInput('right')"></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      mode="delta"
                      fill="currentColor"
                      :d="`
              m1,${innerHeight - 1}
              h${innerWidth - 1}
              l-${borderWidth},-${borderHeight}
              h-${innerWidth - 2 * borderWidth}
              l-${borderWidth},${borderHeight}z`"
                      data-automation-id="padding-bottom-button"
                      aria-label="Padding bottom button"
                      class="tb-path-color"
                      @click="showInput('bottom')"></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      mode="delta"
                      fill="currentColor"
                      :d="`
              m1,1
              v${innerHeight - 1}
              l${borderWidth},-${borderHeight}
              v-${innerHeight - 2 * borderHeight}
              l-${borderWidth},-${borderHeight}z`"
                      data-automation-id="padding-left-button"
                      aria-label="Padding left button"
                      class="lr-path-color"
                      @click="showInput('left')"></path>
                  </g>
                </g>

                <clipPath id="margin-outer">
                  <rect
                    x="0"
                    y="0"
                    :width="innerWidth"
                    :height="innerHeight"
                    fill="transparent"
                    rx="2"
                    ry="2"
                    style="pointer-events: none"></rect>
                </clipPath>
                <rect
                  class="stroke"
                  clip-path="url(#margin-outer)"
                  x="0"
                  y="0"
                  :width="innerWidth"
                  :height="innerHeight"
                  fill="transparent"
                  rx="2"
                  ry="2"
                  style="pointer-events: none; stroke-width: 2px"></rect>
                <clipPath id="margin-inner">
                  <rect
                    x="36"
                    y="24"
                    :width="innerWidth - 2 * borderWidth + 1"
                    :height="innerHeight - 2 * borderHeight + 1"
                    fill="transparent"
                    rx="2"
                    ry="2"
                    style="pointer-events: none"></rect>
                </clipPath>
                <rect
                  class="stroke"
                  clip-path="url(#margin-inner)"
                  x="36"
                  y="24"
                  :width="innerWidth - 2 * borderWidth + 1"
                  :height="innerHeight - 2 * borderHeight + 1"
                  fill="transparent"
                  rx="2"
                  ry="2"
                  style="pointer-events: none; stroke-width: 2px"></rect>
              </svg>
              <div
                class="spacing-edit padding-top"
                :class="{ 'is-setting': props.styleJson['top'] }"
                @click="showInput('top')">
                {{ props.styleJson['top'] || currentInset[0] || '-' }}
              </div>
              <div
                class="spacing-edit padding-right"
                :class="{ 'is-setting': props.styleJson['right'] }"
                @click="showInput('right')">
                {{ props.styleJson['right'] || currentInset[1] || '-' }}
              </div>
              <div
                class="spacing-edit padding-bottom"
                :class="{ 'is-setting': props.styleJson['bottom'] }"
                @click="showInput('bottom')">
                {{ props.styleJson['bottom'] || currentInset[2] || '-' }}
              </div>
              <div
                class="spacing-edit padding-left"
                :class="{ 'is-setting': props.styleJson['left'] }"
                @click="showInput('left')">
                {{ props.styleJson['left'] || currentInset[3] || '-' }}
              </div>
            </div>
            <SpacingInput
              v-if="inputVisible"
              auto
              :name="currentName"
              v-model="currentValue"
              @close="onClose"
              @submit="props.setStyle"></SpacingInput>
          </div>
        </ElFormItem>
        <SetterWrapper
          name="z-index"
          label="层级"
          :setters="{ name: 'NumberSetter' }"
          :variable="false"
          :value="props.styleJson['z-index']"
          @change="props.setStyle"></SetterWrapper>
      </ElForm>
    </div>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElForm, ElFormItem } from 'element-plus';
  import { useElementSize } from '@vueuse/core';
  import SpacingInput from './spacing-input.vue';
  import {
    IconPositionTopLeft,
    IconPositionTopRight,
    IconPositionBottomLeft,
    IconPositionBottomRight,
    IconPositionLeft,
    IconPositionRight,
    IconPositionBottom,
    IconPositionTop,
    IconPositionAll
  } from '@vtj/icons';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const inner = ref();
  const { width: innerWidth, height: innerHeight } = useElementSize(inner);
  const inputVisible = ref(false);
  const currentName = ref();
  const currentValue = ref();
  const borderWidth = 36;
  const borderHeight = 24;

  const positionOptions = [
    { label: '静态', value: 'static' },
    { label: '相对', value: 'relative' },
    { label: '绝对', value: 'absolute' },
    { label: '固定', value: 'fixed' },
    { label: '粘性', value: 'sticky' }
  ];

  const insetOptions = [
    { label: '左上', svg: IconPositionTopLeft, value: '0% auto auto 0%' },
    { label: '右上', svg: IconPositionTopRight, value: '0% 0% auto auto' },
    { label: '左下', svg: IconPositionBottomLeft, value: 'auto auto 0% 0%' },
    { label: '右下', svg: IconPositionBottomRight, value: 'auto 0% 0% auto' },
    { label: '左', svg: IconPositionLeft, value: '0% auto 0% 0%' },
    { label: '右', svg: IconPositionRight, value: '0% 0% 0% auto' },
    { label: '上', svg: IconPositionTop, value: 'auto 0% 0% 0%' },
    { label: '下', svg: IconPositionBottom, value: '0% 0% auto 0%' },
    { label: '填充', svg: IconPositionAll, value: '0% 0% 0% 0%' }
  ];

  const currentInset = computed(() => {
    return (props.styleJson.inset || '').split(' ');
  });

  const showInput = (name: string) => {
    currentName.value = name;
    currentValue.value = props.styleJson[name];
    inputVisible.value = true;
  };

  const onClose = () => {
    inputVisible.value = false;
    currentName.value = undefined;
    currentValue.value = undefined;
  };
</script>

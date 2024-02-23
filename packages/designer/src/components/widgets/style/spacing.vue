<template>
  <Panel title="间距" class="v-sub-panel" size="small" :fit="false" collapsable>
    <div class="v-style-widget__spacing" ref="container">
      <div class="spacing-wrap">
        <div class="spacing-max-icon">
          <svg
            v-if="width && height"
            xmlns="http://www.w3.org/2000/svg"
            :width="width"
            :height="height"
            style="grid-area: 1 / 1 / -1 / -1">
            <g>
              <g>
                <path
                  mode="delta"
                  fill="currentColor"
                  :d="`
              m1,1
              h${width - 1}
              l-${borderWidth},${borderHeight}
              h-${width - 2 * borderWidth}
              l-${borderWidth},-${borderHeight}z`"
                  data-automation-id="margin-top-button"
                  aria-label="Margin top button"
                  class="tb-path-color"
                  @click="showInput('margin-top')"></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  mode="delta"
                  fill="currentColor"
                  :d="`
              m${width - 1},1
              v${height - 1}
              l-${borderWidth},-${borderHeight}
              v-${height - 2 * borderHeight}
              l${borderWidth},-${borderHeight}z`"
                  data-automation-id="margin-right-button"
                  aria-label="Margin right button"
                  class="lr-path-color"
                  @click="showInput('margin-right')"></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  mode="delta"
                  fill="currentColor"
                  :d="`
              m1,${height - 1}
              h${width - 1}
              l-${borderWidth},-${borderHeight}
              h-${width - 2 * borderWidth}
              l-${borderWidth},${borderHeight}z`"
                  data-automation-id="margin-bottom-button"
                  aria-label="Margin bottom button"
                  class="tb-path-color"
                  @click="showInput('margin-bottom')"></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  mode="delta"
                  fill="currentColor"
                  :d="`
              m1,1
              v${height - 1}
              l${borderWidth},-${borderHeight}
              v-${height - 2 * borderHeight}
              l-${borderWidth},-${borderHeight}z`"
                  data-automation-id="margin-left-button"
                  aria-label="Margin left button"
                  class="lr-path-color"
                  @click="showInput('margin-left')"></path>
              </g>
            </g>
            <clipPath id="margin-outer">
              <rect
                x="0"
                y="0"
                :width="width"
                :height="height"
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
              :width="width"
              :height="height"
              fill="transparent"
              rx="2"
              ry="2"
              style="pointer-events: none; stroke-width: 2px"></rect>
            <clipPath id="margin-inner">
              <rect
                x="36"
                y="24"
                :width="width - 2 * borderWidth + 1"
                :height="height - 2 * borderHeight + 1"
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
              :width="width - 2 * borderWidth + 1"
              :height="height - 2 * borderHeight + 1"
              fill="transparent"
              rx="2"
              ry="2"
              style="pointer-events: none; stroke-width: 2px"></rect>
          </svg>
          <div
            class="spacing-edit margin-top"
            :class="{ 'is-setting': props.styleJson['margin-top'] }"
            @click="showInput('margin-top')">
            {{ props.styleJson['margin-top'] || '-' }}
          </div>
          <div
            class="spacing-edit margin-right"
            :class="{ 'is-setting': props.styleJson['margin-right'] }"
            @click="showInput('margin-right')">
            {{ props.styleJson['margin-right'] || '-' }}
          </div>
          <div
            class="spacing-edit margin-bottom"
            :class="{ 'is-setting': props.styleJson['margin-bottom'] }"
            @click="showInput('margin-bottom')">
            {{ props.styleJson['margin-bottom'] || '-' }}
          </div>
          <div
            class="spacing-edit margin-left"
            :class="{ 'is-setting': props.styleJson['margin-left'] }"
            @click="showInput('margin-left')">
            {{ props.styleJson['margin-left'] || '-' }}
          </div>
        </div>
        <div ref="inner" class="spacing-min-icon">
          <svg
            v-if="width && height"
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
                  @click="showInput('padding-top')"></path>
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
                  @click="showInput('padding-right')"></path>
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
                  @click="showInput('padding-bottom')"></path>
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
                  @click="showInput('padding-left')"></path>
              </g>
            </g>
            <clipPath id="padding-outer">
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
              clip-path="url(#padding-outer)"
              x="0"
              y="0"
              :width="innerWidth"
              :height="innerHeight"
              fill="transparent"
              rx="2"
              ry="2"
              style="pointer-events: none; stroke-width: 2px"></rect>
            <clipPath id="padding-inner">
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
              clip-path="url(#padding-inner)"
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
            :class="{ 'is-setting': props.styleJson['padding-top'] }"
            @click="showInput('padding-top')">
            {{ props.styleJson['padding-top'] || '-' }}
          </div>
          <div
            class="spacing-edit padding-right"
            :class="{ 'is-setting': props.styleJson['padding-right'] }"
            @click="showInput('padding-right')">
            {{ props.styleJson['padding-right'] || '-' }}
          </div>
          <div
            class="spacing-edit padding-bottom"
            :class="{ 'is-setting': props.styleJson['padding-bottom'] }"
            @click="showInput('padding-bottom')">
            {{ props.styleJson['padding-bottom'] || '-' }}
          </div>
          <div
            class="spacing-edit padding-left"
            :class="{ 'is-setting': props.styleJson['padding-left'] }"
            @click="showInput('padding-left')">
            {{ props.styleJson['padding-left'] || '-' }}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style="grid-area: 3 / 3 / span 3 / span 3; pointer-events: none">
          <text
            x="6"
            y="4"
            fill="#a6a6a6"
            font-style="italic"
            font-weight="bold"
            font-size="8"
            dominant-baseline="hanging">
            padding
          </text>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style="grid-area: 1 / 1 / -1 / -1; pointer-events: none">
          <text
            x="6"
            y="4"
            fill="#a6a6a6"
            font-style="italic"
            font-weight="bold"
            font-size="8"
            dominant-baseline="hanging">
            margin
          </text>
        </svg>
      </div>
      <SpacingInput
        v-if="inputVisible"
        :name="currentName"
        v-model="currentValue"
        @close="onClose"
        @submit="props.setStyle"></SpacingInput>
    </div>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useElementSize } from '@vueuse/core';
  import { Panel } from '../../shared';
  import SpacingInput from './spacing-input.vue';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const container = ref();
  const inner = ref();
  const { width, height } = useElementSize(container);
  const { width: innerWidth, height: innerHeight } = useElementSize(inner);
  const inputVisible = ref(false);
  const currentName = ref();
  const currentValue = ref();
  const borderWidth = 36;
  const borderHeight = 24;

  const onClose = () => {
    inputVisible.value = false;
    currentName.value = undefined;
    currentValue.value = undefined;
  };

  const showInput = (name: string) => {
    currentName.value = name;
    currentValue.value = props.styleJson[name];
    inputVisible.value = true;
  };
</script>

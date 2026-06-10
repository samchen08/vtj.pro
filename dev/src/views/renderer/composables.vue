<template>
  <div>
    <component :is="renderer"></component>
  </div>
</template>

<script lang="ts" setup>
  import * as VueUse from '@vueuse/core';
  import { createRenderer } from '@vtj/renderer';

  const props = defineProps({
    title: {
      type: String,
      default: 'abc'
    }
  });

  const { renderer } = createRenderer({
    libs: {
      VueUse
    },
    dsl: {
      name: 'Index',
      locked: false,
      apiMode: 'composition',
      inject: [],
      state: {},
      refs: {},
      reactives: {},
      lifeCycles: {},
      methods: {},
      computed: {},
      watch: [],
      composables: [
        {
          name: 'isDark',
          composable: 'useDark',
          from: '@vueuse/core'
        },
        {
          name: 'toggleDark',
          composable: 'useToggle',
          from: '@vueuse/core',
          args: [
            {
              type: 'JSExpression',
              value: 'isDark'
            }
          ]
        }
      ],
      setup: {
        type: 'JSFunction',
        value: '() => {\nconsole.log(isDark, toggleDark);\n}'
      },
      provide: {},
      css: '/* 组件样式内容 */',
      props: [],
      emits: [],
      expose: [],
      slots: [],
      dataSources: {},
      __VTJ_BLOCK__: true,
      __VERSION__: '1781096058921',
      id: '2kuzwfoe',
      nodes: [
        {
          id: '3akvewrsv',
          name: 'div',
          from: '',
          invisible: false,
          locked: false,
          children: 'div',
          props: {},
          directives: [],
          events: {}
        }
      ]
    }
  });
</script>

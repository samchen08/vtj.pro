<template>
  <div
    ref="container"
    class="markdown-container"
    :class="{ 'is-hide-code': !props.code }"
    @click="onClick"
    v-html="htmlContent"></div>
</template>
<script lang="ts" setup>
  import { ref, type Ref, watch, nextTick } from 'vue';
  import { marked } from 'marked';
  import { throttle } from '@vtj/utils';
  import hljs from 'highlight.js/lib/core';
  import 'highlight.js/styles/atom-one-dark.css';
  import xml from 'highlight.js/lib/languages/xml';
  import javascript from 'highlight.js/lib/languages/javascript';
  import css from 'highlight.js/lib/languages/css';
  import diff from 'highlight.js/lib/languages/diff';

  const props = defineProps<{
    content?: string;
    code?: boolean;
  }>();
  const emit = defineEmits(['click']);

  hljs.registerLanguage('vue', xml);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('diff', diff);

  marked.setOptions({
    breaks: true,
    async: true
  });

  const container: Ref<HTMLElement | undefined> = ref();
  const htmlContent = ref('');

  // 更新内容并触发高亮
  const updateContent = async () => {
    htmlContent.value = await marked(props.content || '');
    await nextTick();
    container.value?.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  };

  const throttleUpdate = throttle(updateContent, 50, {
    leading: true,
    trailing: true
  });

  watch(() => props.content, throttleUpdate, { immediate: true });

  const onClick = (e: MouseEvent) => {
    if (props.code) return;
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.classList.contains('language-vue') ||
        target.classList.contains('language-diff'))
    ) {
      emit('click');
    }
  };

  defineOptions({
    name: 'StreamMarkdown'
  });
</script>
<style lang="scss">
  .markdown-container {
    line-height: 1.5em;
    .language-vue,
    .language-diff {
      border-radius: 4px;
      margin: 5px 0;
    }
    &.is-hide-code {
      .language-vue,
      .language-diff {
        height: 0;
        overflow: hidden;
        padding: 7px;
        position: relative;
        cursor: pointer;
        &::before {
          content: 'Code';
          position: absolute;
          background-color: var(--el-text-color-regular);
          color: var(--el-fill-color-light);
          left: 0;
          top: 0;
          z-index: 1;
          inset: 0;
          border-radius: 4px;
          text-align: center;
          font-size: 12px;
          zoom: 0.9;
        }
        &:hover {
          opacity: 0.7;
        }
      }
    }

    ol,
    ul {
      padding-inline-start: 2em;
    }
    h1,
    h2,
    h3 {
      font-size: 14px;
      margin: 5px 0;
    }
  }

  .markdown-container pre {
    overflow-x: auto;
    margin: 0;
  }
</style>

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
  import json from 'highlight.js/lib/languages/json';

  const props = defineProps<{
    content?: string;
    code?: boolean;
  }>();
  const emit = defineEmits(['click']);

  hljs.registerLanguage('vue', xml);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('diff', diff);
  hljs.registerLanguage('json', json);

  marked.setOptions({
    breaks: true,
    async: true
  });

  // 标签映射对象
  const labelMap: Record<string, string> = {
    T: '思考',
    A: '动作',
    O: '系统',
    P: '计划',
    F: '总结',
    R: '结果'
  };

  const container: Ref<HTMLElement | undefined> = ref();
  const htmlContent = ref('');

  // 更新内容并触发高亮
  const updateContent = async () => {
    let content = props.content || '';

    // 1. 提取并保护代码块
    const codeBlocks: string[] = [];
    content = content.replace(/```[\s\S]*?```/g, (match) => {
      codeBlocks.push(match);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // 2. 替换标签行，使用映射对象的中文标签
    content = content.replace(
      /^(T:|A:|O:|P:|F:|R:)(\s*)(.*)$/gm,
      (_match, type, space, text) => {
        const t = type.charAt(0); // 'T', 'A', 'P', 'F'
        const chineseLabel = labelMap[t] || t;
        return `<div class="section-label section-${t}"><span>${chineseLabel}</span></div>\n${space}${text}`;
      }
    );

    // 3. 恢复代码块
    content = content.replace(/__CODE_BLOCK_(\d+)__/g, (_match, index) => {
      return codeBlocks[parseInt(index)];
    });

    htmlContent.value = await marked(content);
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
    .language-json,
    .language-diff {
      border-radius: 4px;
      margin: 5px 0;
    }
    &.is-hide-code {
      .language-vue,
      .language-json,
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

      .language-json {
        cursor: not-allowed;
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

  .markdown-container .section-label {
    display: block;
    margin: 5px 0;
    position: relative;
    span {
      position: relative;
      z-index: 1;
      background-color: var(--el-color-info-light-9);
      padding-right: 5px;
      font-weight: bold;
    }
    &::before {
      content: '';
      display: block;
      border-bottom: 1px dotted var(--el-border-color);
      position: absolute;
      width: 100%;
      top: 50%;
    }
  }
</style>

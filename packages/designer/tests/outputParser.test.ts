import { describe, expect, it } from 'vitest';
import { parseOutput } from '../src/components/widgets/agent/utils/outputParser';

describe('parseOutput', () => {
  it('returns unknown with empty error for empty text', () => {
    const result = parseOutput('   ');
    expect(result.type).toBe('unknown');
    expect(result.error).toBe('输出为空');
  });

  it('returns unknown when no code block is present', () => {
    const result = parseOutput('just plain text without fence');
    expect(result.type).toBe('unknown');
    expect(result.error).toBe('未找到代码块');
  });

  describe('json tool_call', () => {
    it('parses a valid tool_call json block', () => {
      const result = parseOutput(
        '```json\n{"action":"setDataSources","parameters":[{"name":"users"}]}\n```'
      );
      expect(result.type).toBe('tool_call');
      expect(result.tool).toEqual({
        action: 'setDataSources',
        parameters: [{ name: 'users' }]
      });
    });

    it('defaults missing parameters to empty array for no-arg tools', () => {
      const result = parseOutput('```json\n{"action":"run"}\n```');
      expect(result.type).toBe('tool_call');
      expect(result.tool).toEqual({ action: 'run', parameters: [] });
    });

    it('defaults null parameters to empty array', () => {
      const result = parseOutput(
        '```json\n{"action":"run","parameters":null}\n```'
      );
      expect(result.type).toBe('tool_call');
      expect(result.tool).toEqual({ action: 'run', parameters: [] });
    });

    it('returns unknown when parameters is not an array', () => {
      const result = parseOutput(
        '```json\n{"action":"run","parameters":{"x":1}}\n```'
      );
      expect(result.type).toBe('unknown');
      expect(result.error).toContain('JSON 格式不符合 tool_call 规范');
    });

    it('returns unknown when json cannot be parsed', () => {
      const result = parseOutput('```json\n{invalid\n```');
      expect(result.type).toBe('unknown');
      expect(result.error).toBe('JSON 解析失败');
    });
  });

  describe('vue code', () => {
    it('parses a vue block containing template', () => {
      const result = parseOutput(
        '```vue\n<template><div>Hello</div></template>\n```'
      );
      expect(result.type).toBe('vue_code');
      expect(result.code).toContain('<template>');
    });

    it('parses a vue block containing script only', () => {
      const result = parseOutput('```vue\n<script>const a = 1</script>\n```');
      expect(result.type).toBe('vue_code');
    });

    it('returns unknown when vue block lacks template and script', () => {
      const result = parseOutput('```vue\njust text\n```');
      expect(result.type).toBe('unknown');
      expect(result.error).toContain('缺少 <template> 或 <script>');
    });
  });

  describe('diff patches', () => {
    it('parses a single SEARCH/REPLACE block', () => {
      const result = parseOutput(
        '```diff\n------- SEARCH\nfoo\n=======\nbar\n+++++++ REPLACE\n```'
      );
      expect(result.type).toBe('diff');
      expect(result.patches).toEqual([{ search: 'foo', replace: 'bar' }]);
    });

    it('parses multiple SEARCH/REPLACE blocks', () => {
      const result = parseOutput(
        '```diff\n------- SEARCH\na\n=======\nb\n+++++++ REPLACE\n------- SEARCH\nc\n=======\nd\n+++++++ REPLACE\n```'
      );
      expect(result.type).toBe('diff');
      expect(result.patches).toHaveLength(2);
    });

    it('allows empty replace for deletion', () => {
      const result = parseOutput(
        '```diff\n------- SEARCH\ndeleted line\n=======\n+++++++ REPLACE\n```'
      );
      expect(result.type).toBe('diff');
      expect(result.patches?.[0]).toEqual({
        search: 'deleted line',
        replace: ''
      });
    });

    it('returns unknown when no valid block is found', () => {
      const result = parseOutput('```diff\nsome text\n```');
      expect(result.type).toBe('unknown');
      expect(result.error).toBe('未找到有效的 SEARCH/REPLACE 块');
    });
  });

  it('returns unknown for unsupported language', () => {
    const result = parseOutput('```javascript\nconst a = 1;\n```');
    expect(result.type).toBe('unknown');
    expect(result.error).toContain('不支持的代码块类型');
  });

  it('prefers json/vue/diff blocks over plain display blocks', () => {
    const text = [
      '```',
      'plain display content',
      '```',
      '```json',
      '{"action":"refresh","parameters":[]}',
      '```'
    ].join('\n');
    const result = parseOutput(text);
    expect(result.type).toBe('tool_call');
    expect(result.tool?.action).toBe('refresh');
  });
});

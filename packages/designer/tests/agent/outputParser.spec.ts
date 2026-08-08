import { describe, it, expect } from 'vitest';
import { parseOutput } from '../../src/components/widgets/agent/utils/outputParser';

describe('parseOutput', () => {
  it('识别 json 代码块为 tool_call', () => {
    const text = '```json\n{"action":"getPage","parameters":["home"]}\n```';
    const result = parseOutput(text);
    expect(result.type).toBe('tool_call');
    expect(result.tool?.action).toBe('getPage');
    expect(result.tool?.parameters).toEqual(['home']);
  });

  it('json 不符合 tool_call 规范时报错', () => {
    const text = '```json\n{"name":"x"}\n```';
    const result = parseOutput(text);
    expect(result.type).toBe('unknown');
    expect(result.error).toContain('tool_call');
  });

  it('识别 vue 代码块', () => {
    const text = '```vue\n<template><div>hi</div></template>\n```';
    const result = parseOutput(text);
    expect(result.type).toBe('vue_code');
    expect(result.code).toContain('<template>');
  });

  it('vue 代码块缺少 template/script 时报错', () => {
    const text = '```vue\nexport default {}\n```';
    const result = parseOutput(text);
    expect(result.type).toBe('unknown');
    expect(result.error).toContain('<template>');
  });

  it('识别 diff 多块 SEARCH/REPLACE', () => {
    const text =
      '```diff\n' +
      '------- SEARCH\n' +
      '<div>old</div>\n' +
      '=======\n' +
      '<div>new</div>\n' +
      '+++++++ REPLACE\n' +
      '------- SEARCH\n' +
      '<span>a</span>\n' +
      '=======\n' +
      '<span>b</span>\n' +
      '+++++++ REPLACE\n' +
      '```';
    const result = parseOutput(text);
    expect(result.type).toBe('diff');
    expect(result.patches).toHaveLength(2);
    expect(result.patches?.[0].search).toBe('<div>old</div>');
    expect(result.patches?.[0].replace).toBe('<div>new</div>');
  });

  it('diff 空 REPLACE（删除操作）可解析', () => {
    const text =
      '```diff\n' +
      '------- SEARCH\n' +
      '<div>remove me</div>\n' +
      '=======\n' +
      '+++++++ REPLACE\n' +
      '```';
    const result = parseOutput(text);
    expect(result.type).toBe('diff');
    expect(result.patches?.[0].replace).toBe('');
  });

  it('diff 无有效块时报错', () => {
    const text = '```diff\n没有 SEARCH 标记\n```';
    const result = parseOutput(text);
    expect(result.type).toBe('unknown');
    expect(result.error).toContain('SEARCH/REPLACE');
  });

  it('空输出与无代码块返回 unknown', () => {
    expect(parseOutput('').type).toBe('unknown');
    expect(parseOutput('  ').type).toBe('unknown');
    expect(parseOutput('纯文本回答').type).toBe('unknown');
  });
});

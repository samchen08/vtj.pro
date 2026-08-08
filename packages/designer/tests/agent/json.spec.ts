import { describe, it, expect } from 'vitest';
import {
  extractJsonObject,
  parseJsonObject
} from '../../src/components/widgets/agent/utils/json';

describe('extractJsonObject', () => {
  it('提取 ```json 代码块内容', () => {
    const text =
      '好的，计划如下：\n```json\n{"intent":"测试","steps":[]}\n```\n';
    expect(extractJsonObject(text)).toBe('{"intent":"测试","steps":[]}');
  });

  it('代码块内容为空时回退括号扫描', () => {
    const text = '```json\n\n```\n后面 {"a":1}';
    expect(extractJsonObject(text)).toBe('{"a":1}');
  });

  it('对象之后还有多余花括号文本时按括号配对截取（贪婪正则失败的场景）', () => {
    const text = '计划：{"intent":"a","steps":[{"id":"1"}]} 尾部还有 {未闭合';
    expect(extractJsonObject(text)).toBe('{"intent":"a","steps":[{"id":"1"}]}');
  });

  it('忽略字符串内的花括号与转义引号', () => {
    const text =
      '{"msg":"包含 { 大括号和 \\"转义引号\\"} 的内容","n":1} 结尾 {';
    expect(extractJsonObject(text)).toBe(
      '{"msg":"包含 { 大括号和 \\"转义引号\\"} 的内容","n":1}'
    );
  });

  it('无 JSON 对象返回 null', () => {
    expect(extractJsonObject('')).toBeNull();
    expect(extractJsonObject('纯文本没有花括号')).toBeNull();
    expect(extractJsonObject('只有未闭合的 {')).toBeNull();
  });
});

describe('parseJsonObject', () => {
  it('解析成功返回对象', () => {
    expect(parseJsonObject<{ intent: string }>('{"intent":"x"}')?.intent).toBe(
      'x'
    );
  });

  it('解析失败返回 null', () => {
    expect(parseJsonObject('{"a":}')).toBeNull();
    expect(parseJsonObject('没有 JSON')).toBeNull();
  });
});

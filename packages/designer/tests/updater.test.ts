import { describe, it, expect } from 'vitest';
import { CodeIncrementalUpdater } from '../src/framework/updater';

describe('CodeIncrementalUpdater', () => {
  describe('parseIncrementalUpdate', () => {
    it('parses diff format with SEARCH/REPLACE blocks', () => {
      const updater = new CodeIncrementalUpdater();
      const response =
        '\n```diff\n------- SEARCH\nfoo\n=======\nbar\n+++++++ REPLACE\n------- SEARCH\na\n=======\nb\n+++++++ REPLACE\n```\n';
      const result = updater.parseIncrementalUpdate(response);
      expect(result).not.toBeNull();
      expect(result?.type).toBe('search_replace');
      expect(result?.updates).toHaveLength(2);
      expect(result?.updates?.[0]).toEqual({ search: 'foo', replace: 'bar' });
      expect(result?.updates?.[1]).toEqual({ search: 'a', replace: 'b' });
    });

    it('parses full vue code block', () => {
      const updater = new CodeIncrementalUpdater();
      const response =
        'Some intro\n```vue\n<template>\n  <div>Hello</div>\n</template>\n```\nSome outro';
      const result = updater.parseIncrementalUpdate(response);
      expect(result).not.toBeNull();
      expect(result?.type).toBe('full_code');
      expect(result?.fullCode).toBe(
        '<template>\n  <div>Hello</div>\n</template>'
      );
    });

    it('returns null when no code content is present', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.parseIncrementalUpdate('Just some plain text');
      expect(result).toBeNull();
    });

    it('prioritizes diff over vue code when both present', () => {
      const updater = new CodeIncrementalUpdater();
      const response =
        '```diff\n------- SEARCH\nfoo\n=======\nbar\n+++++++ REPLACE\n```\n```vue\n<template></template>\n```';
      const result = updater.parseIncrementalUpdate(response);
      expect(result?.type).toBe('search_replace');
    });
  });

  describe('applySearchReplace', () => {
    it('applies a simple exact match', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.applySearchReplace(
        'hello world',
        'world',
        'universe'
      );
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('hello universe');
      expect(result.matchCount).toBe(1);
    });

    it('returns error when no match is found', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.applySearchReplace('hello world', 'missing', 'x');
      expect(result.success).toBe(false);
      expect(result.updatedCode).toBe('hello world');
      expect(result.matchCount).toBe(0);
      expect(result.error).toContain('未找到匹配');
    });

    it('returns error when multiple matches and unique match is required', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.applySearchReplace('foo bar foo', 'foo', 'baz');
      expect(result.success).toBe(false);
      expect(result.matchCount).toBe(2);
      expect(result.error).toContain('无法确定要替换哪一个');
    });

    it('allows multiple matches when requireUniqueMatch is false', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.applySearchReplace('foo bar foo', 'foo', 'baz', {
        requireUniqueMatch: false
      });
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('baz bar foo');
      expect(result.matchCount).toBe(2);
    });

    it('normalizes CRLF line endings before matching', () => {
      const updater = new CodeIncrementalUpdater();
      const code = 'line1\r\nline2\r\nline3';
      const result = updater.applySearchReplace(code, 'line2', 'LINE2');
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('line1\nLINE2\nline3');
    });

    it('performs fuzzy match when exact match fails', () => {
      const updater = new CodeIncrementalUpdater();
      const code = 'function  foo ( a , b ) { return a + b; }';
      const search = 'function foo(a, b)';
      const result = updater.applySearchReplace(
        code,
        search,
        'function bar(a, b)',
        {
          allowFuzzyMatch: true
        }
      );
      expect(result.success).toBe(true);
      expect(result.updatedCode).toContain('function bar(a, b)');
    });

    it('returns error when replacement has no effect and search is non-empty', () => {
      const updater = new CodeIncrementalUpdater();
      const code = 'hello world';
      const result = updater.applySearchReplace(code, 'hello', 'hello');
      expect(result.success).toBe(false);
      expect(result.error).toContain('替换未生效');
    });

    it('handles empty search string gracefully', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.applySearchReplace('hello', '', 'x');
      expect(result.success).toBe(false);
      expect(result.matchCount).toBe(0);
      expect(result.error).toContain('未找到匹配');
    });

    it('catches exceptions and returns error result', () => {
      const updater = new CodeIncrementalUpdater();
      const result = updater.applySearchReplace('hello', 'hello', 'world');
      expect(result.error).toBeUndefined();
    });
  });

  describe('applyIncrementalUpdate', () => {
    it('applies a single search_replace update', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'search_replace' as const,
        updates: [{ search: 'foo', replace: 'bar' }]
      };
      const result = updater.applyIncrementalUpdate('foo baz', update);
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('bar baz');
    });

    it('applies multiple search_replace updates', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'search_replace' as const,
        updates: [
          { search: 'foo', replace: 'bar' },
          { search: 'baz', replace: 'qux' }
        ]
      };
      const result = updater.applyIncrementalUpdate('foo baz', update);
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('bar qux');
    });

    it('returns partial success when some updates fail', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'search_replace' as const,
        updates: [
          { search: 'foo', replace: 'bar' },
          { search: 'missing', replace: 'x' }
        ]
      };
      const result = updater.applyIncrementalUpdate('foo baz', update);
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('bar baz');
      expect(result.error).toContain('部分更新失败');
    });

    it('returns failure when all updates fail', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'search_replace' as const,
        updates: [
          { search: 'missing1', replace: 'x' },
          { search: 'missing2', replace: 'y' }
        ]
      };
      const result = updater.applyIncrementalUpdate('foo baz', update);
      expect(result.success).toBe(false);
      expect(result.updatedCode).toBe('foo baz');
      expect(result.error).toContain('所有更新都失败');
    });

    it('applies full_code update', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'full_code' as const,
        fullCode: '<template>New</template>'
      };
      const result = updater.applyIncrementalUpdate('old code', update);
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('<template>New</template>');
    });

    it('returns error for invalid update format', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'search_replace' as const,
        updates: []
      };
      const result = updater.applyIncrementalUpdate('foo', update);
      expect(result.success).toBe(false);
      expect(result.error).toContain('无效的更新格式');
    });

    it('returns error for unknown update type', () => {
      const updater = new CodeIncrementalUpdater();
      const update = {
        type: 'unknown' as any
      };
      const result = updater.applyIncrementalUpdate('foo', update);
      expect(result.success).toBe(false);
      expect(result.error).toContain('无效的更新格式');
    });
  });

  describe('edge cases', () => {
    it('handles multiline search and replace', () => {
      const updater = new CodeIncrementalUpdater();
      const code = 'function foo() {\n  return 1;\n}';
      const search = 'function foo() {\n  return 1;\n}';
      const replace = 'function bar() {\n  return 2;\n}';
      const result = updater.applySearchReplace(code, search, replace);
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('function bar() {\n  return 2;\n}');
    });

    it('handles mixed CRLF and LF in search/replace', () => {
      const updater = new CodeIncrementalUpdater();
      const code = 'a\r\nb\r\nc';
      const search = 'b\r\nc';
      const replace = 'x\ny';
      const result = updater.applySearchReplace(code, search, replace);
      expect(result.success).toBe(true);
      expect(result.updatedCode).toBe('a\nx\ny');
    });

    it('preserves code when fuzzy match maps to invalid original position', () => {
      const updater = new CodeIncrementalUpdater();
      const code = 'a\n\nb';
      const search = 'ab';
      const result = updater.applySearchReplace(code, search, 'xx', {
        allowFuzzyMatch: true
      });
      expect(result.success).toBe(false);
    });
  });
});

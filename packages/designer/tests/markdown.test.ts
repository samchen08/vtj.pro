import { describe, expect, it } from 'vitest';
import { formatMarkdownContent } from '../src/components/widgets/agent/utils/markdown';

describe('formatMarkdownContent', () => {
  it('keeps markdown strings unchanged', () => {
    expect(formatMarkdownContent('**完成**')).toBe('**完成**');
  });

  it('wraps structured results in a JSON code block', () => {
    expect(formatMarkdownContent({ success: true })).toBe(
      '```json\n{\n  "success": true\n}\n```'
    );
  });
});

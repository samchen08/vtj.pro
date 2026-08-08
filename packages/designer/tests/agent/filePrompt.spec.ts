import { describe, it, expect } from 'vitest';
import { stripFileDescBlocks } from '../../src/components/widgets/agent/utils/filePrompt';

describe('stripFileDescBlocks', () => {
  it('剥离文件识别描述块，还原用户纯文本', () => {
    const prompt =
      '请帮我开发一个页面\n\n[图片描述: 首页截图]\n<<<FILE_DESC>>>\n截图内容描述...\n<<<END_FILE_DESC>>>\n';
    expect(stripFileDescBlocks(prompt)).toBe('请帮我开发一个页面');
  });

  it('多描述块全部剥离', () => {
    const prompt =
      '任务\n' +
      '[图片描述: a]\n<<<FILE_DESC>>>\nA...\n<<<END_FILE_DESC>>>\n' +
      '[JSON描述: b]\n<<<FILE_DESC>>>\nB...\n<<<END_FILE_DESC>>>\n';
    expect(stripFileDescBlocks(prompt)).toBe('任务');
  });

  it('无标记时原样返回', () => {
    const prompt = '普通消息，没有描述块';
    expect(stripFileDescBlocks(prompt)).toBe(prompt);
  });

  it('空输入返回空', () => {
    expect(stripFileDescBlocks('')).toBe('');
  });
});

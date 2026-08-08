/**
 * 文件识别描述块工具
 * useFileRecognition.buildFilePrompt 生成的描述块带剥离标记，
 * 回显/重试时可用此工具还原用户纯文本
 */

/** 文件识别描述块（useFileRecognition.buildFilePrompt 生成的带标记格式） */
export const FILE_DESC_BLOCK_RE =
  /\[(?:图片|JSON)描述: [^\]]+\]\s*\n?<<<FILE_DESC>>>[\s\S]*?<<<END_FILE_DESC>>>\n?/g;

/** 从 prompt 中剥离文件识别描述块，还原用户纯文本（旧数据无标记时原样返回） */
export function stripFileDescBlocks(prompt: string): string {
  if (!prompt || !prompt.includes('<<<FILE_DESC>>>')) return prompt;
  return prompt
    .replace(FILE_DESC_BLOCK_RE, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

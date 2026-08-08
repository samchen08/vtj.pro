/**
 * JSON 提取工具
 * 从 LLM 混合输出中稳健地提取 JSON 对象，替代脆弱的贪婪正则 `\{[\s\S]*\}`
 */

/**
 * 从文本中提取第一个完整的顶层 JSON 对象
 *
 * 策略：
 * 1. 优先取 ```json 代码块内容
 * 2. 回退：从第一个 `{` 开始做括号配对扫描（忽略字符串内的花括号与转义），
 *    保证在对象之后还存在其他花括号文本时也能正确截取
 */
export function extractJsonObject(text: string): string | null {
  if (!text) return null;

  // 优先取 ```json 代码块
  const block = text.match(/```json\s*\n([\s\S]*?)```/);
  if (block && block[1].trim()) return block[1].trim();

  // 括号配对扫描
  const start = text.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * 从文本中提取 JSON 并解析
 * @returns 解析成功返回对象，失败返回 null
 */
export function parseJsonObject<T = Record<string, any>>(
  text: string
): T | null {
  const json = extractJsonObject(text);
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Editor 输出解析器
 * 识别 LLM 输出中的代码块类型：json(tool_call)、vue、diff
 */

export interface ToolCall {
  action: string;
  parameters: any[];
}

export interface DiffPatch {
  search: string;
  replace: string;
}

export interface ParsedOutput {
  type: 'tool_call' | 'vue_code' | 'diff' | 'unknown';
  tool?: ToolCall;
  code?: string;
  patches?: DiffPatch[];
  raw?: string;
  error?: string;
}

/**
 * 从 LLM 输出文本中提取第一个代码块
 */
function extractFirstCodeBlock(
  text: string
): { lang: string; code: string } | null {
  // 优先匹配带明确语言标识的代码块（diff/vue/json），跳过 LLM 可能附加的无标识展示块
  const preferredRe = /```(diff|vue|json)\s*\n([\s\S]*?)```/;
  const pm = text.match(preferredRe);
  if (pm) return { lang: pm[1].toLowerCase(), code: pm[2].trim() };

  // 回退：取任意第一个代码块
  const re = /```(\w*)\s*\n([\s\S]*?)```/;
  const m = text.match(re);
  if (!m) return null;
  return { lang: m[1].toLowerCase(), code: m[2].trim() };
}

/**
 * 判断 JSON 对象是否为 tool_call
 * 容错：无参工具调用时 LLM 偶发省略 parameters 字段，缺失/为空时默认补空数组；
 * 提供了但非数组类型（对象/字符串等）仍视为格式错误
 */
function isToolCall(obj: any): obj is ToolCall {
  if (!obj || typeof obj.action !== 'string' || obj.action.length === 0) {
    return false;
  }
  if (obj.parameters === undefined || obj.parameters === null) {
    obj.parameters = [];
  }
  return Array.isArray(obj.parameters);
}

/**
 * 解析 diff 内容中的 SEARCH/REPLACE 块
 * 格式：
 * ```
 * ------- SEARCH
 * [被替换的源代码]
 * =======
 * [替换后的代码]
 * +++++++ REPLACE
 * ```
 */
function parseDiffPatches(diffText: string): {
  patches: DiffPatch[];
  error?: string;
} {
  const patches: DiffPatch[] = [];

  // 三标记完整匹配：SEARCH → 搜索 → ======= → 替换 → +++++++ REPLACE
  // 注意：REPLACE 可能为空（删除操作），此时 ======= 和 +++++++ REPLACE 之间只有一个换行符
  // \\n? 允许替换内容为空时跳过中间的换行符，避免 [\\s\\S]*? 贪婪吃掉 REPLACE 标记
  const blockRe = new RegExp(
    '-------\\s*SEARCH\\s*\\n([\\s\\S]*?)\\n=======\\s*\\n([\\s\\S]*?)\\n?\\+\\+\\+\\+\\+\\+\\+\\s*REPLACE\\s*',
    'g'
  );

  let match: RegExpExecArray | null;
  while ((match = blockRe.exec(diffText)) !== null) {
    patches.push({
      search: match[1],
      replace: match[2]
    });
  }

  if (patches.length === 0) {
    return { patches: [], error: '未找到有效的 SEARCH/REPLACE 块' };
  }

  return { patches };
}

/**
 * 解析 LLM 输出，识别输出类型
 */
export function parseOutput(text: string): ParsedOutput {
  const trimmed = text.trim();
  if (!trimmed) {
    return { type: 'unknown', raw: trimmed, error: '输出为空' };
  }

  const block = extractFirstCodeBlock(trimmed);
  if (!block) {
    return { type: 'unknown', raw: trimmed, error: '未找到代码块' };
  }

  const { lang, code } = block;

  // 1. JSON → tool_call
  if (lang === 'json') {
    try {
      const obj = JSON.parse(code);
      if (isToolCall(obj)) {
        return { type: 'tool_call', tool: obj };
      }
      return {
        type: 'unknown',
        raw: trimmed,
        error: 'JSON 格式不符合 tool_call 规范（需要 action + parameters）'
      };
    } catch {
      return { type: 'unknown', raw: trimmed, error: 'JSON 解析失败' };
    }
  }

  // 2. Vue SFC
  if (lang === 'vue') {
    if (!code.includes('<template>') && !code.includes('<script>')) {
      return {
        type: 'unknown',
        raw: trimmed,
        error: 'Vue 代码块缺少 <template> 或 <script>'
      };
    }
    return { type: 'vue_code', code };
  }

  // 3. Diff
  if (lang === 'diff') {
    const parsed = parseDiffPatches(code);
    if (parsed.error || parsed.patches.length === 0) {
      return { type: 'unknown', raw: trimmed, error: parsed.error };
    }
    return { type: 'diff', patches: parsed.patches };
  }

  // 4. 其他 → 未知
  return {
    type: 'unknown',
    raw: trimmed,
    error: `不支持的代码块类型: ${lang || '(无)'}`
  };
}

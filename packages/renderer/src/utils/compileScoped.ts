export function compileScopedCSS(cssContent: string, scopeId: string): string {
  // 第一步：提取所有 @规则 (keyframes, media)
  const atRuleRegex = /(@(keyframes|media)\s*([^{]*)){([\s\S]*?}\s*})/g;
  const atRules: Array<{
    type: string;
    name: string;
    conditions: string;
    content: string;
  }> = [];

  // 临时移除所有 @规则 并保存
  const cssWithoutAtRules = cssContent.replace(
    atRuleRegex,
    (_, __, type, conditions, content) => {
      atRules.push({ type, name: conditions.trim(), conditions, content });
      return '/* AT_RULE_PLACEHOLDER */';
    }
  );

  // 第二步：处理 :deep() 语法
  const deepProcessed = cssWithoutAtRules
    .replace(/::v-deep\(/g, ':deep(')
    .replace(/(\s*)>>>(\s*)/g, '$1:deep($2)')
    .replace(
      /([\w-.:\s[\]>+~]+?):deep\(([^)]+)\)/g,
      (_, parent, child) =>
        `${parent.replace(/(\s*)$/, `[${scopeId}]$1`)} ${child}`
    );

  // 第三步：处理普通选择器（支持伪类）
  const scopedCSS = deepProcessed.replace(/([^{}]+)(?=\s*{)/g, (selectors) => {
    return selectors
      .split(',')
      .map((selector) => {
        const trimmed = selector.trim();
        if (trimmed.includes(`[${scopeId}]`)) return trimmed;

        return trimmed.replace(
          /(.*?)((?::[^:\s(]+(?:\([^)]*\))?)*)(\s*)$/,
          (_, base, pseudo, whitespace) =>
            `${base}[${scopeId}]${pseudo}${whitespace}`
        );
      })
      .join(', ');
  });

  // 第四步：还原 @规则 并处理 media 内容
  let finalCSS = scopedCSS;
  atRules.forEach(({ type, conditions, content }) => {
    let processedContent = content;
    // 仅处理 @media 的内容
    if (type === 'media') {
      processedContent = processedContent.replace(
        /([^{}]+)(?=\s*{)/g,
        (selectors) => {
          return selectors
            .split(',')
            .map((selector) => {
              const trimmed = selector.trim();
              if (trimmed.includes(`[${scopeId}]`)) return trimmed;

              return trimmed.replace(
                /(.*?)((?::[^:\s(]+(?:\([^)]*\))?)*)(\s*)$/,
                (_, base, pseudo, whitespace) =>
                  `${base}[${scopeId}]${pseudo}${whitespace}`
              );
            })
            .join(', ');
        }
      );
    }
    finalCSS = finalCSS.replace(
      '/* AT_RULE_PLACEHOLDER */',
      `@${type} ${conditions}{${processedContent}}`
    );
  });

  return finalCSS.replace(/}}/g, '}');
}

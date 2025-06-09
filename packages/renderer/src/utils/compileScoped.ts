export function compileScopedCSS(cssContent: string, scopeId: string): string {
  // 改进的CSS解析器
  const parseCSS = (css: string) => {
    const tokens = [];
    let i = 0;

    while (i < css.length) {
      // 跳过空白
      if (/\s/.test(css[i])) {
        i++;
        continue;
      }

      // 处理注释
      if (css.substring(i, i + 2) === '/*') {
        const commentEnd = css.indexOf('*/', i + 2);
        if (commentEnd !== -1) {
          i = commentEnd + 2;
          continue;
        }
      }

      // 处理 @规则
      if (css[i] === '@') {
        const atRuleStart = i;

        // 找到规则名结束位置
        while (i < css.length && css[i] !== '{' && css[i] !== ';') {
          i++;
        }

        const ruleName = css.substring(atRuleStart, i).trim();
        const isKeyframes = ruleName.includes('@keyframes');

        if (css[i] === ';') {
          // 简单的@规则 (如 @import)
          tokens.push({
            type: 'simple-at-rule',
            content: css.substring(atRuleStart, i + 1)
          });
          i++;
        } else if (css[i] === '{') {
          // 块级@规则
          const contentStart = i + 1;
          let braceCount = 1;
          i++;

          while (i < css.length && braceCount > 0) {
            if (css[i] === '{') braceCount++;
            else if (css[i] === '}') braceCount--;
            i++;
          }

          const fullContent = css.substring(atRuleStart, i);
          const innerContent = css.substring(contentStart, i - 1);

          tokens.push({
            type: isKeyframes ? 'keyframes' : 'at-rule',
            rule: ruleName,
            content: fullContent,
            inner: innerContent
          });
        }
        continue;
      }

      // 处理普通规则
      const ruleStart = i;

      // 找到选择器结束位置
      while (i < css.length && css[i] !== '{') {
        i++;
      }

      if (i >= css.length) break;

      const selector = css.substring(ruleStart, i).trim();
      if (!selector) {
        i++;
        continue;
      }

      // 跳过 {
      const contentStart = i + 1;
      let braceCount = 1;
      i++;

      while (i < css.length && braceCount > 0) {
        if (css[i] === '{') braceCount++;
        else if (css[i] === '}') braceCount--;
        i++;
      }

      const content = css.substring(contentStart, i - 1);

      tokens.push({
        type: 'rule',
        selector,
        content: content.trim()
      });
    }

    return tokens;
  };

  // 检查是否是keyframes选择器
  const isKeyframeSelector = (selector: string): boolean => {
    const trimmed = selector.trim();
    return /^(from|to|\d+(\.\d+)?%)$/.test(trimmed);
  };

  // 处理 :deep() 语法
  const processDeepSelectors = (selector: string): string => {
    return selector
      .replace(/::v-deep\(/g, ':deep(')
      .replace(/::v-deep\s+/g, ':deep(')
      .replace(/\/deep\//g, ' ')
      .replace(/>>>/g, ' ')
      .replace(/(.*?):deep\(([^)]+)\)/g, (_match, parent, child) => {
        const trimmedParent = parent.trim();
        const trimmedChild = child.trim();

        if (!trimmedParent) {
          return trimmedChild;
        }

        return `${trimmedParent}[${scopeId}] ${trimmedChild}`;
      });
  };

  // 添加作用域到选择器
  const addScopeToSelector = (selector: string): string => {
    const trimmed = selector.trim();

    if (!trimmed) return trimmed;

    // 跳过已经有作用域的
    if (trimmed.includes(`[${scopeId}]`)) {
      return trimmed;
    }

    // 全局选择器不添加作用域
    if (/^(:root|:host|html|body)(\s|$|:|\.|\#|\[)/.test(trimmed)) {
      return trimmed;
    }

    // keyframes 选择器不添加作用域
    if (isKeyframeSelector(trimmed)) {
      return trimmed;
    }

    // 处理伪类伪元素
    const match = trimmed.match(/^(.+?)((?:::?[\w-]+(?:\([^)]*\))?)*)\s*$/);
    if (match) {
      const [, base, pseudo = ''] = match;
      const cleanBase = base.trim();

      // 确保base不为空
      if (!cleanBase) return trimmed;

      return `${cleanBase}[${scopeId}]${pseudo}`;
    }

    return `${trimmed}[${scopeId}]`;
  };

  // 处理选择器组
  const processSelectorGroup = (selectorGroup: string): string => {
    // 先处理 :deep()
    const processedDeep = processDeepSelectors(selectorGroup);

    // 然后添加作用域
    return processedDeep
      .split(',')
      .map((selector) => addScopeToSelector(selector))
      .filter((selector) => selector.trim()) // 过滤空选择器
      .join(', '); // 注意逗号后加空格
  };

  // 重构CSS
  const rebuildCSS = (tokens: any[]): string => {
    return tokens
      .map((token) => {
        switch (token.type) {
          case 'simple-at-rule':
            return token.content;

          case 'keyframes':
            // keyframes 完全保持原样，不做任何处理
            return token.content;

          case 'at-rule':
            // 处理 @media 等规则内的选择器
            try {
              const innerTokens = parseCSS(token.inner);
              const processedInner = rebuildCSS(innerTokens);
              return `${token.rule} { ${processedInner} }`;
            } catch (error) {
              // 如果解析失败，保持原样
              return token.content;
            }

          case 'rule':
            // 处理普通规则
            if (!token.selector || !token.content) {
              return '';
            }

            const processedSelector = processSelectorGroup(token.selector);
            if (!processedSelector.trim()) {
              return '';
            }

            return `${processedSelector} { ${token.content} }`;

          default:
            return '';
        }
      })
      .filter((rule) => rule.trim())
      .join(' '); // 规则间用空格分隔
  };

  // 清理和格式化CSS
  const formatCSS = (css: string): string => {
    return css
      .replace(/\s*{\s*/g, ' { ') // { 前后保留空格
      .replace(/\s*}\s*/g, ' } ') // } 前后保留空格
      .replace(/\s*;\s*/g, '; ') // ; 后保留空格
      .replace(/\s*,\s*/g, ', ') // , 后保留空格
      .replace(/\s+/g, ' ') // 多个空格合并为一个
      .replace(/^\s+|\s+$/g, '') // 去除首尾空格
      .replace(/\s*}\s*}/g, ' } }') // 处理嵌套结构
      .trim();
  };

  // 主处理流程
  try {
    // 1. 预处理：移除多行注释，保留重要注释
    const cleanCSS = cssContent
      .replace(/\/\*(?!\s*!)[\s\S]*?\*\//g, '') // 移除普通注释，保留 /*! 重要注释
      .replace(/^\s+|\s+$/gm, '') // 移除每行首尾空格
      .replace(/\n\s*\n/g, '\n'); // 移除空行

    // 2. 解析CSS
    const tokens = parseCSS(cleanCSS);

    // 3. 重构CSS
    const rebuiltCSS = rebuildCSS(tokens);

    // 4. 格式化输出
    return formatCSS(rebuiltCSS);
  } catch (error) {
    console.error('CSS scoping failed:', error);
    console.error('Input CSS:', cssContent);

    // 降级：使用简单的正则处理
    return cssContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
      .replace(
        /(@keyframes\s+[^{]+\s*{[^{}]*(?:{[^}]*}[^{}]*)*})/g,
        (match) => {
          return match; // keyframes 保持不变
        }
      )
      .replace(/([^{}@]+)(?=\s*{)/g, (match) => {
        const trimmed = match.trim();
        if (
          !trimmed ||
          trimmed.startsWith('@') ||
          trimmed.includes(`[${scopeId}]`) ||
          isKeyframeSelector(trimmed)
        ) {
          return match;
        }
        return `${trimmed}[${scopeId}]`;
      });
  }
}

// // 完整测试用例
// const testCases = [
//   // 测试1: @keyframes开头
//   `@keyframes fadeIn {
//     from { opacity: 0; }
//     50% { opacity: 0.5; }
//     to { opacity: 1; }
//   }
//   .container { color: red; }`,

//   // 测试2: 复杂选择器
//   `.parent .child:hover,
//    .item::before {
//      color: blue;
//    }`,

//   // 测试3: :deep语法
//   `.wrapper :deep(.nested) { margin: 10px; }`,

//   // 测试4: 嵌套@规则
//   `@media (max-width: 768px) {
//      .responsive { display: none; }
//      .item:focus { outline: none; }
//    }`,

//   // 测试5: 混合情况
//   `@keyframes spin {
//      0% { transform: rotate(0deg); }
//      100% { transform: rotate(360deg); }
//    }
//    .loader { animation: spin 1s linear infinite; }
//    @media print {
//      .no-print { display: none; }
//    }`
// ];

// console.log('=== 完整测试结果 ===');
// testCases.forEach((css, index) => {
//   console.log(`\n--- 测试用例 ${index + 1} ---`);
//   console.log('输入:', css.replace(/\s+/g, ' ').trim());
//   console.log('输出:', compileScopedCSS(css, 'data-v-123'));
// });

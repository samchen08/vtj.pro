import { parseSFC, traverseAST, parseScript } from '../shared';

interface FixResult {
  fixed: boolean;
  originalCode: string;
  fixedCode: string;
  changes: Array<{
    line: number;
    column: number;
    original: string;
    fixed: string;
    message: string;
  }>;
}

export function checkAndFixStatePrefix(vueCode: string): FixResult {
  const changes: FixResult['changes'] = [];
  let fixedCode = vueCode;

  // 解析 Vue SFC
  const sfc = parseSFC(vueCode);

  if (!sfc.template || !sfc.script) {
    return {
      fixed: false,
      originalCode: vueCode,
      fixedCode: vueCode,
      changes: []
    };
  }

  // 1. 从 script 中提取 state 中的属性
  const stateProperties = extractStateProperties(sfc.script);

  // 2. 解析 template 内容
  const templateContent = sfc.template;
  let fixedTemplateContent = templateContent;

  // 3. 收集所有需要修复的位置
  const fixes: Array<{
    start: number;
    end: number;
    original: string;
    replacement: string;
    line: number;
    column: number;
  }> = [];

  // 检查插值表达式 {{ ... }}
  const interpolationRegex = /\{\{([^}]+)\}\}/g;
  let match;

  while ((match = interpolationRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const expression = match[1];
    const fixedExpression = fixExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `{{${fixedExpression}}}`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression.trim(),
        fixed: fixedExpression.trim(),
        message: `修复插值表达式：添加 state. 前缀`
      });
    }
  }

  // 检查绑定属性 :prop="..."
  const bindingRegex = /:(\w+)="([^"]+)"/g;

  while ((match = bindingRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const propName = match[1];
    const expression = match[2];
    const fixedExpression = fixExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `:${propName}="${fixedExpression}"`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression,
        fixed: fixedExpression,
        message: `修复绑定属性：添加 state. 前缀`
      });
    }
  }

  // 检查 v-if, v-else-if, v-show 指令
  const conditionalDirectiveRegex = /v-(if|else-if|show)="([^"]+)"/g;
  while ((match = conditionalDirectiveRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const directiveName = match[1];
    const expression = match[2];
    const fixedExpression = fixExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `v-${directiveName}="${fixedExpression}"`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression,
        fixed: fixedExpression,
        message: `修复 v-${directiveName} 指令：添加 state. 前缀`
      });
    }
  }

  // 检查 v-for 指令
  const vForRegex = /v-for="([^"]+)"/g;
  while ((match = vForRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const expression = match[1];
    // v-for 特殊处理，只修复 in 后面的部分
    const forMatch = expression.match(/^(.+)\s+in\s+(.+)$/);
    if (forMatch) {
      const [, loopVar, loopExpression] = forMatch;
      const fixedLoopExpression = fixExpression(
        loopExpression,
        stateProperties
      );
      if (fixedLoopExpression !== loopExpression) {
        const position = getLineAndColumn(templateContent, match.index);
        const fixedDirective = `v-for="${loopVar} in ${fixedLoopExpression}"`;

        fixes.push({
          start: match.index,
          end: match.index + fullMatch.length,
          original: fullMatch,
          replacement: fixedDirective,
          line: position.line,
          column: position.column
        });

        changes.push({
          line: position.line + 1,
          column: position.column,
          original: loopExpression,
          fixed: fixedLoopExpression,
          message: `修复 v-for 指令：添加 state. 前缀`
        });
      }
    }
  }

  // 检查 v-model 指令
  const vModelRegex = /v-model="([^"]+)"/g;
  while ((match = vModelRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const expression = match[1];
    const fixedExpression = fixExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `v-model="${fixedExpression}"`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression,
        fixed: fixedExpression,
        message: `修复 v-model 指令：添加 state. 前缀`
      });
    }
  }

  // 检查 v-bind 指令（不带属性名）
  const vBindRegex = /v-bind="([^"]+)"/g;
  while ((match = vBindRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const expression = match[1];
    const fixedExpression = fixExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `v-bind="${fixedExpression}"`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression,
        fixed: fixedExpression,
        message: `修复 v-bind 指令：添加 state. 前缀`
      });
    }
  }

  // 检查 v-text 和 v-html 指令
  const textHtmlRegex = /v-(text|html)="([^"]+)"/g;
  while ((match = textHtmlRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const directiveName = match[1];
    const expression = match[2];
    const fixedExpression = fixExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `v-${directiveName}="${fixedExpression}"`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression,
        fixed: fixedExpression,
        message: `修复 v-${directiveName} 指令：添加 state. 前缀`
      });
    }
  }

  // 检查事件处理器 @ 或 v-on:
  const eventRegex = /(@|v-on:)(\w+)="([^"]+)"/g;
  while ((match = eventRegex.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const prefix = match[1];
    const eventName = match[2];
    const expression = match[3];

    // 处理表达式中的 state 属性引用
    const fixedExpression = fixEventExpression(expression, stateProperties);

    if (fixedExpression !== expression) {
      const position = getLineAndColumn(templateContent, match.index);
      fixes.push({
        start: match.index,
        end: match.index + fullMatch.length,
        original: fullMatch,
        replacement: `${prefix}${eventName}="${fixedExpression}"`,
        line: position.line,
        column: position.column
      });

      changes.push({
        line: position.line + 1,
        column: position.column,
        original: expression,
        fixed: fixedExpression,
        message: `修复事件处理器：添加 state. 前缀`
      });
    }
  }

  // 应用修复（从后往前，避免位置偏移）
  fixes.sort((a, b) => b.start - a.start);
  fixes.forEach((fix) => {
    fixedTemplateContent =
      fixedTemplateContent.substring(0, fix.start) +
      fix.replacement +
      fixedTemplateContent.substring(fix.end);
  });

  // 重新组装完整的 Vue 文件
  if (fixes.length > 0) {
    const templateStart = vueCode.indexOf('<template>');
    const templateEnd =
      vueCode.lastIndexOf('</template>') + '</template>'.length;

    fixedCode =
      vueCode.substring(0, templateStart) +
      '<template>\n' +
      fixedTemplateContent +
      '\n</template>' +
      vueCode.substring(templateEnd);
  }

  return {
    fixed: fixes.length > 0,
    originalCode: vueCode,
    fixedCode,
    changes
  };
}

function extractStateProperties(scriptContent: string): Set<string> {
  const stateProps = new Set<string>();

  try {
    const ast = parseScript(scriptContent);

    traverseAST(ast, {
      CallExpression(path) {
        if (
          path.node.callee.type === 'Identifier' &&
          path.node.callee.name === 'reactive' &&
          path.node.arguments.length > 0 &&
          path.node.arguments[0].type === 'ObjectExpression'
        ) {
          const parent = path.parent;
          if (
            parent.type === 'VariableDeclarator' &&
            parent.id.type === 'Identifier' &&
            parent.id.name === 'state'
          ) {
            const objExpr = path.node.arguments[0];
            objExpr.properties.forEach((prop) => {
              if (
                prop.type === 'ObjectProperty' &&
                prop.key.type === 'Identifier'
              ) {
                stateProps.add(prop.key.name);
              }
            });
          }
        }
      }
    });
  } catch (error) {
    console.error('Failed to parse script:', error);
  }

  return stateProps;
}

function fixExpression(
  expression: string,
  stateProperties: Set<string>
): string {
  let fixed = expression.trim();

  // 对每个 state 属性进行检查和修复
  stateProperties.forEach((prop) => {
    // 创建正则，确保是独立的属性名，不是已经有 state. 前缀的
    const regex = new RegExp(`(?<![\\w.])${prop}(?![\\w])`, 'g');

    // 检查是否需要修复
    if (regex.test(fixed) && !fixed.includes(`state.${prop}`)) {
      // 替换为 state.prop
      fixed = fixed.replace(regex, `state.${prop}`);
    }
  });

  return fixed;
}

// 特殊处理事件表达式
function fixEventExpression(
  expression: string,
  stateProperties: Set<string>
): string {
  let fixed = expression.trim();

  // 处理自增/自减操作符
  stateProperties.forEach((prop) => {
    // 匹配 prop++ 或 ++prop 或 prop-- 或 --prop
    const incrementRegex = new RegExp(
      `(?<![\\w.])${prop}(\\+\\+|--|\\s*[+\\-*/]=)`,
      'g'
    );
    const preIncrementRegex = new RegExp(
      `(\\+\\+|--)?(?<![\\w.])${prop}(?![\\w])`,
      'g'
    );

    if (!fixed.includes(`state.${prop}`)) {
      // 处理后缀操作符
      fixed = fixed.replace(incrementRegex, `state.${prop}$1`);
      // 处理前缀操作符
      fixed = fixed.replace(preIncrementRegex, (match, prefix) => {
        if (prefix) {
          return `${prefix}state.${prop}`;
        }
        // 如果没有前缀操作符，检查是否需要添加 state.
        return match.includes(prop) && !match.includes('state.')
          ? `state.${prop}`
          : match;
      });
    }
  });

  // 处理普通的属性引用
  return fixExpression(fixed, stateProperties);
}

function getLineAndColumn(
  content: string,
  offset: number
): { line: number; column: number } {
  const lines = content.substring(0, offset).split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length
  };
}

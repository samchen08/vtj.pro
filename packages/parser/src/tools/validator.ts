import * as t from '@babel/types';
import { parseSFC, transformScript, parseScript } from '../shared';
import { VantIcons, VtjIcons } from './icons';

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  illegalVantIcons: string[];
  illegalVtjIcons: string[];
};

export class ComponentValidator {
  validate(code: string): ValidationResult {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      illegalVantIcons: [],
      illegalVtjIcons: []
    };

    // 基础结构校验
    if (!this.isCompleteSFC(code)) {
      result.errors.push('代码不符合Vue3单文件组件规范');
      result.valid = false;
    }

    const msg = this.checkSyntax(code);
    if (msg) {
      result.errors.push(`代码语法错误: ${msg}`);
      result.valid = false;
      return result;
    }

    // setup函数校验
    if (!this.checkSetup(code)) {
      result.errors.push('setup不符合低代码模版要求');
      result.valid = false;
    }

    if (this.hasUnchangedComment(code)) {
      result.errors.push('代码不完整，需要输出完整代码，不能有任何省略');
      result.valid = false;
    }

    // 检查VantIcon
    result.illegalVantIcons = this.checkVantIcons(code);
    // 检查VtjIcon
    result.illegalVtjIcons = this.checkVtjIcons(code);

    return result;
  }

  private isCompleteSFC(code: string): boolean {
    try {
      const sfc = parseSFC(code);
      return !!(sfc.template && sfc.script && sfc.styles);
    } catch (e) {
      return false;
    }
  }

  private checkSyntax(code: string) {
    let msg = '';
    try {
      const sfc = parseSFC(code);
      parseScript(sfc.script);
    } catch (e: any) {
      if (e instanceof SyntaxError) {
        msg = e.message;
      }
    }
    return msg;
  }

  private checkSetup(code: string) {
    const sfc = parseSFC(code);
    let setupLines = 0;
    transformScript(sfc.script, {
      ObjectMethod(path: any) {
        if (path.node.key.name === 'setup') {
          const body = path.node.body.body;
          // 过滤掉空行
          setupLines = body.filter(
            (stmt: any) => !t.isEmptyStatement(stmt)
          ).length;
        }
      }
    });

    return setupLines === 3;
  }

  private findVantIcons(code: string) {
    const sfc = parseSFC(code);
    // 匹配所有 VanIcon 和 van-icon 的开始标签
    const tagRegex = /<(?:VanIcon|van-icon)\b[^>]*>/g;
    const tags = sfc.template.match(tagRegex) || [];
    const names: string[] = [];

    // 遍历每个标签提取静态 name 属性
    tags.forEach((tag) => {
      // 查找静态 name 属性（排除 :name 动态绑定）
      const nameMatch = tag.match(/\bname="([^"]+)"/);
      if (nameMatch) {
        names.push(nameMatch[1]);
      }
    });

    // 去重并输出结果
    return [...new Set(names)];
  }

  private checkVantIcons(code: string) {
    const icons = this.findVantIcons(code);
    const illegalIcons = [];
    for (const name of icons) {
      if (!VantIcons.includes(name)) {
        illegalIcons.push(name);
      }
    }
    return illegalIcons;
  }

  private findVtjIcons(code: string) {
    const sfc = parseSFC(code);
    const regex = /import\s*{([^}]+)}\s*from\s*['"]\@vtj\/icons['"]/;
    const match = sfc.script.match(regex);
    if (!match || !match[1]) return [];
    return match[1]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean); // 过滤空项
  }

  private checkVtjIcons(code: string) {
    const icons = this.findVtjIcons(code);
    const illegalIcons = [];
    for (const name of icons) {
      if (!VtjIcons.includes(name)) {
        illegalIcons.push(name);
      }
    }
    return illegalIcons;
  }

  private hasUnchangedComment(code: string) {
    // 匹配 HTML 注释 <!-- ... -->
    const htmlCommentRegex = /<!--([\s\S]*?)-->/g;
    // 匹配 CSS/JS 多行注释 /* ... */
    const multiLineCommentRegex = /\/\*([\s\S]*?)\*\//g;
    // 匹配 JS 单行注释 //
    const singleLineCommentRegex = /\/\/(.*)/g;

    // 合并所有匹配到的注释内容
    const commentContents = [
      ...(code.match(htmlCommentRegex) || []),
      ...(code.match(multiLineCommentRegex) || []),
      ...(code.match(singleLineCommentRegex) || [])
    ];

    // 检查注释内容是否包含"保持不变"
    return commentContents.some(
      (comment) => /不变/.test(comment.replace(/\*/g, '')) // 移除多行注释的星号避免干扰
    );
  }
}

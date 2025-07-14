import * as t from '@babel/types';
import { parseSFC, transformScript } from '../shared';
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
      result.errors.push('不符合单文件组件格式');
      result.valid = false;
    }

    // setup函数校验
    if (!this.checkSetup(code)) {
      result.errors.push('setup不符合模版要求');
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

  checkVtjIcons(code: string) {
    const icons = this.findVtjIcons(code);
    const illegalIcons = [];
    for (const name of icons) {
      if (!VtjIcons.includes(name)) {
        illegalIcons.push(name);
      }
    }
    return illegalIcons;
  }
}

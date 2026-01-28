export interface IncrementalUpdate {
  type: 'search_replace' | 'full_code';
  updates?: Array<{ search: string; replace: string }>; // 搜索替换更新，支持单个或多个
  fullCode?: string; // 完整代码
}

export interface UpdateResult {
  success: boolean;
  updatedCode: string;
  error?: string;
  appliedUpdate?: IncrementalUpdate;
  matchCount?: number; // 匹配到的位置数量
}

export interface MatchOptions {
  requireUniqueMatch?: boolean; // 是否要求唯一匹配
  contextLines?: number; // 上下文行数
  allowFuzzyMatch?: boolean; // 是否允许模糊匹配
}

export interface MatchResult {
  index: number; // 匹配位置
  length: number; // 匹配长度
  context?: string; // 匹配的上下文
  isUnique: boolean; // 是否唯一匹配
}

export class CodeIncrementalUpdater {
  // 缓存正则表达式，避免重复编译
  private readonly vueCodeRegex = /```vue\r?\n([\s\S]*?)(?:\r?\n```|$)/;
  private readonly diffCodeRegex = /```diff\r?\n([\s\S]*?)(?:\r?\n```|$)/;
  private readonly searchReplaceRegex =
    /-{7,}\s*SEARCH\s*\n([\s\S]*?)\n={7,}\s*\n([\s\S]*?)\n\+{7,}\s*REPLACE/g;

  /**
   * 解析AI返回的内容，识别增量更新指令
   * 支持：1. 纯SEARCH/REPLACE格式 2. 完整代码
   * 如果无代码内容，返回null
   */
  parseIncrementalUpdate(aiResponse: string): IncrementalUpdate | null {
    // 1. 首先尝试提取纯SEARCH/REPLACE部分
    const diffCodeMatch = this.diffCodeRegex.exec(aiResponse);
    if (diffCodeMatch && diffCodeMatch[1]) {
      const pureSearchReplace = this.extractPureSearchReplace(
        diffCodeMatch[1].trim()
      );
      if (pureSearchReplace) {
        return pureSearchReplace;
      }
    }

    // 2. 检查是否有完整的Vue代码块
    const vueCodeMatch = this.vueCodeRegex.exec(aiResponse);
    if (vueCodeMatch) {
      return {
        type: 'full_code',
        fullCode: vueCodeMatch[1].trim()
      };
    }

    // 3. 无代码内容，返回null
    return null;
  }

  /**
   * 应用SEARCH/REPLACE更新到现有代码
   * 类似cline的replace_in_file功能，支持上下文感知的精准匹配
   */
  applySearchReplace(
    code: string,
    search: string,
    replace: string,
    options?: MatchOptions
  ): UpdateResult {
    try {
      // 标准化换行符
      const normalizedCode = this.normalizeLineEndings(code);
      const normalizedSearch = this.normalizeLineEndings(search);
      const normalizedReplace = this.normalizeLineEndings(replace);

      // 查找所有匹配位置
      const matches = this.findAllMatches(
        normalizedCode,
        normalizedSearch,
        options
      );

      if (matches.length === 0) {
        return {
          success: false,
          updatedCode: code,
          error: `未找到匹配的代码片段。搜索内容：\n${search.substring(0, 200)}${search.length > 200 ? '...' : ''}`,
          matchCount: 0
        };
      }

      // 检查是否要求唯一匹配
      const requireUnique = options?.requireUniqueMatch ?? true;
      if (requireUnique && matches.length > 1) {
        const matchPositions = matches.map((m) => m.index).join(', ');
        return {
          success: false,
          updatedCode: code,
          error: `找到 ${matches.length} 个匹配位置（位置：${matchPositions}），无法确定要替换哪一个。请提供更多上下文以确保唯一匹配。`,
          matchCount: matches.length
        };
      }

      // 使用第一个匹配（简化逻辑）
      const bestMatch = matches[0];

      // 执行替换
      const beforeMatch = normalizedCode.substring(0, bestMatch.index);
      const afterMatch = normalizedCode.substring(
        bestMatch.index + bestMatch.length
      );
      const updatedCode = beforeMatch + normalizedReplace + afterMatch;

      // 验证替换是否成功
      if (updatedCode === normalizedCode && search !== '') {
        return {
          success: false,
          updatedCode: code,
          error: '替换未生效，请检查SEARCH内容是否精确匹配',
          matchCount: matches.length
        };
      }

      return {
        success: true,
        updatedCode: updatedCode,
        appliedUpdate: {
          type: 'search_replace',
          updates: [{ search, replace }]
        },
        matchCount: matches.length
      };
    } catch (error: any) {
      return {
        success: false,
        updatedCode: code,
        error: `应用更新时出错：${error.message}`,
        matchCount: 0
      };
    }
  }

  /**
   * 应用增量更新到现有代码
   */
  applyIncrementalUpdate(
    currentCode: string,
    update: IncrementalUpdate
  ): UpdateResult {
    try {
      if (
        update.type === 'search_replace' &&
        update.updates &&
        update.updates.length > 0
      ) {
        // 应用一个或多个SEARCH/REPLACE更新
        let updatedCode = currentCode;
        const appliedUpdates: Array<{ search: string; replace: string }> = [];
        const errors: string[] = [];
        let totalMatchCount = 0;

        for (let i = 0; i < update.updates.length; i++) {
          const { search, replace } = update.updates[i];
          const options: MatchOptions = {
            requireUniqueMatch: true,
            allowFuzzyMatch: true
          };

          const result = this.applySearchReplace(
            updatedCode,
            search,
            replace,
            options
          );

          if (result.success) {
            updatedCode = result.updatedCode;
            appliedUpdates.push({ search, replace });
            totalMatchCount += result.matchCount || 0;
          } else {
            errors.push(`更新 ${i + 1} 失败: ${result.error}`);
          }
        }

        if (appliedUpdates.length === 0) {
          // 所有更新都失败了
          return {
            success: false,
            updatedCode: currentCode,
            error: `所有更新都失败:\n${errors.join('\n')}`,
            matchCount: 0
          };
        } else if (errors.length > 0) {
          // 部分更新成功
          return {
            success: true,
            updatedCode: updatedCode,
            appliedUpdate: {
              type: 'search_replace',
              updates: appliedUpdates
            },
            error: `部分更新失败:\n${errors.join('\n')}`,
            matchCount: totalMatchCount
          };
        } else {
          // 所有更新都成功
          return {
            success: true,
            updatedCode: updatedCode,
            appliedUpdate: {
              type: 'search_replace',
              updates: appliedUpdates
            },
            matchCount: totalMatchCount
          };
        }
      } else if (update.type === 'full_code' && update.fullCode) {
        // 直接使用完整代码
        return {
          success: true,
          updatedCode: update.fullCode,
          appliedUpdate: update
        };
      } else {
        return {
          success: false,
          updatedCode: currentCode,
          error: '无效的更新格式'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        updatedCode: currentCode,
        error: `应用增量更新时出错：${error.message}`
      };
    }
  }

  /**
   * 提取纯SEARCH/REPLACE部分（处理混合输出，优化版）
   */
  private extractPureSearchReplace(
    aiResponse: string
  ): IncrementalUpdate | null {
    const matches: Array<{ search: string; replace: string }> = [];

    let match;
    while ((match = this.searchReplaceRegex.exec(aiResponse)) !== null) {
      matches.push({
        search: match[1].trim(),
        replace: match[2].trim()
      });
    }

    // 重置正则表达式状态
    this.searchReplaceRegex.lastIndex = 0;

    if (matches.length === 0) {
      return null;
    }

    // 统一返回数组格式，支持单个或多个
    return {
      type: 'search_replace',
      updates: matches
    };
  }

  /**
   * 标准化换行符（优化版）
   */
  private normalizeLineEndings(text: string): string {
    // 使用预编译的正则表达式
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  /**
   * 移除多余的空白字符（用于模糊匹配，简化版）
   */
  private removeExtraWhitespace(text: string): string {
    return text
      .replace(/\s+/g, ' ') // 多个空白字符替换为单个空格
      .replace(/\s*([{}();:,])\s*/g, '$1') // 移除标点符号周围的空格
      .trim();
  }

  /**
   * 查找所有匹配位置，支持上下文感知和模糊匹配
   */
  private findAllMatches(
    code: string,
    search: string,
    options?: MatchOptions
  ): MatchResult[] {
    const matches: MatchResult[] = [];
    const contextLines = options?.contextLines ?? 3;
    const allowFuzzy = options?.allowFuzzyMatch ?? true;

    // 1. 首先尝试精确匹配
    let startIndex = 0;
    while (true) {
      const index = code.indexOf(search, startIndex);
      if (index === -1) break;

      // 提取上下文
      const context = this.extractContext(
        code,
        index,
        search.length,
        contextLines
      );

      matches.push({
        index,
        length: search.length,
        context,
        isUnique: matches.length === 0 // 如果是第一个匹配，暂时认为是唯一的
      });

      startIndex = index + 1; // 继续查找下一个匹配
    }

    // 2. 如果没有精确匹配，尝试模糊匹配
    if (matches.length === 0 && allowFuzzy) {
      this.findFuzzyMatches(code, search, contextLines, matches);
    }

    // 3. 去重并更新isUnique属性
    return this.deduplicateAndUpdateMatches(matches);
  }

  /**
   * 查找模糊匹配（优化版）
   */
  private findFuzzyMatches(
    code: string,
    search: string,
    contextLines: number,
    matches: MatchResult[]
  ): void {
    // 简化搜索内容：移除多余空白
    const simplifiedSearch = this.removeExtraWhitespace(search);
    const simplifiedCode = this.removeExtraWhitespace(code);

    // 在简化后的代码中查找
    let startIndex = 0;
    while (true) {
      const index = simplifiedCode.indexOf(simplifiedSearch, startIndex);
      if (index === -1) break;

      // 将简化代码中的位置映射回原始代码
      const originalIndex = this.mapToOriginalPosition(
        code,
        simplifiedCode,
        index
      );
      if (originalIndex !== -1) {
        const context = this.extractContext(
          code,
          originalIndex,
          search.length,
          contextLines
        );
        matches.push({
          index: originalIndex,
          length: search.length,
          context,
          isUnique: false // 将在去重后更新
        });
      }

      startIndex = index + 1;
    }
  }

  /**
   * 提取代码上下文
   * @param code 原始代码
   * @param startIndex 匹配开始位置
   * @param length 匹配长度（现在被使用）
   * @param contextLines 上下文行数
   * @returns 带标记的上下文字符串
   */
  private extractContext(
    code: string,
    startIndex: number,
    length: number,
    contextLines: number
  ): string {
    const lines = code.split('\n');
    let currentPos = 0;
    let targetLine = -1;
    let targetColumn = -1;

    // 找到目标行和列
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline
      if (startIndex >= currentPos && startIndex < currentPos + lineLength) {
        targetLine = i;
        targetColumn = startIndex - currentPos;
        break;
      }
      currentPos += lineLength;
    }

    if (targetLine === -1) return '';

    // 提取上下文行
    const startLine = Math.max(0, targetLine - contextLines);
    const endLine = Math.min(lines.length - 1, targetLine + contextLines);

    const contextLinesArray = [];
    for (let i = startLine; i <= endLine; i++) {
      let line = lines[i];

      if (i === targetLine) {
        // 标记目标行和匹配范围
        const prefix = '>>> ';
        const beforeMatch = line.substring(0, targetColumn);
        const matchText = line.substring(
          targetColumn,
          Math.min(targetColumn + length, line.length)
        );
        const afterMatch = line.substring(
          Math.min(targetColumn + length, line.length)
        );

        // 如果匹配文本在当前行内
        if (matchText.length === length) {
          // 完整匹配在当前行
          line = `${prefix}${beforeMatch}[${matchText}]${afterMatch}`;
        } else if (matchText.length > 0) {
          // 部分匹配在当前行（跨行匹配）
          line = `${prefix}${beforeMatch}[${matchText}...]${afterMatch}`;
        } else {
          // 匹配在当前行开始但跨越多行
          line = `${prefix}${beforeMatch}[...]`;
        }
      } else {
        line = `    ${line}`;
      }
      contextLinesArray.push(line);
    }

    return contextLinesArray.join('\n');
  }

  /**
   * 将简化代码中的位置映射回原始代码
   */
  private mapToOriginalPosition(
    originalCode: string,
    simplifiedCode: string,
    simplifiedIndex: number
  ): number {
    // 简单实现：通过字符计数映射
    let originalPos = 0;
    let simplifiedPos = 0;

    while (
      simplifiedPos < simplifiedIndex &&
      originalPos < originalCode.length
    ) {
      const originalChar = originalCode[originalPos];
      const simplifiedChar = simplifiedCode[simplifiedPos];

      if (originalChar === simplifiedChar) {
        originalPos++;
        simplifiedPos++;
      } else if (/\s/.test(originalChar)) {
        // 原始代码中的空白字符在简化代码中被移除
        originalPos++;
      } else {
        // 字符不匹配，无法映射
        return -1;
      }
    }

    return originalPos;
  }

  /**
   * 去重并更新匹配结果
   */
  private deduplicateAndUpdateMatches(matches: MatchResult[]): MatchResult[] {
    if (matches.length === 0) return [];

    const uniqueMatches: MatchResult[] = [];
    const seenIndices = new Set<number>();

    for (const match of matches) {
      if (!seenIndices.has(match.index)) {
        seenIndices.add(match.index);
        uniqueMatches.push(match);
      }
    }

    // 更新isUnique属性
    const isUnique = uniqueMatches.length === 1;
    uniqueMatches.forEach((match) => {
      match.isUnique = isUnique;
    });

    return uniqueMatches;
  }
}

// 导出单例实例
export const codeIncrementalUpdater = new CodeIncrementalUpdater();

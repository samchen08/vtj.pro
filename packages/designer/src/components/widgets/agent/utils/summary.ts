/**
 * 任务总结提示词构建（纯函数）
 */
import type { PlanResult, StepRecord } from '../types/agent';

export function buildSummaryPrompt(
  userRequest: string,
  plan: PlanResult | null,
  stepRecords: StepRecord[]
): string {
  const stepsSummary = stepRecords
    .map(
      (s, i) =>
        `${i + 1}. [${s.status === 'completed' ? '成功' : '失败'}] ${s.description}${s.error ? ` (错误: ${s.error})` : ''}`
    )
    .join('\n');

  const totalDuration = stepRecords.reduce(
    (sum, s) => sum + (s.duration || 0),
    0
  );
  const successCount = stepRecords.filter(
    (s) => s.status === 'completed'
  ).length;
  const failCount = stepRecords.filter((s) => s.status === 'failed').length;

  return `你是一个任务总结助手。以下是本次 AI 双代理协作的完整执行记录，请生成结构化总结。

## 用户原始需求
${userRequest}

## Architect 计划
- 意图: ${plan?.intent || '未知'}
- 安全评级: ${plan?.safety || '未知'}
- 步骤数: ${plan?.steps?.length || 0}

## 执行结果
- 总步骤: ${stepRecords.length}
- 成功: ${successCount}
- 失败: ${failCount}
- 总耗时: ${(totalDuration / 1000).toFixed(1)}s

## 各步骤详情
${stepsSummary}

## 输出要求
请用中文输出以下内容（简洁明了，总计不超过 300 字）：

1. **完成摘要**: 一句话概括本次任务完成情况
2. **关键变更**: 列出本次创建/修改的主要文件和内容
3. **问题与风险**: 如有失败步骤或潜在问题，指出原因和影响
4. **后续建议**: 给出 1-3 条可落地的优化或后续操作建议`;
}

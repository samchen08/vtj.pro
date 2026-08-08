import { describe, expect, it } from 'vitest';
import { isResumeIntent } from '../../src/components/widgets/agent/utils/resume';

describe('isResumeIntent', () => {
  it('识别日志场景原文：继续执行上一轮没完成的计划', () => {
    expect(isResumeIntent('继续执行上一轮没完成的计划')).toBe(true);
    expect(isResumeIntent('继续执行上一轮未完成的计划')).toBe(true);
  });

  it('识别变体：接着/恢复 + 上次/之前 + 任务/步骤', () => {
    expect(isResumeIntent('接着完成上次没做完的任务')).toBe(true);
    expect(isResumeIntent('恢复执行之前的计划')).toBe(true);
    expect(isResumeIntent('继续把剩下的步骤做完')).toBe(true);
    expect(isResumeIntent('接着做完剩下的工作')).toBe(true);
  });

  it('识别简洁表述：继续+完成类动词/计划类名词', () => {
    expect(isResumeIntent('继续完成')).toBe(true);
    expect(isResumeIntent('继续执行计划')).toBe(true);
    expect(isResumeIntent('继续任务')).toBe(true);
    expect(isResumeIntent('继续进度')).toBe(true);
  });

  it('忽略普通新需求（前缀命中但无续跑语义要素）', () => {
    expect(isResumeIntent('继续做一下首页')).toBe(false);
    expect(isResumeIntent('继续优化页面')).toBe(false);
    expect(isResumeIntent('接着写一个列表页')).toBe(false);
    expect(isResumeIntent('恢复默认设置')).toBe(false);
  });

  it('忽略无意义输入与空串', () => {
    expect(isResumeIntent('')).toBe(false);
    expect(isResumeIntent('   ')).toBe(false);
    expect(isResumeIntent('继续')).toBe(false);
    expect(isResumeIntent('继续执行')).toBe(false);
    expect(isResumeIntent('帮我美化首页')).toBe(false);
  });
});

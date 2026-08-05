/**
 * Agent 模块常量
 * 集中管理流程参数、超时、存储键等可配置项
 */

/** Editor 单步骤内最大工具调用轮次（ReAct 循环上限） */
export const MAX_TURNS = 10;

/** 工具执行超时时间（毫秒） */
export const TOOL_TIMEOUT_MS = 30000;

/** 代码块显示偏好存储键 */
export const HIDE_CODE_STORAGE_KEY = 'CHAT_HIDE_CODE';

/** 滚动判断"接近底部"的阈值（像素） */
export const SCROLL_NEAR_BOTTOM_THRESHOLD = 80;

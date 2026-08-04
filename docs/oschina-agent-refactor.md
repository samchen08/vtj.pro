# 从 300 行到 700 行，代码量翻倍反而更「轻」了 —— 记一次 AI 智能体的架构重生

> 在低代码平台中嵌入 AI 能力不是什么新鲜事，但当你的 AI 智能体从「能用」走向「好用」，从「单体巨石」变成「乐高积木」时，代码量翻倍了却感觉更轻了 —— 这就是我们最近完成的一次智能体重构。

---

## 背景：VTJ 的 AI 之旅

[VTJ](https://gitee.com/aitrade/vtj) 是一个面向企业级的 Vue3 低代码平台，支持可视化拖拽搭建页面、DSL 与 Vue SFC 双向转换等能力。去年我们上线了第一版 AI 智能体，用户可以在设计器中通过自然语言描述需求，由 AI 自动生成页面代码并应用到画布上。

初版上线后反馈不错，但随着用户需求的复杂化，问题逐渐暴露：

- 流程不透明：AI 收到指令后直接输出代码，用户不知道中间发生了什么
- 错误无感知：代码解析失败或逻辑错误时，缺乏有效的自我纠错机制
- 难以扩展：整个核心逻辑塞在一个 650 行的 `useAI()` Hook 中，牵一发而动全身
- 无法回溯：一旦出错，只能重来，没有步骤级的历史记录

于是我们下决心做一次彻底的架构升级。

---

## 旧版架构：一把梭的单体模式

先看旧版的核心流程（简化）：

```
用户输入 → postTopic → SSE 流式补全 → processOutput → shouldNext?
    → 是：postChat 继续工具调用
    → 否：结束
```

本质上是一个 **递归循环**，核心逻辑全部收敛在一个 `useAI()` composable 中：

```typescript
// 旧版：一个函数干了所有事，650 行，50+ 个导出
export function useAI() {
  const { engine, isLogined, ... } = useOpenApi();
  const loading = ref(false);
  const isNewChat = ref(true);
  const chats = ref<AIChat[]>([]);
  // ... 省略 40 多个状态变量

  const completions = async (chat, complete) => {
    // SSE 流式处理
    // 工具调用递归
    // DSL 转换
    // ... 都在这里
  };

  return { engine, isLogined, loading, ..., /* 50+ 导出 */ };
}
```

这种写法的优点：**快**。从零到一非常快。但技术债会在每次迭代中悄然累积。

---

## 新版架构：双代理 + 依赖注入

新版我们引入了 **Architect + Editor 双代理模式**，灵感来自 AI Agent 领域经典的「规划-执行」分离范式。

### 整体流程

```
用户输入
  │
  ▼
┌─────────────────┐
│   Architect     │  ← 分析意图，制定执行计划（Plan）
│   规划阶段      │     输出：intent + safety + steps[]
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Editor       │  ← 按计划逐步骤执行
│   执行阶段      │     每步支持多轮 ReAct 自纠错
│                 │     tool_call / vue_code / diff
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Summary       │  ← 汇总执行结果，生成结构化总结
│   总结阶段      │
└─────────────────┘
```

### 代码组织：从巨石到乐高

新版将旧版那个 650 行的单体 `useAI` 拆成了 **10 个独立 composable**，每个职责清晰：

```
useDualAgent         ← 顶层编排，组合各模块
  ├── useAuth        ← 认证 + Token 管理
  ├── useSSEStream   ← SSE 流式通信封装
  ├── useArchitectPlan  ← Architect 规划 → Editor 执行 → 总结
  │     └── useEditorStep  ← 单步骤 ReAct 多轮循环
  ├── useSummary     ← 总结 Prompt 构造
  ├── useExport      ← 对话 JSON 导出
  ├── useReplayChat  ← 历史会话重建（扁平→分层）
  └── useFileRecognition ← 文件识别
```

每个 composable 通过 **接口注入依赖**，而非直接引用全局状态：

```typescript
// 新版：依赖注入，接口清晰
export interface DualAgentInfrastructure {
  token: Ref<string>;
  model: Ref<string>;
  getEngine: () => Engine | null;
  registerTools: () => void;
  abortSse: () => void;
  statusText: Ref<string>;
  statusType: Ref<'info' | 'warning' | 'success' | 'danger'>;
}

export function useDualAgent(
  infra: DualAgentInfrastructure,
  api: DualAgentApi,
  state: DualAgentState,
  promptBuilder?: () => string
) { ... }
```

这样做的好处：

1. **可测试**：每个 composable 的依赖都可以 mock，新版已经补了 3 个单元测试
2. **可替换**：想换一个 SSE 实现？只改 `useSSEStream` 即可
3. **可理解**：新人接手只需要看一个模块，而不是 650 行的大杂烩

---

## 核心亮点：ReAct 自纠错循环

新版的 Editor 步骤执行采用 **ReAct（Reasoning + Acting）模式**，每个步骤最多 10 轮尝试：

```
轮次 1: LLM 输出 vue_code → 解析为 DSL → applyAI 应用到画布
         ↓
      自动 refresh 验证
         ↓
     有运行时错误？
         ↓ 是
轮次 2: 自动获取当前源码 + 错误信息 → 反馈给 LLM → 修复代码
         ↓
      再次 refresh 验证
         ↓
     通过 ✓ → 结束步骤
```

对应的代码逻辑：

```typescript
// 代码应用后自动验证
if (step.type === 'tool_call' && execResult.success) {
  if (
    parsed.tool.action === 'refresh' &&
    typeof execResult.result === 'string'
  ) {
    // refresh 返回字符串 = 有运行时错误
    ctx.nextPrompt = `O: refresh 检测到运行时错误
      错误信息: ${execResult.result}
      当前文件源码: ... 
      请根据上述错误和源码修复代码。`;
    continue; // 进入下一轮修复
  }
}
```

这个机制把 AI 代码生成从「一锤子买卖」变成了「迭代优化」，**大幅降低了人工介入频率**。

---

## 数据模型升级：从扁平到分层

旧版的数据模型是扁平的 `AIChat[]` 列表：

```typescript
// 旧版：所有消息平铺在一起
chats: AIChat[]  // [{ role: 'user', content }, { role: 'ai', content }, ...]
```

新版引入了 **对话轮次（ConversationRound）** 的概念，每个轮次是一个完整的「规划→执行→总结」单元：

```typescript
// 新版：分层结构
interface ConversationRound {
  id: string;
  userMessage: string;

  // Architect 阶段
  architectPlan: PlanResult | null; // { intent, safety, steps[] }
  architectStreamText: string;
  reasoningText: string;

  // Editor 阶段
  editorResults: EditorStepResult[]; // 每步含多轮 turns

  // Summary 阶段
  summaryText: string;
  summaryError: string;
}
```

这使得用户可以清晰看到一个任务被拆成了哪些步骤、每步的执行结果如何、哪里出错了。

历史会话回显时，`useReplayChat` 会自动将后端返回的扁平 `ChatRecord[]` 重建为分层结构——前端不依赖后端改造，完全在客户端完成数据重组。

---

## 审批流程：给 AI 戴上「缰绳」

新版增加了一个 **人工审批环节**，在执行高风险操作前等待用户确认：

```typescript
// 审批机制
const approvalResolvers = new Map<string, (approved: boolean) => void>();

const requestApproval = (id: string) =>
  autoApprove.value
    ? Promise.resolve(true)
    : new Promise<boolean>((resolve) => approvalResolvers.set(id, resolve));

// 用户操作
const resolveApproval = (id: string, approved: boolean) => {
  approvalResolvers.get(id)?.(approved);
  approvalResolvers.delete(id);
};
```

支持「自动审批」模式（`autoApprove`）一键跳过，也支持逐条确认。当用户关闭面板时，所有未处理的审批自动拒绝。

---

## 其他值得注意的改进

| 功能     | 旧版         | 新版                                                      |
| -------- | ------------ | --------------------------------------------------------- |
| 对话导出 | ❌           | ✅ 支持 JSON 导出，含完整的 Architect/Editor/Summary 数据 |
| 取消机制 | 简单 abort   | `AbortController` 级联取消（流程编排 + SSE 流）           |
| 状态反馈 | 无           | 带 spinner 动画的状态栏 + 行内重试按钮                    |
| 错误重试 | 无           | 支持重试最后一轮失败的 Architect 规划                     |
| 组件清理 | 无           | `onUnmounted` 中清理 abort、审批器、文件缓存              |
| 文件识别 | 内嵌在 useAI | 独立 `useFileRecognition` composable，结果拼入 prompt     |

---

## 代价与取舍

没有任何重构是零成本的。这次升级也带来了一些代价：

**1. 代码量大幅增加**
从 ~300 行主文件 + ~650 行 Hook = ~950 行核心逻辑，增长到 ~677 行主文件 + 10 个 composable（总计约 2500 行）。但增加的代码大多是可复用、可测试的模块，属于「好的复杂度」。

**2. 学习曲线上升**
新人对「双代理 + DI」模式需要时间消化。我们通过完善的 TypeScript 类型定义（`types/agent.ts` 345 行）来降低理解门槛。

**3. 文件上传方式的变化**
旧版将图片/JSON 上传作为独立的 Topic 创建流程（`onPostImageTopic`、`onPostJsonTopic`），入口分散在「新建话题」页面上。新版将这些能力统一收敛到了输入框的附件系统中——通过一个隐藏 `<input type="file">` 同时支持图片和 JSON 文件，上传后自动识别内容并拼入 prompt，不再需要单独的 Topic 类型。这样做简化了用户操作路径，但也意味着旧版的「纯图片生图」场景需要改为在 prompt 中描述需求 + 附上参考图的方式使用。

**4. 前后端格式耦合**
历史回显依赖对 prompt/content 文本格式的解析，如果后端改动格式，前端会静默失败。这是下一步需要解决的——理想方案是后端直接输出结构化数据。

---

## 经验总结：给低代码平台嵌入 AI 的一些建议

**1. 先跑通，再重构，但重构要趁早。**
旧版的「一把梭」模式帮我们快速验证了 PMF，但当复杂度越过某个阈值后，架构债会让每次迭代都寸步难行。

**2. 给 AI 一个「计划-执行-验证」的闭环。**
单纯的「输入 → 输出」不够可靠。让 LLM 先规划、再执行、最后自动验证，能大幅提升生成质量。

**3. 审批不是可选项，是必选项。**
在低代码场景中，AI 生成代码直接应用到项目是高风险操作。即使是「自动审批」模式，也要保留随时切换为手动的能力。

**4. 依赖注入在前端同样重要。**
Vue Composable 很容易写成「隐式依赖全局状态」的大杂烩。显式定义接口、通过参数注入依赖，能让代码的测试性和可维护性提升一个量级。

**5. Types First。**
345 行的类型定义文件（`types/agent.ts`）是新版质量的基石。先设计数据结构，再写实现逻辑，能避免大量运行时类型错误。

---

## 最后

这次重构的核心价值不在于代码行数的增加或减少，而在于**将 AI 智能体的执行过程从「黑盒」变成了「白盒」**。用户可以看见每一个规划步骤、每一次工具调用、每一处错误修复，这让 AI 不再是一个「魔法按钮」，而是一个真正可理解、可协作的开发伙伴。

如果你也在低代码平台或其他工具型产品中嵌入 AI 能力，希望这篇文章能给你一些参考。

> 项目地址：[https://gitee.com/aitrade/vtj](https://gitee.com/aitrade/vtj)

# AGENTS.md

本文件适用于整个仓库。若子目录以后增加了更具体的 `AGENTS.md`，以距离目标文件最近的说明为准。

## 项目概览

VTJ.PRO 是基于 Vue 3、TypeScript 和 Vite 的 AI 低代码引擎，核心能力包括 DSL 与 Vue SFC 双向转换、设计器、渲染器和多端应用输出。本仓库是 pnpm workspace，由 Nx 驱动 Lerna 处理包间依赖和批量任务。

- `packages/`：可发布的基础库、核心模型、解析/生成、渲染、设计器、UI 等 `@vtj/*` 包。
- `platforms/`：Web、H5、UniApp 及 PRO 平台集成包。
- `apps/`：应用、H5、UniApp、插件、物料等示例或交付工程。
- `dev/`：主要的本地联调入口。
- `create-vtj/`：项目脚手架及模板。
- `docs/`：VitePress 文档站和项目文档。
- `scripts/`：仓库维护、同步和发布辅助脚本。

优先在已有包和既有模式中完成修改，不新增重复工具、抽象层或依赖。跨包引用使用包名和已有公开导出，不要通过相对路径穿透其他包的 `src`。

## 环境与依赖

- Node.js 必须为 20 或更高版本。
- 使用仓库声明的 pnpm；不要生成或提交 `package-lock.json`、`yarn.lock`。
- 首次安装可运行 `pnpm run setup`；依赖已就绪时不要重复安装。
- 新增内部依赖使用 `workspace:~` 或目标包已有的 workspace 范围，并同步更新对应 `package.json`。
- 只有需求确实需要时才修改依赖；修改依赖后更新 `pnpm-lock.yaml`。

## 开发命令

从仓库根目录运行：

```sh
pnpm run dev                 # dev/ Web 联调环境
pnpm run dev:uni             # dev/ UniApp 联调环境
pnpm run app:dev             # apps/app
pnpm run docs:dev            # 文档站
pnpm run build               # 构建所有非 private 包，耗时较长
pnpm run test                # 测试所有非 private 包
pnpm run test:all            # 包含 private workspace 的完整测试
```

日常修改优先做定向验证，避免无必要地运行全仓任务：

```sh
pnpm --filter @vtj/core test
pnpm --filter @vtj/designer exec vitest run tests/useOpenApi.test.ts
pnpm --filter @vtj/parser build
pnpm --filter vtj-plugin test
```

包名以对应目录的 `package.json#name` 为准。根目录没有统一的 lint 脚本，不要声称执行过 lint；可使用现有 Prettier 配置检查或格式化本次改动文件。

## 代码约定

- 遵循 `.editorconfig` 和 `.prettierrc`：2 空格、单引号、分号、LF、80 列、无尾随逗号。
- TypeScript 保持类型明确，优先复用仓库已有类型；避免 `any`、无必要的类型断言和重复协议定义。
- Vue 组件沿用相邻文件结构和命名；当前代码通常使用 Vue 3 Composition API 与 TypeScript。
- 可复用公共能力放在所属包内，并从该包的 `src/index.ts` 或既有分层入口导出；不要为了单一调用创建公共抽象。
- 保持 workspace 依赖方向与对应 `package.json` 一致。新增跨包 import 时，确认已声明依赖。
- 用户可见文案保持现有语言和术语；不要顺手大范围改写无关文案或格式。
- 不做无关重构，不覆盖工作区中已有的用户修改。

## 测试与验收

- 测试使用 Vitest，通常位于各 workspace 的 `tests/` 下，文件名沿用 `.test.ts` 或 `.spec.ts`。
- 修改行为或修复缺陷时，在所属包添加或更新最小回归测试，优先覆盖根因和边界条件。
- Vue/DOM 测试沿用对应包的 Vitest 配置和现有 `tests/setup.ts`，不要另建测试框架。
- 至少运行受影响包的定向测试；涉及公开导出、类型、构建配置或跨包依赖时，再运行受影响包的 `build`。
- 跨多个基础包的改动应按需运行 `pnpm run test` 和 `pnpm run build`。若因耗时或环境限制未运行，交付时明确说明。
- 报告验证结果时列出实际执行的命令和失败原因，不把既有失败描述为本次修改已通过。

## 生成物与高风险命令

不要手工修改或提交构建/缓存产物，包括 `node_modules/`、`dist/`、`types/`、`temp/`、`coverage/`、`.nx/`、`docs/dist/` 及忽略规则中列出的生成目录。

`CHANGELOG.md`、各包 `src/version.ts` 和发布版本通常由 Lerna 发布流程维护；除非任务明确要求发布或改版本，否则不要修改。不要自行运行以下会清理、批量改写、提交、推送或发布的脚本：

- `clean`、`reset`、`update`、`sync`
- `ci`、`commit`
- `prerelease`、`patch`、`minor`、`publish`

不要提交密钥、令牌、私有服务地址或本地环境文件。涉及网络、文件写入、代码执行和 AI 工具调用时，保留现有校验、错误处理与审批边界。

## 提交与交付

- 除非用户明确要求，不创建提交、不推送、不发布。
- 提交信息遵循 Conventional Commits，例如 `fix(parser): 修复数据源解析`、`feat(agent): 支持附件预览`。
- 最终交付说明应包含：修改内容、影响范围、已执行的验证、未验证项或已知风险。

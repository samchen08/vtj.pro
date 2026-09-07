import type { BackendModelSchema } from './model';

export * from './model';

/**
 * 后端模型协议 v1，与 ProjectSchema 并列。
 * 应用、环境、草稿 revision 与发布状态由平台管理，不嵌入协议。
 * 首期仅声明模型 CRUD，不支持自定义代码 API、SQL 或执行钩子。
 * 类型不代替运行时校验，未知版本和属性须由服务端拒绝。
 */
export interface BackendSchema {
  dslVersion: '1.0';
  models: BackendModelSchema[];
}

/** 模型编辑器和 AI 共用的校验诊断，不包含内部 SQL 或凭据。 */
export interface BackendDiagnostic {
  code: string;
  /** JSON Pointer，例如 /models/0/fields/1/default。 */
  path: string;
  message: string;
  severity: 'error' | 'warning';
  modelId?: string;
  fieldId?: string;
}

/** 成功时返回规范化协议；失败时不能消费 normalized 或 schemaHash。 */
export type BackendValidationResult =
  | {
      valid: true;
      diagnostics: BackendDiagnostic[];
      truncated: boolean;
      normalized: BackendSchema;
      schemaHash: string;
    }
  | {
      valid: false;
      diagnostics: BackendDiagnostic[];
      truncated: boolean;
      normalized?: never;
      schemaHash?: never;
    };

import type { Engine } from '../../../../framework';
import type { PlanStep } from '../types/agent';

export interface DirectToolCall {
  action: string;
  parameters: unknown[];
}

const NO_PARAM_TOOLS = new Set([
  'getPages',
  'getMenus',
  'getBlocks',
  'getCurrentFile',
  'getCurrentFileContent',
  'getGlobalBeforeEach',
  'getGlobalAfterEach',
  'refresh'
]);

const DIRECT_TOOLS = new Set([
  ...NO_PARAM_TOOLS,
  'getSkills',
  'active',
  'createPage',
  'createBlock'
]);

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validNamedFile(value: unknown): value is Record<string, unknown> {
  return isObject(value) && hasText(value.name) && hasText(value.title);
}

/**
 * 仅返回可安全直调的高频工具。任何不确定参数都会回退原 Editor 流程。
 */
export function getDirectToolCall(
  step: PlanStep,
  engine: Engine | null
): DirectToolCall | null {
  const action = step.toolName;
  if (
    step.type !== 'tool_call' ||
    !action ||
    !DIRECT_TOOLS.has(action) ||
    !engine?.toolRegistry.get(action)
  ) {
    return null;
  }

  const parameters = step.parameters;
  if (NO_PARAM_TOOLS.has(action)) {
    return !parameters || parameters.length === 0
      ? { action, parameters: [] }
      : null;
  }
  if (!Array.isArray(parameters)) return null;

  if (action === 'getSkills') {
    return parameters.length > 0 && parameters.every(hasText)
      ? { action, parameters }
      : null;
  }

  if (action === 'active') {
    const id = parameters[0];
    return parameters.length === 1 &&
      hasText(id) &&
      engine.project.value?.getFile(id)
      ? { action, parameters }
      : null;
  }

  if (action === 'createBlock') {
    return parameters.length === 1 && validNamedFile(parameters[0])
      ? { action, parameters }
      : null;
  }

  if (action === 'createPage') {
    if (
      parameters.length < 1 ||
      parameters.length > 2 ||
      !validNamedFile(parameters[0])
    ) {
      return null;
    }
    const parentId = parameters[1] || parameters[0].parentId;
    if (parentId !== undefined) {
      if (!hasText(parentId) || !engine.project.value?.getFile(parentId)) {
        return null;
      }
    }
    return { action, parameters };
  }

  return null;
}

function stableJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableJson);
  if (!isObject(value)) return value;
  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      result[key] = stableJson(value[key]);
      return result;
    }, {});
}

export function isSameToolCall(
  planned: DirectToolCall,
  action: string,
  parameters: unknown[]
): boolean {
  return (
    planned.action === action &&
    JSON.stringify(stableJson(planned.parameters)) ===
      JSON.stringify(stableJson(parameters))
  );
}

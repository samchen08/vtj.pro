import { describe, expect, it } from 'vitest';
import {
  bindActiveParameters,
  getDirectToolCall,
  isSameToolCall,
  resolveStepReferences,
  validatePlannedToolParameters,
  validateToolParameters
} from '../../src/components/widgets/agent/utils/directTool';

const stringParameter = {
  name: 'id',
  type: 'string',
  required: true
};

const toolParameters: Record<string, any[]> = {
  getSkills: [{ ...stringParameter, rest: true }],
  active: [stringParameter],
  refresh: [],
  removePage: [stringParameter],
  removeBlock: [stringParameter],
  createPage: [
    {
      name: 'page',
      type: 'object',
      required: true,
      properties: {
        name: { type: 'string', required: true },
        title: { type: 'string', required: true }
      }
    },
    { name: 'parentId', type: 'string' }
  ],
  createBlock: [
    {
      name: 'block',
      type: 'object',
      required: true,
      properties: {
        name: { type: 'string', required: true },
        title: { type: 'string', required: true }
      }
    }
  ],
  setCustom: [
    {
      name: 'config',
      type: 'object',
      required: true,
      properties: {
        mode: {
          type: 'string',
          required: true,
          enum: ['safe', 'fast']
        }
      }
    }
  ]
};

function engine(files: string[] = []) {
  return {
    toolRegistry: {
      get: (name: string) =>
        toolParameters[name]
          ? { name, parameters: toolParameters[name] }
          : undefined
    },
    project: {
      value: {
        getFile: (id: string) => (files.includes(id) ? { id } : null),
        getPage: (id: string) => (files.includes(id) ? { id } : null),
        getBlock: (id: string) => (files.includes(id) ? { id } : null)
      }
    }
  } as any;
}

describe('directTool', () => {
  it('从唯一的直接创建依赖绑定 active 参数', () => {
    const step = {
      id: '2',
      type: 'tool_call' as const,
      description: '',
      toolName: 'active',
      dependsOn: ['1']
    };
    const results = [
      {
        step: { id: '1' },
        done: true,
        error: null,
        turns: [
          {
            toolAction: 'createBlock',
            toolResult: {
              success: true,
              result: { id: 'created' }
            }
          }
        ]
      }
    ] as any;

    expect(bindActiveParameters(step, results, engine(['created']))).toEqual({
      ...step,
      parameters: ['created']
    });
  });

  it('创建结果不明确或文件不存在时不绑定', () => {
    const step = {
      id: '3',
      type: 'tool_call' as const,
      description: '',
      toolName: 'active',
      dependsOn: ['1', '2']
    };
    const result = (id: string, stepId: string) => ({
      step: { id: stepId },
      done: true,
      error: null,
      turns: [
        {
          toolAction: 'createPage',
          toolResult: { success: true, result: { id } }
        }
      ]
    });

    expect(
      bindActiveParameters(
        step,
        [result('page-1', '1'), result('page-2', '2')] as any,
        engine(['page-1', 'page-2'])
      )
    ).toBe(step);
    const unbound = bindActiveParameters(
      { ...step, dependsOn: ['1'] },
      [result('missing', '1')] as any,
      engine()
    );
    expect(unbound).not.toHaveProperty('parameters');
    expect(getDirectToolCall(unbound, engine())).toBeNull();
  });

  it('解析前置步骤工具结果引用', () => {
    const step = {
      id: '2',
      type: 'tool_call' as const,
      description: '',
      toolName: 'createPage',
      parameters: [
        { name: 'Dashboard', title: '仪表盘' },
        { $ref: { stepId: '1', path: 'result.id' } }
      ],
      dependsOn: ['1']
    };
    const results = [
      {
        step: { id: '1' },
        done: true,
        error: null,
        turns: [
          {
            toolResult: { success: true, result: { id: 'layout-1' } }
          }
        ]
      }
    ] as any;

    expect(resolveStepReferences(step, results).parameters).toEqual([
      { name: 'Dashboard', title: '仪表盘' },
      'layout-1'
    ]);
    expect(() => resolveStepReferences(step, [])).toThrow(
      '无法解析步骤结果引用'
    );
  });

  it('计划校验接受符合参数类型的步骤结果引用', () => {
    expect(
      validatePlannedToolParameters(
        [
          { name: 'Dashboard', title: '仪表盘' },
          { $ref: { stepId: '1', path: 'result.id' } }
        ],
        toolParameters.createPage
      )
    ).toBe(true);
    expect(
      validatePlannedToolParameters(
        [
          { name: 'Dashboard', title: '仪表盘' },
          { $ref: { stepId: '1', path: 'result.__proto__' } }
        ],
        toolParameters.createPage
      )
    ).toBe(false);
  });

  it('接受高频工具的确定参数', () => {
    expect(
      getDirectToolCall(
        {
          id: '1',
          type: 'tool_call',
          description: '',
          toolName: 'getSkills',
          parameters: ['tools', 'page']
        },
        engine()
      )
    ).toEqual({ action: 'getSkills', parameters: ['tools', 'page'] });

    expect(
      getDirectToolCall(
        {
          id: '2',
          type: 'tool_call',
          description: '',
          toolName: 'refresh'
        },
        engine()
      )
    ).toEqual({ action: 'refresh', parameters: [] });
  });

  it('删除工具参数明确且符合 Schema 时允许直调', () => {
    const removePage = {
      id: '1',
      type: 'tool_call' as const,
      description: '',
      toolName: 'removePage',
      parameters: ['page-1']
    };
    const removeBlock = {
      ...removePage,
      toolName: 'removeBlock',
      parameters: ['block-1']
    };

    expect(getDirectToolCall(removePage, engine(['page-1']))).toEqual({
      action: 'removePage',
      parameters: ['page-1']
    });
    expect(getDirectToolCall(removeBlock, engine(['block-1']))).toEqual({
      action: 'removeBlock',
      parameters: ['block-1']
    });
    expect(
      getDirectToolCall({ ...removePage, parameters: [1] }, engine())
    ).toBeNull();
  });

  it('参数缺失或类型不匹配时拒绝直调', () => {
    expect(
      getDirectToolCall(
        {
          id: '1',
          type: 'tool_call',
          description: '',
          toolName: 'active',
          parameters: [123]
        },
        engine()
      )
    ).toBeNull();

    expect(
      getDirectToolCall(
        {
          id: '2',
          type: 'tool_call',
          description: '',
          toolName: 'createPage',
          parameters: [{ name: 'Home' }]
        },
        engine()
      )
    ).toBeNull();
  });

  it('不依赖名称白名单并忽略对象键顺序差异', () => {
    const call = getDirectToolCall(
      {
        id: '1',
        type: 'tool_call',
        description: '',
        toolName: 'setCustom',
        parameters: [{ mode: 'safe' }]
      },
      engine()
    );
    expect(call).not.toBeNull();
    expect(isSameToolCall(call!, 'setCustom', [{ mode: 'safe' }])).toBe(true);
    expect(
      getDirectToolCall(
        {
          id: '2',
          type: 'tool_call',
          description: '',
          toolName: 'setCustom',
          parameters: [{ mode: 'invalid' }]
        },
        engine()
      )
    ).toBeNull();
  });

  it('支持数组元素和可变位置参数校验', () => {
    expect(
      validateToolParameters(['tools', 'page'], toolParameters.getSkills)
    ).toBe(true);
    expect(validateToolParameters([], toolParameters.getSkills)).toBe(false);
    expect(
      validateToolParameters(
        [['a', 'b']],
        [
          {
            name: 'items',
            type: 'array',
            required: true,
            items: { type: 'string', required: true }
          }
        ]
      )
    ).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { ToolRegistry } from '../../src/framework';
import {
  parsePlanOutput,
  validatePlan
} from '../../src/components/widgets/agent/utils/plan';

describe('parsePlanOutput', () => {
  it('将服务端协议步骤类型 code 归一化为 vue_code', () => {
    const { plan } = parsePlanOutput(
      JSON.stringify({
        intent: '更新页面',
        safety: 'write',
        steps: [
          { id: 's1', type: 'code', description: '生成代码' },
          { id: 's2', type: 'text', description: '说明' }
        ]
      })
    );
    expect(plan?.steps[0].type).toBe('vue_code');
    expect(plan?.steps[1].type).toBe('text');
  });

  it('透传服务端协议字段 dependsOn 与 contextKeys', () => {
    const { plan } = parsePlanOutput(
      JSON.stringify({
        intent: '更新页面',
        safety: 'write',
        contextKeys: ['page:home'],
        steps: [
          {
            id: 's1',
            type: 'tool_call',
            description: '读取页面',
            dependsOn: [],
            toolName: 'getPage',
            parameters: []
          },
          { id: 's2', type: 'vue_code', description: '写入', dependsOn: ['s1'] }
        ]
      })
    );
    expect(plan?.contextKeys).toEqual(['page:home']);
    expect(plan?.steps[1].dependsOn).toEqual(['s1']);
  });

  it('自动补全步骤结果引用对应的直接依赖', () => {
    const { plan, issues } = parsePlanOutput(
      JSON.stringify({
        intent: '设置主页',
        safety: 'write',
        steps: [
          { id: 'create', type: 'text', description: '创建页面' },
          {
            id: 'refresh',
            type: 'text',
            description: '检查页面',
            dependsOn: ['create']
          },
          {
            id: 'homepage',
            type: 'tool_call',
            description: '设置主页',
            toolName: 'setHomepage',
            parameters: [{ $ref: { stepId: 'create', path: 'result.id' } }],
            dependsOn: ['refresh']
          }
        ]
      })
    );

    expect(issues).toBeUndefined();
    expect(plan?.steps[2].dependsOn).toEqual(['refresh', 'create']);
  });

  it('根据工具定义为多个无参数调用补全空数组', () => {
    const registry = new ToolRegistry();
    registry.register({
      name: 'refresh',
      description: '刷新预览',
      parameters: [],
      handler: async () => true
    });
    const { plan, issues } = parsePlanOutput(
      JSON.stringify({
        intent: '检查多个区块',
        safety: 'write',
        steps: Array.from({ length: 5 }, (_, index) => ({
          id: `refresh_${index + 1}`,
          type: 'tool_call',
          description: `检查区块 ${index + 1}`,
          toolName: 'refresh'
        }))
      }),
      registry
    );

    expect(issues).toBeUndefined();
    expect(plan?.steps.map((step) => step.parameters)).toEqual([
      [],
      [],
      [],
      [],
      []
    ]);
  });

  it('有参工具缺少参数仍失败，并为重试保留全部错误', () => {
    const registry = new ToolRegistry();
    registry.register({
      name: 'createPage',
      description: '创建页面',
      parameters: [{ name: 'page', type: 'object', required: true }],
      handler: async () => true
    });
    const result = parsePlanOutput(
      JSON.stringify({
        intent: '创建多个页面',
        safety: 'write',
        steps: Array.from({ length: 5 }, (_, index) => ({
          id: `create_${index + 1}`,
          type: 'tool_call',
          description: `创建页面 ${index + 1}`,
          toolName: 'createPage'
        }))
      }),
      registry
    );

    expect(result.plan).toBeNull();
    expect(result.error).toContain('steps[2].parameters');
    expect(result.error).not.toContain('steps[3].parameters');
    expect(result.correction).toContain('steps[4].parameters');
  });

  it.each([null, {}])('不修复非法 parameters: %j', (parameters) => {
    const registry = new ToolRegistry();
    registry.register({
      name: 'refresh',
      description: '刷新预览',
      parameters: [],
      handler: async () => true
    });
    const result = parsePlanOutput(
      JSON.stringify({
        intent: '检查页面',
        safety: 'write',
        steps: [
          {
            id: 'refresh',
            type: 'tool_call',
            description: '刷新预览',
            toolName: 'refresh',
            parameters
          }
        ]
      }),
      registry
    );

    expect(result.plan).toBeNull();
    expect(result.issues?.map((issue) => issue.message)).toContain(
      '必须是数组'
    );
  });

  it('不掩盖非数组 dependsOn 校验错误', () => {
    const { plan, issues } = parsePlanOutput(
      JSON.stringify({
        intent: '设置主页',
        safety: 'write',
        steps: [
          { id: 'create', type: 'text', description: '创建页面' },
          {
            id: 'homepage',
            type: 'tool_call',
            description: '设置主页',
            toolName: 'setHomepage',
            parameters: [{ $ref: { stepId: 'create', path: 'result.id' } }],
            dependsOn: 'create'
          }
        ]
      })
    );

    expect(plan).toBeNull();
    expect(issues?.map((issue) => issue.message)).toContain('必须是数组');
  });

  it('直接回答（answer）保留其余字段', () => {
    const { plan } = parsePlanOutput(
      JSON.stringify({
        answer: '无需改动',
        intent: '检查',
        safety: 'readonly',
        steps: []
      })
    );
    expect(plan?.answer).toBe('无需改动');
    expect(plan?.intent).toBe('检查');
    expect(plan?.steps).toEqual([]);
  });

  it('模型自报错误返回 error 而非 plan', () => {
    const { plan, error } = parsePlanOutput('{"error":"缺少页面信息"}');
    expect(plan).toBeNull();
    expect(error).toBe('缺少页面信息');
  });

  it('解析规划前只读上下文请求', () => {
    const result = parsePlanOutput(
      JSON.stringify({
        needsContext: {
          skills: ['tools', 'page'],
          queries: ['getMenus']
        }
      })
    );
    expect(result.plan).toBeNull();
    expect(result.preflight).toEqual({
      skills: ['tools', 'page'],
      queries: ['getMenus']
    });
  });

  it('空白或非 JSON 输出返回空 plan', () => {
    expect(parsePlanOutput('')).toEqual({ plan: null });
    expect(parsePlanOutput('随便说说')).toEqual({ plan: null });
  });

  it('拒绝重复步骤、失效依赖和循环依赖', () => {
    const { plan, issues } = parsePlanOutput(
      JSON.stringify({
        intent: '更新页面',
        safety: 'write',
        steps: [
          {
            id: 's1',
            type: 'text',
            description: '第一步',
            dependsOn: ['s2']
          },
          {
            id: 's1',
            type: 'text',
            description: '第二步',
            dependsOn: ['missing']
          },
          {
            id: 's2',
            type: 'text',
            description: '第三步',
            dependsOn: ['s3']
          },
          {
            id: 's3',
            type: 'text',
            description: '第四步',
            dependsOn: ['s2']
          }
        ]
      })
    );
    expect(plan).toBeNull();
    expect(issues?.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        '步骤 ID 重复',
        '引用了不存在的步骤 missing',
        '步骤依赖存在循环'
      ])
    );
  });

  it('按注册工具校验工具名、参数和安全等级', () => {
    const registry = new ToolRegistry();
    registry.register({
      name: 'removePage',
      description: '删除页面',
      risk: 'destructive',
      parameters: [{ name: 'id', type: 'string', required: true }],
      handler: async () => true
    });
    const result = parsePlanOutput(
      JSON.stringify({
        intent: '删除页面',
        safety: 'write',
        steps: [
          {
            id: 's1',
            type: 'tool_call',
            description: '删除',
            toolName: 'removePage',
            parameters: [1]
          }
        ]
      }),
      registry
    );
    expect(result.plan).toBeNull();
    expect(result.issues?.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        '参数不符合工具定义',
        '破坏性工具必须标记 destructive'
      ])
    );
  });

  it('允许 active 从唯一创建依赖绑定运行时 ID', () => {
    const registry = new ToolRegistry();
    registry.register({
      name: 'createBlock',
      description: '创建区块',
      parameters: [{ name: 'block', type: 'object', required: true }],
      handler: async () => true
    });
    registry.register({
      name: 'active',
      description: '打开文件',
      parameters: [{ name: 'id', type: 'string', required: true }],
      handler: async () => true
    });
    const base = {
      intent: '创建区块',
      safety: 'write' as const,
      steps: [
        {
          id: 'create',
          type: 'tool_call' as const,
          description: '创建',
          toolName: 'createBlock',
          parameters: [{ name: 'Card' }]
        },
        {
          id: 'open',
          type: 'tool_call' as const,
          description: '打开',
          toolName: 'active',
          parameters: [],
          dependsOn: ['create']
        }
      ]
    };

    expect(validatePlan(base, registry)).toEqual([]);
    expect(
      validatePlan(
        {
          ...base,
          steps: [{ ...base.steps[1], dependsOn: [] }]
        },
        registry
      ).map((issue) => issue.message)
    ).toContain('参数不符合工具定义');
  });

  it('拒绝不存在的工具和 target 模板占位符', () => {
    const registry = new ToolRegistry();
    const issues = validatePlan(
      {
        intent: '更新页面',
        safety: 'write',
        steps: [
          {
            id: 's1',
            type: 'tool_call',
            description: '调用工具',
            toolName: 'missing',
            target: '{{step_0.id}}'
          }
        ]
      },
      registry
    );
    expect(issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining(['工具不存在', '不能使用模板占位符'])
    );
  });

  it('要求子页面使用父步骤结果并验证页面树', () => {
    const registry = new ToolRegistry();
    registry.register({
      name: 'createPage',
      description: '创建页面',
      parameters: [
        { name: 'page', type: 'object', required: true },
        { name: 'parentId', type: 'string' }
      ],
      handler: async () => true
    });
    registry.register({
      name: 'getPageTreeValidation',
      description: '验证页面树',
      parameters: [
        { name: 'parentId', type: 'string', required: true },
        {
          name: 'childIds',
          type: 'array',
          required: true,
          items: { type: 'string', required: true }
        }
      ],
      handler: async () => true
    });
    const ref = (stepId: string) => ({
      $ref: { stepId, path: 'result.id' }
    });
    const plan = {
      intent: '创建嵌套页面',
      safety: 'write' as const,
      steps: [
        {
          id: 'layout',
          type: 'tool_call' as const,
          description: '创建布局',
          toolName: 'createPage',
          parameters: [{ name: 'MainLayout', title: '主布局' }]
        },
        {
          id: 'dashboard',
          type: 'tool_call' as const,
          description: '创建 Dashboard 子页面',
          toolName: 'createPage',
          parameters: [{ name: 'Dashboard', title: '仪表盘' }, ref('layout')],
          dependsOn: ['layout']
        },
        {
          id: 'verify',
          type: 'tool_call' as const,
          description: '验证页面树',
          toolName: 'getPageTreeValidation',
          parameters: [ref('layout'), [ref('dashboard')]],
          dependsOn: ['layout', 'dashboard']
        }
      ]
    };

    expect(validatePlan(plan, registry)).toEqual([]);
    expect(
      validatePlan({ ...plan, steps: plan.steps.slice(0, 2) }, registry).map(
        (issue) => issue.message
      )
    ).toContain('创建嵌套页面后必须调用 getPageTreeValidation 验证页面树');
  });
});

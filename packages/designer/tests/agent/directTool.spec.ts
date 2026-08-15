import { describe, expect, it } from 'vitest';
import {
  getDirectToolCall,
  isSameToolCall
} from '../../src/components/widgets/agent/utils/directTool';

function engine(files: string[] = []) {
  return {
    toolRegistry: {
      get: (name: string) =>
        [
          'getSkills',
          'active',
          'refresh',
          'createPage',
          'createBlock'
        ].includes(name)
          ? {}
          : undefined
    },
    project: {
      value: {
        getFile: (id: string) => (files.includes(id) ? { id } : null)
      }
    }
  } as any;
}

describe('directTool', () => {
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

  it('实体或参数不确定时拒绝直调', () => {
    expect(
      getDirectToolCall(
        {
          id: '1',
          type: 'tool_call',
          description: '',
          toolName: 'active',
          parameters: ['missing']
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

  it('校验 createPage 父页面并忽略对象键顺序差异', () => {
    const call = getDirectToolCall(
      {
        id: '1',
        type: 'tool_call',
        description: '',
        toolName: 'createPage',
        parameters: [{ title: '首页', name: 'Home' }, 'parent']
      },
      engine(['parent'])
    );
    expect(call).not.toBeNull();
    expect(
      isSameToolCall(call!, 'createPage', [
        { name: 'Home', title: '首页' },
        'parent'
      ])
    ).toBe(true);
  });
});

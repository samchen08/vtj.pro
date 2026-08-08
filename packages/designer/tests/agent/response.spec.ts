import { describe, it, expect } from 'vitest';
import {
  unwrapOpenApi,
  pickChat,
  pickTopic
} from '../../src/components/widgets/agent/utils/response';

describe('unwrapOpenApi', () => {
  it('code=0 时返回 data 字段', () => {
    expect(unwrapOpenApi({ code: 0, data: { id: 'x' } })).toEqual({ id: 'x' });
  });

  it('code="0" 字符串时返回 data 字段', () => {
    expect(unwrapOpenApi({ code: '0', data: [1] })).toEqual([1]);
  });

  it('无 code 字段时返回 data 或整体', () => {
    expect(unwrapOpenApi({ data: 'v' })).toBe('v');
    expect(unwrapOpenApi('raw')).toBe('raw');
  });

  it('非零 code 时抛错并携带 message/status', () => {
    try {
      unwrapOpenApi({ code: 500, message: '服务器错误', status: 500 });
      expect.unreachable();
    } catch (e: any) {
      expect(e.message).toContain('服务器错误');
      expect(e.status).toBe(500);
    }
  });

  it('success=false 时抛错', () => {
    expect(() => unwrapOpenApi({ success: false, message: '失败' })).toThrow(
      '失败'
    );
  });
});

describe('pickChat', () => {
  it('优先取包裹的 chat 字段', () => {
    const res = pickChat({ chat: { id: 'c1' }, extra: 1 });
    expect(res.chat).toEqual({ id: 'c1' });
    expect(res.chatId).toBe('c1');
  });

  it('无包裹字段时回退整包', () => {
    const res = pickChat({ id: 'c1' });
    expect(res.chat).toEqual({ id: 'c1' });
    expect(res.chatId).toBe('c1');
  });

  it('兼容 chatId 双命名', () => {
    expect(pickChat({ chat: { chatId: 'c2' } }).chatId).toBe('c2');
    expect(pickChat({ chatId: 'c3' }).chatId).toBe('c3');
  });

  it('空响应返回空 chatId', () => {
    expect(pickChat(null).chatId).toBe('');
    expect(pickChat(undefined).chatId).toBe('');
  });
});

describe('pickTopic', () => {
  it('提取 topic/chat 全字段', () => {
    const res = pickTopic({
      topic: { id: 't1', userId: 'u1' },
      chat: { id: 'c1' }
    });
    expect(res.topicId).toBe('t1');
    expect(res.userId).toBe('u1');
    expect(res.chatId).toBe('c1');
    expect(res.chat).toEqual({ id: 'c1' });
  });

  it('兼容裸 topic 响应与 topicId 双命名', () => {
    const res = pickTopic({ id: 't1', topicId: 'T1', userId: 'u1' });
    expect(res.topicId).toBe('t1');
    expect(res.userId).toBe('u1');
    expect(res.chat).toBeNull();
    expect(res.chatId).toBe('');
  });

  it('无 chat 字段时不误取 topic.id 作为 chatId', () => {
    const res = pickTopic({ topic: { id: 't1' } });
    expect(res.topicId).toBe('t1');
    expect(res.chatId).toBe('');
  });

  it('id 缺失时回退 topicId', () => {
    expect(pickTopic({ topicId: 'T2' }).topicId).toBe('T2');
  });
});

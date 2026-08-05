import { describe, expect, it, vi } from 'vitest';
import { useAuth } from '../src/components/widgets/agent/composables/useAuth';

describe('useAuth', () => {
  it('initializes token, model and existingTopicId with defaults', () => {
    const { token, model, existingTopicId } = useAuth(() => undefined);
    expect(token.value).toBe('');
    expect(model.value).toBe('auto');
    expect(existingTopicId.value).toBe('');
  });

  it('initializes token from the getToken provider via initToken', () => {
    const { token, initToken } = useAuth(() => 'token-abc');
    initToken();
    expect(token.value).toBe('token-abc');
  });

  it('falls back to empty string when getToken returns undefined', () => {
    const { token } = useAuth(() => undefined);
    expect(token.value).toBe('');
  });

  it('calls initToken to refresh token from provider', () => {
    let current = 'first';
    const getToken = vi.fn(() => current);
    const { token, initToken } = useAuth(getToken);
    initToken();
    expect(token.value).toBe('first');
    current = 'second';
    initToken();
    expect(token.value).toBe('second');
    expect(getToken).toHaveBeenCalledTimes(2);
  });
});

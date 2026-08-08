const RETRY_DELAYS = [800, 2000];

export async function withRequestRetry<T>(
  request: () => Promise<T>
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await request();
    } catch (error: any) {
      const status = Number(error?.status);
      const retryable =
        error?.name !== 'AbortError' &&
        (error instanceof TypeError ||
          status === 408 ||
          status === 429 ||
          status >= 500);
      if (!retryable || attempt >= RETRY_DELAYS.length) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAYS[attempt] + Math.random() * 200)
      );
    }
  }
}

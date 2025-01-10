import { renderHook, waitFor, act } from '@testing-library/react';
import { useApi } from './useApi';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useApi Hook', () => {
  const mockSuccessResponse = { data: 'test data' };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise,
  } as Response);

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return loading initially', () => {
    const { result } = renderHook(() => useApi('test-endpoint'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should fetch and return data successfully', async () => {
    const { result } = renderHook(() =>
      useApi<typeof mockSuccessResponse>('test-endpoint')
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.spacexdata.com/v4/test-endpoint',
        {
          signal: expect.any(AbortSignal),
        }
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockSuccessResponse);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Network response was not ok');
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    const { result } = renderHook(() => useApi('test-endpoint'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toEqual(mockError);
    });
  });

  it('should handle network error', async () => {
    const mockNetworkError = new Error('Network Error');
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.reject(mockNetworkError)
    );

    const { result } = renderHook(() => useApi('test-endpoint'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toEqual(mockNetworkError);
    });
  });

  it('should abort fetch on unmount', async () => {
    const abortSpy = vi.fn();
    const mockAbortController = {
      signal: {},
      abort: abortSpy,
    };
    vi.spyOn(global, 'AbortController').mockImplementation(
      // @ts-expect-error mock implementation
      () => mockAbortController
    );
    const { unmount } = renderHook(() => useApi('test-endpoint'));
    act(() => {
      unmount();
    });
    expect(abortSpy).toHaveBeenCalled();
  });
});

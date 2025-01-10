import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useClickOutside from './useClickOutside';

describe('useClickOutside Hook', () => {
  it('calls handler when clicking outside the referenced element', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    renderHook(() => useClickOutside(ref, handler));

    act(() => {
      const event = new MouseEvent('click', { bubbles: true });
      document.body.dispatchEvent(event);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler when clicking inside the referenced element', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref = { current: div };
    renderHook(() => useClickOutside(ref, handler));
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it('remove event listenet on onmount', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useClickOutside(ref, handler));

    unmount();

    act(() => {
      const event = new MouseEvent('click', { bubbles: true });
      document.body.dispatchEvent(event);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('updates handler if it changes', () => {
    const initialHandler = vi.fn();
    const updatedHandler = vi.fn();
    const ref = { current: document.createElement('div') };
    const { rerender } = renderHook(
      ({ handler }) => useClickOutside(ref, handler),
      { initialProps: { handler: initialHandler } }
    );

    rerender({ handler: updatedHandler });

    act(() => {
      const event = new MouseEvent('click', { bubbles: true });
      document.body.dispatchEvent(event);
    });

    expect(initialHandler).not.toHaveBeenCalled();
    expect(updatedHandler).toHaveBeenCalledTimes(1);
  });
});

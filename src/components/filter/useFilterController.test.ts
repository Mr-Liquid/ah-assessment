import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFilterController } from './useFilterController';
import * as stateModule from '../../state';

describe('useFilterController Hook', () => {
  const mockDispatch = vi.fn();
  const mockState = {
    searchTerm: '',
    selectedYear: '',
    favorites: [],
  };

  beforeEach(() => {
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue(mockState);
    vi.spyOn(stateModule, 'useFilterStateDispatch').mockReturnValue(
      mockDispatch
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the current state and handlers', () => {
    const { result } = renderHook(() => useFilterController());

    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedYear).toBe('');
    expect(typeof result.current.onSearchHandler).toBe('function');
    expect(typeof result.current.onYearChangeHandler).toBe('function');
  });

  it('onSearchHandler should dispatch SET_SEARCH_TERM with the correct payload', () => {
    const { result } = renderHook(() => useFilterController());
    const testValue = 'Apollo 11';

    act(() => {
      result.current.onSearchHandler(testValue);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_TERM',
      payload: testValue,
    });
  });

  it('onYearChangeHandler should dispatch SET_SELECTED_YEAR with the correct payload', () => {
    const { result } = renderHook(() => useFilterController());
    const testYear = '1969';

    act(() => {
      result.current.onYearChangeHandler(testYear);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_SELECTED_YEAR',
      payload: testYear,
    });
  });
});

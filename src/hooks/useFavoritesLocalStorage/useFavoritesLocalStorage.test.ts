import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFavoritesLocalStorage } from './useFavoritesLocalStorage';
import * as stateModule from '../../state';

describe('useFavoritesLocalStorage Hook', () => {
  const mockDispatch = vi.fn();
  const mockFavorites = ['Apollo 11', 'Apollo 12'];

  beforeEach(() => {
    // Mock useFilterState and useFilterStateDispatch
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      searchTerm: '',
      selectedYear: '',
      favorites: [],
    });
    vi.spyOn(stateModule, 'useFilterStateDispatch').mockReturnValue(
      mockDispatch
    );

    // Mock localStorage methods
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'favorites') {
        return JSON.stringify(mockFavorites);
      }
      return null;
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads favorites from localStorage on mount and dispatches ADD_FAVORITES', () => {
    renderHook(({ mounted }) => useFavoritesLocalStorage(mounted), {
      initialProps: { mounted: true },
    });

    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITES',
      payload: mockFavorites,
    });
  });

  it('does not dispatch ADD_FAVORITES if no favorites in localStorage', () => {
    // Override the getItem mock to return null
    (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(null);

    renderHook(() => useFavoritesLocalStorage(true));

    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('saves favorites to localStorage when state.favorites changes and has items', () => {
    // Update the mock to have favorites
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      favorites: mockFavorites,
      searchTerm: '',
      selectedYear: '',
    });

    renderHook(() => useFavoritesLocalStorage(true));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(mockFavorites)
    );
  });

  it('saves empty string to localStorage when state.favorites is empty', () => {
    // Update the mock to have empty favorites
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      favorites: [],
      searchTerm: '',
      selectedYear: '',
    });

    renderHook(() => useFavoritesLocalStorage(true));

    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', '');
  });
});

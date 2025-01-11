import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFavoritesLocalStorage } from './useFavoritesLocalStorage';
import * as stateModule from '../../state';

describe('useFavoritesLocalStorage Hook', () => {
  const mockDispatch = vi.fn();
  const mockFavorites = ['Apollo 11', 'Apollo 12'];
  beforeEach(() => {
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      searchTerm: '',
      selectedYear: '',
      favorites: [],
    });
    vi.spyOn(stateModule, 'useFilterStateDispatch').mockReturnValue(
      mockDispatch
    );

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
    renderHook(() => useFavoritesLocalStorage());

    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITES',
      payload: mockFavorites,
    });
  });

  it('does not dispatch ADD_FAVORITES if no favorites in localStorage', () => {
    (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(null);

    renderHook(() => useFavoritesLocalStorage());

    expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('saves favorites to localStorage when state.favorites changes and has items', () => {
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      favorites: mockFavorites,
      searchTerm: '',
      selectedYear: '',
    });

    renderHook(() => useFavoritesLocalStorage());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(mockFavorites)
    );
  });

  it('saves empty string to localStorage when state.favorites is empty', () => {
    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      favorites: [],
      searchTerm: '',
      selectedYear: '',
    });
    renderHook(() => useFavoritesLocalStorage());
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', '');
  });

  it('cacthes error when saving to localStorage', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    vi.spyOn(stateModule, 'useFilterState').mockReturnValue({
      favorites: mockFavorites,
      searchTerm: '',
      selectedYear: '',
    });
    (Storage.prototype.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Error saving to localStorage');
    });

    renderHook(() => useFavoritesLocalStorage());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(mockFavorites)
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to save favorites to localStorage:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});

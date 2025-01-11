import { useEffect } from 'react';
import { useFilterState, useFilterStateDispatch } from '../../state';

export const useFavoritesLocalStorage = () => {
  const dispatch = useFilterStateDispatch();
  const state = useFilterState();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        dispatch?.({
          type: 'ADD_FAVORITES',
          payload: JSON.parse(storedFavorites),
        });
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'favorites',
        (state?.favorites ?? []).length > 0
          ? JSON.stringify(state?.favorites)
          : ''
      );
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [state?.favorites]);
};

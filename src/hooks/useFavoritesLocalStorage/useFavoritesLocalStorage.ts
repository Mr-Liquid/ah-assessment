import { useEffect } from 'react';
import { useFilterState, useFilterStateDispatch } from '../../state';

export const useFavoritesLocalStorage = (mounted: boolean) => {
  const dispatch = useFilterStateDispatch();
  const state = useFilterState();

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      dispatch?.({
        type: 'ADD_FAVORITES',
        payload: JSON.parse(storedFavorites),
      });
    }
  }, [mounted, dispatch]);

  useEffect(() => {
    localStorage.setItem(
      'favorites',
      (state?.favorites ?? []).length > 0
        ? JSON.stringify(state?.favorites)
        : ''
    );
  }, [state?.favorites]);
};

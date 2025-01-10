import { useFilterStateDispatch } from '../state';
import { useFavoritesLocalStorage } from './useFavoritesLocalStorage/useFavoritesLocalStorage';

export const useFavorites = (mounted: boolean) => {
  const dispatch = useFilterStateDispatch();
  useFavoritesLocalStorage(mounted);

  const setFavorite = ({
    id,
    actionType,
  }: {
    id: string;
    actionType: 'add' | 'remove';
  }) => {
    dispatch?.({
      type: actionType === 'add' ? 'ADD_FAVORITE' : 'REMOVE_FAVORITE',
      payload: id,
    });
  };

  return setFavorite;
};

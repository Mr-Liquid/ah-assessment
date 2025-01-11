import { useFilterStateDispatch } from '../state';
import { useFavoritesLocalStorage } from './useFavoritesLocalStorage/useFavoritesLocalStorage';

export const useFavorites = () => {
  const dispatch = useFilterStateDispatch();
  useFavoritesLocalStorage();

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

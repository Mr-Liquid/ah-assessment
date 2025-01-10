import { useFilterState, useFilterStateDispatch } from '../../state';

export const useFilterController = () => {
  const state = useFilterState();
  const dispatch = useFilterStateDispatch();

  const onSearchHandler = (value: string) => {
    dispatch?.({ type: 'SET_SEARCH_TERM', payload: value });
  };

  const onYearChangeHandler = (value: string) => {
    dispatch?.({ type: 'SET_SELECTED_YEAR', payload: value });
  };

  return {
    ...state,
    onSearchHandler,
    onYearChangeHandler,
  };
};

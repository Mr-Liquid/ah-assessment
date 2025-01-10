import { Action } from './actions';
import { State } from './state';

export const initialState: State = {
  searchTerm: '',
  selectedYear: '',
  favorites: [],
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_YEAR':
      return { ...state, selectedYear: action.payload };
    case 'ADD_FAVORITES':
      return { ...state, favorites: [...action.payload] };
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav !== action.payload),
      };
    default:
      return state;
  }
}

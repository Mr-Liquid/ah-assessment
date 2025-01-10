import { useContext } from 'react';
import { StateContext } from './contexts';
import { State } from './state';

export const useFilterState = (): State | null => {
  const context = useContext(StateContext);
  if (context === null) {
    throw new Error('useFilterState must be used within a FilterStateProvider');
  }
  return context;
};

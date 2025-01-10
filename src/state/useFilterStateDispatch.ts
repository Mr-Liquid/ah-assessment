import { useContext } from 'react';
import { StateDispatchContext } from './contexts';
import { Action } from './actions';
import { Dispatch } from 'react';

export const useFilterStateDispatch = (): Dispatch<Action> | null => {
  const context = useContext(StateDispatchContext);
  if (context === null) {
    throw new Error(
      'useFilterStateDispatch must be used within a FilterStateProvider'
    );
  }
  return context;
};

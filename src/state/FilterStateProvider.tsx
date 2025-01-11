import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { StateContext, StateDispatchContext } from './contexts';

export function FilterStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        {children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { StateContext, StateDispatchContext } from './contexts';

// export const StateContext = createContext<State | null>(null);
// export const StateDispatchContext = createContext<Dispatch<Action> | null>(
//   null
// );

// export const useFilterState = () => useContext(StateContext);
// export const useFilterStateDispatch = () => useContext(StateDispatchContext);

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

import { createContext, Dispatch } from 'react';
import { Action } from './actions';
import { State } from './state';

// Create contexts without exporting them directly in context.tsx
export const StateContext = createContext<State | null>(null);
export const StateDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

import { createContext, Dispatch } from 'react';
import { Action } from './actions';
import { State } from './state';

export const StateContext = createContext<State | null>(null);
export const StateDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

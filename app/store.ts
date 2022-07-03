import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'

import {apiSlice} from '../features/dogs/dogsApiSlice';

export function makeStore() {
  return configureStore({
      // so we're gonna have this way a state.counter field in our state
    reducer: { 
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
     },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
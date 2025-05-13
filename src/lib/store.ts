import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlide';

export const makeStore =()=>{
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  })
}
// lay ra store
export type AppStore = ReturnType<typeof makeStore>;
// lay state
export type RootState = ReturnType<AppStore['getState']>;
// thuc hien cac action
export type AppDispatch = AppStore['dispatch'];

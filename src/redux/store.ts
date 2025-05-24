import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlide';
import donDangKyReducer from './features/donDangKySlice';
import quyDinhReducer from './features/quyDinhSlice';

export const makeStore =()=>{
  return configureStore({
    reducer: {
      auth: authReducer,
      donDangKy: donDangKyReducer,
      quyDinh: quyDinhReducer,
    },
  })
}
// lay ra store
export type AppStore = ReturnType<typeof makeStore>;
// lay state
export type RootState = ReturnType<AppStore['getState']>;
// thuc hien cac action
export type AppDispatch = AppStore['dispatch'];

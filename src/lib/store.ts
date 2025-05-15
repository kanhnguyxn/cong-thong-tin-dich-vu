import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlide";
import quyDinhReducer from "./features/quy-dinh-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      quydinh: quyDinhReducer, // Assuming quyDinhReducer is imported from the appropriate file
    },
  });
};
// lay ra store
export type AppStore = ReturnType<typeof makeStore>;
// lay state
export type RootState = ReturnType<AppStore["getState"]>;
// thuc hien cac action
export type AppDispatch = AppStore["dispatch"];

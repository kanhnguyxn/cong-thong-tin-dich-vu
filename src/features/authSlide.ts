import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  userType?: string | null;
  name?: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userType: null,
  accessToken: null,   
  name: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
    },
    getUser: (state, action: PayloadAction<{ userType: string; name: string }>) => {
        state.userType = action.payload.userType;
        state.name = action.payload.name;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
        state.userType = null;
        state.name = null;
    },
  },
});


export const { login, logout,getUser  } = authSlice.actions;
export default authSlice.reducer;

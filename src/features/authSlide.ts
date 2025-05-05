import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
 userName: string | null;
 userType: string | null;
}

const initialState: AuthState = {
  userName: null,
  userType: null,
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<{ userType: string; userName: string }>) => {
        state.userType = action.payload.userType;
        state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.userName = null;
      state.userType = null;
    },
  },
});


export const { logout,getUser  } = authSlice.actions;
export default authSlice.reducer;

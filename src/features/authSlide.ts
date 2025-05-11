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
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userName: string; userType: string }>) => {
      state.userName = action.payload.userName;
      state.userType = action.payload.userType;
    },
    logout: (state) => {
      state.userName = null;
      state.userType = null;
    },
  },
});


export const { logout,setUser  } = authSlice.actions;
export default authSlice.reducer;

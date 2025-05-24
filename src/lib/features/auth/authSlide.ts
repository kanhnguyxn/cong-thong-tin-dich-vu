import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser as getUserAPI } from "@apis/auth/getUser";

// dinh nghia state
interface AuthState {
  user: {
    username: string;
    userType: string;
  };
  loading: boolean;
  error: string | null;
}
// dihn nghia userResponse

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("auth/getUser", async () => {
  const response = await getUserAPI();
  console.log("fetchuser", response);
  return response;
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action) {
      // console.log("action getUser", action.payload);
      state.user = action.payload;
    },
    deleteUser(state) {
      // console.log("action deleteUser", state.user);//
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // handle fetch user
    builder.addCase(fetchUser.pending, (state, action) => {
      // console.log("action getUser", action.payload);
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // console.log("action getUser", action.payload);
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      // console.log("action getUser", action.payload);
      state.loading = false;
      state.error = action.error.message || "Lỗi không xác định";
      state.user = null;
    });
  },
});


// export action va reducer
export const { getUser, deleteUser } = authSlice.actions;

// export selectors
export default authSlice.reducer;

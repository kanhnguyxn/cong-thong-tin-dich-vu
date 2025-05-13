import { createSlice } from "@reduxjs/toolkit";
import { fetchBieuMau } from "./bieuMauThunk";

const bieuMauSlice = createSlice({
  name: "bieuMau",
  initialState: {
    bieuMau: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBieuMau.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBieuMau.fulfilled, (state, action) => {
        state.loading = false;
        state.bieuMau = action.payload;
      })
      .addCase(fetchBieuMau.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default bieuMauSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBieuMauMockup } from "@apis/canBo/getBieuMau";

interface BieuMauState{
  bieuMau:{
    maBM:string;
    tenBM:string;
    lienKet:string;
    tenPB:string; 
  }[];
  selected: unknown[];
  loading: boolean;
  error: string | null;

}

// bieu mau danh cho can bo
export const fetchBieuMau = createAsyncThunk(
    'bieuMau/fetchBieuMau',
    async () => {
      const resData = await getBieuMauMockup();
      return resData;
    }
  );

  const initialState: BieuMauState = {
    bieuMau: [],
    selected: [],
    loading: false,
    error: null,
  }

const bieuMauSlice = createSlice({
  name: "bieuMau",
  initialState,
  reducers: {
    // xu ly du lieu duoc chon
    addSelectedBieuMau: (state, action) => {
      state.selected = action.payload;
    }

  },
  extraReducers: (builder) => {
    // get bieu mau
    builder
      .addCase(fetchBieuMau.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBieuMau.fulfilled, (state, action) => {
        console.log("fetchBieuMau fulfilled", action.payload);
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
export const {addSelectedBieuMau } = bieuMauSlice.actions;

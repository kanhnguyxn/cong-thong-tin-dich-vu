import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBieuMauMockup } from "@apis/canBo/getBieuMau";

interface BieuMauState{
  bieuMau:{
    maBM:string;
    tenBM:string;
    lienKet:string;
    tenPB:string; 
  }[];
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
    loading: false,
    error: null,
  }

const bieuMauSlice = createSlice({
  name: "bieuMau",
  initialState,
  reducers: {
    // them bieu mau moi
    addBieuMau: (state, action) => {
      state.bieuMau.push(action.payload);
    },
    // xoa 1 hoặc nhiều biểu mẫu bằng maBM
    deleteBieuMau: (state, action) => {
      const maBM = action.payload;
      state.bieuMau = state.bieuMau.filter((bieuMau) => bieuMau.maBM !== maBM);
    },
  },
  extraReducers: (builder) => {
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
export const { addBieuMau, deleteBieuMau } = bieuMauSlice.actions;

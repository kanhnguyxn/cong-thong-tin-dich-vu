import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLichSuDangKy } from "@apis/sinhVien/getLichSuDangKy"

interface LichSuDangKyState {
  lichSuDangKy: {
    maDon: string;
    ngayTaoDonCT: Date;
    tenDon: string;
    donViThucHien: string;
    trangThai: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: LichSuDangKyState = {
  lichSuDangKy: [],
  loading: false,
  error: null,
};

export const fetchLichSuDangKy = createAsyncThunk(
  "sinhVien/fetchLichSuDangKy",
  async () => {
    const response = await getLichSuDangKy();
    return response;
  }
);

const lichSuDangKySlice = createSlice({
  name: "lichSuDangKy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLichSuDangKy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLichSuDangKy.fulfilled, (state, action) => {
        state.loading = false;
        state.lichSuDangKy = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(fetchLichSuDangKy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default lichSuDangKySlice.reducer;

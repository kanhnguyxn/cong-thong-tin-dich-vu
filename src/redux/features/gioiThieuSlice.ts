import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGioiThieu } from "@apis/sinhVien/getGioiThieu";

interface GioiThieuState {
    gioiThieu:{
    tieuDe: string;
    noiDung: string;
    hinhAnh: string;
    thongTinLienHe: {
        department: string,
        phones: [],
        email: string,
    }[];
    };
    
  loading: boolean;
  error: string | null;
}

export const fetchGioiThieu = createAsyncThunk(
  "gioiThieu/fetchGioiThieu",
  async () => {
    const response = await getGioiThieu();
    console.log("Gioi thieu data:", response);
    return response;
  }
);

const initialState: GioiThieuState = {
    gioiThieu: {
        tieuDe: "",
        noiDung: "",
        hinhAnh: "",
        thongTinLienHe: []
    },
    loading: false,
    error: null,
}

const gioiThieuSlice = createSlice({
  name: "gioiThieu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGioiThieu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGioiThieu.fulfilled, (state, action) => {
        console.log("Gioi thieu data fetched:", action.payload);
        state.loading = false;
        state.gioiThieu = action.payload;
      })
      .addCase(fetchGioiThieu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default gioiThieuSlice.reducer;
    


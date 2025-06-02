import { getQuyDinh as getQuyDinhCanBo } from "@apis/canBo/getQuyDinh";
import { getQuyDinh as getQuyDinhSinhVien } from "@apis/sinhVien/getQuyDinh";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface QuyDinhState {
  quyDinh: {
    maQD: string;
    tenQD: string;
    maCB: string;
    maPB: string;
    tenPB: string;
    lienKet: string;
    loaiVanBan: string;
    noiBanHanh: string;
    ngayBanHanh: Date;
    ngayCoHieuLuc: Date;
    hieuLuc: boolean;
    thoiGianDang: Date;
  }[];
  selected: Array<string>; // state to hold selected quy dinh
  loading: boolean;
  error: string | null;
}

const initialState: QuyDinhState = {
  quyDinh: [],
  loading: false,
  error: null,
  selected: [], // state to hold selected quy dinh
};

// lay quy dinh ve cho sv
export const fetchQuyDinh = createAsyncThunk("quyDinh/fetchQuyDinh", async () => {
  const resData = await getQuyDinhSinhVien();
  console.log("resData in fetchQuyDinh", resData);
  return resData;
});

// lay quy dinh cho canBo
export const fetchQuyDinhCanBo = createAsyncThunk("quyDinh/fetchQuyDinhCanBo", async () => {
  const resData = await getQuyDinhCanBo();
  console.log("resData in fetchQuyDinhCanBo", resData);
  return resData;
});

const quyDinhSlice = createSlice({
  name: "quyDinh",
  initialState,
  reducers: {
    // reset quy dinh ve ban dau
    resetQuyDinh: (state) => {
      state.quyDinh = null;
      state.loading = false;
      state.error = null;
    },
    addSelectedQuyDinh: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuyDinh.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuyDinh.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.loading = false;
        state.quyDinh = action.payload;
      })
      .addCase(fetchQuyDinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //  xu ly getQuyDinhCanBo
    builder
      .addCase(fetchQuyDinhCanBo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuyDinhCanBo.fulfilled, (state, action) => {
        console.log("action.payload in fetchQuyDinhCanBo", action.payload);
        state.loading = false;
        state.quyDinh = action.payload as QuyDinhState["quyDinh"];
      })
      .addCase(fetchQuyDinhCanBo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default quyDinhSlice.reducer;
export const { resetQuyDinh, addSelectedQuyDinh } = quyDinhSlice.actions;

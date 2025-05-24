import { getQuyDinh } from "@apis/sinhVien/getQuyDinh";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface QuyDinhState {
    quyDinh:{
        maQD: string;
        tenQD: string;
        maCB: string;
        maPB: string;
        lienKet: string;
        loaiVanBan: string;
        noiBanHanh: string;
        ngayBanHanh: Date;
        ngayCoHieuLuc: Date;
        hieuLuc: boolean;
        thoiGianDang: Date;
    }[];
        
    loading: boolean;
    error: string | null;
}

const initialState: QuyDinhState = {
    quyDinh: null,
    loading: false,
    error: null,
};

// lay quy dinh ve cho sv
export const fetchQuyDinh = createAsyncThunk(
    "quyDinh/fetchQuyDinh",
    async () => {
        const resData = await getQuyDinh();
        return resData;
    }
);

const quyDinhSlice = createSlice({
    name: "quyDinh",
    initialState:{
        quyDinh:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuyDinh.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuyDinh.fulfilled, (state, action) => {
                state.loading = false;
                state.quyDinh = action.payload.status && action.payload.data ? action.payload.data : [];
            })
            .addCase(fetchQuyDinh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },

})
export default quyDinhSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuyDinh } from "@apis/sinhVien/getQuyDinh";

interface QuyDinhState {
    quyDinh:{
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
        
    loading: boolean;
    error: string | null;
}

const initialState: QuyDinhState = {
    quyDinh: [],
    loading: false,
    error: null,
};

// lay quy dinh ve cho sv
export const fetchQuyDinh = createAsyncThunk(
    "quyDinh/fetchQuyDinh",
    async () => {
        const resData = await getQuyDinh();
        console.log("resData in fetchQuyDinh", resData);
        return resData;
    }
);

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
    },

})
export default quyDinhSlice.reducer;
export const { resetQuyDinh } = quyDinhSlice.actions;
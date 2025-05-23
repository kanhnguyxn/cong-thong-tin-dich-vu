import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDonDangKy } from "@apis/sinhVien/getDonDangKy";

interface DonDangKyState {
    donDangKy: {
        maDon: string;
        maPB: string;
        tenDon: string;
        maCB: string;
        maQL: string;
        thongTinChiTiet: string;
        thoiGianDang: string;
        trangThai: boolean;
    }[];
    loading: boolean;
    error: string | null;
}

const initialState: DonDangKyState = {
    donDangKy: [],
    loading: false,
    error: null,
};

export const fetchDonDangKy = createAsyncThunk(
    "donDangKy/fetchDonDangKy",
    async () => {
        console.log("fetchDonDangKy");
        const resData = await getDonDangKy();
        return resData;
    }
);

const donDangKySlice = createSlice({
    name: "donDangKy",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchDonDangKy.pending, (state)=>{
            state.loading = true;

        })
        builder.addCase(fetchDonDangKy.fulfilled, (state, action)=>{
            state.loading = false;
            state.donDangKy = Array.isArray(action.payload) ? action.payload : [action.payload];
        })
        builder.addCase(fetchDonDangKy.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Lỗi không xác định";
        })
    }
    
});

export default donDangKySlice.reducer;
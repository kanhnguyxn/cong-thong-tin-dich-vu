import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDonDangKy } from "@apis/sinhVien/getDonDangKy";
import { getDonDangKyMockup } from "@apis/canBo/getDonDangKy";

interface DonDangKyState {
    donDangKySV: {
        maDon: string;
        maPB: string;
        tenDon: string;
        maCB: string;
        maQL: string;
        thongTinChiTiet: string;
        thoiGianDang: string;
        trangThai: boolean;
    }[];
    donDangKyCB: {
        maDon: string;
        tenDDK: string;
        thongtinChitiet: any[];
    }[];
    loading: boolean;
    error: string | null;
}

const initialState: DonDangKyState = {
    donDangKySV: [],
    donDangKyCB: [],
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

export const fetchDonDangKyMockup = createAsyncThunk(
    "donDangKy/fetchDonDangKyMockup",
    async () => {
        console.log("fetchDonDangKyMockup");
        const resData = await getDonDangKyMockup();
        return resData;
    }
);

const donDangKySlice = createSlice({
    name: "donDangKy",
    initialState,
    reducers: {
        // xoa tat ca don dang ky
        deleteAllDonDangKy: (state) => {
            state.donDangKySV = [];
        },
    },
    extraReducers: (builder)=>{
        // don dk cua sinh vien
        builder.addCase(fetchDonDangKy.pending, (state)=>{
            state.loading = true;

        })
        builder.addCase(fetchDonDangKy.fulfilled, (state, action)=>{
            console.log("fetchDonDangKy.fulfilled", action.payload);
            state.loading = false;
            state.donDangKySV = Array.isArray(action.payload) ? action.payload : [action.payload];
        })
        builder.addCase(fetchDonDangKy.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Lỗi không xác định";
        })        
    
    // don dk cua can bo
    .addCase(fetchDonDangKyMockup.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchDonDangKyMockup.fulfilled, (state, action)=>{
            state.loading = false;
            state.donDangKyCB = Array.isArray(action.payload) ? action.payload : [action.payload];
        })
        .addCase(fetchDonDangKyMockup.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Lỗi không xác định";
        });
    }
});

export default donDangKySlice.reducer;
export const { deleteAllDonDangKy } = donDangKySlice.actions;
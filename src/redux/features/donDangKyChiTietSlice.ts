import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDonDangKyCTMockup } from "@apis/canBo/getDonDangKyCT";


interface DonDangKyChiTietState {
    donDangKyChiTiet: {
        maDonCT: string;
        tenDon: string;
        thongTinChiTiet: string;
        trangThaiXuLy: string;
    }[];
    loading: boolean;
    error: string | null;
}

const initialState: DonDangKyChiTietState = {
    donDangKyChiTiet: [],
    loading: false,
    error: null,
};

export const fetchDonDangKyChiTiet = createAsyncThunk(
    "donDangKyChiTiet/fetchDonDangKyChiTiet",
    async () => {
        console.log("fetchDonDangKyChiTiet");
        const resData = await getDonDangKyCTMockup();
        return resData;
    }
);

const donDangKyChiTietSlice = createSlice({
    name: "donDangKyChiTiet",
    initialState,
    reducers: {
        // xoa tat ca don dang ky chi tiet
        deleteAllDonDangKyChiTiet: (state) => {
            state.donDangKyChiTiet = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDonDangKyChiTiet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDonDangKyChiTiet.fulfilled, (state, action) => {
            console.log("fetchDonDangKyChiTiet.fulfilled", action.payload);
            state.loading = false;
            state.donDangKyChiTiet = Array.isArray(action.payload) ? action.payload : [action.payload];
        });
        builder.addCase(fetchDonDangKyChiTiet.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Lỗi không xác định";
        });
    },
});

export default donDangKyChiTietSlice.reducer;
export const {  deleteAllDonDangKyChiTiet } = donDangKyChiTietSlice.actions;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDonDangKy as getDonDangKySinhVien } from "@apis/sinhVien/getDonDangKy";
import { getDonDangKy as getDonDangKyCanBo } from "@apis/canBo/getDonDangKy";

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
        maPB: string;
        tenDon: string;
        maCB: string;
        maQL: string;
        thongTinChiTiet: string;
        thoiGianDang: string;
        trangThai: boolean;
        tenPB: string;
    }[];
    selected:unknown[];
    loading: boolean;
    error: string | null;
}

const initialState: DonDangKyState = {
    donDangKySV: [],
    donDangKyCB: [],
    selected: [],
    loading: false,
    error: null,
};

export const fetchDonDangKySV = createAsyncThunk(
    "donDangKy/fetchDonDangKySV",
    async () => {
        console.log("fetchDonDangKy");
        const resData = await getDonDangKySinhVien();
        return resData;
    }
);

export const fetchDonDangKyCanBo = createAsyncThunk(
    "donDangKy/fetchDonDangKyCanBo",
    async () => {
        console.log("fetchDonDangKyCanBo");
        const resData = await getDonDangKyCanBo();
        return resData;
    }
);

const donDangKySlice = createSlice({
    name: "donDangKy",
    initialState,
    reducers: {
        // xu ly du lieu duoc chon
        addSelectedDonDangKy: (state, action) => {
            state.selected = action.payload;
        },
        // xoa tat ca don dang ky khi logout
        deleteAllDonDangKy: (state) => {
            state.donDangKySV = [];
            state.donDangKyCB = [];
            state.selected = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        // don dk cua sinh vien
        builder.addCase(fetchDonDangKySV.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(fetchDonDangKySV.fulfilled, (state, action)=>{
            console.log("fetchDonDangKy.fulfilled", action.payload);
            state.loading = false;
            state.donDangKySV = Array.isArray(action.payload) ? action.payload : [action.payload];
        })
        builder.addCase(fetchDonDangKySV.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Lỗi không xác định";
        })        
    
    // don dk cua can bo
    .addCase(fetchDonDangKyCanBo.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchDonDangKyCanBo.fulfilled, (state, action)=>{
            state.loading = false;
            if (action.payload && action.payload.data) {
                state.donDangKyCB = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];
            } else {
                state.donDangKyCB = [];
            }
        })
        .addCase(fetchDonDangKyCanBo.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Lỗi không xác định";
        });
    }
});

export default donDangKySlice.reducer;
export const { addSelectedDonDangKy, deleteAllDonDangKy } = donDangKySlice.actions;
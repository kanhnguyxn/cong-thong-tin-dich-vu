import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBieuMau } from "@apis/sinhVien/getBieuMau";
import { rejects } from "node:assert";


export const fetchBieuMau = createAsyncThunk(
    'bieuMau/fetchBieuMau',
    async () => {
      const resData = await getBieuMau();
      return resData;
    }
  );
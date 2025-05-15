import { getQuyDinhMockData } from "@apis/quydinh";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define the interface for a QuyDinh item

// interface QuyDinh {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
// }

interface BieuMauDataResquest {
  tenPB?: string;
  loaiVanBan?: string;
}

// Define the state interface
interface QuyDinhState {
  items: any[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: QuyDinhState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunks for API operations
export const fetchQuyDinhs = createAsyncThunk("quyDinh/fetchQuyDinhs", async (data: any) => {
  const bieumauReq: BieuMauDataResquest = {
    tenPB: data.tenPB,
    loaiVanBan: data.loaiVanBan,
  };
  //   const res = await getQuyDinh("/api/quydinh", bieumauReq);
  const res = await getQuyDinhMockData(bieumauReq);
  return res;
});

// export const addQuyDinh = createAsyncThunk(
//   "quyDinh/addQuyDinh",
//   async (quyDinh: Omit<QuyDinh, "id" | "createdAt" | "updatedAt">) => {
//     const response = await fetch("/api/quydinh", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(quyDinh),
//     });
//     return (await response.json()) as QuyDinh;
//   }
// );

// export const updateQuyDinh = createAsyncThunk("quyDinh/updateQuyDinh", async (quyDinh: Partial<QuyDinh> & { id: string }) => {
//   const response = await fetch(`/api/quydinh/${quyDinh.id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(quyDinh),
//   });
//   return (await response.json()) as QuyDinh;
// });

// export const deleteQuyDinh = createAsyncThunk("quyDinh/deleteQuyDinh", async (id: string) => {
//   await fetch(`/api/quydinh/${id}`, {
//     method: "DELETE",
//   });
//   return id;
// });

// Create the slice
const quyDinhSlice = createSlice({
  name: "quyDinh",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchQuyDinhs
      .addCase(fetchQuyDinhs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuyDinhs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuyDinhs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch regulations";
      });
    // Handle addQuyDinh
  },
});

// Export actions and reducer
export const { resetStatus } = quyDinhSlice.actions;

// Export selectors

export default quyDinhSlice.reducer;

//  .addCase(addQuyDinh.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addQuyDinh.fulfilled, (state, action: PayloadAction<QuyDinh>) => {
//         state.status = "succeeded";
//         state.items.push(action.payload);
//       })
//       .addCase(addQuyDinh.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to add regulation";
//       })

//       // Handle updateQuyDinh
//       .addCase(updateQuyDinh.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateQuyDinh.fulfilled, (state, action: PayloadAction<QuyDinh>) => {
//         state.status = "succeeded";
//         const index = state.items.findIndex((item) => item.id === action.payload.id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       })
//       .addCase(updateQuyDinh.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to update regulation";
//       })

//       // Handle deleteQuyDinh
//       .addCase(deleteQuyDinh.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteQuyDinh.fulfilled, (state, action: PayloadAction<string>) => {
//         state.status = "succeeded";
//         state.items = state.items.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteQuyDinh.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to delete regulation";
//       });

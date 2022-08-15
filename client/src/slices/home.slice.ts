import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "types";
import { Product } from "services/category.service";
import productServices from "services/product.service";

interface HomeState {
  newArrivals: Product[];
  status: RequestStatus;
}

const initialState: HomeState = { newArrivals: [], status: "idle" };

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewProducts.fulfilled, (_state, action) => ({
        newArrivals: action.payload,
        status: "succeeded",
      }));
  },
});

export const getNewProducts = createAsyncThunk(
  "home/getNewProducts",
  async (limit: number) => {
    return await productServices.getNewProducts(limit);
  }
);

export default homeSlice.reducer;

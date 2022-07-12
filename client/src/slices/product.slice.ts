import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import productService from "../services/product.service";
import { Product, RejectErrorPayload, RequestStatus } from "../types";

export const fetchSingleProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: RejectErrorPayload }
>("product/fetchSingleProduct", async (id, thunkApi) => {
  try {
    return await productService.getProductById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data as RejectErrorPayload
      );
    } else {
      throw error;
    }
  }
});

interface ProductState {
  status: RequestStatus;
  product?: Product;
  error?: string;
}

const productSlice = createSlice({
  name: "product",
  initialState: { status: "idle" } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.product = payload;
      })
      .addCase(fetchSingleProduct.rejected, (_, { payload, error }) => ({
        status: "failed",
        error: payload?.errorMessage || error.message,
      }));
  },
});

export default productSlice.reducer;

export const selectProductDetails = (state: RootState) => state.product;

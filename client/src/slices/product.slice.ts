import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { RejectErrorPayload, RequestStatus } from "../types";
import productService, { ProductDetails } from "../services/product.service";

interface ProductState {
  status: RequestStatus;
  error?: string;
  data?: ProductDetails;
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
        state.data = payload;
      })
      .addCase(fetchSingleProduct.rejected, (_, { payload, error }) => ({
        status: "failed",
        error: payload?.message || error.message,
      }));
  },
});

export const fetchSingleProduct = createAsyncThunk<
  ProductDetails,
  string,
  { rejectValue: RejectErrorPayload }
>("product/fetchSingleProduct", async (productId, thunkApi) => {
  try {
    return await productService.getProductById(productId);
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

export default productSlice.reducer;

export const selectProductDetails = (state: RootState) => state.product;

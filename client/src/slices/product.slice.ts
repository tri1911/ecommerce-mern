import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { RejectErrorPayload, RequestStatus } from "types";
import productServices, {
  type ProductDetails,
  type AggregatedProductReviews,
} from "services/product.service";

interface ProductState {
  status: RequestStatus;
  error?: string;
  data?: ProductDetails;
  reviews?: AggregatedProductReviews;
}

const productSlice = createSlice({
  name: "product",
  initialState: { status: "idle" } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload.details;
        state.reviews = payload.reviews;
      })
      .addCase(fetchProductDetails.rejected, (_, { payload, error }) => ({
        status: "failed",
        error: payload?.message || error.message,
      }));
  },
});

export const fetchProductDetails = createAsyncThunk<
  { details: ProductDetails; reviews: AggregatedProductReviews },
  string,
  { rejectValue: RejectErrorPayload }
>("product/fetchProductDetails", async (productId, thunkApi) => {
  try {
    const details = await productServices.getProductById(productId);
    const reviews = await productServices.getProductReviews(productId);
    return { details, reviews };
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

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { products } from "../data/products";
import { Product, RequestStatus } from "../types";

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = productsAdapter.getInitialState({
  status: "idle",
} as RequestStatus);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.setAll(state, action.payload);
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // simulate asynchronously fetching products from external server
    const result = await new Promise<Product[]>((resolve) => {
      setTimeout(() => resolve(products), 2000);
    });
    return result;
  }
);

export default productsSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

export const selectProductsRequestStatus = (state: RootState) =>
  state.products.status;
export const selectProductsRequestError = (state: RootState) =>
  state.products.status;

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import productService from "../services/product.service";
import { Product, RequestStatus } from "../types";

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

interface ProductsState {
  status: RequestStatus;
  error?: string;
  page?: number;
  pages?: number;
}

const initialState = productsAdapter.getInitialState({
  status: "idle",
} as ProductsState);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, { payload: { products, page, pages } }) => {
          state.status = "succeeded";
          state.page = page;
          state.pages = pages;
          productsAdapter.setAll(state, products);
        }
      );
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page }: { page?: string }) => {
    return await productService.getProducts({ page });
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

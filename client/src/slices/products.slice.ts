import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { RequestStatus } from "../types";
import categoryService, {
  Brand,
  Category,
  Color,
  MetaData,
  Product,
  Size,
} from "../services/category.service";

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

interface ProductsState {
  status: RequestStatus;
  error?: string;
  metadata?: MetaData;
  categories?: Category[];
  brands?: Brand[];
  sizes?: Size[];
  colors?: Color[];
}

const initialState = productsAdapter.getInitialState<ProductsState>({
  status: "idle",
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductsByCategory.fulfilled,
        (
          state,
          { payload: { products, metadata, categories, brands, sizes, colors } }
        ) => {
          state.status = "succeeded";
          state.metadata = metadata[0];
          state.categories = categories;
          state.brands = brands;
          state.sizes = sizes;
          state.colors = colors;
          productsAdapter.setAll(state, products);
        }
      );
  },
});

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async ({
    categoryId,
    currentPage,
    pageSize,
  }: {
    categoryId: string;
    currentPage?: number;
    pageSize?: number;
  }) => {
    return await categoryService.fetchProductsByCategory({
      categoryId,
      currentPage,
      pageSize,
    });
  }
);

export default productsSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

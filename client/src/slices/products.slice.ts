import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { RequestStatus } from "types";
import categoryService, {
  Brand,
  Category,
  Color,
  MetaData,
  Price,
  Size,
  ProductsQueries,
} from "services/category.service";
import { Product } from "services/product.service";

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
  price?: Price;
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
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { products, metadata, categories, brands, sizes, colors, price } =
          action.payload;
        state.status = "succeeded";
        state.metadata = metadata[0];
        state.categories = categories.sort((a, b) =>
          a._id.localeCompare(b._id)
        );
        state.brands = brands.sort((a, b) => a._id.localeCompare(b._id));
        state.sizes = sizes.sort((a, b) => a._id.localeCompare(b._id));
        state.colors = colors.sort((a, b) => a._id.localeCompare(b._id));
        state.price = price[0];
        productsAdapter.setAll(state, products);
      });
  },
});

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async ({
    categoryId,
    queries,
  }: {
    categoryId: string;
    queries: ProductsQueries;
  }) => {
    return await categoryService.fetchProductsByCategory(categoryId, queries);
  }
);

export default productsSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

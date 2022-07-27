import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import categoryService, { Category } from "../services/category.service";
import { RequestStatus } from "../types";

interface CategoriesState {
  status: RequestStatus;
  items?: Category[];
  error?: string;
}

const initialState: CategoriesState = { status: "idle" };

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesTree.pending, () => ({
        status: "loading",
      }))
      .addCase(fetchCategoriesTree.fulfilled, (_, { payload }) => ({
        status: "succeeded",
        items: payload,
      }))
      .addCase(fetchCategoriesTree.rejected, (_, action) => ({
        status: "failed",
        error: action.error.message,
      }));
  },
});

export const fetchCategoriesTree = createAsyncThunk(
  "categories/fetchCategoriesTree",
  async ({ maxDepth }: { maxDepth?: number }) => {
    return await categoryService.fetchCategoriesTree(maxDepth);
  }
);

export default categoriesSlice.reducer;

export const selectAllCategories = (state: RootState) => state.categories.items;

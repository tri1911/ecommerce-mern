import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "types";
import categoryService, { Category } from "services/category.service";

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
      .addCase(fetchCategoriesTree.fulfilled, (_state, action) => ({
        status: "succeeded",
        items: action.payload,
      }))
      .addCase(fetchCategoriesTree.rejected, (_state, action) => ({
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

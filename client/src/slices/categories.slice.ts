import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import categoryService, { Category } from "../services/category.service";
import { RequestStatus } from "../types";

interface CategoriesState {
  status: RequestStatus;
  items?: Category[];
  error?: string;
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { status: "idle" } as CategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, () => ({
        status: "loading",
      }))
      .addCase(getAllCategories.fulfilled, (_, { payload }) => ({
        status: "succeeded",
        items: payload,
      }));
  },
});

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    return await categoryService.fetchAllCategories();
  }
);

export default categoriesSlice.reducer;

export const selectAllCategories = (state: RootState) => state.categories.items;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService, { Category } from "../services/category.service";

interface CategoryState {
  data?: Category;
}

const categorySlice = createSlice({
  name: "category",
  initialState: {} as CategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCategory.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
  },
});

export const fetchSingleCategory = createAsyncThunk(
  "category/fetchSingleCategory",
  async (id: string) => {
    return await categoryService.fetchSingleCategory(id);
  }
);

export default categorySlice.reducer;

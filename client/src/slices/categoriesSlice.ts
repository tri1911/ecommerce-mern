import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Category } from "../types";

const categoriesAdapter = createEntityAdapter<Category>({
  selectId: (category) => category.slug,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState(),
  reducers: {
    categoriesReceived: (state, action) =>
      categoriesAdapter.setAll(state, action.payload.categories),
  },
});

export const { categoriesReceived } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const { selectAll: selectAllCategories } =
  categoriesAdapter.getSelectors<RootState>((state) => state.categories);

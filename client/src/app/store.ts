import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../slices/productsSlice";
import categoriesReducer, {
  categoriesReceived,
} from "../slices/categoriesSlice";
import { categories } from "../data/categories";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
});

// fetch all categories
store.dispatch(categoriesReceived({ categories }));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

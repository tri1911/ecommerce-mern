import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "slices/auth.slice";
import profileReducer from "slices/profile.slice";
import categoriesReducer from "slices/categories.slice";
import categoryReducer from "slices/category.slice";
import productsReducer from "slices/products.slice";
import productReducer from "slices/product.slice";
import cartReducer from "slices/cart.slice";
import wishlistReducer from "slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

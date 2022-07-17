import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../slices/products.slice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import authReducer from "../slices/auth.slice";
import productReducer from "../slices/product.slice";
import profileReducer from "../slices/profile.slice";
import addressesReducer from "../slices/address.slice";
import categoriesReducer from "../slices/categories.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    profile: profileReducer,
    addresses: addressesReducer,
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

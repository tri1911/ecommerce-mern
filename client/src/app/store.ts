import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../slices/products.slice";
import categoriesReducer, {
  categoriesReceived,
} from "../slices/categoriesSlice";
import { categories } from "../data/categories";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import authReducer from "../slices/auth.slice";
import productReducer from "../slices/product.slice";
import profileReducer from "../slices/profile.slice";
import addressesReducer from "../slices/address.slice";

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

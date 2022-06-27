import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CartItem } from "../types";

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cart) => cart.productId,
});

const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState(),
  reducers: {
    cartItemAdded: cartAdapter.upsertOne,
    cartItemUpdated: cartAdapter.updateOne,
    cartItemRemoved: cartAdapter.removeOne,
  },
});

export const { cartItemAdded, cartItemUpdated, cartItemRemoved } =
  cartSlice.actions;

export default cartSlice.reducer;

export const { selectAll: selectAllCartItems } =
  cartAdapter.getSelectors<RootState>((state) => state.cart);

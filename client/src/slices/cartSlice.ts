import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CartItem } from "../types";

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cart) => cart.productId,
});

const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState({
    showCartDrawer: false,
  }),
  reducers: {
    cartItemAdded: cartAdapter.upsertOne,
    cartItemUpdated: cartAdapter.updateOne,
    cartItemRemoved: cartAdapter.removeOne,
    setShowCartDrawer: (state, action: PayloadAction<boolean>) => {
      state.showCartDrawer = action.payload;
    },
  },
});

export const {
  cartItemAdded,
  cartItemUpdated,
  cartItemRemoved,
  setShowCartDrawer,
} = cartSlice.actions;

export default cartSlice.reducer;

export const { selectAll: selectAllCartItems } =
  cartAdapter.getSelectors<RootState>((state) => state.cart);

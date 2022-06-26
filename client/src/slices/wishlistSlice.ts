import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { WishlistItem } from "../types";

const wishlistAdapter = createEntityAdapter<WishlistItem>({
  selectId: (item) => item.productId,
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlistAdapter.getInitialState(),
  reducers: {
    wishlistItemAdded: wishlistAdapter.addOne,
    wishlistItemRemoved: wishlistAdapter.removeOne,
  },
});

export const { wishlistItemAdded, wishlistItemRemoved } = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const {
  selectAll: selectAllWishlistItems,
  selectIds: selectWishlistIds,
} = wishlistAdapter.getSelectors<RootState>((state) => state.wishlist);

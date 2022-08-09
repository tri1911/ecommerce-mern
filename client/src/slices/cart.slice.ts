import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import cartServices, { CartItem, Cart } from "../services/cart.service";

interface CartState {
  data?: Cart;
  showCartDrawer: boolean;
}

const initialState: CartState = {
  showCartDrawer: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setShowCartDrawer: (state, action: PayloadAction<boolean>) => {
      state.showCartDrawer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(cartItemAdded.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(itemQuantityUpdated.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(cartItemRemoved.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const getCart = createAsyncThunk<Cart, undefined, { state: RootState }>(
  "/cart/getCart",
  async (_arg, { getState }) => {
    const loggedInUser = getState().auth.user;
    if (loggedInUser) {
      return await cartServices.getCart({
        userId: loggedInUser._id,
        token: loggedInUser.token,
      });
    } else {
      throw new Error("login is required to get cart");
    }
  }
);

export const cartItemAdded = createAsyncThunk<
  Cart,
  Pick<CartItem, "productId" | "quantity">,
  { state: RootState }
>("/cart/addCartItem", async (payload, { getState }) => {
  const loggedInUser = getState().auth.user;
  if (loggedInUser) {
    return await cartServices.addCartItem(
      { userId: loggedInUser._id, token: loggedInUser.token },
      payload
    );
  } else {
    throw new Error("login is required to add item to cart");
  }
});

export const itemQuantityUpdated = createAsyncThunk<
  Cart,
  Pick<CartItem, "productId" | "quantity">,
  { state: RootState }
>("/cart/updateItemQuantity", async (payload, { getState }) => {
  const loggedInUser = getState().auth.user;
  if (loggedInUser) {
    return await cartServices.updateItemQuantity(
      { userId: loggedInUser._id, token: loggedInUser.token },
      payload
    );
  } else {
    throw new Error("login is required to add item to cart");
  }
});

export const cartItemRemoved = createAsyncThunk<
  Cart,
  string,
  { state: RootState }
>("/cart/removeCartItem", async (productId, { getState }) => {
  const loggedInUser = getState().auth.user;
  if (loggedInUser) {
    return await cartServices.removeCartItem(
      { userId: loggedInUser._id, token: loggedInUser.token },
      productId
    );
  } else {
    throw new Error("login is required to add item to cart");
  }
});

const { reducer, actions } = cartSlice;

export const selectAllCartItems = (state: RootState) => state.cart.data?.items;
export const { setShowCartDrawer } = actions;

export default reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { RejectErrorPayload, RequestStatus } from "types";
import userServices, { type WishlistItem } from "services/user.service";
import axios from "axios";

interface WishlistState {
  status: RequestStatus;
  error?: string;
  items?: WishlistItem[];
}

const initialState: WishlistState = { status: "idle", items: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => ({
        status: "loading",
      }))
      .addCase(fetchWishlist.fulfilled, (state, action) => ({
        status: "succeeded",
        items: action.payload,
      }))
      .addCase(fetchWishlist.rejected, (state, action) => ({
        status: "failed",
        error: action.payload?.message || action.error.message,
      }));
  },
});

export const addWishlistItem = createAsyncThunk<
  WishlistItem[],
  string,
  { rejectValue: RejectErrorPayload; state: RootState }
>(
  "wishlist/addWishlistItem",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const loggedInUser = getState().auth.user;
      if (!loggedInUser) {
        throw new Error("Login is required!");
      }
      const { _id: userId, token } = loggedInUser;
      const items = await userServices.addWishlistItem({
        userId,
        token,
        productId,
      });
      return items;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data as RejectErrorPayload);
      } else {
        throw err;
      }
    }
  }
);

export const removeWishlistItem = createAsyncThunk<
  WishlistItem[],
  string,
  { rejectValue: RejectErrorPayload; state: RootState }
>(
  "wishlist/removeWishlistItem",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const loggedInUser = getState().auth.user;
      if (!loggedInUser) {
        throw new Error("Login is required!");
      }
      const { _id: userId, token } = loggedInUser;
      const items = await userServices.removeWishlistItem({
        userId,
        token,
        productId,
      });
      return items;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data as RejectErrorPayload);
      } else {
        throw err;
      }
    }
  }
);

export const fetchWishlist = createAsyncThunk<
  WishlistItem[],
  undefined,
  { rejectValue: RejectErrorPayload; state: RootState }
>("wishlist/fetchWishlist", async (_arg, { rejectWithValue, getState }) => {
  try {
    const loggedInUser = getState().auth.user;
    if (!loggedInUser) {
      throw new Error("Login is required!");
    }
    const { _id: userId, token } = loggedInUser;
    const items = await userServices.getUserWishlist({ userId, token });
    return items;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data as RejectErrorPayload);
    } else {
      throw err;
    }
  }
});

export default wishlistSlice.reducer;

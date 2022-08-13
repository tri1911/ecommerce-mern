import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import orderServices, { Order } from "services/order.service";

const ordersAdapter = createEntityAdapter<Order>({
  selectId: (order) => order._id,
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersByUser.fulfilled, ordersAdapter.setAll);
  },
});

export const getOrdersByUser = createAsyncThunk<
  Order[],
  undefined,
  { state: RootState }
>("orders/getOrdersByUser", async (_arg, { getState }) => {
  const loggedInUser = getState().auth.user;
  if (!loggedInUser) {
    throw new Error("login is required to get orders information");
  }
  return await orderServices.getOrdersByUser({
    userId: loggedInUser._id,
    token: loggedInUser.token,
  });
});

export default ordersSlice.reducer;

export const {
  selectAll: selectAllOrders,
  selectIds: selectOrderIds,
  selectById: selectOrderById,
  selectTotal: selectTotalOrders,
} = ordersAdapter.getSelectors((state: RootState) => state.orders);

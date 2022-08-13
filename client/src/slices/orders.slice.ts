import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import orderServices, { Order } from "services/order.service";
import { RequestStatus } from "types";

const ordersAdapter = createEntityAdapter<Order>({
  selectId: (order) => order._id,
});

interface OrdersState {
  status: RequestStatus;
}

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersAdapter.getInitialState<OrdersState>({ status: "idle" }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersByUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      ordersAdapter.setAll(state, action.payload);
    });
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

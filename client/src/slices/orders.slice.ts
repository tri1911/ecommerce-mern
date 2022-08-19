import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import orderServices, { Order } from "services/order.service";
import { RejectErrorPayload, RequestStatus } from "types";
import { getCancellations } from "./cancellations.slice";

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
    builder
      .addCase(getOrdersByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        ordersAdapter.setAll(state, action.payload);
      })
      .addCase(cancelOrder.fulfilled, (state, { payload }) => {
        ordersAdapter.updateOne(state, { id: payload._id, changes: payload });
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
    throw new Error("Login is required to get orders information");
  }
  return await orderServices.getOrdersByUser({
    userId: loggedInUser._id,
    token: loggedInUser.token,
  });
});

export const cancelOrder = createAsyncThunk<
  Order,
  string,
  { state: RootState; rejectValue: RejectErrorPayload }
>(
  "orders/cancelOrder",
  async (orderId, { dispatch, getState, rejectWithValue }) => {
    try {
      const loggedInUser = getState().auth.user;
      if (!loggedInUser) {
        throw new Error("Login is required to cancel order");
      }
      const { token, _id: userId } = loggedInUser;
      const updatedOrder = await orderServices.cancelOrder({
        token,
        userId,
        orderId,
      });
      // re-fetch cancellations
      dispatch(getCancellations());
      return updatedOrder;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as RejectErrorPayload);
      }
      throw error;
    }
  }
);

export default ordersSlice.reducer;

export const {
  selectAll: selectAllOrders,
  selectIds: selectOrderIds,
  selectById: selectOrderById,
  selectTotal: selectTotalOrders,
} = ordersAdapter.getSelectors((state: RootState) => state.orders);

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import orderServices, { type Order } from "services/order.service";
import { RejectErrorPayload, RequestStatus } from "types";

export const cancellationsAdapter = createEntityAdapter<Order>({
  selectId: (order) => order._id,
});

interface CancellationsState {
  status: RequestStatus;
  error?: string;
}

const cancellationsSlice = createSlice({
  name: "cancellations",
  initialState: cancellationsAdapter.getInitialState<CancellationsState>({
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCancellations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCancellations.fulfilled, (state, action) => {
        state.status = "succeeded";
        cancellationsAdapter.setAll(state, action.payload);
      })
      .addCase(getCancellations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const getCancellations = createAsyncThunk<
  Order[],
  undefined,
  { state: RootState; rejectValue: RejectErrorPayload }
>(
  "cancellations/getCancellations",
  async (_arg, { getState, rejectWithValue }) => {
    try {
      const loggedInUser = getState().auth.user;
      if (!loggedInUser) {
        throw new Error("Login is required to cancel order");
      }
      const { _id: userId, token } = loggedInUser;
      return await orderServices.getCancellations({ userId, token });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data as RejectErrorPayload);
      }
      throw err;
    }
  }
);

export default cancellationsSlice.reducer;

export const {
  selectAll: selectAllCancellations,
  selectById: selectCancellationById,
} = cancellationsAdapter.getSelectors(
  (state: RootState) => state.cancellations
);

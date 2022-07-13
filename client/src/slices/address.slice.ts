import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import addressService from "../services/address.service";
import { Address, RejectErrorPayload, RequestStatus } from "../types";

interface AddressState {
  status: RequestStatus;
  error?: string;
}

const addressesAdapter = createEntityAdapter<Address>();

const initialState = addressesAdapter.getInitialState({
  status: "idle",
} as AddressState);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAddresses.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        addressesAdapter.setAll(state, payload);
      })
      .addCase(getAllAddresses.rejected, (state, { payload, error }) => {
        state.status = "failed";
        state.error = payload?.errorMessage || error.message;
      })
      .addCase(createAddress.fulfilled, addressesAdapter.addOne)
      .addCase(updateAddress.fulfilled, addressesAdapter.upsertOne)
      .addCase(deleteAddress.fulfilled, addressesAdapter.removeOne);
  },
});

// TODO: refactor the mutual pattern for get auth token & error handling into a reusable function

export const getAllAddresses = createAsyncThunk<
  Address[],
  undefined,
  { state: RootState; rejectValue: RejectErrorPayload }
>("addresses/getAllAddresses", async (_arg, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      return await addressService.fetchAllAddresses(loggedUser.token);
    } else {
      throw new Error("Login is required to fetch addresses");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

export const createAddress = createAsyncThunk<
  Address,
  Omit<Address, "id">,
  { state: RootState; rejectValue: RejectErrorPayload }
>(
  "addresses/createAddress",
  async (newAddress, { getState, rejectWithValue }) => {
    try {
      const loggedUser = getState().auth.user;
      if (loggedUser) {
        return await addressService.createNewAddress(
          loggedUser.token,
          newAddress
        );
      } else {
        throw new Error("Login is required to create new address");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as RejectErrorPayload);
      } else {
        throw error;
      }
    }
  }
);

export const updateAddress = createAsyncThunk<
  Address,
  Address,
  { state: RootState; rejectValue: RejectErrorPayload }
>(
  "addresses/updateAddress",
  async (addressData, { getState, rejectWithValue }) => {
    try {
      const loggedUser = getState().auth.user;
      if (loggedUser) {
        return await addressService.updateAddress(
          loggedUser.token,
          addressData
        );
      } else {
        throw new Error("Login is required to update address");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as RejectErrorPayload);
      } else {
        throw error;
      }
    }
  }
);

export const deleteAddress = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: RejectErrorPayload }
>(
  "addresses/deleteAddress",
  async (addressId, { getState, rejectWithValue }) => {
    try {
      const loggedUser = getState().auth.user;
      if (loggedUser) {
        return await addressService.deleteAddress(loggedUser.token, addressId);
      } else {
        throw new Error("Login is required to delete address");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as RejectErrorPayload);
      } else {
        throw error;
      }
    }
  }
);

export default addressSlice.reducer;

export const {
  selectAll: selectAllAddresses,
  selectById: selectAddressById,
  selectIds: selectAddressIds,
} = addressesAdapter.getSelectors<RootState>((state) => state.addresses);

export const selectAddressesRequestStatus = (state: RootState) =>
  state.addresses.status;
export const selectAddressesRequestError = (state: RootState) =>
  state.addresses.error;

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import userServices, {
  User,
  Address,
  UpdatePasswordPayload,
} from "services/user.service";
import { RejectErrorPayload } from "types";

interface ProfileState {
  data?: User;
}

const profileSlice = createSlice({
  name: "profile",
  initialState: {} as ProfileState,
  reducers: {
    clearProfile: () => ({}),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (_state, action) => ({
        data: action.payload,
      }))
      .addCase(updateProfile.fulfilled, (_state, action) => ({
        data: action.payload,
      }))
      .addCase(addNewAddress.fulfilled, (_state, action) => ({
        data: action.payload,
      }))
      .addCase(updateAddress.fulfilled, (_state, action) => ({
        data: action.payload,
      }))
      .addCase(removeAddress.fulfilled, (_state, action) => ({
        data: action.payload,
      }));
  },
});

/**
 * Thunk Creators Definition
 */

export const fetchUserProfile = createAsyncThunk<
  User,
  undefined,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/fetch", async (_arg, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      const { _id: userId, token } = loggedUser;
      return await userServices.getUserById({ userId, token });
    } else {
      throw new Error("Login is required before fetching profile");
    }
  } catch (error: unknown) {
    /*
      the reject value would be assign in `action.payload` (in reducer corresponding to rejected action)
      if don't explicitly returns the reject value, the `error` would be converted to SerializedError & be assigned to action.error
    */
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

export const updateProfile = createAsyncThunk<
  User,
  Partial<User>,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/update", async (payload, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      const { _id: userId, token } = loggedUser;
      return await userServices.updateUserById({
        userId,
        token,
        payload,
      });
    } else {
      throw new Error("Login is required before updating profile information");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

export const updatePassword = createAsyncThunk<
  User,
  UpdatePasswordPayload,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/updatePassword", async (payload, { getState, rejectWithValue }) => {
  try {
    const loggedInUser = getState().auth.user;
    if (loggedInUser) {
      const { _id: userId, token } = loggedInUser;
      return await userServices.updatePassword({ userId, token, payload });
    } else {
      throw new Error("Login is required before updating password");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

/**
 * Address
 */

export const addNewAddress = createAsyncThunk<
  User,
  { newAddress: Omit<Address, "_id">; isDefault: boolean },
  { state: RootState }
>("profile/addNewAddress", async ({ newAddress, isDefault }, { getState }) => {
  const loggedInUser = getState().auth.user;
  if (!loggedInUser) {
    throw new Error("login is required");
  }
  const { _id: userId, token } = loggedInUser;
  return await userServices.addNewAddress({
    userId,
    token,
    newAddress,
    isDefault,
  });
});

export const updateAddress = createAsyncThunk<
  User,
  { addressId: string; addressUpdate: Partial<Address>; isDefault?: boolean },
  { state: RootState }
>(
  "profile/updateAddress",
  async ({ addressId, addressUpdate, isDefault }, { getState }) => {
    const loggedInUser = getState().auth.user;
    if (!loggedInUser) {
      throw new Error("login is required");
    }
    const { _id: userId, token } = loggedInUser;
    return await userServices.updateAddress({
      userId,
      token,
      addressId,
      addressUpdate,
      isDefault,
    });
  }
);

export const removeAddress = createAsyncThunk<
  User,
  string,
  { state: RootState }
>("profile/removeAddress", async (addressId, { getState }) => {
  const loggedInUser = getState().auth.user;
  if (!loggedInUser) {
    throw new Error("login is required");
  }
  const { _id: userId, token } = loggedInUser;
  return await userServices.removeAddress({ userId, token, addressId });
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;

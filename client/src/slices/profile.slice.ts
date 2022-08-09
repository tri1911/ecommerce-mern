import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import profileServices, {
  UserProfile,
  UpdatePasswordPayload,
} from "services/profile.service";
import { RejectErrorPayload } from "types";

interface ProfileState {
  data?: UserProfile;
}

const initialState = {
  fetchStatus: { status: "idle" },
  updateStatus: { status: "idle" },
  updatePasswordStatus: { status: "idle" },
} as ProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileInfo.fulfilled, (_state, action) => ({
        data: action.payload,
      }))
      .addCase(updateProfile.fulfilled, (_state, action) => ({
        data: action.payload,
      }));
  },
});

/**
 * Thunk Creators Definition
 */

export const fetchProfileInfo = createAsyncThunk<
  UserProfile,
  undefined,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/fetch", async (_arg, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      const { _id: userId, token } = loggedUser;
      return await profileServices.getProfileInfo({ userId, token });
    } else {
      throw new Error("Login is required before fetching profile");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

export const updateProfile = createAsyncThunk<
  UserProfile,
  Partial<UserProfile>,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/update", async (payload, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      const { _id: userId, token } = loggedUser;
      return await profileServices.updateProfileInfo({
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
  UserProfile,
  UpdatePasswordPayload,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/updatePassword", async (payload, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      const { _id: userId, token } = loggedUser;
      return await profileServices.updatePassword({ userId, token, payload });
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

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;

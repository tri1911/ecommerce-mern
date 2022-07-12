import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import profileService, {
  UpdatePasswordInfo,
} from "../services/profile.service";
import { RejectErrorPayload, UserProfile } from "../types";

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
      .addCase(fetchProfileInfo.fulfilled, (_, { payload }) => ({
        data: payload,
      }))
      .addCase(updateProfile.fulfilled, (_, { payload }) => ({
        data: payload,
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
      return await profileService.getProfileInfo(loggedUser.token);
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
  UserProfile,
  { state: RootState; rejectValue: RejectErrorPayload }
>("profile/update", async (profileUpdate, { getState, rejectWithValue }) => {
  try {
    const loggedUser = getState().auth.user;
    if (loggedUser) {
      return await profileService.updateProfileInfo(
        loggedUser.token,
        profileUpdate
      );
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
  string,
  UpdatePasswordInfo,
  { state: RootState; rejectValue: RejectErrorPayload }
>(
  "profile/updatePassword",
  async (passwordUpdate, { getState, rejectWithValue }) => {
    try {
      const loggedUser = getState().auth.user;
      if (loggedUser) {
        return await profileService.updatePassword(
          loggedUser.token,
          passwordUpdate
        );
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
  }
);

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;

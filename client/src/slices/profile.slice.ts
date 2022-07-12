import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import profileService from "../services/profile.service";
import { RejectErrorPayload, UserProfile } from "../types";

interface ProfileState {
  data?: UserProfile;
}

const profileSlice = createSlice({
  name: "profile",
  initialState: { data: undefined } as ProfileState,
  reducers: {},
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
      throw new Error("Login is required to fetch profile");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else if (error instanceof Error) {
      return rejectWithValue({ errorMessage: error.message });
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
      throw new Error("Login is required to update profile");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else if (error instanceof Error) {
      return rejectWithValue({ errorMessage: error.message });
    } else {
      throw error;
    }
  }
});

export default profileSlice.reducer;

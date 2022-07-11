import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import profileService from "../services/profile.service";
import { RejectErrorPayload, RequestStatus, UserProfile } from "../types";

interface ProfileState extends RequestStatus {
  data?: UserProfile;
}

const profileSlice = createSlice({
  name: "profile",
  initialState: { status: "idle" } as ProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileInfo.fulfilled, (_state, { payload }) => ({
        status: "succeeded",
        data: payload,
      }))
      .addCase(fetchProfileInfo.rejected, (_, { payload, error }) => ({
        status: "failed",
        error: payload?.errorMessage || error.message,
      }))
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.data = payload;
      });
  },
});

export const fetchProfileInfo = createAsyncThunk<
  UserProfile,
  string,
  { rejectValue: RejectErrorPayload }
>("profile/fetch", async (token, thunkApi) => {
  try {
    return await profileService.getProfileInfo(token);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data as RejectErrorPayload
      );
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

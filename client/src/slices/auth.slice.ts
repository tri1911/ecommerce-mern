import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService, {
  UserCredential,
  UserRegistrationInfo,
} from "../services/auth.service";
import { RejectErrorPayload, RequestStatus, AuthInfo } from "../types";

export const login = createAsyncThunk<
  AuthInfo,
  UserCredential,
  { rejectValue: RejectErrorPayload }
>("auth/login", async (credential, thunkApi) => {
  try {
    return await AuthService.login(credential);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data as RejectErrorPayload
      );
    } else {
      throw error;
    }
  }
});

export const register = createAsyncThunk<
  AuthInfo,
  UserRegistrationInfo,
  { rejectValue: RejectErrorPayload }
>("auth/register", async (newUser, thunkApi) => {
  try {
    return await AuthService.register(newUser);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkApi.rejectWithValue(
        error.response?.data as RejectErrorPayload
      );
    } else {
      throw error;
    }
  }
});

export const logout = createAsyncThunk("auth/logout", () => {
  AuthService.logout();
});

type AuthState = RequestStatus & { user?: AuthInfo };

const userSlice = createSlice({
  name: "auth",
  initialState: { status: "idle" } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, () => ({ status: "loading" }))
      .addCase(login.fulfilled, (_, { payload }) => ({
        status: "succeeded",
        user: payload,
      }))
      .addCase(login.rejected, (_, action) => ({
        status: "failed",
        error: action.payload?.errorMessage || action.error.message,
      }))
      .addCase(register.pending, () => ({ status: "loading" }))
      .addCase(register.fulfilled, (_, { payload }) => ({
        status: "succeeded",
        user: payload,
      }))
      .addCase(register.rejected, (_, action) => ({
        status: "failed",
        error: action.payload?.errorMessage || action.error.message,
      }))
      .addCase(logout.fulfilled, () => ({ status: "idle" }));
  },
});

export default userSlice.reducer;

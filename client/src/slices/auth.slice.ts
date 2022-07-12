import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authService, {
  UserCredential,
  UserRegistrationInfo,
  USER_AUTH_KEY,
} from "../services/auth.service";
import { RejectErrorPayload, RequestStatus, AuthInfo } from "../types";

/**
 * Slice Configuration
 */

const loggedInUserFromLocalStorage = localStorage.getItem(USER_AUTH_KEY);

interface AuthState {
  user?: AuthInfo;
  loginStatus: {
    status: RequestStatus;
    error?: string;
  };
  registerStatus: {
    status: RequestStatus;
    error?: string;
  };
}

const initialState = {
  user:
    loggedInUserFromLocalStorage !== null
      ? JSON.parse(loggedInUserFromLocalStorage)
      : undefined,
  loginStatus: { status: "idle" },
  registerStatus: { status: "idle" },
} as AuthState;

const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = { status: "loading" };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = { status: "succeeded" };
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = {
          status: "failed",
          error: action.payload?.errorMessage || action.error.message,
        };
      })
      .addCase(register.pending, (state) => {
        state.registerStatus = { status: "loading" };
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = { status: "succeeded" };
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = {
          status: "failed",
          error: action.payload?.errorMessage || action.error.message,
        };
      })
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      });
  },
});

/**
 * Thunk Creator Definition
 */

export const login = createAsyncThunk<
  AuthInfo,
  UserCredential,
  { rejectValue: RejectErrorPayload }
>("auth/login", async (credential, thunkApi) => {
  try {
    return await authService.login(credential);
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
>("auth/register", async (userData, thunkApi) => {
  try {
    return await authService.register(userData);
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
  authService.logout();
});

export default userSlice.reducer;

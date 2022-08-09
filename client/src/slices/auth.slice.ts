import axios from "axios";
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import authServices, {
  AuthInfo,
  UserCredential,
  UserPayload,
  USER_AUTH_KEY,
} from "services/auth.service";
import { RejectErrorPayload, RequestStatus } from "types";
import { clearProfile } from "slices/profile.slice";

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

const defaultState = {
  loginStatus: { status: "idle" },
  registerStatus: { status: "idle" },
} as AuthState;

const initialState = {
  user:
    loggedInUserFromLocalStorage !== null
      ? JSON.parse(loggedInUserFromLocalStorage)
      : undefined,
  loginStatus: { status: "idle" },
  registerStatus: { status: "idle" },
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuthState: () => defaultState,
  },
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
          error: action.payload?.message || action.error.message,
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
          error: action.payload?.message || action.error.message,
        };
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
    return await authServices.login(credential);
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

export const loginWithGoogleOAuth = createAsyncThunk<
  AuthInfo,
  undefined,
  { rejectValue: RejectErrorPayload }
>("auth/google", async (_arg, thunkApi) => {
  try {
    return await authServices.loginWithOAuth("google");
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

export const loginWithFacebookOAuth = createAsyncThunk<
  AuthInfo,
  undefined,
  { rejectValue: RejectErrorPayload }
>("auth/facebook", async (_arg, thunkApi) => {
  try {
    return await authServices.loginWithOAuth("facebook");
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
  UserPayload,
  { rejectValue: RejectErrorPayload }
>("auth/register", async (userData, thunkApi) => {
  try {
    return await authServices.register(userData);
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

export const logout =
  (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
    authServices.logout();
    dispatch(resetAuthState());
    dispatch(clearProfile());
  };

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;

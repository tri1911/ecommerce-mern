import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { compareDesc } from "date-fns";
import reviewServices, { type UserReview } from "services/review.service";
import userServices from "services/user.service";
import { RejectErrorPayload, RequestStatus } from "types";

const reviewsAdapter = createEntityAdapter<UserReview>({
  selectId: (review) => review._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
});

interface ReviewsState {
  status: RequestStatus;
  error?: string;
}

const reviewSlice = createSlice({
  name: "reviews",
  initialState: reviewsAdapter.getInitialState<ReviewsState>({
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        reviewsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(createReview.fulfilled, reviewsAdapter.addOne);
  },
});

export interface CreateReviewPayload {
  order: string;
  purchasedAt: string;
  product: string;
  rating: number;
  desc: string;
}

export const createReview = createAsyncThunk<
  UserReview,
  CreateReviewPayload,
  { state: RootState; rejectValue: RejectErrorPayload }
>("reviews/createReview", async (payload, { getState, rejectWithValue }) => {
  try {
    const loggedInUser = getState().auth.user;
    if (!loggedInUser) {
      throw new Error("Login is required");
    }
    const token = loggedInUser.token;
    return await reviewServices.createReview({ token, ...payload });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

export const fetchUserReviews = createAsyncThunk<
  UserReview[],
  undefined,
  { state: RootState; rejectValue: RejectErrorPayload }
>("reviews/fetchUserReviews", async (_arg, { getState, rejectWithValue }) => {
  try {
    const loggedInUser = getState().auth.user;
    if (!loggedInUser) {
      throw new Error("Login is required");
    }
    const { _id, token } = loggedInUser;
    return await userServices.fetchUserReviews(_id, token);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as RejectErrorPayload);
    } else {
      throw error;
    }
  }
});

export default reviewSlice.reducer;

export const {
  selectAll: selectAllReviews,
  selectById: selectReviewById,
  selectIds: selectReviewIds,
  selectTotal: selectTotalReviews,
} = reviewsAdapter.getSelectors((state: RootState) => state.reviews);

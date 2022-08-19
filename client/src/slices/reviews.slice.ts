import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { compareDesc } from "date-fns";
import reviewServices, {
  type UserReview,
  type ReviewPayload,
  type UpdateReviewPayload,
} from "services/review.service";
import userServices from "services/user.service";
import { RejectErrorPayload, RequestStatus } from "types";

const reviewsAdapter = createEntityAdapter<UserReview>({
  // set key of each review be its associated product id (not id itself)
  selectId: (review) => review.product._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
});

interface ReviewsState {
  // this is the fetchUserReviews request status
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
      .addCase(createReview.fulfilled, reviewsAdapter.addOne)
      .addCase(updateReview.fulfilled, (state, action) => {
        reviewsAdapter.updateOne(state, {
          id: action.payload.product._id,
          changes: action.payload,
        });
      });
  },
});

export const createReview = createAsyncThunk<
  UserReview,
  ReviewPayload,
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
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectErrorPayload);
    }
    throw error;
  }
});

export const updateReview = createAsyncThunk<
  UserReview,
  UpdateReviewPayload,
  { state: RootState; rejectValue: RejectErrorPayload }
>("reviews/updateReview", async (update, { getState, rejectWithValue }) => {
  try {
    const loggedInUser = getState().auth.user;
    if (!loggedInUser) {
      throw new Error("Login is required");
    }
    const token = loggedInUser.token;
    return await reviewServices.updateReview({ token, ...update });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as RejectErrorPayload);
    }
    throw error;
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
} = reviewsAdapter.getSelectors<RootState>((state) => state.reviews);

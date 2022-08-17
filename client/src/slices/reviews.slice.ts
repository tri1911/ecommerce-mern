import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { compareDesc } from "date-fns";
import reviewServices, { type Review } from "services/review.service";
import { RejectErrorPayload, RequestStatus } from "types";

const reviewsAdapter = createEntityAdapter<Review>({
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
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        reviewsAdapter.addOne(state, action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const createReview = createAsyncThunk<
  Review,
  Pick<Review, "order" | "purchasedAt" | "product" | "rating" | "desc">,
  { state: RootState; rejectValue: RejectErrorPayload }
>("reviews/createReview", async (payload, { getState, rejectWithValue }) => {
  try {
    const loggedInUser = getState().auth.user;
    if (!loggedInUser) {
      throw new Error("login is required.");
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

export default reviewSlice.reducer;

export const {
  selectEntities: selectAllReviews,
  selectById: selectReviewById,
  selectIds: selectReviewIds,
  selectTotal: selectTotalReviews,
} = reviewsAdapter.getSelectors((state: RootState) => state.reviews);

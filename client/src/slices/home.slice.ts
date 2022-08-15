import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "types";
import { Product } from "services/category.service";
import productServices from "services/product.service";

interface HomeState {
  status: RequestStatus;
  newArrivals: Product[];
  recommendations: Product[];
  topRated: Product[];
}

const initialState: HomeState = {
  status: "idle",
  newArrivals: [],
  recommendations: [],
  topRated: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewProducts.fulfilled, (_state, action) => ({
        status: "succeeded",
        newArrivals: action.payload.newArrivals,
        recommendations: action.payload.recommendations,
        topRated: action.payload.topRated,
      }));
  },
});

export const getNewProducts = createAsyncThunk(
  "home/getNewProducts",
  async ({
    newArrivalsLimit,
    recommendationsLimit,
    topRatedLimit,
  }: {
    newArrivalsLimit: number;
    recommendationsLimit: number;
    topRatedLimit: number;
  }) => {
    const newArrivals = await productServices.getNewProducts(newArrivalsLimit);
    const recommendations = await productServices.getRecommendedProducts(
      recommendationsLimit
    );
    const topRated = await productServices.getTopRatedProducts(topRatedLimit);
    return { newArrivals, recommendations, topRated };
  }
);

export default homeSlice.reducer;

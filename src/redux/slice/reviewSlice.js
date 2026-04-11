import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ CREATE REVIEW
export const createReview = createAsyncThunk(
  "api/reviews/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/reviews`,

        reviewData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating review");
    }
  },
);

// ✅ GET REVIEWS BY PRODUCT ID
export const fetchReview = createAsyncThunk(
  "api/reviews/fetchByProductId",
  async (ProductId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/reviews/${ProductId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating review");
    }
  },
);

// Review Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetReviewState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ✅ Fetch Reviews by Product ID (GET)
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Create Review (POST)
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviews.unshift(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
export const { resetReviewState } = reviewSlice.actions;

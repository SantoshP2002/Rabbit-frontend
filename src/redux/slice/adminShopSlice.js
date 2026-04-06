import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// GET SHOP DETAILS (Admin Shop Only) (GET)
export const fetchGetShop = createAsyncThunk(
  "adminShop/fetchGetShop",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/shop`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  },
);

// UPDATE SHOP DETAILS (Admin Shop Only) (PUT)
export const fetchUpdateShop = createAsyncThunk(
  "adminShop/fetchUpdateShop",
  async (shopData) => {
    const response = await axios.put(`${API_URL}/api/admin/shop`, shopData, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });

    return response.data;
    //   toast.success("Shop details updated successfully!");
  },
);

// GET SHOP STATS (Admin Shop Only) (GET)
export const fetchGetShopStats = createAsyncThunk(
  "adminShop/fetchGetShopStats",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/shop/stats`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  },
);

const adminShopSlice = createSlice({
  name: "adminShop",
  initialState: {
    shop: {},
    stats: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetShop.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(fetchUpdateShop.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(fetchGetShopStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default adminShopSlice.reducer;

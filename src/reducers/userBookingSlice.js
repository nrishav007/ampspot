import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  userBookings: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getUserBookings = createAsyncThunk(
  "getUserBookings",
  async (accessToken, thunkAPI) => {
    try {
      return await userServices.getUserDjsBookings(accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createRatingsAndReview = createAsyncThunk(
  "createRatingsAndReview",
  async (userProfile, thunkAPI) => {
    try {
      return await userServices.createRatingsReview(
        userProfile.reviewAndRatings,
        userProfile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userBookingslice = createSlice({
  name: "userBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBookings = action.payload;
        state.isSuccess = true;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default userBookingslice.reducer;

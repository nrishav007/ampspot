import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  bookingRequest: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getPendingBookingRequest = createAsyncThunk(
  "getPendingRequest",
  async (accessToken, thunkAPI) => {
    try {
      return await userServices.getPendingRequest(accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAcceptedBookingRequest = createAsyncThunk(
  "getAcceptedRequest",
  async (accessToken, thunkAPI) => {
    try {
      return await userServices.getAcceptedRequest(accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateBookingRequest = createAsyncThunk(
  "updateBookingRequest",
  async (bookingStatus, thunkAPI) => {
    try {
      return await userServices.updateBookingStatus(
        bookingStatus.status,
        bookingStatus.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const bookingRequestSlice = createSlice({
  name: "bookingRequest",
  initialState,
  reducers: {
    // updateLoadingState(state, action) {
    //   state.isLoading = true;
    // },
  },
  extraReducers: (builder) => {
    //pending request
    builder
      .addCase(getPendingBookingRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPendingBookingRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingRequest = action.payload;
        state.isSuccess = true;
      })
      .addCase(getPendingBookingRequest.rejected, (state, action) => {
        state.isError = true;
        // state.isLoading = false;
        state.message = action.payload;
      })
      //accepted request
      .addCase(getAcceptedBookingRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcceptedBookingRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingRequest = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAcceptedBookingRequest.rejected, (state, action) => {
        state.isError = true;
        // state.isLoading = false;
        state.message = action.payload;
      });
    // .addCase(updateBookingRequest.fulfilled, (state, action) => {
    //   state.isError = true;
    //   // state.isLoading = false;
    //   state.message = action.payload;
    // });
  },
});

export default bookingRequestSlice.reducer;

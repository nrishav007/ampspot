import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  djList: [],
  djDetails: {},
  djOfTheWeek: {},
  djRatingsAndReview: [],
  page: 5,
  isLoading: false,
  isReviewLoading: true,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getDjList = createAsyncThunk(
  "getDjList",
  async (accessToken, thunkAPI) => {
    try {
      return await userServices.getDjUsersList(accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getDjOfTheWeek = createAsyncThunk(
  "getDjOfTheWeek",
  async (accessToken, thunkAPI) => {
    try {
      return await userServices.getUserDjOfTheWeek(accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getDjById = createAsyncThunk(
  "getDjById",
  async (djId, thunkAPI) => {
    try {
      return await userServices.getDjUserById(djId.id, djId.accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createDjBooking = createAsyncThunk(
  "createDjBooking",
  async (djId, thunkAPI) => {
    try {
      return await userServices.createDjBookingById(
        djId.bookingDeatils,
        djId.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getRagtingsAndReview = createAsyncThunk(
  "getRagtingsAndReview",
  async (djId, thunkAPI) => {
    try {
      return await userServices.getRagtingsReview(djId.id, djId.accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const applyFilter = createAsyncThunk(
  "applyFilter",
  async (filter, thunkAPI) => {
    try {
      return await userServices.getFilterItems(
        filter.selectedItems,
        filter.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const djProfiles = createSlice({
  name: "djList",
  initialState,
  reducers: {
    updateDjList(state, action) {
      state.page = action.payload + 6;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDjList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDjList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { data } = action.payload;
        state.djList = data.dj;
      })
      .addCase(getDjList.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDjOfTheWeek.fulfilled, (state, action) => {
        const {
          data: { djOfWeek },
        } = action.payload;
        state.djOfTheWeek = djOfWeek;
      })
      .addCase(getDjById.fulfilled, (state, action) => {
        const {
          data: { dj },
        } = action.payload;
        state.djDetails = dj;
      })
      .addCase(getRagtingsAndReview.pending, (state, action) => {
        state.isReviewLoading = true;
      })
      .addCase(getRagtingsAndReview.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        const {
          data: { rating },
        } = action.payload;
        state.djRatingsAndReview = rating;
      })
      .addCase(applyFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(applyFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { data } = action.payload;
        state.djList = data.dj;
      })
      .addCase(applyFilter.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { updateDjList } = djProfiles.actions;
export default djProfiles.reducer;

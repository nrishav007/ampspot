import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  djCalendarList: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  isSuccess: false,
};

export const getCalendarForUser = createAsyncThunk(
  "getCalendarForUser",
  async (selectedDjId, thunkAPI) => {
    try {
      return await userServices.getDjCalendarForUser(
        selectedDjId.djId,
        selectedDjId.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getCalendarForDjProfile = createAsyncThunk(
  "getCalendarForDjProfile",
  async (currentUser, thunkAPI) => {
    try {
      return await userServices.getDjCalendarForDjUser(
        currentUser.currentUserId,
        currentUser.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "deleteBooking",
  async (userBooking, thunkAPI) => {
    try {
      return await userServices.deleteDjBooking(
        userBooking.bookingId,
        userBooking.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createDjOff = createAsyncThunk(
  "createDjOff",
  async (djOff, thunkAPI) => {
    try {
      return await userServices.createDjOffBooking(
        djOff.djIdAndDate,
        djOff.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarForUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCalendarForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const {
          data: { djBooking },
        } = action.payload;
        state.djCalendarList = djBooking.map((booking) => {
          const [day, month, year] = booking.date.split("/");
          const newDate = `${year}-${month}-${day}`;
          return {
            ...booking,
            date: newDate,
          };
        });
      })
      .addCase(getCalendarForUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(getCalendarForDjProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCalendarForDjProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const {
          data: { djBooking },
        } = action.payload;
        state.djCalendarList = djBooking.map((booking) => {
          const [day, month, year] = booking.date.split("/");
          const newDate = `${year}-${month}-${day}`;
          return {
            ...booking,
            date: newDate,
          };
        });
      })
      .addCase(getCalendarForDjProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

// export const {

// } = calendarSlice.actions;

export default calendarSlice.reducer;

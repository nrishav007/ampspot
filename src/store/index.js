import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import userReducer from "../reducers/userSlice";
import djProfilesReducer from "../reducers/djListSlice";
import bookingRequestReducer from "../reducers/bookingRequestSlice";
import userBookingReducer from "../reducers/userBookingSlice";
import messagesReducer from "../reducers/messageSlice";
import messageLoadingReducer from "../reducers/messageLoadingSlice";
import calendarBookingReducer from "../reducers/calendarBookingSlice";
import djChartReducer from "../reducers/djChartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentUser: userReducer,
    djProfiles: djProfilesReducer,
    bookingRequest: bookingRequestReducer,
    userBookings: userBookingReducer,
    messages: messagesReducer,
    loadMessages: messageLoadingReducer,
    calendarBookingList: calendarBookingReducer,
    djChart: djChartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;

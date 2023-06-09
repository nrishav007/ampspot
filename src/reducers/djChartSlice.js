import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";
import { getMonth } from "date-fns";

const initialState = {
  djChart: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  isSuccess: false,
};

export const getDjChart = createAsyncThunk(
  "getDjChart",
  async (djUser, thunkAPI) => {
    try {
      return await userServices.getDjGraph(djUser.djId, djUser.accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const djChartSlice = createSlice({
  name: "djChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDjChart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDjChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const {
          data: { djBooking },
        } = action.payload;
        const dates = djBooking.map((booking) => {
          const [day, month, year] = booking.date.split("/");
          const date = `${year}-${month}-${day}`;
          return date;
        });

        let totalGigsPerMonth = new Array(12).fill(0);
        for (let i = 0; i < dates.length; i++) {
          totalGigsPerMonth[getMonth(new Date(dates[i]))] += 1;
        }

        const maxGigsInAYear = totalGigsPerMonth.reduce((a, b) => {
          return Math.max(a, b);
        });

        const djData = {
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
          datasets: [
            {
              type: "bar",
              label: "Bar Dataset",
              data:
                maxGigsInAYear === 0
                  ? [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
                  : new Array(12).fill(maxGigsInAYear * 2),
              borderRadius: 10,
              backgroundColor: "rgba(0, 122, 255, 0.21)",
              barThickness:
                window.innerWidth <= 1250
                  ? window.innerWidth <= 500
                    ? 10
                    : 30
                  : window.innerWidth >= 1500
                  ? 72
                  : 60,
              hoverBackgroundColor: "rgba(0, 122, 255, 0.51)",
            },
            {
              type: "line",
              label: "Line Dataset",
              data: totalGigsPerMonth,
              fill: false,
              borderColor: "rgba(0, 122, 255, 1)",
              pointHoverBackgroundColor: "rgba(0, 122, 255, 1)",
              pointerWidth: 5,
              pointRadius: 0,
              pointHoverRadius: 10,
            },
          ],
        };
        state.djChart = djData;
      })
      .addCase(getDjChart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export default djChartSlice.reducer;

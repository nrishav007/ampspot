import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authServices";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  currentUser: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const setUserPlug = createAsyncThunk(
  "auth/registerUserPlug",
  async (user, thunkAPI) => {
    try {
      return await authService.setPlug(user.plugs, user.accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const setUserProfile = createAsyncThunk(
  "auth/registerUserProfile",
  async (userProfile, thunkAPI) => {
    try {
      return await authService.setProfile(
        userProfile.profile,
        userProfile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // might not neccessary
      .addCase(setUserPlug.fulfilled, (state, action) => {
        state.isSuccess = true;
      })

      .addCase(setUserProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

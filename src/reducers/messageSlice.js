import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  messageList: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  isSuccess: false,
};

export const sendMessageToDj = createAsyncThunk(
  "sendMessageToDj",
  async (messageDj, thunkAPI) => {
    try {
      return await userServices.sendUserMessageToDj(
        messageDj.messageToDj,
        messageDj.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const getUserMessagesList = createAsyncThunk(
  "getUserMessagesList",
  async (djProfile, thunkAPI) => {
    try {
      return await userServices.getAllUserMessagesList(
        djProfile.currentUserId,
        djProfile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getDjMessagesList = createAsyncThunk(
  "getDjMessagesList",
  async (userPrfoile, thunkAPI) => {
    try {
      return await userServices.getAllDjMessagesList(
        userPrfoile.currentUserId,
        userPrfoile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateReaction = createAsyncThunk(
  "updateReaction",
  async (updateReaction, thunkAPI) => {
    try {
      return await userServices.updateCurrentUserReaction(
        updateReaction.updateCurrentUserReaction,
        updateReaction.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserMessagesList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserMessagesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const {
          data: { messageList },
        } = action.payload;
        state.messageList = messageList;
      })
      .addCase(getUserMessagesList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(getDjMessagesList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDjMessagesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const {
          data: { messageList },
        } = action.payload;
        state.messageList = messageList;
      })
      .addCase(getDjMessagesList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  addCurrentUsersMessage,
  resetAllMessages,
  updateMessageReaction,
} = messageSlice.actions;

export default messageSlice.reducer;

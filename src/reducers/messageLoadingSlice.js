import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  allMessages: [],
  messPerLoad: 10,
  isMessLoading: false,
  isMessErr: false,
  errMess: "",
  isMessSuccess: false,
};

export const getAllTheMessages = createAsyncThunk(
  "getAllTheMessages",
  async (messageId, thunkAPI) => {
    try {
      return await userServices.getAllMessages(
        messageId.userMessageId,
        messageId.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const messageLoadingSlice = createSlice({
  name: "messageLoading",
  initialState,
  reducers: {
    addCurrentUsersMessage(state, action) {
      state.allMessages.unshift(action.payload);
    },
    updateMessageReaction(state, action) {
      const { messageId } = action.payload;
      state.allMessages = state.allMessages.map((mess) => {
        if (messageId === mess._id)
          return { ...mess, reaction: !mess.reaction };
        return mess;
      });
    },
    openPreviousMessages(state, action) {
      state.messPerLoad = action.payload + 10;
    },
    resetLoadMessages(state, action) {
      state.allMessages = [];
      state.isMessLoading = false;
      state.messPerLoad = 10;
      state.isMessErr = "";
      state.errMess = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTheMessages.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getAllTheMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          data: { messages },
        } = action.payload;
        state.allMessages = messages.reverse();
        state.isSuccess = true;
      })
      .addCase(getAllTheMessages.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  openPreviousMessages,
  resetLoadMessages,
  addCurrentUsersMessage,
  updateMessageReaction,
} = messageLoadingSlice.actions;
export default messageLoadingSlice.reducer;

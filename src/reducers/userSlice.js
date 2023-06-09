import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../services/userServices";

const initialState = {
  currentUser: null,
  soundTags: [],
  isLoading: {
    userProfileLoading: false,
    userPassLoading: false,
    soundTagsLoading: false,
    createDjLoading: false,
  },
  isSuccess: false,
  isError: false,
  message: "",
};

export const getCurrentUser = createAsyncThunk(
  "currentUser",
  async (user, thunkAPI) => {
    try {
      return await userServices.getUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateCurrentUser",
  async (userProfile, thunkAPI) => {
    try {
      return await userServices.upateProfile(
        userProfile.profile,
        userProfile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const updateUserProfileImage = createAsyncThunk(
  "updateCurrentUserImage",
  async (userProfile, thunkAPI) => {
    try {
      return await userServices.upateProfileImage(
        userProfile.fb,
        userProfile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateProfilePass = createAsyncThunk(
  "updateProfilePass",
  async (userProfile, thunkAPI) => {
    try {
      return await userServices.updatePass(
        userProfile.passwordUpdate,
        userProfile.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const createDjWeek = createAsyncThunk(
  "createDjWeek",
  async (djUser, thunkAPI) => {
    try {
      return await userServices.createDj(djUser.djProfile, djUser.accessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const setSounds = createAsyncThunk(
  "setSounds",
  async (userSounds, thunkAPI) => {
    try {
      return await userServices.setUserSounds(
        userSounds.selectTag,
        userSounds.accessToken
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "CurrentUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        let tags = [];
        const {
          data: { user },
        } = action.payload;
        for (let i = 1; i <= 12; i++) {
          if (user.hasOwnProperty(`sp${i}`)) {
            let key = `sp${i}`;
            tags.push({ [key]: user[`sp${i}`] });
          }
        }
        state.soundTags = tags;
        state.currentUser = action.payload;
        state.isSuccess = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setSounds.pending, (state) => {
        state.isLoading.soundTagsLoading = true;
      })
      .addCase(setSounds.fulfilled, (state, action) => {
        state.isLoading.soundTagsLoading = false;
      })
      .addCase(setSounds.rejected, (state, action) => {
        state.isLoading.soundTagsLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading.userProfileLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading.userProfileLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading.userProfileLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createDjWeek.pending, (state) => {
        state.isLoading.createDjLoading = true;
      })
      .addCase(createDjWeek.fulfilled, (state, action) => {
        state.isLoading.createDjLoading = false;
      })
      .addCase(createDjWeek.rejected, (state, action) => {
        state.isLoading.createDjLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfilePass.pending, (state) => {
        state.isLoading.userPassLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateProfilePass.fulfilled, (state, action) => {
        state.isLoading.userPassLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateProfilePass.rejected, (state, action) => {
        state.isLoading.userPassLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default userSlice.reducer;

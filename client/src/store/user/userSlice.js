import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { isAuthenticated } from "../../api/user-api";

axios.defaults.withCredentials = true;

const fetchCurrentUser = createAsyncThunk(
  "setUser/fetchCurrentUser",
  async () => {
    const response = await isAuthenticated();
    return response;
  }
);

export const initializeUser = () => {
  return async (dispatch) => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (err) {
      console.log(err);
    }
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userInfo: {},
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload.message === "Unauthorized!") {
          state.loggedIn = false;
          state.userInfo = {};
        } else if (action.payload.user) {
          state.loggedIn = true;
          state.userInfo = action.payload.user;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loggedIn = false;
        state.userInfo = {};
        console.log(action.error);
      });
  },
});

export const selectLoggedIn = (state) => state.user.loggedIn;
export const selectUserInfo = (state) => state.user.userInfo;

export const { setLoggedIn, setUserInfo } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { decreaseFollowCount } from "./AuthSlice";

const initialState = {
  loading: false,
  users: [],
};

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (payload.token) {
      config.headers["x-auth-token"] = payload.token;
    }
    return axios.get(
      `/api/search/${encodeURIComponent(payload.keyword)}`,
      config
    );
  }
);

export const follow = createAsyncThunk("user/follow", async (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("/api/follow/addFollow", payload, config);
});

export const unFollow = createAsyncThunk("user/unfollow", async (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("/api/follow/removeFollow", payload, config);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    // searchUser
    [searchUser.pending]: (state, action) => {
      state.loading = true;
      state.users = [];
    },
    [searchUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
    [searchUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = [];
      console.log("searchUser rejected 💣", action);
    },
    // follow
    [follow.pending]: (state, action) => {
      state.loading = true;
    },
    [follow.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = [
        ...state.users.filter((user) => user._id !== payload.data._id),
        payload.data,
      ];
    },
    [follow.rejected]: (state, action) => {
      state.loading = false;
      console.log("follow rejected 💣", action);
    },
    // unFollow
    [unFollow.pending]: (state, action) => {
      state.loading = true;
    },
    [unFollow.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = [
        ...state.users.filter((user) => user._id !== payload.data._id),
        payload.data,
      ];
    },
    [unFollow.rejected]: (state, action) => {
      state.loading = false;
      console.log("unFollow rejected 💣", action);
    },
  },
});

export default userSlice.reducer;

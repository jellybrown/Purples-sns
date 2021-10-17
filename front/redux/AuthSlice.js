import ROUTES from "constants/routesPath";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";
import { removeCookie, setCookie } from "utils/cookie";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
  previousMatchMsg: "",
};

// update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (payload) => {
    const headers = {};
    if (payload.token) headers["x-auth-token"] = payload.token;

    let form = new FormData();
    form.append("image", payload.profileImage);
    form.append("prevUserName", payload.prevUserName);
    form.append("userName", payload.userName);
    form.append("userId", payload.userId);
    form.append("token", payload.token);

    return axios.post(`/api/user/${payload.prevUserName}/profile`, form, {
      headers,
    });
  }
);

// register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload) => {
    return axios.post("api/user", payload);
  }
);

// login user
export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  return axios.post("api/auth", payload);
});

// user loading
export const userLoading = createAsyncThunk(
  "auth/userLoading",
  async (token) => {
    const headers = {};
    if (token) headers["x-auth-token"] = token;

    return axios.get("api/auth/user", { headers });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout
    logout: (state) => {
      // state.loading = true;
      removeCookie("token");
      state.token = null;
      state.user = null;
      state.userId = null;
      state.userRole = null;
      state.isAuthenticated = false;
      Router.reload();
    },
  },
  extraReducers: {
    // updateUser
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user.profileImageUrl = payload.data.profileImageUrl;
      state.user.name = payload.data.name;
      state.userName = payload.data.name;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
    },
    // registerUser
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      setCookie("token", payload.data.token);
      Router.push(ROUTES.LOGIN);
      state.isAuthenticated = true;
      state.userId = payload.data.user.id;
      state.userRole = payload.data.user.role;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      removeCookie("token");
      state.isAuthenticated = false;
      console.log("registerUser rejected 💣", action);
    },
    // loginUser
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("-->", payload.data.token);
      setCookie("token", payload.data.token);
      Router.push(ROUTES.HOME);
      state.isAuthenticated = true;
      state.userId = payload.data.user.id;
      state.userRole = payload.data.user.role;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      //removeCookie("token");
      state.isAuthenticated = false;
      console.log("loginUser rejected 💣", action);
    },
    // userLoading
    [userLoading.pending]: (state, action) => {
      state.loading = true;
    },
    [userLoading.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userId = payload.data._id;
      state.userName = payload.data.name;
      state.userRole = payload.data.role;
      state.user = payload.data;
    },
    [userLoading.rejected]: (state, action) => {
      state.loading = false;
      removeCookie("token");
      state.isAuthenticated = false;
      console.log("userLoading rejected 💣", action);
    },
  },
});

export const { logout, decreaseFollowCount, increaseFollowCount } =
  authSlice.actions;
export default authSlice.reducer;

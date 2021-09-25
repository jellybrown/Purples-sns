import cookie from "js-cookie";
import ROUTES from "constants/routesPath";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";

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
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (payload.token) {
      config.headers["x-auth-token"] = payload.token;
    }
    let form = new FormData();
    form.append("image", payload.profileImage);
    form.append("prevUserName", payload.prevUserName);
    form.append("userName", payload.userName);
    form.append("userId", payload.userId);
    form.append("token", payload.token);

    return axios.post(
      `/api/user/${payload.prevUserName}/profile`,
      form,
      config
    );
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
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", payload, config);
});

// user loading
export const userLoading = createAsyncThunk(
  "auth/userLoading",
  async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return axios.get("api/auth/user", config);
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

/**
 * cookie methods
 */
// -> 클래스로 묶기
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
      path: "/",
    });
  }
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

export const { logout, decreaseFollowCount, increaseFollowCount } =
  authSlice.actions;
export default authSlice.reducer;

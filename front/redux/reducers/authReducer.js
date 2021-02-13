import cookie from "js-cookie";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  registerLoading: false,
  isAuthenticated: false,
  loginLoading: false,
  userLoading: false,
  logoutLoading: false,
  loginDone: false,
  loginError: null,
  user: null,
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
  previousMatchMsg: "",
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.auth,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        successMsg: "",
        errorMsg: "",
        registerLoading: true,
      };
    case REGISTER_SUCCESS:
      setCookie("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        registerLoading: false,
        registerDone: true,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        successMsg: "회원가입에 성공하였습니다.",
        errorMsg: "",
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        registerLoading: false,
        userRole: null,
        successMsg: "",
        errorMsg: action.payload.data.msg,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOG_IN_SUCCESS:
      setCookie("token", action.payload.token);
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        loginError: null,
        isAuthenticated: true,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
      };
    case LOG_IN_FAILURE:
      removeCookie("token");
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
        userId: null,
        userRole: null,
      };
    case USER_LOADING_REQUEST:
      return {
        ...state,
        userLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role,
      };
    case USER_LOADING_FAILURE:
      removeCookie("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userLoading: false,
        userRole: "",
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        successMsg: "",
        errorMsg: "",
        logoutLoading: false,
      };
    case LOGOUT_SUCCESS:
      removeCookie("token");
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        logoutLoading: false,
        userRole: null,
        errorMsg: "",
      };
    case LOGOUT_FAILURE:
      removeCookie("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        logoutLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
      };
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

/**
 * cookie methods
 */

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

export default authReducer;

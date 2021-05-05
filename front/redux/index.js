import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import postSlice from "./PostSlice";
import authSlice from "./AuthSlice";
import userSlice from "./UserSlice";
import axios from "axios";
import getConfig from "next/config";

axios.defaults.baseURL = getConfig().publicRuntimeConfig.apiServerUrl;

// HYDRATE: 서버사이드 렌더링을 할때 서버의 스토어와 클라이언트의 스토어를 합쳐주는 역할
// 나중에 기존 index파일 삭제하고, 이 파일 이름 변경해야함 2021.03.19
export const reducer = (state = {}, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    auth: authSlice,
    post: postSlice,
    user: userSlice,
  })(state, action);
};

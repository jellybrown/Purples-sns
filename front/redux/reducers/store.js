import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { postSlice } from "./postlice";

// reudx tookit사용해서 스토어 만드는중. 2021/03/19

const reducer = combineReducers({
  posts: postSlice,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: true })],
});

export default store;

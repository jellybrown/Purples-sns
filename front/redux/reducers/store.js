import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

const makeStore = (context) =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: true })],
  });

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

import axios from "axios";
import {
  call,
  put,
  takeEvery,
  all,
  fork,
  takeLatest,
} from "redux-saga/effects";
import {
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAILURE,
} from "../types";
import Router from "next/router";

// Search
const searchAPI = (payload) => {
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
};

function* search(action) {
  try {
    const result = yield call(searchAPI, action.payload);
    yield put({
      type: USER_SEARCH_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: USER_SEARCH_FAILURE,
      payload: e,
    });
  }
}

function* watchSearch() {
  yield takeEvery(USER_SEARCH_REQUEST, search);
}

export default function* userSaga() {
  yield all([fork(watchSearch)]);
}

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
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
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

// follow
const followAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("/api/follow/addFollow", payload, config);
};

function* follow(action) {
  try {
    const result = yield call(followAPI, action.payload);
    yield put({
      type: FOLLOW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: FOLLOW_FAILURE,
      payload: e,
    });
  }
}

// unfollow
const unfollowAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  return axios.post("/api/follow/removeFollow", payload, config);
};

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.payload);
    yield put({
      type: UNFOLLOW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: UNFOLLOW_FAILURE,
      payload: e,
    });
  }
}

function* watchSearch() {
  yield takeEvery(USER_SEARCH_REQUEST, search);
}

function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([fork(watchSearch), fork(watchFollow), fork(watchUnfollow)]);
}

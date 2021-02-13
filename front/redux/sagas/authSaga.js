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
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_REQUEST,
} from "../types";
import Router from "next/router";

// Register
const registerUserAPI = (payload) => {
  console.log(payload, "register request");
  return axios.post("api/user", payload);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, "RegisterUser Data");
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
    yield Router.push("/login");
  } catch (err) {
    yield put({
      type: REGISTER_FAILURE,
      payload: err.response,
    });
  }
}

//login
const loginUserAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", payload, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data,
    });
    yield Router.push("/");
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      payload: err.response,
    });
  }
}

// User Loading
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    console.log(action, "saga userLoading");
    const result = yield call(userLoadingAPI, action.payload);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: err.response,
    });
  }
}

// logout
function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
    yield Router.push("/login");
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(err);
  }
}

// update user info
const updateUserInfoAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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

  return axios.post(`/api/user/${payload.prevUserName}/profile`, form, config);
};

function* updateUserInfo(action) {
  try {
    const result = yield call(updateUserInfoAPI, action.payload);
    yield put({
      type: UPDATE_USER_INFO_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: UPDATE_USER_INFO_FAILURE,
      payload: e,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

function* watchLoginUser() {
  yield takeLatest(LOG_IN_REQUEST, loginUser);
}

function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

function* watchUpdateUserInfo() {
  yield takeEvery(UPDATE_USER_INFO_REQUEST, updateUserInfo);
}

export default function* authSaga() {
  yield all([
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchUserLoading),
    fork(watchLogout),
    fork(watchUpdateUserInfo),
  ]);
}

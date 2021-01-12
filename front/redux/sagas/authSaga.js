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
} from "../types";

// Register
const registerUserAPI = (req) => {
  console.log(req, "req");
  return axios.post("api/user", req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, "RegisterUser Data");
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: REGISTER_FAILURE,
      payload: err.response,
    });
  }
}

//login
const loginUserAPI = (req) => {
  axios.post("api/login", req);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      payload: err.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

function* watchLoginUser() {
  yield takeLatest(LOG_IN_REQUEST, loginUser);
}

export default function* authSaga() {
  yield all([fork(watchRegisterUser), fork(watchLoginUser)]);
}

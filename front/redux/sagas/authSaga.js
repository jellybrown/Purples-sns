import axios from "axios";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types";

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
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

export default function* authSaga() {
  yield all([fork(watchRegisterUser)]);
}

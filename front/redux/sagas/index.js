import { all, fork } from "redux-saga/effects";
import axios from "axios";
import authSaga from "./authSaga";

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}

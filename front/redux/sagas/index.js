import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import axios from "axios";
import getConfig from "next/config";
import postSaga from "./postSaga";
import commentSaga from "./commentSaga";

axios.defaults.baseURL = getConfig().publicRuntimeConfig.apiServerUrl;

export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga)]);
}

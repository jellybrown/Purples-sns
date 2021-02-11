import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  FIND_PERSON_FAILURE,
  FIND_PERSON_REQUEST,
  FIND_PERSON_SUCCESS,
} from "../types";

const findPersonAPI = (payload) => {
  return axios.get(`/api/person/find/${payload}`);
};

function* findPerson(action) {
  try {
    const result = yield call(findPersonAPI, action.payload);
    yield put({
      type: FIND_PERSON_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: FIND_PERSON_FAILURE,
      payload: err.response,
    });
  }
}

function* watchFindPerson() {
  yield takeEvery(FIND_PERSON_REQUEST, findPerson);
}

export default function* personSaga() {
  yield all([fork(watchFindPerson)]);
}

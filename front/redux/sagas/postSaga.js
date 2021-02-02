import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../types";

const addPostAPI = (payload) => {
  return axios.post("api/post", payload);
};

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      payload: err.response,
    });
  }
}

const removePostAPI = (payload) => {
  return axios.delete("api/post", payload);
};

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.payload);
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: result.data.id,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      payload: err.response,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)], [fork(watchRemovePost)]);
}

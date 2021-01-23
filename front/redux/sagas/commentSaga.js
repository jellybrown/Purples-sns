import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ADD_COMMENT_FAILURE, ADD_COMMENT_SUCCESS } from "../types";

const addCommentAPI = (payload) => {
  return axios.post(`api/post/${payload.postId}/comment`, payload);
};

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      payload: err.response,
    });
  }
}

function* watchAddComment() {
  yield takeEvery(addComment);
}

export default function* commentSaga() {
  yield all([fork(watchAddComment)]);
}

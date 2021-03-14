import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_COMMENT_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  SEARCH_POST_FAILURE,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  CLEAR_POST_REQUEST,
  CLEAR_POST_SUCCESS,
  CLEAR_POST_FAILURE,
} from "../types";

const addPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }
  let form = new FormData();

  for (const file of payload.images) {
    form.append("image[]", file);
  }
  form.append("contents", payload.contents);
  form.append("userName", payload.userName);
  form.append("writer", payload.writer);
  form.append("token", payload.token);

  return axios.post("/api/post", form, config);
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

const addCommentAPI = (payload) => {
  return axios.post(`api/post/${payload.id}/comments`, payload);
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

const removeCommentAPI = (payload) => {
  return axios.delete(`api/post/${payload.postId}/comment`, payload);
};

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.payload);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      payload: err.response,
    });
  }
}
const searchPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (payload.token) config.headers["x-auth-token"] = payload.token;

  return axios.get(
    `/api/post/search/${encodeURIComponent(payload.keyword)}`,
    config
  );
};

function* searchPost(action) {
  try {
    const result = yield call(searchPostAPI, action.payload);
    yield put({
      type: SEARCH_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: SEARCH_POST_FAILURE,
      payload: err.response,
    });
  }
}

// All posts load
const loadPostAPI = (payload) => {
  return axios.get(`/api/post/skip/${payload}`);
};
function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    console.log(result, "loadPosts");
    yield put({
      type: LOAD_POST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: LOAD_POST_FAILURE,
      payload: e,
    });
  }
}

function* clearPost(action) {
  try {
    yield put({
      type: CLEAR_POST_REQUEST,
    });
  } catch (e) {
    yield put({
      type: CLEAR_POST_FAILURE,
    });
  }
}

// watch functions...
function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost);
}
function* watchSearchPost() {
  yield takeEvery(SEARCH_POST_REQUEST, searchPost);
}
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
  yield takeEvery(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchLoadPosts() {
  yield takeEvery(LOAD_POST_REQUEST, loadPosts);
}
function* watchClearPost() {
  yield takeEvery(CLEAR_POST_REQUEST, clearPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchSearchPost),
    fork(watchLoadPosts),
    fork(watchClearPost),
  ]);
}

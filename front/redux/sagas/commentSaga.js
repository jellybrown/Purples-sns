import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

const addCommentAPI = (payload) => {
    return axios.post(`api/post/${payload.postId}/comment`, payload)
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.payload);
        yield put({

        })
    } catch(err) {
        yield put({

        }
    }
}

function* watchAddComment() {
    yield takeEvery(,addComment)
}

export default function* commentSaga() {
    yield all([fork(watchAddComment)])
}
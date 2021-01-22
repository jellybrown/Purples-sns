import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

const addPostAPI = (payload) => {
    return axios.post("api/post", payload);
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.payload);
    } catch(err) {
        yield put({

        })
    }
}
function* watchAddPost() {
    yield takeEvery()
};

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ]
}
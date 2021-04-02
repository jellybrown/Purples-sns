import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  posts: [],
  justReadPost: [],
  postCount: "",
  searchBy: "",
  searchResult: "",
  postFilter: [
    {
      id: 1,
      name: "All",
      active: true,
    },
    {
      id: 2,
      name: "Followings",
      active: false,
    },
    {
      id: 3,
      name: "Followers",
      active: false,
    },
    {
      id: 4,
      name: "My",
      active: false,
    },
  ],
};

// Load all posts (6개씩)
export const loadPost = createAsyncThunk(
  "post/loadPost",
  async ({ payload }) => {
    // 아마 오류날듯?
    return axios.get("/api/post/skip", { params: payload }); // params를 어디서 쓰는지 모르겠음
  }
);

// get all posts (전체포스트, 정보 읽기용)
export const getAllPost = createAsyncThunk("post/getAllPost", async () => {
  return axios.get("/api/post");
});

// Search post
export const searchPost = createAsyncThunk(
  "post/searchPost",
  async (payload) => {
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
  }
);

// Add post
export const addPost = createAsyncThunk("post/addPost", async (payload) => {
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

  return axios.post("/api/post", form, config); // form, config 객체로 묶어야하는지 모르겠음
});

// Remove post
export const removePost = createAsyncThunk(
  "post/removePost",
  async (payload) => {
    return axios.delete("/api/post", payload);
  }
);

// Add comment
export const addComment = createAsyncThunk(
  "post/addComment",
  async (payload) => {
    return axios.post(`/api/post/${payload.id}/comments`, payload);
  }
);

// * post slice (with comment) *
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // 비동기가 아닌 상태관리는 reducers에 작성. 2021/03/18
    changePostFilter: (state, { payload }) => {
      state.posts = []; // 필터가 바뀌었기 때문에 기존 포스트 초기화.
      state.postFilter = payload;
    },
  },
  extraReducers: {
    // loadPosts
    [loadPost.pending]: (state, action) => {
      state.loading = true;
    },
    [loadPost.fulfilled]: (state, { payload }) => {
      // payload는 객체 형태로 받고있다. 2021/03/18
      state.loading = false;
      state.posts.push(...payload.data.postFindResult);
    },
    [loadPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("loadPost rejected 💣", action);
    },
    [getAllPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPost.fulfilled]: (state, { payload }) => {
      // payload는 객체 형태로 받고있다. 2021/03/18
      state.loading = false;
      state.posts = payload.data.postFindResult;
    },
    [getAllPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("getAllPost rejected 💣", action);
    },
    // searchPost
    [searchPost.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchBy = payload; // 이렇게 굳이 두개로 나눠서 받아야 되는건가?. 2021/03/18
      state.searchResult = payload;
    },
    [searchPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("searchPost rejected 💣", action);
    },
    // addPost
    [addPost.pending]: (state, action) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts.push(payload.data);
    },
    [addPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("addPost rejected 💣", action);
    },
    //removePost
    [removePost.pending]: (state, action) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, { payload }) => {
      //삭제하는 게시물 정보 payload로 받아오기. 2021/03/18
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== payload.data.id);
    },
    [removePost.rejected]: (state, action) => {
      state.loading = false;
      console.log("removePost rejected 💣", action);
    },
    // addComment
    [addComment.pending]: (state, action) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      const payloadId = payload.data.post; //postId ex)aadfdsf323sdfsd
      const targetPost = state.posts.filter(
        (post) => post._id === payloadId
      )[0];
      targetPost.comments.push(payload.data);
      state.loading = false;
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      console.log("addComment rejected 💣", action);
    },
  },
});

export const { changePostFilter } = postSlice.actions;
export default postSlice.reducer;

// remove comment, clear post 추가해야함
// clear post랑 remove post랑 두개가 무슨차이인지 모르겠다. 2021/03/18

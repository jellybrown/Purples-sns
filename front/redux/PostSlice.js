import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  posts: [],
  thisPost: {
    comments: [],
  },
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
    return axios.get("/api/post/skip", { params: payload });
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

  return axios.post("/api/post", form, config);
});

// Remove post
export const removePost = createAsyncThunk(
  "post/removePost",
  async (payload) => {
    let config = {};
    if (payload.token) {
      config = {
        headers: {
          "x-auth-token": payload.token,
        },
      };
    }
    console.log("payload is ", payload);

    return axios.delete(`/api/post/${payload.id}`, config);
  }
);

// Add comment
export const addComment = createAsyncThunk(
  "post/addComment",
  async (payload) => {
    return axios.post(`/api/post/${payload.id}/comments`, payload);
  }
);

// Remove comment
export const removeComment = createAsyncThunk(
  "post/removeComment",
  async (payload) => {
    let config = {};
    if (payload.token) {
      config = {
        headers: {
          "x-auth-token": payload.token,
        },
      };
    }
    return axios.delete(
      `/api/post/${payload.post}/comments/${payload.id}`,
      config
    );
  }
);

// Get a post
export const getPost = createAsyncThunk("post/getPost", async (payload) => {
  return axios.get(`/api/post/${payload.id}`);
});

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
      state.loading = false;
      state.posts.push(...payload.data.postFindResult);
    },
    [loadPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("loadPost rejected 💣", action);
    },
    //setThisPost
    [loadPost.pending]: (state, action) => {
      state.loading = true;
    },
    [loadPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts.push(...payload.data.postFindResult);
      state.postCount = payload.data.postCount;
    },
    [loadPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("loadPost rejected 💣", action);
    },
    // searchPost
    [searchPost.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchBy = payload;
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
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== payload.data.id);
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
      console.log("----FULLFILL", payload);
      const targetPost = state.posts.filter(
        (post) => post._id === payload.data.post
      )[0];
      console.log("targetPost is ", targetPost);

      targetPost?.comments?.push(payload.data); // 메인화면 커멘트 업데이트
      state.thisPost?.comments?.push(payload.data); // 상세피이지 커멘트 업데이트
      state.loading = false;
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      console.log("addComment rejected 💣", action);
    },
    //removeComment
    [removeComment.pending]: (state, action) => {
      state.loading = true;
    },
    [removeComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.thisPost.comments = state.thisPost.comments.filter(
        (comment) => comment._id !== payload.data.id
      );
    },
    [removeComment.rejected]: (state, action) => {
      state.loading = false;
      console.log("removeComment rejected 💣", action);
    },
    // getPost
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.thisPost = payload.data;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("getPost rejected ", action);
    },
  },
});

export const { changePostFilter } = postSlice.actions;
export default postSlice.reducer;

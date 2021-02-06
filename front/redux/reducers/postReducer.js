import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../types";

const initialState = {
  posts: [
    {
      id: 1,
      nickName: "abcd",
      content: "ddddㅎㅎㅎ",
    },
    {
      id: 2,
      nickName: "zzzz",
      content: "ㅎ하ㅏ하하핳",
    },
  ],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...posts, action.payload],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        addPostLoading: false,
        addPostError: true,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        posts: posts.filter((post) => post.id !== action.payload),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        removePostLoading: false,
        removePostError: true,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
      };
    case ADD_COMMENT_SUCCESS: {
      const id = action.payload.postId;
      const newComment = action.payload.comment;
      return {
        ...state,
        addCommentLoading: false,
        post: post[id + 1].comments.push(newComment), // immer로 바꿔야하나?
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentError: action.error,
        addCommentLoading: false,
      };
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
      };
    case REMOVE_COMMENT_SUCCESS: {
      const id = action.payload.postId;
      const thisComment = action.payload.commentId;
      return {
        ...state,
        removeCommentLoading: false,
        post: post[id + 1].comments.filter(
          (comment) => comment.id !== thisComment
        ),
      };
    }
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        addCommentError: action.error,
        removeCommentLoading: false,
      };
    default:
      return state;
  }
};

export default postReducer;

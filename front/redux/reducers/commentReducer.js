import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
} from "../types";

import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  comment: "",
  post: [
    {
      id: 1,
      content: "dfsdf",
      comments: [
        {
          id: 1,
          ment: "헤헤헤",
        },
      ],
    },
  ], //postReducer랑 통합해야할수도
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
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

export default commentReducer;

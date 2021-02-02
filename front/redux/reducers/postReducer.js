import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
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
    default:
      return state;
  }
};

export default postReducer;

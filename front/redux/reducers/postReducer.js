import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  SEARCH_POST_FAILURE,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  CLEAR_POST_REQUEST,
  CLEAR_POST_SUCCESS,
  CLEAR_POST_FAILURE,
  CHANGE_POST_FILTER_REQUEST,
  CHANGE_POST_FILTER_SUCCESS,
  CHANGE_POST_FILTER_FAILURE,
} from "../types";

const initialState = {
  posts: [],
  loading: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  searchPostLoading: false,
  searchPostDone: false,
  searchPostError: null,
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
  ]
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult],
        postCount: action.payload.postCount,
        loading: false,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SEARCH_POST_REQUEST:
      return {
        ...state,
        searchBy: action.payload,
        searchPostLoading: true,
      };
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        searchBy: action.payload,
        searchResult: action.payload,
        searchPostLoading: false,
        searchPostDone: true,
      };
    case SEARCH_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        searchPostLoading: false,
        searchPostError: true,
        searchResult: action.payload,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state.posts,
        posts: [...state.posts, action.payload],
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
      const id = action.payload.id; //postId
      const newComment = action.payload.contents; // contents -> 이름변경 필요
      return {
        ...state,
        addCommentLoading: false,
        posts: [...posts, { ...post, comments: [...comments, newComment] }],
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
    case CLEAR_POST_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case CLEAR_POST_SUCCESS:
      return {
        ...state,
        posts: [],
        loading: false,
      };
    case CLEAR_POST_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
      };
    case CHANGE_POST_FILTER_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      }
    case CHANGE_POST_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        postFilter: action.payload
      }
    case CHANGE_POST_FILTER_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default postReducer;

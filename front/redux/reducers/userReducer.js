import { HYDRATE } from "next-redux-wrapper";
import {
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../types";

const initialState = {
  users: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case USER_SEARCH_REQUEST:
      return {
        ...state,
        users: [],
        loading: true,
      };
    case USER_SEARCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USER_SEARCH_FAILURE:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users.filter((user) => user._id != action.payload._id),
          action.payload,
        ],
        // user: action.payload,
        followLoading: false,
        followDone: true,
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        error: action.payload,
        followLoading: false,
        followError: true,
      };
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        unfollowLoading: true,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users.filter((user) => user._id != action.payload._id),
          action.payload,
        ],
        unfollowLoading: false,
        unfollowDone: true,
      };
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        error: action.payload,
        unfollowLoading: false,
        unfollowError: true,
      };
    default:
      return state;
  }
};

export default userReducer;

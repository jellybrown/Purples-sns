import { HYDRATE } from "next-redux-wrapper";
import {
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAILURE,
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
    default:
      return state;
  }
};

export default userReducer;

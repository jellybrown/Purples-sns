import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from "../types";

const { HYDRATE } = require("next-redux-wrapper");

const initialState = {
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  comment: "",
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
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        addCommentLoading: false,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentError: action.error,
        addCommentLoading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;

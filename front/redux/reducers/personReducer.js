import { HYDRATE } from "next-redux-wrapper";
import {
  FIND_PERSON_FAILURE,
  FIND_PERSON_REQUEST,
  FIND_PERSON_SUCCESS,
} from "../types";

const initialState = {
  user: [],
};

const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case FIND_PERSON_REQUEST:
      return {
        ...state,
      };
    case FIND_PERSON_SUCCESS:
      return {
        ...state,
        user: [action.payload],
      };
    case FIND_PERSON_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default personReducer;

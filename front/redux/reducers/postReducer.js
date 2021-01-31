import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
  }
};

export default postReducer;
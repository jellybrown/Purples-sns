const { HYDRATE } = require("next-redux-wrapper");

const initialState = {};

const commentReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default commentReducer;

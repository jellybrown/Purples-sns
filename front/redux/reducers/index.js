import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  //   post: postReducer,
  //   comment: commentReducer,
});

export default rootReducer;

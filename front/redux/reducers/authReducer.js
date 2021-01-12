import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from "../types";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
  previousMatchMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        successMsg: "",
        errorMsg: "",
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        successMsg: "회원가입에 성공하였습니다.",
        errorMsg: "",
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        successMsg: "",
        errorMsg: action.payload.data.msg,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        data: action.data, //email, password
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from "../types";

const initialState = {
  registerLoading: false,
  isAuthenticated: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
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
        registerLoading: true,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        registerLoading: false,
        registerDone: true,
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
        registerLoading: false,
        userRole: null,
        successMsg: "",
        errorMsg: action.payload.data.msg,
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        loginError: null,
        data: action.data, //email, password
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;

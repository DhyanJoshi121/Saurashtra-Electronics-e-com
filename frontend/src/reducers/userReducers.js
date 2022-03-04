import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    // break;
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    // break;
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    // break;
    case USER_LOGOUT:
      return {};
    // break;
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    // break;
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    // break;
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    // brea
    // break;
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    // break;
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    // break;
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    // break;
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    // break;
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    // break;
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    // break;
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

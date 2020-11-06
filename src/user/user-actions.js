import {
  USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_GET_DATA,
    USER_SET_DATA,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
} from '../common/constants'

// -------------------------------------------- LOGIN
export const userLoginRequest = (payload) => (
  console.log("USER_LOGIN_REQUEST: ", payload) || {
    type: USER_LOGIN_REQUEST,
    payload
  });

export const userLoginSuccess = (payload) => (
  console.log("USER_LOGIN_SUCCESS: ", payload) || {
    type: USER_LOGIN_SUCCESS,
    payload
  });

export const userLoginFailure = (payload) => (
  console.log("USER_LOGIN_FAILURE: ", payload) || {
    type: USER_LOGIN_FAILURE,
    payload
  });

// -------------------------------------------- DATA
export const userGetData = (payload) => (
  console.log("USER_GET_DATA: ", payload) || {
    type: USER_GET_DATA,
    payload
  });

export const userSetData = (payload) => (
  console.log("USER_SET_DATA: ", payload) || {
    type: USER_SET_DATA,
    payload
  });

// -------------------------------------------- LOGOUT
export const userLogoutRequest = (payload) => (
  console.log("USER_LOGOUT_REQUEST: ") || {
    type: USER_LOGOUT_REQUEST,
    payload
  });

export const userLogoutSuccess = () => (
  console.log("USER_LOGOUT_SUCCESS: ") || {
    type: USER_LOGOUT_SUCCESS,
  });

export const userLogoutFailure = (payload) => (
  console.log("USER_LOGOUT_FAILURE: ", payload) || {
    type: USER_LOGOUT_FAILURE,
    payload
  });
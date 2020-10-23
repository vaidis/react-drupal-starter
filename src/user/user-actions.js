import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_GET_DATA,
    USER_SET_DATA,
    USER_GET_STATUS,
    USER_SET_STATUS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
} from '../common/constants'

function X(msg, obj) {
    const enable = false
    const title = " USER_ACTIONS "
    const object = obj ? JSON.stringify(obj) : ""
    return enable 
    ? console.log('%c%s', 'color: black; background: #d1f1ff;', title + msg + ":" + JSON.stringify(object))
    : null
}

// ---------------------------- LOGIN
export const userLoginRequest = (payload) => (
    X("USER_LOGIN_REQUEST: ", payload) || {
        type: USER_LOGIN_REQUEST,
        payload
    });

export const userLoginSuccess = (payload) => (
    X("USER_LOGIN_SUCCESS: ", payload) || {
        type: USER_LOGIN_SUCCESS,
        payload
    });

export const userLoginFailure = (payload) => (
    X("USER_LOGIN_FAILURE: ", payload) || {
        type: USER_LOGIN_FAILURE,
        payload
    });

// ---------------------------- DATA
export const userGetData = (payload) => (
    X("USER_GET_DATA: ", payload) || {
        type: USER_GET_DATA,
        payload
    });

export const userSetData = (payload) => (
    X("USER_SET_DATA: ", payload) || {
        type: USER_SET_DATA,
        payload
    });

// ---------------------------- STATUS
export const userGetStatus = (payload) => (
    X("USER_GET_STATUS: ") || {
        type: USER_GET_STATUS,
        payload
    });
export const userSetStatus = (payload) => (
    X("USER_SET_STATUS: ") || {
        type: USER_SET_STATUS,
        payload
    });
// ---------------------------- LOGOUT
export const userLogoutRequest = (payload) => (
    X("USER_LOGOUT_REQUEST: ") || {
        type: USER_LOGOUT_REQUEST,
        payload
    });

export const userLogoutSuccess = () => (
    X("USER_LOGOUT_SUCCESS: ") || {
        type: USER_LOGOUT_SUCCESS,
    });

export const userLogoutFailure = (payload) => (
    X("USER_LOGOUT_FAILURE: ", payload) || {
        type: USER_LOGOUT_FAILURE,
        payload
    });
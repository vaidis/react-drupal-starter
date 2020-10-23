import {
    select,
    fork,
    take,
    call,
    put,
} from 'redux-saga/effects';

import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    USER_LOGIN_REQUEST,
    // USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    // USER_GET_DATA,
    // USER_GET_DATA,
    USER_SET_DATA,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_GET_STATUS,
    USER_SET_STATUS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'


function* UserLoginWorker(loginOptions) {
    yield put({ type: SET_LOADING_ON })
    const credentials = {
        "name": loginOptions.credentials.name,
        "pass": loginOptions.credentials.pass
    }
    try {
        const response = yield call(api.login, endpoint.LOGIN, credentials)
        yield put({ type: USER_SET_DATA, payload: response.data });
        console.log(" UserLoginWorker > response", response);
    } catch (error) {
        const error_msg = error.message
        console.log(" worker > error: ", error_msg);
        yield put({ type: USER_LOGIN_FAILURE });
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}



function* UserLogoutWorker() {
    console.log("userLogoutWorker");
    yield put({ type: SET_LOADING_ON })
    try {
        const state = yield select()
        const tokens = {
            logout_token: state.user.logout_token,
            csrf_token: state.user.csrf_token,
        }

        yield call(api.logout, endpoint.LOGOUT, tokens);
        yield put({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
        console.log("userLogoutWarker error", error);
        yield put({ type: USER_LOGOUT_FAILURE });
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

function* UserGetStatusWorker() {
    console.log("userGetStatusWorker");
    try {
        const response = yield call(api.get, endpoint.STATUS);
        yield put({ type: USER_SET_STATUS, payload: response.data });
    } catch (error) {
        console.log("userGetStatus error", error);
        // yield put({ type: USER_GET_STATUS_FAILURE });
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

export function* userLoginWatcher() {
    while (true) {
        const actionPayload = yield take(USER_LOGIN_REQUEST);
        const credentials = {
            "name": actionPayload.payload.name,
            "pass": actionPayload.payload.pass
        }
        console.log("Watcher credentials:", credentials);
        const loginOptions = { credentials }
        yield fork(UserLoginWorker, loginOptions)
    }
}

export function* userLogoutWatcher() {
    while (true) {
        yield take(USER_LOGOUT_REQUEST)
        console.log("userLogoutWatcher");
        yield call(UserLogoutWorker);
    }
}

export function* userGetStatusWatcher() {
    while (true) {
        yield take(USER_GET_STATUS)
        console.log("userGetStatusWatcher");
        yield call(UserGetStatusWorker);
    }
}
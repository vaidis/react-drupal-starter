import {
    all,
    takeLatest,
    call,
    put
} from 'redux-saga/effects';

import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    SET_LOADED_TRUE,
    SET_LOADED_FALSE,
    GET_ARTICLES,
    SET_ARTICLES,
    SET_API_LINKS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'



function* getArticlesWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    // console.log("SAGAS getArticlesWorker payload", payload);
    try {
        // const state = yield select();
        const response = yield call(api.get, endpoint.ARTICLES(payload));
        // console.log("SAGAS getArticlesWorker response", response);
        yield put({ type: SET_ARTICLES, payload: response.data.data });
        yield put({ type: SET_API_LINKS, payload: response.data.links });
        yield put({ type: SET_LOADED_TRUE })
    } catch (error) {
        // console.log("SAGAS getArticlesWorker error", error);
        yield put({ type: SET_LOADED_FALSE })
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

export default function* root() {
    yield all([
        takeLatest(GET_ARTICLES, getArticlesWorker),
    ]);
}

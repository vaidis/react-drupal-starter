import {
    all,
    takeLatest,
    call,
    put
} from 'redux-saga/effects';

import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    POST_ARTICLE,
    POST_ARTICLE_FILE,
    // SET_ARTICLE_FILE,
    SET_LOADED_TRUE,
    SET_LOADED_FALSE,
    GET_VOCABULARY,
    SET_VOCABULARY,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

function* postArticleWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    yield put({ type: SET_LOADED_FALSE })
    try {
        const response = yield call(api.post, endpoint.ARTICLE_POST, payload);
        console.log("postArticleWorker response", response);
        yield put({ type: SET_LOADED_TRUE })
    } catch (error) {
        console.log("postArticleWorker error", error);
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

function* postArticleFileWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    yield put({ type: SET_LOADED_FALSE })
    try {
        const response = yield call(api.postFile, endpoint.ARTICLE_POST_FILE, payload);
        console.log("postArticleFileWorker response", response);
        yield put({ type: SET_LOADED_TRUE })
    } catch (error) {
        console.log("postArticleWorker error", error);
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}


function* getVocabularyWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    yield put({ type: SET_LOADED_FALSE })
    console.log("getVocabularyWorker",);
    try {
        const response = yield call(api.get, endpoint.VOCABULARY(payload));
        console.log("getVocabularyWorker response", response);
        yield put({ type: SET_VOCABULARY, payload: response.data });
        yield put({ type: SET_LOADED_TRUE })
    } catch (error) {
        console.log("postArticleWorker error", error);
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

export default function* root() {
    yield all([
        takeLatest(POST_ARTICLE, postArticleWorker),
        takeLatest(POST_ARTICLE_FILE, postArticleFileWorker),
        takeLatest(GET_VOCABULARY, getVocabularyWorker),
    ]);
}

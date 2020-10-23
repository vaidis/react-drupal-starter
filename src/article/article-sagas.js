import {
    all,
    takeLatest,
    call,
    put
} from 'redux-saga/effects';

import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    GET_ARTICLE,
    SET_ARTICLE,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

function* getArticleWorker({ payload }) {
    console.log("SAGAS getArticleWorker");
    yield put({ type: SET_LOADING_ON })
    try {
        const response = yield call(api.get, endpoint.ALIAS2UUID(payload));
        console.log("SAGAS getArticleWorker uuid", response.data.entity.uuid);
        const article = yield call(api.get, endpoint.ARTICLE(response.data.entity.uuid));
        console.log("SAGAS getArticleWorker article", article);
        yield put({ type: SET_ARTICLE, payload: article.data });
    } catch (error) {
        console.log("SAGAS getArticleWorker error", error);
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

export default function* root() {
    yield all([
        takeLatest(GET_ARTICLE, getArticleWorker),
    ]);
}

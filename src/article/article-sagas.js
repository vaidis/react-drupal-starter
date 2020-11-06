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
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

function* getArticleWorker({ payload }) {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })
  try {
    const article = yield call(api.get, endpoint.ARTICLE(payload));
    console.log("article-sagas.js getArticleWorker article", article);

    yield put({ type: SET_ARTICLE, payload: article.data });
    yield put({ type: SET_LOADED_TRUE })

  } catch (error) {
    console.log("article-sagas.js getArticleWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export default function* root() {
  yield all([
    takeLatest(GET_ARTICLE, getArticleWorker),
  ]);
}

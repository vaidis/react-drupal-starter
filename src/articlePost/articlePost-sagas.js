import {
  all,
  takeLatest,
  call,
  put,
  putResolve
} from 'redux-saga/effects';

import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  POST_ARTICLE,
  POST_ARTICLE_FILE,
  POST_TAG,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
  SET_VOCABULARY,
  GET_VOCABULARY,
  ADD_SELECTED,
  ADD_ARTICLE_TAGS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'



function* postArticleWorker({ payload }) {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })
  try {
    const csrf_token = yield call(api.get, endpoint.CSRF_TOKEN);
    // console.group("postTagWorker call api.get csrf_token", csrf_token.data);
    const response = yield call(api.post, endpoint.ARTICLE_POST, payload, csrf_token.data);
    console.group("postArticleWorker response", response);
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
    const csrf_token = yield call(api.get, endpoint.CSRF_TOKEN);
    // console.group("postTagWorker call api.get csrf_token", csrf_token.data);
    const response = yield call(api.postFile, endpoint.ARTICLE_POST_FILE, payload, csrf_token.data);
    console.group("postArticleFileWorker response", response);
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
  console.group("getVocabularyWorker",);
  try {
    const response = yield call(api.get, endpoint.VOCABULARY(payload));
    // console.log("getVocabularyWorker response", response);
    yield put({ type: SET_VOCABULARY, payload: response.data });
    yield put({ type: SET_LOADED_TRUE })
  } catch (error) {
    console.log("getVocabularyWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}



function* postTagWorker({ payload }) {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })
  try {
    const csrf_token = yield call(api.get, endpoint.CSRF_TOKEN);
    // console.group("postTagWorker call api.get csrf_token", csrf_token.data);
    const response = yield call(api.post, endpoint.POST_TAG, payload, csrf_token.data);
    console.group("postTagWorker call api.post response", response);

    const vocabulary = yield call(api.get, endpoint.VOCABULARY('tags'));
    // console.log(".get(VOCABULARY('tags')).data", vocabulary.data);
    yield putResolve({ type: SET_VOCABULARY, payload: vocabulary.data })

    const name = payload.data.attributes.name;
    const id = vocabulary.data.data.find(item => {
      return item.name === name
    })
    const body = { value: id.id, label: name }
    console.log("body", body);
    yield put({ type: ADD_SELECTED, payload: body });

    const tags = { "type": "taxonomy_term--tags", "id": id.id }
    yield put({ type: ADD_ARTICLE_TAGS, payload: tags });

    yield put({ type: SET_LOADED_TRUE })
    console.groupEnd();
  } catch (error) {
    console.log("postTagWorker error", error);
  } finally {
    yield put({ type: SET_LOADING_OFF })
  }
}

export default function* root() {
  yield all([
    takeLatest(POST_ARTICLE, postArticleWorker),
    takeLatest(POST_ARTICLE_FILE, postArticleFileWorker),
    takeLatest(POST_TAG, postTagWorker),
    takeLatest(GET_VOCABULARY, getVocabularyWorker),
  ]);
}

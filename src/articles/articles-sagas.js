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
  SET_API_PAGER_LINKS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

/**
 * Create the pager links from GET_ARTICLE response
 *
 * @param {object} links - Pager data from backend
 * @returns {object} pager - Stored in store.api.pager
 */
const createPagerObject = (links) => {
  let pager = {
    first: '',
    prev: '',
    next: '',
    self: '',
  }

  Object.keys(links)
    .forEach(function (item) {
      pager[item] = links[item].href
      const params = new URLSearchParams(pager[item])
      if (params.has('page[offset]')) {
        pager[item] = params.get('page[offset]');
      }
    })
  return pager
}

function* getArticlesWorker({ payload }) {
  yield put({ type: SET_LOADING_ON })
  yield put({ type: SET_LOADED_FALSE })
  try {
    const response = yield call(api.get, endpoint.ARTICLES(payload));
    yield put({ type: SET_ARTICLES, payload: response.data });

    const pagerObject = createPagerObject((response.data.links))
    yield put({ type: SET_API_PAGER_LINKS, payload: pagerObject });

    yield put({ type: SET_LOADED_TRUE })

  } catch (error) {
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

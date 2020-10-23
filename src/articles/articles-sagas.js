import {
    select,
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

const createPagerObject = (links) => {

    let pager = {
        first: '',
        prev: '',
        next: '',
        self: '',
    }

    console.log("SAGAS createPagerObject", links);

    Object.keys(links)
        .forEach(function (item) {
            // console.log("SAGAS createPagerObject links[item]", links[item]);

            pager[item] = links[item].href
            // console.log("SAGAS createPagerObject pager[item]", pager[item]);
            const params = new URLSearchParams(pager[item])
            if (params.has('page[offset]')) {
                // console.log("offset:", item, "//////", params.get('page[offset]'))
                pager[item] = params.get('page[offset]');
            }
        })

        // console.log("/////// //////", pager)
        return pager
}

function* getArticlesWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    // console.log("SAGAS getArticlesWorker payload", payload);
    try {

        // const state = yield select();
        const response = yield call(api.get, endpoint.ARTICLES(payload));
        // console.log("SAGAS getArticlesWorker response", response);
        yield put({ type: SET_ARTICLES, payload: response.data.data });
        // console.log("SAGAS getArticlesWorker apiLinks" , response.data.links);

        const pagerObject = createPagerObject((response.data.links))
        console.log("SAGAS getArticlesWorker pagerObject >>>>>", pagerObject);

        yield put({ type: SET_API_LINKS, payload: pagerObject });
        // yield put({ type: SET_API_LINKS, payload: response.data.links });
        // let state = yield select();
        // console.log("SAGAS getArticlesWorker apiLinks >>>", state.api.links);

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

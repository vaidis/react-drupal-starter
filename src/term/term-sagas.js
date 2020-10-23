import {
    all,
    takeLatest,
    call,
    put
} from 'redux-saga/effects';

import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    GET_TERMS,
    SET_TERMS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

function* getTermsWorker({ payload }) {
    console.log("getTermsWorker");
    yield put({ type: SET_LOADING_ON })
    try {

        // const response = yield call(api.get, endpoint.TRANSLATE(payload));
        // console.log("SAGAS getTermsWorker uuid", response.data.entity.uuid);
        // const terms = yield call(api.get, endpoint.TERMS(response.data.entity.uuid));
        console.log("SAGAS getTermsWorker api action payload", payload);
            const terms = yield call(api.get, endpoint.TERMS(payload));
        console.log("SAGAS getTermsWorker api response", terms);

        yield put({ type: SET_TERMS, payload: terms.data });

    } catch (error) {
        console.log("SAGAS getTermsWorker error", error);
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}

export default function* root() {
    yield all([
        takeLatest(GET_TERMS, getTermsWorker),
    ]);
}

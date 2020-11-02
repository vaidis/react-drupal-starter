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
    SET_ARTICLE_TAGS,
    ADD_ARTICLE_TAGS,
} from '../common/constants'

import { api } from '../api/api';
import * as endpoint from '../api/endpoints'

function* postArticleWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    yield put({ type: SET_LOADED_FALSE })
    try {
        const response = yield call(api.post, endpoint.ARTICLE_POST, payload);
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
        const response = yield call(api.postFile, endpoint.ARTICLE_POST_FILE, payload);
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
        console.log("getVocabularyWorker response", response);
        yield put({ type: SET_VOCABULARY, payload: response.data });
        yield put({ type: SET_LOADED_TRUE })
    } catch (error) {
        console.log("getVocabularyWorker error", error);
    } finally {
        yield put({ type: SET_LOADING_OFF })
    }
}


// const newOption = (vocabulary, name) => {
//     return vocabulary.data.filter(item => {
//         if (item.name === name) {
//             console.log('newOption item', JSON.stringify(item));
//             const option = { value: item.id, label: item.name }
//             console.log('newOption option', JSON.stringify(option));
//             return { 'value': item.id, 'label': item.name }
//             // return option
//             // return JSON.stringify(option)
//         }
//     })
// }

function* setSelected({ payload }) {
    // console.log("postTagWorker try to set vocabulaty error", error);
    // const newSelected = newOption(vocabulary.data, payload.data.attributes.name);
    // const name = payload.data.attributes.name

    // ADD to selected
    // console.log("payload", payload)
    // console.log("name", payload.data.data.attributes.name)
    // const name = payload.data.data.attributes.name;
    // const id = vocabulary.data.data.filter(item => {
    //     if (item.label === name) {
    //         console.log('id item', JSON.stringify(item));
    //         // const option = { value: item.id, label: item.name }
    //         // console.log('newOption option', JSON.stringify(option));
    //         // return { 'value': String(item.id), 'label': String(item.name) }
    //         return item.id
    //         // return JSON.stringify(option)
    //     }
    // })
    // const body = { value: id, label: name }
    // const body = { value: "1234567890", label: "xxxxxxxxxxxxxxxxx" }
    // console.log("id", id)
    // console.log("name", name)
    // console.log("body", body);
    // yield put({ type: ADD_SELECTED, payload: body });
}

const tagPostBodyitem = (item) => {
    return (
        { "type": "taxonomy_term--tags", "id": item }
    )
}

function* postTagWorker({ payload }) {
    yield put({ type: SET_LOADING_ON })
    yield put({ type: SET_LOADED_FALSE })
    try {

        // POST new tag
        const response = yield call(api.post, endpoint.POST_TAG, payload);
        // console.group("api.post(POST_TAG) response", response);

        // GET fresh vocabulary
        const vocabulary = yield call(api.get, endpoint.VOCABULARY('tags'));
        // console.log(".get(VOCABULARY('tags')).data", vocabulary.data);
        yield putResolve({ type: SET_VOCABULARY, payload: vocabulary.data})

        // ADD to selected
        const name = payload.data.attributes.name;
        const id = vocabulary.data.data.find(item => {
            return item.name === name
        })
        const body = { value: id.id, label: name }
        // console.log("payload", payload)
        // console.log("name", name);
        // console.log("vocabulary", vocabulary);
        // console.log("id", id)
        console.log("body", body);
        yield put({ type: ADD_SELECTED, payload: body });
        
        // ADD to article tags
        // const tags = body.map(x => tagPostBodyitem(x.value));
        const tags = { "type": "taxonomy_term--tags", "id": id.id }
        console.log("tags", tags)
        yield put({ type: ADD_ARTICLE_TAGS, payload: tags });

        yield put({ type: SET_LOADED_TRUE })
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

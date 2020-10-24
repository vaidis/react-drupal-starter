import { act } from 'react-dom/test-utils';
import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    SET_LOADED_TRUE,
    SET_LOADED_FALSE,
    SET_API_URL_PARAMS,
    GET_API_URL_PARAMS,
    SET_API_LINKS,
} from '../common/constants'


const initialStore = {
    loading: false,
    loaded: false,
    terms: '',
    search: '',
    urlParams: '',
    pager: {
        first: 0,
        last: 0,
        next: 0,
        prev: 0,
        self: 0,
    },
}

const reducer = (state = initialStore, action) => {

    switch (action.type) {

        case SET_LOADING_ON:
            return { ...state, loading: true };
        case SET_LOADING_OFF:
            return { ...state, loading: false };


        case SET_LOADED_TRUE:
            return { ...state, loaded: true };
        case SET_LOADED_FALSE:
            return { ...state, loaded: false };


        case SET_API_URL_PARAMS:
            // console.log('api-reducers.js SET_API_URL_PARAMS', action.payload)
            return {
                ...state,
                urlParams: action.payload
            };

        case SET_API_LINKS:
            // console.log('api-reducers.js SET_API_LINKS', action.payload)
            const payload = action.payload
            return {
                ...state,
                pager: payload
            };


        default:
            return state;
    }
};

export default reducer;

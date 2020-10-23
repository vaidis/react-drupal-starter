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

import {
    SET_PAGER,
    GET_PAGER,
    SET_PAGER_FIRST,
    SET_PAGER_PREV,
    SET_PAGER_NEXT,
    SET_PAGER_LAST,
} from '../common/constants'


const initialStore = {
    loading: false,
    loaded: false,
    type: 'article',
    links: '',
    params: {
        // terms: ['fr', 'one two'],
        terms: '',
        search: '',
        pager: {
            offset: 0,
            page: 0,
            items: 0,
            limit: 4,
        },
    }
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
            console.log('api-reducers.js action', action.payload)
            return {
                ...state,
                params: action.payload
            };


        case SET_API_LINKS:
            return { ...state, links: action.payload };

        // case SET_PAGER:
        //     return action.payload;

        // case SET_PAGER_FIRST:
        //     return { ...state, page: 0 };

        case SET_PAGER_NEXT:
            return {
                ...state,
                params: {
                    ...state.params,
                    pager: {
                        ...state.params.pager,
                        offset: 3
                    }
                }
            };


        // case SET_PAGER_NEXT:
        //     return {
        //         ...state,
        //         params: {
        //             ...state.params,
        //             offset: {
        //             ...state.params.offset, 
        //             offset: 3
        //             }
        //         }
        //     };

        // case SET_PAGER_PREV:
        //     return { ...state, page: state.page - 1 };

        // case SET_PAGER_LAST:
        //     return { ...state, page: action.payload };



        default:
            return state;
    }
};

export default reducer;

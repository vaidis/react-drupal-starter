import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    SET_API_URL_PARAMS,
    GET_API_URL_PARAMS,
} from '../common/constants'

import {
    SET_PAGER,
    GET_PAGER,
    SET_PAGER_NEXT,
    SET_PAGER_PREV,
    SET_PAGER_FIRST,
    SET_PAGER_LAST,
    SET_API_LINKS,
} from '../common/constants'


export const setApiLinks = (payload) => ({
    type: SET_API_LINKS,
    payload
});


export const setLoadingOn = () => ({
    type: SET_LOADING_ON
});

export const setLoadingOff = () => ({
    type: SET_LOADING_OFF
});

export const setApiUrlParams = (payload) => ({
    type: SET_API_URL_PARAMS,
    payload
})

export const getApiUrlParams = (payload) => ({
    type: GET_API_URL_PARAMS,
    payload
})


export const getPager = (payload) => ({
    type: GET_PAGER,
    payload
});

export const setPager = (payload) => ({
    type: SET_PAGER,
    payload
});

export const setPagerFirst = () => ({
    type: SET_PAGER_FIRST,
});

export const setPagerNext = () => ({
    type: SET_PAGER_NEXT,
});

export const setPagerPrev = () => ({
    type: SET_PAGER_PREV,
});

export const setPagerLast = (payload) => ({
    type: SET_PAGER_LAST,
    payload
});
import {
    SET_PAGER,
    GET_PAGER,
    SET_PAGER_NEXT,
    SET_PAGER_PREV,
    SET_PAGER_FIRST,
    SET_PAGER_LAST,
} from '../common/constants'

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
import {
    GET_TERMS,
    SET_TERMS
} from '../common/constants'

export const getTerms = (payload) => ({
    type: GET_TERMS,
    payload
});

export const setTerms = (payload) => ({
    type: SET_TERMS,
    payload
});

import {
    SET_LOADING_ON,
    SET_LOADING_OFF,
    SET_API_URL_PARAMS,
    SET_API_PAGER_LINKS,
} from '../common/constants'

export const setApiPagerLinks = (payload) => ({
    type: SET_API_PAGER_LINKS,
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

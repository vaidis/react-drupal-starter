import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  SET_API_URL_PARAMS,
  SET_API_PAGER_LINKS,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
} from '../common/constants'

export const setLoadedTrue = () => ({
  type: SET_LOADED_TRUE
});

export const setLoadedFalse = () => ({
  type: SET_LOADED_FALSE
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

export const setApiPagerLinks = (payload) => ({
  type: SET_API_PAGER_LINKS,
  payload
});

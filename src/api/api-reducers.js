import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
  SET_API_URL_PARAMS,
  SET_API_PAGER_LINKS,
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
      // console.log("SET_LOADING_ON")
      return { ...state, loading: true };

    case SET_LOADING_OFF:
      // console.log("SET_LOADING_OFF")
      return { ...state, loading: false };

    case SET_LOADED_TRUE:
      // console.log("SET_LOADED_TRUE")
      return { ...state, loaded: true };

    case SET_LOADED_FALSE:
      // console.log("SET_LOADED_FALSE")
      return { ...state, loaded: false };

    case SET_API_URL_PARAMS:
      // console.log("SET_API_URL_PARAMS", action)
      return {
        ...state,
        urlParams: action.payload
      };

    case SET_API_PAGER_LINKS:
      // console.log("SET_API_PAGER_LINKS", action)
      return {
        ...state,
        pager: action.payload
      };

    default:
      return state;
  }
};

export default reducer;

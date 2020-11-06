import {
  GET_ARTICLE,
  SET_ARTICLE,
} from '../common/constants'

export const getArticle = (payload) => (
  console.log("GET_ARTICLE: ", payload) || {
    type: GET_ARTICLE,
    payload
  });

export const setArticle = (payload) => ({
  type: SET_ARTICLE,
  payload
});

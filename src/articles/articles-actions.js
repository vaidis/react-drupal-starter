import {
  GET_ARTICLES,
  SET_ARTICLES
} from '../common/constants'

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload
});

export const setArticles = (payload) => ({
  type: SET_ARTICLES,
  payload
});

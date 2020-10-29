import {
    GET_ARTICLE,
    SET_ARTICLE,
    POST_ARTICLE,
    POST_ARTICLE_FILE,
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

export const postArticle = (payload) => (
    console.log("POST_ARTICLE: ", payload) || {
    type: POST_ARTICLE,
    payload
});

export const postArticleFile = (payload) => (
    console.log("POST_ARTICLE_FILE: ", payload) || {
    type: POST_ARTICLE_FILE,
    payload
});
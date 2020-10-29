import {
    POST_ARTICLE,
    POST_ARTICLE_FILE,
    SET_ARTICLE_FILE,
} from '../common/constants'

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

export const setArticleFile = (payload) => (
    console.log("SET_ARTICLE_FILE: ", payload) || {
    type: SET_ARTICLE_FILE,
    payload
});

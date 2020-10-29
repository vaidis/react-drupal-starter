import {
    POST_ARTICLE,
    POST_ARTICLE_FILE,
    SET_ARTICLE_FILE,
    SET_ARTICLE_TITLE,
    SET_ARTICLE_BODY,
    SET_ARTICLE_TAGS,
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

export const setArticleTitle = (payload) => (
    console.log("SET_ARTICLE_TITLE: ", payload) || {
    type: SET_ARTICLE_TITLE,
    payload
});

export const setArticleBody = (payload) => (
    console.log("SET_ARTICLE_BODY: ", payload) || {
    type: SET_ARTICLE_BODY,
    payload
});

export const setArticleTags = (payload) => (
    console.log("SET_ARTICLE_TAGS: ", payload) || {
    type: SET_ARTICLE_TAGS,
    payload
});
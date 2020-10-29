import {
    POST_ARTICLE,
    POST_ARTICLE_FILE,
    SET_ARTICLE_FILE,
    SET_ARTICLE_TITLE,
    SET_ARTICLE_BODY,
    SET_ARTICLE_TAGS,
} from '../common/constants'

const reducer = (state = {
    images: [],
    tags: '',
    title: '',
    body: '',
}, action) => {
    switch (action.type) {

        case POST_ARTICLE:
            console.log("POST_ARTICLE")
            return action.payload;

        case POST_ARTICLE_FILE:
            console.log("POST_ARTICLE_FILE")
            return action.payload;

        case SET_ARTICLE_TITLE:
            return { ...state, title: action.payload }

        case SET_ARTICLE_BODY:
            return { ...state, body: action.payload }

        case SET_ARTICLE_TAGS:
            return { ...state, tags: action.payload }

        case SET_ARTICLE_FILE:
            console.log("SET_ARTICLE_FILE")
            const item = action.payload;
            const file = item
            const images = {
                ...state.images,
                file,
            };

            // Creates an object key:value
            // const item = action.payload;
            // const images = {
            //   ...state.images,
            //   [item]: item,
            // };

            return {
                ...state,
                images,
            };
        default:
            return state;
    }
};

export default reducer;
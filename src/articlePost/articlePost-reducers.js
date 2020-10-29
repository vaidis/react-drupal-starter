import {
    POST_ARTICLE,
    POST_ARTICLE_FILE,
    SET_ARTICLE_FILE,
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

        case SET_ARTICLE_FILE:
            console.log("SET_ARTICLE_FILE")

            const item = action.payload;
            const images = {
              ...state.images,
              [item]: item,
            };

            return {
                ...state,
                images,
            };
        default:
            return state;
    }
};

export default reducer;
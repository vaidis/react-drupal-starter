import {
    POST_ARTICLE,
    POST_ARTICLE_FILE,
    SET_ARTICLE_FILE,
    SET_ARTICLE_TITLE,
    SET_ARTICLE_BODY,
    SET_ARTICLE_TAGS,
    SET_VOCABULARY,
} from '../common/constants'

const reducer = (state = {
    images: [],
    files: [],
    // tags: '',
    title: '',
    body: '',
    vocabulary: [{ value: '', label: '' }],
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

        case SET_VOCABULARY:
            // working:
            // named 'value' instead of 'id' for the needs of the react-select
            // const terms = action.payload.data.map(item => ({ value: item.id, label: item.name }))

            const terms = action.payload.data.map(item => (
                { value: item.id, label: item.name }
            ))
            console.log("terms", terms)
            // return { ...state, vocabulary: action.payload.data }
            return { ...state, vocabulary: terms }

        case SET_ARTICLE_FILE:
            console.log("SET_ARTICLE_FILE")
            const id = action.payload;
            const files = {
                ...state.images,
                id,
            };

            // Creates an object key:value
            // const item = action.payload;
            // const images = {
            //   ...state.images,
            //   [item]: item,
            // };

            return {
                ...state,
                files,
            };
        default:
            return state;
    }
};

export default reducer;
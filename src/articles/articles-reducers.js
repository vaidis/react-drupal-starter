import { SET_ARTICLES, SET_API_LINKS } from '../common/constants'
export const initialArticles = ''

const reducer = (state = initialArticles, action) => {
    switch (action.type) {

        case SET_ARTICLES:
            // console.log("REDUCER SET_ARTICLES", action)
            return action.payload;

        default:
            return state;
    }
};

export default reducer;

import {
    SET_PAGER,
    GET_PAGER,
    SET_PAGER_FIRST,
    SET_PAGER_PREV,
    SET_PAGER_NEXT,
    SET_PAGER_LAST,
} from '../common/constants'

const reducer = (state = {
    page: 1,
    offset: 5,
    items: 5
}, action) => {
    switch (action.type) {

        case GET_PAGER:
            return state;

        case SET_PAGER:
            return action.payload;

        case SET_PAGER_FIRST:
            return { ...state, page: 0 };

        case SET_PAGER_NEXT:
            return { ...state, page: state.page + 1 };

        case SET_PAGER_PREV:
            return { ...state, page: state.page - 1 };

        case SET_PAGER_LAST:
            return { ...state, page: action.payload };

        default:
            return state;
    }
};

export default reducer;

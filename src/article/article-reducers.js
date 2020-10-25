import {
    SET_ARTICLE,
} from '../common/constants'


const reducer = (state = {
    data: '',
}, action) => {
    switch (action.type) {

        case SET_ARTICLE:
            return action.payload.data;

        default:
            return state;
    }
};

export default reducer;
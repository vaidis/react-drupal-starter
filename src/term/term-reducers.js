import { SET_TERMS } from '../common/constants'

const reducer = (state = {
    data: '',
}, action) => {
    switch (action.type) {

        case SET_TERMS:
            return action.payload.data;

        default:
            return state;
    }
};

export default reducer;
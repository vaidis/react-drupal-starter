import { SET_ARTICLES } from '../common/constants'

const reducer = (state = {
  data: ''
}, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      console.log("SET_ARTICLES", action)
      return action.payload;

    default:
      return state;
  }
};

export default reducer;

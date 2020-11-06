import {
  SET_ARTICLE,
} from '../common/constants'

const reducer = (state = {
  article: {
    data: []
  }
}, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      console.log("SET_ARTICLE")
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
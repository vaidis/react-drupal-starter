import {
  // USER_LOGIN_REQUEST,
  // USER_LOGIN_SUCCESS,
  // USER_LOGIN_FAILURE,
  // USER_GET_DATA,
  USER_SET_DATA,
  // USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  // USER_LOGOUT_FAILURE,
  // USER_GET_STATUS,
} from '../common/constants'

const initialState = {
  current_user: {
    uid: 0,
    name: 'anonymous'
  },
  csrf_token: '',
  logout_token: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_SET_DATA:
      console.log("USER_SET_DATA", action)
      return {
        ...state,
        current_user: action.payload.current_user,
        csrf_token: action.payload.csrf_token,
        logout_token: action.payload.logout_token,
      };

    case USER_LOGOUT_SUCCESS:
      console.log("USER_LOGOUT_SUCCESS")
      return initialState;

    default:
      return state;
  }
};

export default reducer;

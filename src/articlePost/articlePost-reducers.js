import {
  POST_ARTICLE,
  POST_ARTICLE_FILE,
  SET_ARTICLE_FILE,
  SET_ARTICLE_TITLE,
  SET_ARTICLE_BODY,
  SET_ARTICLE_TAGS,
  ADD_ARTICLE_TAGS,
  SET_VOCABULARY,
  SET_SELECTED,
  ADD_SELECTED,
} from '../common/constants'

const reducer = (state = {
  images: [],
  files: [],
  tags: [],
  title: '',
  body: '',
  selected: [],
  vocabulary: [],
}, action) => {

  switch (action.type) {
    case POST_ARTICLE:
      console.group("POST_ARTICLE"); console.groupEnd();
      return action.payload;

    case POST_ARTICLE_FILE:
      console.group("POST_ARTICLE_FILE"); console.groupEnd();
      return action.payload;

    case SET_ARTICLE_TITLE:
      return { ...state, title: action.payload }

    case SET_ARTICLE_BODY:
      return { ...state, body: action.payload }

    case SET_SELECTED:
      console.group("SET_SELECTED", action.payload); console.groupEnd();
      return {
        ...state,
        selected: action.payload
      }

    case ADD_SELECTED:
      return {
        ...state,
        selected: [...state.selected, action.payload]
      }

    case SET_ARTICLE_TAGS:
      return { ...state, tags: action.payload }

    case ADD_ARTICLE_TAGS:
      return {
        ...state,
        tags: [...state.tags, action.payload]
      }

    case SET_VOCABULARY:
      /**
       * @param {string[]} terms - named 'value' instead of 'id'
       *     for the needs of the react-select
       */
      const terms = action.payload.data.map(item => (
        { value: item.id, label: item.name }
      ))
      console.group("SET_VOCABULARY", terms); console.groupEnd();
      return { ...state, vocabulary: terms }

    case SET_ARTICLE_FILE:
      console.group("SET_ARTICLE_FILE"); console.groupEnd();
      const id = action.payload;
      const files = {
        ...state.images,
        id,
      };
      return {
        ...state,
        files,
      };

    default:
      return state;
  }
};

export default reducer;
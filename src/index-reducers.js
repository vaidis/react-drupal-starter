import { combineReducers } from 'redux'

import api from './api/api-reducers'
import user from './user/user-reducers'
import article from './article/article-reducers'
import articles from './articles/articles-reducers'
import articlePost from './articlePost/articlePost-reducers'

const IndexReducers = combineReducers({
  api,
  user,
  article,
  articlePost,
  articles,
})

export default IndexReducers;

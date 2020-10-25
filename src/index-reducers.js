import { combineReducers } from 'redux'

import api from './api/api-reducers'
import user from './user/user-reducers'
import article from './article/article-reducers'
import articles from './articles/articles-reducers'

const IndexReducers = combineReducers({
  api,
  user,
  article,
  articles,
})

export default IndexReducers;
